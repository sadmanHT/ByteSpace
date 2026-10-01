# Contributing to ByteSpace

Thanks for helping improve ByteSpace. The repository is intentionally held to the same design, accessibility, and verification standards used for the production release.

## Development prerequisites

- Node.js <code>>=22.14.0 <23</code>
- pnpm <code>>=12.7.0 <13</code>

Install dependencies with:

```bash
pnpm install --frozen-lockfile
```

Start the development server with:

```bash
pnpm dev
```

## Branch workflow

Create a focused branch from the latest <code>main</code>. Prefer descriptive names such as:

- <code>feat/course-bookmarks</code>
- <code>fix/mobile-course-overflow</code>
- <code>docs/update-walkthrough</code>
- <code>test/review-filter-coverage</code>

Keep unrelated refactors out of feature/fix pull requests whenever possible.

## Required checks

Before requesting review, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

A pull request should not be considered ready while any required check is failing.

## UI contribution expectations

For visual changes:

1. Verify the affected route at desktop and narrow/mobile widths.
2. Check keyboard navigation and visible focus.
3. Confirm there is no new horizontal overflow.
4. Preserve semantic labels/state for interactive controls.
5. Compare against the design source when changing a Figma-derived surface.
6. Update or add automated coverage for behavior changes.
7. Refresh production screenshots after the change is released.

## Architecture expectations

- Keep route composition in <code>src/app</code>.
- Prefer reusable primitives over route-specific duplication.
- Keep immutable fixture/domain data separate from presentation.
- Keep filtering, sorting, pagination, route, review, and share behavior in deterministic helpers where practical.
- Add client components only where browser interaction requires them.
- Do not introduce fake backend behavior, fake authentication success, or fake persistence.

## Pull requests

Use the repository pull-request template. A strong PR explains:

- what changed and why,
- affected routes/components,
- testing performed,
- visual/accessibility impact,
- any deliberate limitations,
- screenshots when the UI changed.

Small, reviewable commits are preferred. Commit messages should be imperative and scoped when useful, for example <code>fix: prevent course grid overflow at 320px</code>.

## Documentation

Update README/docs when a change affects setup, architecture, routes, deployment, supported behavior, or known boundaries.

The production screenshot workflow can be run manually from GitHub Actions after deployment to refresh the README/walkthrough gallery.

## Security

Do not commit credentials, tokens, private keys, or local environment files. See <code>SECURITY.md</code> for vulnerability reporting.
