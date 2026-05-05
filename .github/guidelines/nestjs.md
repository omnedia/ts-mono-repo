# NestJS Standards for ts-mono-repo

This document defines NestJS-specific coding standards, best practices, and conventions for the `backend/` project in this monorepo.

## General Principles
- Use TypeScript for all NestJS code.
- Follow NestJS's official style guide: https://docs.nestjs.com/recipes/style-guide
- Use dependency injection for all services and providers.
- Prefer modular architecture: organize code by feature modules.
- Use DTOs and validation pipes for all incoming data.

## File & Folder Structure
- Place all NestJS code in `backend/src/`.
- Use subfolders for features (e.g., `auth/`, `entities/`, `migrations/`).
- Use the `types/` folder for backend-specific types.

## Controllers & Services
- Keep controllers thin; move business logic to services.
- Use guards, interceptors, and pipes for cross-cutting concerns.
- Use async/await for all asynchronous operations.

## Entities & Database
- Use TypeORM or the configured ORM for entities and migrations.
- Place entities in the `entities/` folder and migrations in `migrations/`.

## Testing
- Write unit and integration tests for all modules, services, and controllers.
- Use Jest as the default test runner.

## Linting & Formatting
- Follow the configured ESLint and Prettier rules.
- Fix all lint errors before committing.

## Documentation
- Document public APIs and complex logic with JSDoc comments.

---

**Last updated:** 2026-03-25

