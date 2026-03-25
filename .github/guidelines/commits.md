# Commit Message Guidelines for ts-mono-repo

This document defines the commit message conventions for this repository. All contributors must follow these rules to ensure a clear and consistent project history.

## Commit Message Format
Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
type(scope?): subject

body (optional)

footer (optional)
```

### Examples
- `feat(auth): add login endpoint`
- `fix(frontend): correct button color`
- `refactor(shared): extract user types`
- `test(backend): add user service tests`
- `docs: update README`

## Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation only changes
- **style:** Formatting, missing semi colons, etc.
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Performance improvement
- **test:** Adding or correcting tests
- **chore:** Maintenance, build, or tooling changes

## Scope
- Use the folder or feature name as the scope (e.g., `auth`, `frontend`, `backend`, `shared`).

## Body & Footer
- Use the body to explain what and why vs. how, if necessary.
- Use the footer for breaking changes or issue references.

## Linting
- Use commit linting tools if configured.

---

**Last updated:** 2026-03-25

