# Project Transaction

A Node.js and Express API for user authentication, account management, ledger-based balances, and account-to-account transactions. MongoDB is accessed through Mongoose.

## Requirements

- Node.js and npm
- MongoDB connection string (a replica set is required for multi-document transactions)
- Postman or another HTTP client

## Project structure

```text
project-transaction/
├── .env                         # Local secrets; do not commit
├── .gitignore
├── jsconfig.json                # VS Code JavaScript project settings
├── package.json
├── package-lock.json
├── README.md
├── server.js                    # Loads environment, database, and HTTP server
└── src/
    ├── app.js                   # Express app, parsers, and route mounting
    ├── config/
    │   └── db.js                # Mongoose connection
    ├── controllers/
    │   ├── account.controllers.js
    │   ├── auth.controllers.js
    │   └── transaction.controller.js
    ├── middleware/
    │   └── auth.middleware.js   # JWT and system-user checks
    ├── models/
    │   ├── account.model.js     # Accounts and ledger-derived balance
    │   ├── balcklist.model.js   # Revoked JWTs (filename as currently present)
    │   ├── ledger.model.js      # Immutable debit/credit entries
    │   ├── transaction.models.js
    │   └── user.js
    ├── routes/
    │   ├── account.routes.js
    │   ├── auth.routes.js
    │   └── transaction.routes.js
    └── services/
        └── email.service.js     # Registration and transaction email
```

`node_modules/` is created by npm when dependencies are installed and is not part of the application source.

## Installation and startup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root. Add your own values; do not paste secrets into source files:

   ```dotenv
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   JWT_SECRET=<long-random-secret>

   # Needed to send email through the configured Gmail OAuth2 transporter:
   EMAIL_USER=<sender-email>
   CLIENT_ID=<oauth-client-id>
   CLIENT_SECRET=<oauth-client-secret>
   REFRESH_TOKEN=<oauth-refresh-token>
   ```

3. Start the API:

   ```sh
   npm start
   ```

   The server listens on port `3000`. For the development script, run:

   ```sh
   npm run dev
   ```

   The development script invokes `npx nodemon`.

4. Check that the server is responding:

   ```http
   GET http://localhost:3000/
   ```

   A successful response is `ledger service is up and running`.

## API overview

All request bodies should use JSON with the `Content-Type: application/json` header.

| Method | Path | Authentication | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Register a user; returns a JWT |
| `POST` | `/api/auth/login` | No | Authenticate and return a JWT |
| `POST` | `/api/auth/logout` | Token or cookie, if revoking the current token | Add the token to the blacklist |
| `POST` | `/api/accounts` | User JWT | Create an account for the signed-in user |
| `GET` | `/api/accounts` | User JWT | List the signed-in user's accounts |
| `GET` | `/api/accounts/balance/:accountId` | User JWT | Get the balance of an account owned by the signed-in user |
| `POST` | `/api/transactions` | User JWT | Transfer funds between accounts |
| `POST` | `/api/transactions/system/initial-funds` | System-user JWT | Transfer initial funds from the system user's account |

### Register and log in

Register:

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "choose-a-password"
}
```

The response contains a `token`. Login uses the same `email` and `password` fields and also returns a token.

For protected requests, in Postman select **Authorization → Bearer Token** and paste the token. Alternatively, the API sets a `token` cookie on registration and login.

### Create an account and read its balance

Create an account:

```http
POST http://localhost:3000/api/accounts
Authorization: Bearer <user-token>
```

No request body is required. The account currency defaults to `PKR`.

List accounts:

```http
GET http://localhost:3000/api/accounts
Authorization: Bearer <user-token>
```

Get one account's balance:

```http
GET http://localhost:3000/api/accounts/balance/<account-id>
Authorization: Bearer <user-token>
```

Balances are calculated from ledger entries: credits minus debits. A user can only read the balance of an account associated with that user.

### Transfer funds

```http
POST http://localhost:3000/api/transactions
Authorization: Bearer <user-token>
Content-Type: application/json
```

```json
{
  "fromAccount": "<sender-account-id>",
  "toAccount": "<recipient-account-id>",
  "amount": 25,
  "idempotencyKey": "unique-key-for-this-transfer"
}
```

The transfer checks that both accounts exist and are active, then records a transaction and corresponding debit and credit ledger entries. Use a unique `idempotencyKey` for each logical transfer; when retrying the same request, reuse its key.

### Add initial funds

```http
POST http://localhost:3000/api/transactions/system/initial-funds
Authorization: Bearer <system-user-token>
Content-Type: application/json
```

```json
{
  "toAccount": "<recipient-account-id>",
  "amount": 100,
  "idempotencyKey": "unique-key-for-this-funding-request"
}
```

The authenticated user must have `systemUser: true` and must also have an account. A normal user token receives a forbidden response for this route.

## How the code is organized

- **`server.js`** loads `.env`, connects to MongoDB, and starts Express.
- **`src/app.js`** configures JSON and cookie parsing, exposes the health route, and mounts the API routers.
- **Routes** map HTTP methods and paths to authentication middleware and controller functions.
- **Controllers** validate request data and coordinate model operations.
- **Models** define users, accounts, transactions, ledger entries, and blacklisted tokens.
- **`auth.middleware.js`** accepts a JWT from the `token` cookie or an `Authorization: Bearer <token>` header. The system-user middleware additionally checks the user's `systemUser` property.
- **`email.service.js`** sends registration and transaction emails using the configured Gmail OAuth2 transporter.

## Tests

The current `package.json` does not define an automated test suite. Its `npm test` script is a placeholder that exits with “Error: no test specified”.

## Security notes

- Keep `.env` private. `.gitignore` excludes it and `node_modules/`; never commit credentials or tokens.
- Use a strong, private `JWT_SECRET`. If it is exposed, replace it and require users to log in again.
- The database must support MongoDB multi-document transactions; standalone MongoDB instances do not support them.
- This project is a learning project. Review validation, transaction/error handling, authorization, logging, and email configuration before using it with real funds or production data.
