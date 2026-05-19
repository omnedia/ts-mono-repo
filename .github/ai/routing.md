# Guideline Resolution Rules

Guideline resolution is mandatory and deterministic. Before editing, determine all affected paths, technologies, and change types, then load every matching guideline.

## Technology-Based Resolution

| Technology | Required Guidelines |
|---|---|
| Angular | [angular.md](../guidelines/angular.md), [typescript.md](../guidelines/typescript.md), [testing.md](../guidelines/testing.md), [coding-standards.md](../guidelines/coding-standards.md) |
| NestJS | [nestjs.md](../guidelines/nestjs.md), [typescript.md](../guidelines/typescript.md), [testing.md](../guidelines/testing.md), [coding-standards.md](../guidelines/coding-standards.md) |
| TypeScript | [typescript.md](../guidelines/typescript.md), [coding-standards.md](../guidelines/coding-standards.md) |
| Testing | [testing.md](../guidelines/testing.md), [coding-standards.md](../guidelines/coding-standards.md) |
| Docker | [docker.md](../guidelines/docker.md) |
| Database | [database.md](../guidelines/database.md), [nestjs.md](../guidelines/nestjs.md), [typescript.md](../guidelines/typescript.md) |
| CI/CD | [ci.md](../guidelines/ci.md) |
| Commits | [../git-commit-instructions.md](../git-commit-instructions.md) |

## Path-Based Resolution

| Path Pattern | Required Guidelines |
|---|---|
| `frontend/**` | [angular.md](../guidelines/angular.md), [typescript.md](../guidelines/typescript.md), [testing.md](../guidelines/testing.md), [coding-standards.md](../guidelines/coding-standards.md) |
| `backend/**` | [nestjs.md](../guidelines/nestjs.md), [typescript.md](../guidelines/typescript.md), [testing.md](../guidelines/testing.md), [coding-standards.md](../guidelines/coding-standards.md) |
| `backend/src/entities/**` | [database.md](../guidelines/database.md), [nestjs.md](../guidelines/nestjs.md), [typescript.md](../guidelines/typescript.md) |
| `backend/src/migrations/**` | [database.md](../guidelines/database.md), [nestjs.md](../guidelines/nestjs.md) |
| `**/*.spec.ts` | [testing.md](../guidelines/testing.md), [typescript.md](../guidelines/typescript.md) |
| `**/*.test.ts` | [testing.md](../guidelines/testing.md), [typescript.md](../guidelines/typescript.md) |
| `**/*.ts` | [typescript.md](../guidelines/typescript.md), [coding-standards.md](../guidelines/coding-standards.md) |
| `**/Dockerfile` | [docker.md](../guidelines/docker.md) |
| `docker-compose*.yml` | [docker.md](../guidelines/docker.md) |
| `postgres/**` | [docker.md](../guidelines/docker.md), [database.md](../guidelines/database.md) |
| `redis/**` | [docker.md](../guidelines/docker.md) |
| `.github/workflows/**` | [ci.md](../guidelines/ci.md) |
| `.github/**` | [ci.md](../guidelines/ci.md), [coding-standards.md](../guidelines/coding-standards.md) |
| `package.json` | [typescript.md](../guidelines/typescript.md), [ci.md](../guidelines/ci.md) |
| `package-lock.json` | [typescript.md](../guidelines/typescript.md), [ci.md](../guidelines/ci.md) |

## Resolution Enforcement

When editing files:

1. Resolve every changed file path against the path mapping.
2. Resolve every affected technology against the technology mapping.
3. Merge all matched guideline sets.
4. Read all resolved guidelines before implementation.
5. Apply all resolved rules.
6. Mention conflicts explicitly.

If multiple technologies apply, all matching guidelines are required. Fullstack changes must load both Angular and NestJS guidelines.

## Verification Matrix

| Change Type | Required Verification |
|---|---|
| Angular UI or frontend logic | `npm run lint` in `frontend/`, plus frontend typecheck or tests when available |
| NestJS API or backend logic | `npm run lint` in `backend/`, plus backend tests when available |
| Shared TypeScript or root tooling | root lint/typecheck/test scripts when available, plus affected package checks |
| Database schema or migrations | backend tests or migration validation, plus review of generated SQL or migration intent |
| Docker or Compose | relevant image or Compose config build/validation |
| CI configuration | workflow syntax validation where available, plus review of referenced scripts/secrets |
| Documentation only | spelling/link/path review; no code test required |

If a required command is unavailable, fails due to environment setup, or would require credentials, report that explicitly.

---

**Last updated:** 2026-05-19
