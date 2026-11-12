# PestPilot — Server

Express 5 REST API for the PestPilot multi-tenant pest control SaaS. Handles authentication, RBAC, and all business logic for the React frontend.

## Stack

- **Runtime:** Node.js + TypeScript (ESM)
- **Framework:** Express 5
- **Database:** PostgreSQL (Neon) via Prisma 8 ORM (`@prisma/orm-postgres`)
- **Auth:** JWT access token (15 min) + opaque refresh token (7 d), both in `HttpOnly` cookies
- **Validation:** Zod
- **Logging:** pino + pino-http
- **Password hashing:** argon2

## Getting started

1. Copy the env template and fill in your values:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Push the schema to the database:
   ```bash
   npx prisma db init
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

The API runs on `http://localhost:4000` by default.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start with hot-reload (`tsx watch`) |
| `npm run build` | Type-check with `tsc --noEmit` |
| `npm run test` | Run tests with Vitest |
| `npm run contract:emit` | Regenerate `contract.json` + `contract.d.ts` after schema changes |

## Prisma ORM workflow

1. Edit `src/prisma/contract.prisma`
2. Run `npx prisma contract emit` — regenerates typed contract files
3. Run `npx prisma db update` — applies schema changes to the database

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Pooled Neon connection string (pgBouncer) — used at runtime |
| `DATABASE_URL_UNPOOLED` | Direct Neon connection string — used by Prisma CLI |
| `ACCESS_TOKEN_SECRET` | Secret for signing JWT access tokens |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh token hashes |
| `PORT` | Server port (default: `4000`) |
| `CLIENT_URL` | Allowed CORS origin (default: `http://localhost:5173`) |

## API overview

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/auth/login` | Password login |
| `POST` | `/auth/refresh` | Rotate refresh token |
| `POST` | `/auth/logout` | Revoke refresh token + clear cookies |
| `GET` | `/auth/me` | Current user, org, and role |
