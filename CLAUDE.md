# CLAUDE.md

## Project Overview

**Book-Stonks** is a book reading tracker web application built with React. Users can monitor reading progress across multiple books, tracking pages read per day, total progress, and overall reading statistics. The project is in early-stage development with mock data and no backend.

## Tech Stack

- **Framework:** React 19 with TypeScript (strict mode)
- **Routing:** TanStack Router (file-based route config in `src/page-config.tsx`)
- **State Management:** Zustand 5
- **UI Library:** Chakra UI 3 + Emotion (CSS-in-JS)
- **Data Fetching:** TanStack Query (installed, not yet in use)
- **Build Tool:** Rsbuild (Rust-based bundler)
- **Package Manager:** Yarn
- **Linting:** ESLint 9 (flat config) with TypeScript and React plugins
- **Formatting:** Prettier (single quotes)

## Project Structure

```
src/
├── index.tsx                  # App entry point (React root, providers, router)
├── page-config.tsx            # TanStack Router route definitions
├── App.css                    # Global styles
├── env.d.ts                   # TypeScript ambient declarations
├── pages/                     # Page-level components (route targets)
│   ├── MainPage.tsx           # Root layout with navigation + <Outlet />
│   └── HomePage/
│       ├── HomePage.tsx
│       └── HomePage.css
├── containers/                # Smart/stateful components with business logic
│   ├── BookCard/
│   │   ├── BookCard.tsx
│   │   └── store-book-card.ts
│   ├── BookOverall/
│   │   ├── BookOverall.tsx
│   │   └── store-book-overall.ts
│   └── DemoCard/
│       └── DemoCard.tsx
└── components/
    └── ui/                    # Chakra UI wrapper/provider components
        ├── provider.tsx
        ├── color-mode.tsx
        ├── toaster.tsx
        └── tooltip.tsx
```

## Commands

```bash
yarn dev          # Start dev server at http://localhost:3000
yarn build        # Production build (outputs to dist/)
yarn preview      # Preview production build locally
yarn lint         # Run ESLint (note: script references old path, may need fix)
yarn format       # Run Prettier (note: script references old path, may need fix)
```

**Note:** The `lint` and `format` scripts in `package.json` currently reference `pet-playground-2` instead of the correct source path. These should target `src/` or `.` to work properly.

## Code Conventions

### File Organization
- **Pages** (`src/pages/`): Route-level components, one per route
- **Containers** (`src/containers/`): Smart components with state and business logic, each in its own directory
- **Components** (`src/components/`): Reusable, presentational UI components
- CSS files are co-located with their component in the same directory

### Naming
- **PascalCase** for React component files and directories (`BookCard.tsx`, `HomePage/`)
- **camelCase** for non-component files
- Zustand store files: `store-<feature>.ts` (e.g., `store-book-card.ts`)

### Component Patterns
- Functional components only (no class components)
- Props typed with TypeScript `type` declarations (not interfaces)
- Default exports for page components, named exports for container/UI components

### State Management (Zustand)
- Stores created with `create()` from Zustand
- Custom hooks using `useShallow` for selective subscriptions to prevent unnecessary re-renders
- State actions defined as standalone exported functions (not inside the store), using `getState()`/`setState()`

### Styling
- Chakra UI components for layout and design tokens
- Co-located CSS files for component-specific styles
- Inline Chakra props for spacing, colors, and responsive layout

### TypeScript
- Strict mode enabled (`strict: true`)
- `noUnusedLocals` and `noUnusedParameters` enforced
- Path alias: `@/*` maps to `./src/*`
- Target: ES2020, module: ESNext

### Routing
- Routes defined in `src/page-config.tsx` using TanStack Router's `createRoute` API
- `MainPage` is the root layout component with `<Outlet />` for child routes
- Current routes: `/` (HomePage), `/about`

## Configuration Files

| File | Purpose |
|---|---|
| `rsbuild.config.ts` | Build configuration (React plugin) |
| `tsconfig.json` | TypeScript compiler options (strict, path aliases) |
| `eslint.config.mjs` | ESLint flat config (TS + React Hooks + React Refresh) |
| `.prettierrc` | Prettier config (`singleQuote: true`) |
| `.yarnrc` | Yarn package manager config |

## Current Limitations

- No backend or database; all data is hardcoded mock data in `HomePage.tsx`
- No testing framework configured
- No CI/CD or deployment pipeline
- No environment variable configuration
- TanStack Query is installed but not yet integrated
- Some UI text is in Russian (mixed with English)
