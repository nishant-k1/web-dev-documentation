# Copilot Instructions for web-dev-documentation

## Project Overview
This is a comprehensive documentation and study resource for modern web development. The workspace is organized by topic, covering JavaScript, TypeScript, Browser Internals, React, Redux, API Integration, DevOps, and more. Each topic is a directory with focused markdown files, often grouped by subtopic or concept.

## Key Structure & Navigation
- **Topic Folders:** Each major area (e.g., `04. TypeScript/`, `05. Browser Internals/`, `06. React/`) contains subfolders and markdown files for granular concepts.
- **Index Files:** Many folders use `index.md` to provide overviews or entry points for the topic.
- **Naming:** Files and folders are prefixed with numbers for ordering and easy navigation.
- **No central README:** Each topic is self-contained; look for `index.md` or the most specific `.md` file for guidance.

## Patterns & Conventions
- **Patterns & Architectures:** High-level design patterns are in `13. Patterns & Architectures/` and `12. Design Patterns/`. Use these as references for system-level or reusable code patterns.
- **TypeScript Practices:** TypeScript concepts are deeply documented in `04. TypeScript/`, with files like `any vs unknown.md`, `type vs interface.md`, and more. Use these for type system guidance and examples.
- **Browser Internals:** Deep dives into browser mechanics are in `05. Browser Internals/`, organized by lifecycle and resource type.
- **DevOps & Tooling:** Build, deployment, and CI/CD practices are in `14. Tooling & Ecosystem/` and `18. Deployment & DevOps/`. These cover environment variables, deployment strategies, and build tool concepts.

## How to Extend or Contribute
- **Add new topics as numbered folders at the root.**
- **Add new concepts as numbered markdown files within the relevant topic.**
- **Update or create `index.md` for new sections to provide an overview.**
- **Follow the existing naming and ordering conventions for consistency.**

## Examples
- For a new TypeScript utility type, add a file like `19. Utility Types - MyType.md` in `04. TypeScript/`.
- For a new deployment strategy, add a file in `18. Deployment & DevOps/2. Deployment Strategies/` and update the `index.md`.

## Integration Points
- This is a documentation-only repo; there is no build, test, or runtime code to execute.
- No external dependencies or code integration required.

## Quick Reference
- **Patterns:** `13. Patterns & Architectures/`, `12. Design Patterns/`
- **TypeScript:** `04. TypeScript/`
- **Browser:** `05. Browser Internals/`
- **DevOps:** `18. Deployment & DevOps/`, `14. Tooling & Ecosystem/`

---
For more, see the relevant `index.md` in each topic folder.
