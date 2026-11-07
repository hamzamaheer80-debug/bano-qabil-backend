# Auth API

A secure authentication API built with **Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, and Nodemailer**. Supports signup with email-OTP verification, login, OTP resend with cooldown, and an OTP-based forgot/reset password flow.

## Features

- User signup / registration
- User login (JWT issued only after email verification)
- Send OTP, resend OTP (60s cooldown), verify OTP
- Forgot password / reset password (OTP-based)
- Passwords hashed with bcrypt (12 salt rounds) — OTPs are hashed too, never stored in plaintext
- JWT authentication with a sample protected route (`GET /api/auth/me`)
- Input validation (express-validator) and centralized error handling
- Rate limiting on auth and OTP endpoints
- MongoDB TTL index — expired OTP documents delete themselves automatically
- Deployable to Render, Railway, or Vercel from the same codebase

## Tech stack

Node.js · Express.js · MongoDB Atlas · Mongoose · JWT (`jsonwebtoken`) · bcrypt · Nodemailer · express-validator · express-rate-limit · helmet

## Project structure

```
auth-api/
├── api/index.js            # Vercel serverless entrypoint
├── app.js                  # Express app: middleware + routes (no .listen())
├── server.js               # Entrypoint for Render/Railway
├── config/db.js            # MongoDB connection (cached across requests)
├── controllers/authController.js
├── middleware/
│   ├── asyncHandler.js
│   ├── authMiddleware.js   # JWT "protect" middleware
│   ├── errorMiddleware.js  # 404 + centralized error handler
│   ├── rateLimiter.js
│   └── validateMiddleware.js
├── models/
│   ├── User.js
│   └── Otp.js
├── routes/authRoutes.js
├── utils/
│   ├── generateOtp.js
│   ├── generateToken.js
│   └── sendEmail.js
├── validators/authValidators.js
├── vercel.json
├── .env.example
└── package.json
```

## Prerequisites

