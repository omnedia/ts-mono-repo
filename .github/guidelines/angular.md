# Angular Standards for ts-mono-repo

This document defines Angular-specific coding standards, best practices, and conventions for the `frontend/` project in this monorepo.

## General Principles
- Use TypeScript for all Angular code.
- Follow Angular's official style guide: https://angular.io/guide/styleguide
- Prefer standalone components and modern Angular features where possible.
- Use strict typing and avoid `any`.
- Structure code by feature (feature modules/directories) when possible.

## File & Folder Structure
- Place all Angular code in `frontend/src/app/`.
- Use subfolders for features, shared modules, services, guards, interceptors, etc.

## Components
- Use `OnPush` change detection by default.
- Use SCSS for component styles. In there, never use `:ng-deep`.
- Name files and selectors consistently: `feature-name.component.ts`, `feature-name.component.scss`, etc.
- Keep components focused and small; extract logic to services where possible.

## Services
- Use Angular dependency injection.
- Keep services stateless where possible.
- Place API communication logic in dedicated services (e.g., `auth-api.service.ts`).

## State Management
- Prefer Angular signals or RxJS for state management.
- Use the `stores/` folder for application-wide stores.

## Testing
- Write unit tests for all components, services, and guards.
- Use Angular's testing utilities and TestBed.

## Linting & Formatting
- Follow the configured ESLint and Prettier rules.
- Fix all lint errors before committing.

## Documentation
- Document public APIs and complex logic with JSDoc comments.

---

**Last updated:** 2026-03-25

