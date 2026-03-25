# Backend-Frontend Shared Types Guidelines for ts-mono-repo

This document describes how to share types and interfaces between the backend (NestJS) and frontend (Angular) in this monorepo.

## General Principles
- Place all types/interfaces shared between backend and frontend in the `shared/` folder at the root of the repository.
- Use TypeScript for all shared types.
- Only include types that are truly shared (e.g., DTOs, API response types, enums, etc.).
- Do not include backend- or frontend-specific logic in shared files.

## Usage
- Import shared types in both backend and frontend projects using relative paths (e.g., `import { UserDto } from '../../../shared/interfaces'`).
- Keep shared types generic and decoupled from framework-specific features.

## File Structure
- Use a single `interfaces.ts` file for simple projects.
- For larger projects, split types into multiple files by domain or feature.

## Versioning & Changes
- When changing shared types, ensure compatibility with both backend and frontend.
- Document breaking changes in commit messages and PR descriptions.

---

**Last updated:** 2026-03-25

