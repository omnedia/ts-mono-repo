# AI Behavior Rules

These rules apply to all AI work in this repository.

## Mandatory Workflow

Before implementation:

1. Identify affected files, paths, technologies, and change types.
2. Resolve required guidelines with [routing.md](./routing.md) and [routing.yaml](./routing.yaml).
3. Read all required guidelines.
4. State assumptions when ambiguity remains.
5. Implement minimally.
6. Verify with the checks required by the loaded guidelines.
7. Ensure the final change still conforms to every loaded guideline.

Never claim completion without either running the required verification or explicitly stating why it could not be run.

## Rule Precedence

Apply rules in this priority order:

1. Direct user instructions
2. Task-specific guidelines
3. Technology guidelines
4. Coding standards
5. General AI behavior

If rules conflict:

- Higher priority wins.
- Mention the conflict explicitly.
- Do not silently ignore any loaded guideline.

## Execution Principles

- Do not assume missing requirements. Ask when ambiguity blocks correct implementation.
- Surface tradeoffs when there are multiple plausible approaches.
- Prefer the minimum code that solves the request.
- Every changed line should trace directly to the user's request.
- Match existing style even when another style is personally preferred.
- Clean up only imports, variables, files, or functions made unused by your own change.

## Forbidden Behaviors

- Do not introduce abstractions for single consumers.
- Do not create generic utilities without reuse evidence.
- Do not rename existing symbols unless required.
- Do not move files unless requested or required by the task.
- Do not introduce dependencies without justification.
- Do not change formatting outside the touched scope.
- Do not rewrite working code for style preferences.
- Do not refactor adjacent code unless it is required for the requested change.
- Do not delete unrelated dead code; mention it instead.
- Do not skip guideline loading because the task appears simple.

## Change Scope Constraints

- Minimize changed files.
- Prefer localized edits.
- Avoid cross-module refactors unless required.
- Preserve existing architecture unless the task requires structural change.
- Add tests in proportion to the risk and blast radius of the change.

---

**Last updated:** 2026-05-19
