# ByteSpace

ByteSpace is a pixel-accurate frontend implementation of the provided Figma learning-platform design. The project is being built phase-by-phase with strict TypeScript, reusable components, automated tests, accessibility checks, CI, and a Vercel production deployment.

## Design source

Figma is the visual source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

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
- pnpm 12.6+

The repository pins the package manager through the `packageManager` field in `package.json`.

## Install

```bash
pnpm install --frozen-lockfile
```

During the initial repository bootstrap only, before the lockfile is committed, use:

```bash
pnpm install --no-frozen-lockfile
```

## Development

```bash
pnpm dev
```

Open http://localhost:3000.

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
- **Playwright**: route/runtime smoke tests.
- **axe-core + Playwright**: automated accessibility smoke checks.
- **Production build**: verifies framework compilation and route generation.

## Current phase

Phase 1 establishes architecture, tooling, tests, CI, and a safe runtime scaffold. The temporary foundation page is intentionally not the final ByteSpace design; design-system implementation starts in Phase 2.

## Environment variables

There are currently no required runtime variables. Future variables must be documented in `.env.example`; local secret files must never be committed.
