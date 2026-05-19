# CI/CD Guidelines

These rules apply to GitHub Actions, repository automation, dependency update configuration, and CI-adjacent package scripts.

## Workflow Changes

- Keep workflows focused on one responsibility.
- Use existing job names, script names, and environment conventions where possible.
- Do not introduce secrets, permissions, or external services without justification.
- Pin actions to stable versions already used by the repository when possible.
- Preserve disabled workflow files unless the user asks to enable them.

## Package Scripts

- Reuse existing package scripts before adding new ones.
- Keep root scripts orchestration-focused.
- Do not change lockfiles unless dependency changes require it.

## Verification

- Validate workflow YAML syntax where tooling is available.
- Check that referenced package scripts exist.
- Check that referenced secrets and environment variables are documented or already used.
- If workflow validation cannot run locally, review paths, triggers, and commands manually and state that limitation.

---

**Last updated:** 2026-05-19
