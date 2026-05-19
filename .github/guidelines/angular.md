# Angular Standards

This document defines Angular-specific coding standards, best practices, and conventions for the `frontend/` project in
this monorepo.

## General Principles

- Use TypeScript for all Angular code.
- Follow Angular's official style guide: https://angular.dev/style-guide
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
- ALWAYS use PrimeNG components instead of own implementations, if it exist as a PrimeNG component.
- ALWAYS use signal forms for form validation and state management, not reactive forms.
- ALWAYS choose signals where possible, e.g. for Inputs, models, etc.
- Keep business logic out of templates.
- Avoid manual RxJS subscriptions in components when an async pipe, signal, or framework lifecycle helper is sufficient.

## Services

- Use Angular dependency injection.
- Keep services stateless where possible.
- Place API communication logic in dedicated services (e.g., `auth-api.service.ts`).

## State Management

- Prefer Angular signals or RxJS for state management.
- Use the `stores/` folder for application-wide stores.

## Testing

- After making changes, always ask if unit tests for the components, services, and guards should be updated or written.
- Use Angular's testing utilities and TestBed.

## Enforcement

When working in Angular:

- Load `angular.md` and `typescript.md` before implementation.
- Prefer standalone components and modern Angular APIs.
- Use signals for component state and inputs where the project standard supports them.
- Prefer PrimeNG components over custom UI controls when an equivalent PrimeNG component exists.
- Keep API communication in dedicated services.
- Verify with frontend linting and relevant tests or typechecks when available.

## Linting & Formatting

- Follow the configured ESLint and Prettier rules.
- Fix all lint errors before committing.
- To run the linter use the command `npm run lint`
- To run the formatter use the command `npm run format:fix`

## Documentation

- Document public APIs and complex logic with JSDoc comments.

---

**Last updated:** 2026-05-19

