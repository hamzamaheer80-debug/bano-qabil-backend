# OLX Clone API

A Node.js/Express backend for a marketplace project. The current HTTP API provides account registration and email verification, login, and basic health-check routes. Marketplace listing routes are not implemented yet.

## Requirements

- Node.js 20.6 or newer
- npm
- MongoDB (local or hosted)
- An SMTP server for sending account verification emails

## Setup

1. Install dependencies from the repository root:

   ```sh
   npm install
   ```

2. Create a `.env` file in the repository root:

   ```dotenv
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017/olx_clone
   JWT_SECRET=replace-with-a-random-secret-at-least-32-characters
   OTP_SECRET=replace-with-another-random-secret-at-least-32-characters

   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   MAIL_FROM=Marketplace <no-reply@example.com>
   ```

   `MONGO_URI`, `JWT_SECRET`, and `OTP_SECRET` are required. The two secrets must each be at least 32 characters. `PORT` defaults to `4000`. Configure valid SMTP settings and a sender address to deliver verification emails; the SMTP port defaults to `587`, and port `465` uses a secure connection.

3. Start the server:

   ```sh
   npm run dev
   ```

   For a normal start without file watching:

   ```sh
   npm start
   ```

   The API listens on `http://localhost:4000` by default (or the configured `PORT`). MongoDB must be reachable when the server starts.

## API

All API routes use the `/api` prefix except `/health` and `/test`. Send JSON request bodies with `Content-Type: application/json`.

### Health and test routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Returns server status and uptime. |
| `GET` | `/test` | Simple connectivity test; limited to 3 requests per minute per IP. |

Example health response:

```json
{
  "status": "OK",
  "uptime": 12.34
}
```

### Authentication routes

#### `POST /api/auth/signup`

Creates an unverified account and emails a six-digit verification code.

```json
{
  "name": "Alex Smith",
  "email": "alex@example.com",
  "password": "a-long-password"
}
```

- `name`: required, 2–80 characters
- `email`: required, valid email address
- `password`: required, 12–72 characters and no more than 72 UTF-8 bytes

Returns `201 Created` with the public user profile in `data`. This route does not return a login token.

#### `POST /api/auth/verify`

Verifies an account using the code sent by email.

```json
{
  "email": "alex@example.com",
  "code": "123456"
}
```

The code expires after 10 minutes and verification allows up to five attempts. A successful response contains the public user profile in `data`.

#### `POST /api/auth/resend`

Requests another verification code.

```json
{
  "email": "alex@example.com"
}
```

Codes can be resent at most once per minute. Returns `{"data":{"sent":true}}` when sent; unavailable or too-frequent requests return `429 Too Many Requests`.

#### `POST /api/auth/login`

Authenticates a verified, active account.

```json
{
  "email": "alex@example.com",
  "password": "a-long-password"
}
```

Returns `200 OK` with a one-day JWT and public user profile:

```json
{
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "<user-id>",
      "name": "Alex Smith",
      "email": "alex@example.com",
      "city": "karachi",
      "phone": "",
      "role": "user",
      "verified": true
    }
  }
}
```

The current API does not yet expose routes that require this token.

### Responses and errors

Successful authentication responses are wrapped in a `data` property. Errors use this shape:

```json
{
  "error": "Invalid input; check required fields and limits"
}
```

Common status codes:

| Status | Meaning |
| --- | --- |
| `400` | Invalid or expired verification code |
| `401` | Invalid login credentials |
| `404` | Route not found |
| `409` | Duplicate account or other conflict |
| `422` | Invalid input or malformed JSON |
| `429` | Rate limit reached or verification resend unavailable |
| `500` | Unexpected server error |

The API applies a general limit of 300 requests per minute per IP and a 30-per-minute limit to authentication routes.
