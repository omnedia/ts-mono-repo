# Git Commit Instructions

Write a commit message which describes **ALL** changes for **ALL** selected files in summary.
All commit messages must follow the Conventional Commits 1.0.0 specification.

[https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

## Commit Format

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

## Allowed Types

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

## Description Rules

Descriptions must:

- be lowercase
- be written in imperative mood
- be concise
- not end with a period

Good examples:

```text
feat(auth): add refresh token support
fix(api): handle null response payload
perf(search): reduce query allocations
```

Bad examples:

```text
fixed login
changes
updated stuff
```

## Breaking Changes

Breaking changes must be marked either with `!` or a `BREAKING CHANGE:` footer.

Example using `!`:

```text
feat(api)!: remove v1 authentication endpoints
```

Example using footer:

```text
refactor(config): simplify environment loading

BREAKING CHANGE: environment variables now override config file values
```

## Body Guidelines

Add a body when additional context is required.

The body may include:

- reasoning for the change
- implementation details
- migration notes

Example:

```text
feat(cache): introduce ttl support

Allows cache entries to expire automatically to prevent stale data.
```

## Footers

Footers are used for metadata or references.

Examples:

```text
Refs: #123
Reviewed-by: Jane Doe
BREAKING CHANGE: config field apiKey renamed to api_token
```

## Commit Scope

Use a scope when it improves clarity.

Examples:

```text
feat(auth): add oauth login
fix(api): handle missing headers
refactor(parser): simplify token handling
```

Avoid unnecessary scopes.

## Commit Guidelines

Each commit should:

- represent one logical change
- be focused and minimal
- not mix unrelated changes

If a change includes multiple concerns, split it into multiple commits.

## Examples

```text
feat(ui): add dark mode toggle

fix(cache): prevent stale entries after logout

chore(deps): bump eslint to v9

ci(github): run tests on pull requests

revert: remove experimental payment flow
```

## What to Avoid

Do not:

- use vague commit messages
- omit the commit type
- include unrelated changes in a single commit
- write long descriptions in the title

## Pull Request Squash Commits

When squashing commits during a pull request merge, generate a single commit message that summarizes the overall change
and still follows the Conventional Commits format.

## Checklist

Before committing:

- message follows `<type>[scope]: <description>`
- type matches the primary intent
- description is imperative and concise
- breaking changes are clearly marked
- body and footers are included only when useful