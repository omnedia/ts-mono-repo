# TypeScript Guidelines

These rules apply to all TypeScript in this repository.

## Type Safety

- Use strict, explicit types for public APIs, DTOs, services, components, and shared contracts.
- Avoid `any`; prefer `unknown`, generics, discriminated unions, or concrete types.
- Use `readonly` where values should not be reassigned.
- Prefer `const` unless reassignment is required.
- Do not weaken existing types to make an implementation easier.

## API Design

- Avoid boolean parameters that toggle behavior; prefer separate functions or named options objects.
- Use optional parameters only when absence is meaningful to the API.
- Prefer exact, responsibility-based names over abbreviations.
- Do not prefix interfaces with `I`.
- Do not suffix classes with `Impl`.

## Error Handling

- Handle expected states directly with validation, guards, or explicit branches.
- Use `try/catch` only for genuinely exceptional failures.
- Every `catch` block must make the handled failure clear through code or a concise comment.

## Imports and Modules

- Prefer existing module boundaries and public exports.
- Do not create barrel files or shared utilities unless the project already uses that pattern nearby.
- Remove imports made unused by your change.

## Documentation

- Add JSDoc for public APIs and complex logic.
- Prefer comments that explain why code exists, not comments that restate what code does.

---

**Last updated:** 2026-05-19
