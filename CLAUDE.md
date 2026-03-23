# CLAUDE.md

## Project Overview
Minimal React todo app used as an agent board test harness. Features: add/delete todos, toggle completion, clear input, timestamps per item, incomplete count display. Intentionally simple — designed for automated agents to extend.

## Tech Stack
- **React 18.3** with TypeScript 5.7, Vite 6.0
- **Testing**: Vitest 2.1 + @testing-library/react 16 + jsdom
- **Local dep**: `utils-lib` (`file:../utils-lib`) — must exist in parent directory
- No CSS framework, no state management library, no linting tool (ESLint not configured)

## Project Structure
```
src/
  main.tsx          # Bootstraps React into #root
  App.tsx           # Entire app: all state, logic, and UI in one component
  App.test.tsx      # Vitest component tests
  setupTests.ts     # Imports @testing-library/jest-dom matchers
  vite-env.d.ts     # Vite client type reference
index.html          # HTML entry point
vite.config.ts      # Vite config with React plugin + Vitest (jsdom, globals)
tsconfig.json       # strict, ES2022, react-jsx, noUnusedLocals/Params
```

## Architecture
Single-component monolith — all logic lives in `App.tsx`:
- **State**: `todos: any[]` (id, text, completed, createdAt), `text` (input), `addHovered`/`clearHovered` (button states)
- **Todo shape**: `{ id: number, text: string, completed: boolean, createdAt: string }`
- **Timestamps**: formatted with `America/New_York` timezone via `Intl.DateTimeFormat`
- **Styling**: 100% inline React style objects — no CSS files, no class names
- **Derived**: `remaining` = count of `!todo.completed`

Data flow: input change → `setText` → "Add" click → `addTodo()` appends to array + clears input → render list.

## Development Commands
```bash
npm run dev          # Start Vite dev server (hot reload)
npm run build        # tsc --noEmit (type check) + vite build → dist/
npm run test         # vitest run (single pass)
npm run test:watch   # vitest (watch mode)
```

## Coding Conventions
- **Components**: `export default function` with PascalCase names
- **Handlers**: camelCase inline definitions (`addTodo`, `toggleTodo`, `deleteTodo`)
- **Boolean state**: prefixed with context (`addHovered`, `clearHovered`)
- **Tests**: colocated with source (`App.test.tsx` beside `App.tsx`); use `screen`, `fireEvent`, `render` from testing-library; globals enabled (no imports needed for `describe`/`it`/`expect`)
- **Typing**: currently uses `any[]` for todos — typed improvements are welcome but must preserve the existing shape

## Important Constraints
- **TypeScript strict mode** is on: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` — new code must satisfy these or `npm run build` fails
- **`utils-lib`** is a local file dependency at `../utils-lib` — do not remove or alter this dep; it must be present for `npm install` to succeed
- **No key warnings**: todos use `todo.id` as React list key — always include unique `id` when adding todo items
- **Input validation**: `addTodo` trims text and returns early if empty — preserve this guard
- **Timezone**: timestamps are hardcoded to `America/New_York` — do not remove without updating tests
- **Test setup**: `src/setupTests.ts` must remain as the Vitest setup file (configured in `vite.config.ts`)
- **Single-file architecture**: the app is intentionally a monolith; extracting components is fine but keep `App.tsx` as the root export
