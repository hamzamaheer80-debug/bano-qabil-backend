import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user/index.js";
import { assert, publicUser } from "../../utils/errors.js";
import { makeOtp, hashOtp } from "../../utils/otp.js";

export function authService({ config, email, clock = () => new Date() }) {
  const token = (user) =>
    jwt.sign({}, config.jwtSecret, {
      subject: user.id,
      algorithm: "HS256",
      issuer: "hamza-marketplace",
      audience: "marketplace-client",
      expiresIn: "1d",
    });
  return {
    async signup({ name, email: address, password }) {
      const code = makeOtp();
      const now = clock();
      const user = await User.create({
        name,
        email: address,
        password: await bcrypt.hash(password, 12),
        otpHash: hashOtp(address, code, config.otpSecret),
        otpExpires: new Date(+now + 600000),
        otpSent: now,
      });
      await email.send(address, code);
      return publicUser(user);
    },
    async resend({ email: address }) {
      const now = clock();
      const code = makeOtp();
      const user = await User.findOneAndUpdate(
        {
          email: address,
          verified: false,
          active: true,
          otpSent: { $lte: new Date(+now - 60000) },
        },
        {
          $set: {
            otpHash: hashOtp(address, code, config.otpSecret),
            otpExpires: new Date(+now + 600000),
            otpSent: now,
            otpAttempts: 0,
          },
        },
        { new: true },
      );
      assert(user, 429, "Resend unavailable or too soon");
      await email.send(address, code);
      return { sent: true };
    },
    async verify({ email: address, code }) {
      const hash = hashOtp(address, code, config.otpSecret);
      const user = await User.findOneAndUpdate(
        {
          email: address,
          active: true,
          verified: false,
          otpExpires: { $gt: clock() },
          otpAttempts: { $lt: 5 },
          otpHash: hash,
        },
        {
          $set: { verified: true },
          $unset: { otpHash: 1, otpExpires: 1, otpSent: 1 },
        },
        { new: true },
      );
      if (!user)
        await User.updateOne(
          { email: address, verified: false, active: true, otpAttempts: { $lt: 5 } },
          { $inc: { otpAttempts: 1 } },
        );
      assert(user, 400, "Invalid or expired verification code");
      return publicUser(user);
    },
    async login({ email: address, password }) {
      const user = await User.findOne({ email: address }).select("+password");
      assert(
        user?.active && user.verified && (await bcrypt.compare(password, user.password)),
        401,
        "Invalid credentials",
      );
      return { token: token(user), user: publicUser(user) };
    },
  };
}