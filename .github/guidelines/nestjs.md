# NestJS Standards

This document defines NestJS-specific coding standards, best practices, and conventions for the `backend/` project in
this monorepo.

## General Principles

- Use TypeScript for all NestJS code.
- Follow NestJS's official style guide.
- Use dependency injection for all services and providers.
- Prefer modular architecture: organize code by feature modules.
- Use DTOs and validation pipes for all incoming data.

## File & Folder Structure

- Place all NestJS code in `backend/src/`.
- Use subfolders for features (e.g., `auth/`, `database/`, `types/`).
- Use the `types/` folder for backend-specific types.

## Controllers & Services

- Keep controllers thin; move business logic to services.
- Use guards, interceptors, and pipes for cross-cutting concerns.
- Use async/await for all asynchronous operations.
- Validate DTOs explicitly for incoming data.
- Never access repositories or database clients directly from controllers.
- Keep dependency injection consistent for services, repositories, guards, and providers.

## Entities & Database

* Use Prisma ORM for all database access and schema management.
* Keep the main Prisma generator and datasource configuration in `backend/prisma/schema.prisma`.
* Organize Prisma model files by domain under `backend/prisma/models/`.

Example structure:

```txt
prisma/
  schema.prisma
  migrations/
  models/
    user.schema.prisma
    organization.schema.prisma

src/
  database/
    prisma.module.ts
    prisma.service.ts
```

* Place shared database utilities and the Prisma client configuration in a dedicated `database/` module.
* Place migrations in `backend/prisma/migrations/`.
* Use Prisma Migrate for all schema changes.
* Define models, relations, indexes, and constraints explicitly in Prisma schema files.
* Prefer typed query builders over raw SQL whenever possible.
* Keep database access logic inside repositories or services; controllers must never access the database directly.
* Use transactions for multi-step write operations.
* Use generated Prisma Client types to maintain end-to-end type safety.

## Testing

- Write unit and integration tests for all modules, services, and controllers.
- Use Jest as the default test runner.

## Enforcement

When working in NestJS:

- Load `nestjs.md` and `typescript.md` before implementation.
- Keep controllers focused on HTTP concerns.
- Place business logic in services.
- Put persistence logic in repositories or dedicated data services.
- Validate request DTOs explicitly.
- Verify with backend linting and relevant tests when available.

## Linting & Formatting

- Follow the configured ESLint and Prettier rules.
- Fix all lint errors before committing.
- To run the linter use the command `npm run lint`
- To run the formatter use the command `npm run format:fix`

## Documentation

- Document public APIs and complex logic with JSDoc comments.

---

**Last updated:** 2026-05-19

