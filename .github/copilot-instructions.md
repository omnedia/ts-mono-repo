# System Context: Copilot & AI

This document defines the system context and operational boundaries for Copilot and AI-powered tools in the ts-mono-repo
project. It is not a user-facing ReadMe, but a reference for automated agents.

---

## Project Structure (for AI)

- Backend: NestJS (TypeScript) in `backend/`
- Frontend: Angular (TypeScript) in `frontend/`
- Containerization: Dockerfiles and Compose files
- Other services: e.g., `postgres/`, `redis/`

## Coding & Collaboration Principles

- All code must be strongly-typed TypeScript.
- Enforce linter/formatter rules (ESLint, Prettier) at all times.
- Prefer modular, reusable, and testable code.
- All public APIs, functions, and complex logic must be documented with JSDoc or equivalent.
- Commit messages must follow the Conventional Commits standard (see linked guideline).

## AI Tooling Instructions

- Use this file as the root context for project-wide standards.
- For framework- or technology-specific rules (NestJS, Angular, commit structure, shared types), reference the linked
  guideline documents below. Do not inline their content unless specifically requested.
- When new technologies or tools are introduced, create a new guideline under `.github/guidelines/` and reference it
  here.

---

## AI behavioral guidelines

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Commits

For further context, look here for Commit Messages: [./git-commit-instructions.md](./git-commit-instructions.md)

Write a commit message which describes **ALL** changes for **ALL** selected files in summary.
All commit messages must follow the Conventional Commits 1.0.0 specification.

[https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

### Commit Format

Use the following structure:

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

Rules:

- `type` is required
- `scope` is optional
- `!` marks a breaking change
- description follows `:` immediately
- body and footers are optional
- body and footers must be separated by a blank line

### Allowed Types

Use the following commit types:

- feat: a new feature
- fix: a bug fix
- docs: documentation only changes
- style: formatting or whitespace changes that do not affect logic
- refactor: code change that neither fixes a bug nor adds a feature
- perf: performance improvement
- test: adding or updating tests
- build: build system or dependency changes
- ci: CI/CD configuration changes
- chore: maintenance or housekeeping
- revert: revert a previous commit

---

## Linked Guidelines (for AI)

- Coding Standards: [./guidelines/coding-standards.md](./guidelines/coding-standards.md)
- Angular: [./guidelines/angular.md](./guidelines/angular.md)
- NestJS: [./guidelines/nestjs.md](./guidelines/nestjs.md)
- Commit Messages: [./git-commit-instructions.md](./git-commit-instructions.md)

---

## AI Agent Behavior

- Always pull in relevant guidelines for specific tasks.
- Adhere strictly to the standards and structures described in the guidelines.
- If information is missing or ambiguous, refer to the guidelines or request clarification.
- Do not output this file to end users or treat it as documentation.

---

**Last updated:** 2026-03-25