- Node.js 18+ and npm
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster
- An email account to send OTPs from (Gmail + an **App Password** is the quickest option; [Mailtrap](https://mailtrap.io) is a good alternative for local testing without sending real email)

## 1. Local setup

```bash
git clone <your-repo-url>
cd auth-api
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` locally, `production` when deployed |
| `PORT` | Port for local dev (Render/Railway set this for you in production) |
| `MONGO_URI` | Your MongoDB Atlas connection string (see below) |
| `JWT_SECRET` | Long random string — generate one with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `JWT_EXPIRES_IN` | e.g. `7d` |
| `OTP_EXPIRES_IN_MINUTES` | How long an OTP stays valid, e.g. `10` |
| `OTP_LENGTH` | Digits per OTP, e.g. `6` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Your SMTP provider's credentials |
| `EMAIL_FROM` | Sender shown on OTP emails, e.g. `Auth API <no-reply@yourapp.com>` |
| `CLIENT_URL` | Comma-separated allowed CORS origin(s). Use `*` only for local testing |

**MongoDB Atlas (free tier):** create a project → build a free M0 cluster → *Database Access* to add a user/password → *Network Access* to allow your IP (or `0.0.0.0/0` for development) → *Connect → Drivers* to copy the connection string into `MONGO_URI`, adding your database name before the `?`.

**Gmail SMTP:** enable 2-Step Verification on the Gmail account, then create an **App Password** (Google Account → Security → App passwords) and use that 16-character value as `SMTP_PASS`, with `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`.

Run it:

```bash
npm run dev     # nodemon, auto-restarts on changes
# or
npm start
```

The API is now at `http://localhost:5000`. Check `GET /api/health` to confirm it's up.

## 2. API documentation

Base URL (local): `http://localhost:5000/api/auth`
All request/response bodies are JSON. Protected routes require `Authorization: Bearer <token>`.

### `POST /register`
Body: `{ "name": "Jane Doe", "email": "jane@example.com", "password": "Password123" }`
→ `201`, creates the user (unverified) and emails a verification OTP.
```json
{ "success": true, "message": "Account created. A verification code has been sent to your email.", "data": { "id": "...", "name": "Jane Doe", "email": "jane@example.com", "isVerified": false } }
```

### `POST /login`
Body: `{ "email": "jane@example.com", "password": "Password123" }`
→ `200` with a JWT if the password matches **and** the email is verified; `403` if not yet verified; `401` on bad credentials.
```json
{ "success": true, "message": "Login successful", "data": { "token": "<jwt>", "user": { "id": "...", "name": "Jane Doe", "email": "jane@example.com", "isVerified": true } } }
```

### `POST /send-otp`
Body: `{ "email": "jane@example.com", "purpose": "email-verification" }` — `purpose` is optional, defaults to `"email-verification"` (other value: `"password-reset"`).
→ `200`, emails a fresh OTP. `404` if no account exists for that email.

### `POST /resend-otp`
Same body as `/send-otp`. Enforces a 60-second cooldown since the last OTP for that email+purpose — returns `429` with the remaining wait time if called too soon.

### `POST /verify-otp`
Body: `{ "email": "jane@example.com", "otp": "123456", "purpose": "email-verification" }`
→ `200` and marks the user verified (when `purpose` is `email-verification`). `400` for an invalid or expired code, `429` after 5 wrong attempts (the OTP is discarded and a new one must be requested).

### `POST /forgot-password`
Body: `{ "email": "jane@example.com" }`
→ always `200` with a generic message, whether or not the email is registered — this is intentional so the endpoint can't be used to discover which emails have accounts. If the account exists, a `password-reset` OTP is emailed.

### `POST /reset-password`
Body: `{ "email": "jane@example.com", "otp": "123456", "newPassword": "NewPassword456" }`
→ `200` on success; same `400`/`429` behavior as `/verify-otp` for a bad/expired/overused code.

### `GET /me` 🔒
Header: `Authorization: Bearer <token>`
→ `200` with the current user's profile; `401` if the token is missing, invalid, or expired.

### Validation & errors
Invalid input returns `400` before anything touches the database:
```json
{ "success": false, "message": "Validation failed", "errors": [{ "field": "email", "message": "Please provide a valid email" }] }
```
All other errors share the shape `{ "success": false, "message": "..." }` (plus a `stack` field outside production, for debugging).

A ready-to-import `postman_collection.json` is included at the repo root with all of the above pre-filled, including a `{{baseUrl}}` variable and a script that auto-saves the JWT from `/login` into `{{token}}` for the protected route.

## 3. Deployment

The same `app.js` powers all three targets below — pick whichever platform you're submitting with.

### Render (recommended — simplest for a persistent Node/Mongo server)
1. Push this repo to a **public GitHub repository**.
2. In Render: **New → Web Service** → connect the repo.
3. Build command: `npm install` · Start command: `npm start`.
4. Add every variable from `.env` (except `PORT`, which Render sets) under *Environment*.
5. Deploy. Visit `https://<your-service>.onrender.com/api/health` to confirm.

### Railway
1. **New Project → Deploy from GitHub repo**.
2. Railway auto-detects Node and runs `npm start`.
3. Add the same environment variables under *Variables* (Railway injects `PORT` itself).
4. Deploy, then check `/api/health` on the generated domain.

### Vercel (serverless — a bit more involved)
This repo already includes `vercel.json` and `api/index.js` for this. Import the repo in Vercel, add the same environment variables under *Project Settings → Environment Variables*, and deploy — Vercel will route all requests through `api/index.js`. Note: serverless functions are stateless between cold starts, so the MongoDB connection is re-established (and briefly buffered) on a cold start; for an always-warm Mongo connection, Render/Railway are more predictable. Also note Vercel builds `bcrypt` from source at deploy time, which works but adds a little build time — swap in `bcryptjs` (same API) if that ever becomes an issue on your account.

After deploying, update `CLIENT_URL` to your real frontend origin (or leave `*` only if you don't need cookies/credentials across origins).

## Security notes

- Passwords and OTPs are both hashed with bcrypt before being stored — the database never holds a usable plaintext secret.
- OTPs expire server-side (checked on verify) **and** via a MongoDB TTL index, so stale codes are physically deleted, not just ignored.
- OTP verification is capped at 5 attempts per code before it's invalidated, to blunt brute-forcing a 6-digit code.
- `/forgot-password` responds identically for existing and non-existing emails to avoid user enumeration.
- `helmet` sets standard protective headers; `express-rate-limit` throttles auth and OTP endpoints separately.
- JWTs are short-lived by default (`JWT_EXPIRES_IN=7d`) and signed with a server-only secret — never commit a real `JWT_SECRET` or `.env` file (both are git-ignored here).

## License

MIT
