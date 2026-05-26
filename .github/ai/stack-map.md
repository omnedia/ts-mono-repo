# Stack Map

Use this map to identify affected technologies before guideline resolution.

| Area | Paths | Primary Stack |
|---|---|---|
| Frontend application | `frontend/**` | Angular, TypeScript, PrimeNG, SCSS |
| Backend application | `backend/**` | NestJS, TypeScript |
| Backend database code | `backend/prisma/**`, `backend/src/database/**` | NestJS, Prisma ORM, TypeScript |
| Containers | `**/Dockerfile`, `docker-compose*.yml`, `postgres/**`, `redis/**` | Docker, Docker Compose |
| GitHub automation | `.github/workflows/**` | GitHub Actions |
| AI and project instructions | `.github/**`, `AGENTS.md`, `CLAUDE.md` | Repository documentation and CI-adjacent configuration |

When a change crosses areas, resolve and load every matching guideline.

---

**Last updated:** 2026-05-19
