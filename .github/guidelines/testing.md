# Testing Guidelines

These rules apply when adding, changing, or evaluating tests.

## General Rules

- Tests should verify behavior, not implementation details.
- Add or update tests for bug fixes, validation changes, API behavior, and shared logic.
- Use descriptive test names that read as a clear behavior statement.
- Keep test setup minimal and local to the scenario.
- Do not broaden snapshots or fixtures beyond the requested change.

## Angular Tests

- Use Angular testing utilities and TestBed.
- Test component behavior through inputs, outputs, rendered state, and user-visible effects.
- Prefer testing services and guards directly when UI rendering is not relevant.
- Ask whether component, service, or guard unit tests should be added when Angular production code changes and no test task was requested.

## NestJS Tests

- Use Jest for unit and integration tests.
- Test controllers through their public contract and keep business logic assertions focused on services.
- Mock external boundaries such as repositories, network clients, and infrastructure.
- Include validation and authorization cases when those behaviors change.

## Verification

- Run the narrowest relevant test command first.
- Run lint or typecheck when tests do not cover the changed surface.
- If tests cannot be run, state the exact missing command, dependency, or environment blocker.

---

**Last updated:** 2026-05-19
