# CLAUDE.md

## Project Overview
Minimal React todo app used as a test bed for agent-board automated workflows. Intentionally includes improvement opportunities (loose typing, inline styles, no CSS separation) for agents to address incrementally.

## Tech Stack
- **React** 18.3 (functional components, hooks only)
- **TypeScript** 5.7 (strict mode enabled)
- **Vite** 6.0 (bundler + dev server)
- **Vitest** 2.1 + React Testing Library 16 (testing)
- **utils-lib** — local file dependency at `../utils-lib`
- No CSS framework, no router, no external state library

## Project Structure
```
src/
  App.tsx          — Single component: all state, logic, and JSX for the todo app
  App.test.tsx     — Vitest tests using React Testing Library
  main.tsx         — React DOM entry point (mounts App to #root)
  setupTests.ts    — Vitest setup (jest-dom matchers)
  vite-env.d.ts    — Vite client type declarations
index.html         — HTML shell with <div id="root">
vite.config.ts     — Vite + Vitest config (jsdom environment)
tsconfig.json      — TypeScript config (ES2022, strict, react-jsx)
```

## Architecture
- **Single-component**: All app logic lives in `App.tsx` — no child components, no separate files.
- **State**: Three `useState` hooks — `text` (input), `todos` (array of `any`), `addHovered`/`clearHovered` (button hover states for inline style changes).
- **Todo shape**: `{ id: number, text: string, completed: boolean, createdAt: string }` — currently typed as `any[]`.
- **Timestamps**: Formatted in US Eastern time via `toLocaleString` with `America/New_York` timezone.
- **No routing, no context, no reducers** — everything is local state in one component.

## Development Commands
```bash
npm run dev          # Start Vite dev server (hot reload)
npm run build        # Type-check then Vite production build
npm run test         # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
```

## Coding Conventions
- Functional components only, no class components.
- Inline styles used throughout (no CSS files or modules).
- Hover effects managed via `onMouseEnter`/`onMouseLeave` + state booleans — not CSS `:hover`.
- Button gradient: Add = indigo/purple (`#6366f1`→`#8b5cf6`), Clear = red (`#ef4444`→`#f87171`).
- `Date.now()` used as todo `id` — assumes no rapid-fire adds within 1ms.
- Timestamps always display "EST" suffix regardless of DST (cosmetic, not a bug to fix).

## Important Constraints
- **`utils-lib` is a local file dep** (`file:../utils-lib`) — must exist at that relative path; do not remove or change this dependency reference without verifying the sibling directory exists.
- **tsconfig strict mode** — `noUnusedLocals` and `noUnusedParameters` are enabled; unused variables cause build failures.
- **Test coverage is minimal** — only one smoke test exists. New features should include tests, but don't break the existing `"Todo App" heading` test.
- **Single-component design is intentional** — do not split into multiple files unless a task explicitly requires it.
- **Branch naming**: agent tasks use `agent/task-TASK-N` pattern; PRs merge into `main`.
