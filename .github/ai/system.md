# AI System Context

This document defines the repository context and operational boundaries for AI-powered tools in `ts-mono-repo`.

## Project Structure

- Backend: NestJS and TypeScript in `backend/`
- Frontend: Angular and TypeScript in `frontend/`
- Shared project tooling: root `package.json`, lint-staged, Git hooks, and repository documentation
- Containerization: Dockerfiles, Compose files, `postgres/`, and `redis/`
- Automation: GitHub workflow files under `.github/workflows/`

## Required Entry Points

- Behavior rules: [behavior.md](./behavior.md)
- Routing rules: [routing.md](./routing.md)
- Machine-readable routing: [routing.yaml](./routing.yaml)
- Stack map: [stack-map.md](./stack-map.md)
- Project coding standards: [../guidelines/coding-standards.md](../guidelines/coding-standards.md)
- Commit instructions: [../git-commit-instructions.md](../git-commit-instructions.md)

## Core Boundaries

- Treat this repository as a TypeScript monorepo.
- Preserve the existing Angular frontend and NestJS backend architecture.
- Prefer existing project patterns over new abstractions.
- Keep changes localized to the task.
- Do not treat these files as user-facing product documentation.

---

**Last updated:** 2026-05-19
