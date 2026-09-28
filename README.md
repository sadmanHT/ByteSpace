# ByteSpace

ByteSpace is a pixel-accurate frontend implementation of the provided Figma learning-platform design. The project is being built phase-by-phase with strict TypeScript, reusable components, automated tests, accessibility checks, CI, and a Vercel production deployment.

## Design source

Figma is the visual source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Phase 2 is additionally grounded in the native local copy `ByteSpace New Check website (Copy).fig` exported on 2026-09-28. Its SHA-256 is `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`.

## Repository workflow

- Default branch: `main`
- Implementation branch: `feature/bytespace-new`
- Feature development does not happen directly on `main`.
- Final delivery will be submitted as a Pull Request into `main`.

## Stack

- Next.js App Router
- React
- TypeScript in strict mode
- Tailwind CSS
- ESLint + Prettier
- Vitest + React Testing Library
- Playwright
- axe accessibility checks
- GitHub Actions CI

## Prerequisites

- Node.js 22
- pnpm 12.7+

The repository pins the package manager through the `packageManager` field in `package.json`.

## Install

```bash
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

Open http://localhost:3000. The isolated Phase 2 visual foundation is available at http://localhost:3000/design-system.

## Quality commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The complete quality gate must pass before a phase is considered finished.

## Testing strategy

- **Vitest + React Testing Library**: unit and component behavior.
- **Playwright**: route/runtime smoke tests and exact design-token/layout assertions.
- **axe-core + Playwright**: automated accessibility checks.
- **Production build**: framework compilation and route generation.
- **Playwright fixture capture**: visual record of the design-system reference surface.

## Figma audit evidence

- `docs/design-system.md` explains the human-readable design-system findings.
- `docs/figma-source-audit.json` records exact frames, style nodes, grid, geometry frequency, and source-file identity.
- `docs/figma-assets.json` is a generated machine inventory of product-screen raster assets.
- `docs/asset-inventory.md` documents asset provenance and production acceptance rules.

## Current phase

Phase 2 establishes the native-Figma-derived design tokens, typography, grid/layout primitives, asset provenance, accessible interaction primitives, and isolated verification fixture.

## Environment variables

There are currently no required runtime variables. Future variables must be documented in `.env.example`; local secret files must never be committed.
