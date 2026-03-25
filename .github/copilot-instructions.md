# System Context: Copilot & AI for ts-mono-repo

This document defines the system context and operational boundaries for Copilot and AI-powered tools in the ts-mono-repo project. It is not a user-facing ReadMe, but a reference for automated agents.

---

## Project Structure (for AI)
- Backend: NestJS (TypeScript) in `backend/`
- Frontend: Angular (TypeScript) in `frontend/`
- Shared types/interfaces: `shared/`
- Containerization: Dockerfiles and Compose files
- Other services: e.g., `postgres/`, `redis/`

## Coding & Collaboration Principles
- All code must be strongly-typed TypeScript.
- Enforce linter/formatter rules (ESLint, Prettier) at all times.
- Prefer modular, reusable, and testable code.
- Shared types/interfaces must reside in `shared/` and be imported by both backend and frontend.
- All public APIs, functions, and complex logic must be documented with JSDoc or equivalent.
- Commit messages must follow the Conventional Commits standard (see linked guideline).

## AI Tooling Instructions
- Use this file as the root context for project-wide standards.
- For framework- or technology-specific rules (NestJS, Angular, commit structure, shared types), reference the linked guideline documents below. Do not inline their content unless specifically requested.
- When new technologies or tools are introduced, create a new guideline under `.github/guidelines/` and reference it here.

---

## Linked Guidelines (for AI)
- Coding Standards: [./guidelines/coding-standards.md](./guidelines/coding-standards.md)
- Angular: [./guidelines/angular.md](./guidelines/angular.md)
- NestJS: [./guidelines/nestjs.md](./guidelines/nestjs.md)
- Commit Messages: [./git-commit-instructions.md](./git-commit-instructions.md)
- Shared Types: [./guidelines/shared-types.md](./guidelines/shared-types.md)

---

## AI Agent Behavior
- Always pull in relevant guidelines for specific tasks.
- Adhere strictly to the standards and structures described in the guidelines.
- If information is missing or ambiguous, refer to the guidelines or request clarification.
- Do not output this file to end users or treat it as documentation.

---

**Last updated:** 2026-03-25
