# 🚀 Backend (NestJS)

This is the backend API for the TS Monorepo project, built with [NestJS](https://nestjs.com/).

---

## 📦 Features

- **Session-based authentication** with CSRF protection
- **PostgreSQL** database with Prisma
- **Redis** support for session storage (optional)
- **Swagger/OpenAPI** documentation
- **Role-based access control** with guards
- **TypeScript** for type safety
- **ESLint & Prettier** for code quality
- **Database migrations** with Prisma Migrate

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the backend directory:

```env
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=root
POSTGRES_DB=app
DATABASE_URL=postgresql://admin:root@localhost:5432/app
CSRF_SECRET=your_csrf_secret
SESSION_SECRET=your_session_secret
SESSION_EXPIRATION=1h
SESSION_STAY_SIGNED_IN_EXPIRATION=7d
PORT=3800
SESSION_COOKIE_DOMAIN= .app.com # remove for dev / replace with own domain in prod
FRONTEND_URL=http://localhost:4200
ALLOWED_ORIGINS=http://localhost:4200
REDIS_URL=redis://localhost:6379  # Optional: for production session storage
```

**Important:**

- `SESSION_SECRET` should be a strong random string (at least 32 characters)
- `DATABASE_URL` is required by Prisma CLI commands. Runtime configuration can also use the `POSTGRES_*` variables.
- `REDIS_URL` is optional. If not set, sessions will be stored in memory (not recommended for production)

### 3. Run database migrations

Ensure PostgreSQL is running (see `postgres/` directory), then:

```bash
npm run migration:run
```

### 4. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3800`

---

## 📑 API Documentation

Swagger documentation is available at:

```
http://localhost:3800/api
```

OpenAPI JSON spec is available at:

```
http://localhost:3800/api-json
```

---

## 🔐 Authentication

The backend uses **session-based authentication** with CSRF protection:

- **Session cookies** for authentication (httpOnly, secure in production)
- **Double-submit CSRF tokens** to prevent CSRF attacks
- **LocalAuthGuard** for email/password login
- **SessionAuthGuard** for protected routes
- **RolesGuard** for role-based access control

### CSRF Token Flow

1. Frontend requests a CSRF token from `/auth/csrf`
2. Token is stored in a cookie and returned in the response
3. Frontend includes the token in the `x-csrf-token` header for state-changing requests
4. Backend validates the token before processing the request

Excluded routes (no CSRF validation):

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/csrf`

---

## 🗄️ Database Migrations

### Generate a new migration

After changing a `.prisma` schema file under `prisma/`:

```bash
npm run migration:generate -- --name migration_name
```

### Run migrations

```bash
npm run migration:run
```

### Run migrations in development

```bash
npm run migration:dev
```

---

## 🧹 Code Quality

### Linting

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Fix linting errors automatically
```

### Formatting

```bash
npm run format         # Check formatting
npm run format:fix     # Fix formatting automatically
```

### Combined check

```bash
npm run check          # Run both lint and format checks
```

---

## 🔄 API Client Generation

Generate TypeScript API client for the frontend:

```bash
npm run api:generate
```

This command uses **ng-openapi-gen** to generate a type-safe API client in `frontend/src/app/api/` based on the Swagger
specification.

**Note:** The backend server must be running for this command to work.

---

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## 🏗️ Building for Production

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

### Start production server

```bash
npm run start:prod
```

---

## 📚 Project Structure

```
src/
├── auth/              # Authentication module (login, register, guards)
├── database/          # Prisma service and module
├── types/             # TypeScript types and interfaces
├── app.module.ts      # Root application module
├── main.ts            # Application entry point
└── middleware.module.ts # Global middleware configuration

prisma/
├── migrations/        # Prisma database migrations
├── models/
│   └── user.schema.prisma # Prisma model and enum schema
└── schema.prisma      # Main Prisma generator and datasource schema
```

---

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Swagger/OpenAPI](https://swagger.io)
