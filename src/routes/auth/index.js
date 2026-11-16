import { Router } from "express";

import { rateLimit } from "../../middleware/errors.js";
import { validate, credentials, body } from "../../validators/index.js";
import { respond } from "../../controllers/http.js";
import { authService } from "../../services/auth/index.js";
export function authRoutes(dependencies) {
const router = Router();
const account = authService(dependencies);
const authLimit = rateLimit();
router.post(
    "/signup",
    authLimit,
    validate([...credentials, body("name").isString().trim().isLength({ min: 2, max: 80 })]),
    respond((req) => account.signup(req.body), 201),
  );
router.post(
    "/resend",
    authLimit,
    validate([body("email").isEmail().normalizeEmail()]),
    respond((req) => account.resend(req.body)),
  );
router.post(
    "/verify",
    authLimit,
    validate([body("email").isEmail().normalizeEmail(), body("code").matches(/^\d{6}$/)]),
    respond((req) => account.verify(req.body)),
  );
router.post(
    "/login",
    authLimit,
    validate(credentials),
    respond((req) => account.login(req.body)),
  );
return router;
}