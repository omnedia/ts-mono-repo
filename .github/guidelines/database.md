# Database Guidelines

These rules apply to schema, migration, repository, and database access changes.

## Architecture

- Keep database access behind repositories or services.
- Controllers must never access repositories or database clients directly.
- Organize database code by entity or domain.
- Keep schema, relations, types, and repository code close to the owning entity where the existing structure supports it.

## Schema and Migrations

- Use project-standard migrations for schema changes.
- Define schemas, relations, indexes, and constraints explicitly.
- Do not hand-edit generated migrations unless the project convention requires it.
- Make migration intent clear and reversible where practical.

## Queries and Transactions

- Prefer typed query builders over raw SQL.
- Use transactions for multi-step write operations.
- Keep query shape and selected columns intentional.
- Avoid leaking database-specific types across API boundaries unless already established.

## Verification

- Run backend tests or migration validation when available.
- Review generated SQL or migration intent for destructive operations.
- Mention any required manual migration or deployment step.

---

**Last updated:** 2026-05-19
