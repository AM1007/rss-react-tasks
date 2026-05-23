# RSS React Tasks — App State Management

React + TypeScript application for searching and managing Star Trek characters. Features global state management via Redux Toolkit, theme switching via Context API, multi-page selection persistence, CSV export, and a comprehensive test suite.

Built as part of the RSSchool React course.

## Features

- Search Star Trek characters via [STAPI](https://stapi.co)
- URL-driven pagination and search-term persistence in `localStorage`
- Master-detail view via nested routes
- **Multi-select with persistence across pagination** — selections survive page navigation, managed through the Redux store
- **Sticky flyout** with selection count and bulk actions: "Unselect all" and "Download CSV"
- **CSV export** of selected items using native browser APIs (`Blob`, `URL.createObjectURL`, `a.download`) — no external libraries
- **Theme switching** (light / dark) via Context API, persisted in `localStorage`, applied via Tailwind's `dark:` variant
- Application-level error boundary with a manual test trigger
- 91%+ test coverage

## Stack

- React 19
- TypeScript (strict, no `any`, no `ts-ignore`)
- Redux Toolkit 2 + react-redux 9
- React Router 7
- Vite 8
- Tailwind CSS v4 (class-based dark mode via `@custom-variant`)
- Vitest + React Testing Library + jsdom

## Project structure


## State management

- **Redux Toolkit** holds the selected-items collection: `state.selectedItems.items` is a `Record<string, Character>`. The slice exposes `toggle` and `clear` actions plus memoized selectors (`selectSelectedItems`, `selectSelectedCount`, `selectIsSelected`).
- **Context API** holds the theme. `ThemeProvider` syncs theme to `document.documentElement` class via `useEffect` and persists user preference in `localStorage` via the existing `useLocalStorage` hook.

The two systems are intentionally separated: Redux for application state that affects multiple components; Context for cross-cutting infrastructure (theme) that does not benefit from Redux DevTools, middleware, or selector memoization.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — format files with Prettier
- `npm test` — run tests in watch mode
- `npm run test:coverage` — run tests once with coverage report

## Testing

- Test runner: Vitest with jsdom environment
- Component testing: React Testing Library + `@testing-library/jest-dom`
- User interaction simulation: `@testing-library/user-event`
- Coverage provider: `@vitest/coverage-v8`
- All API calls and `localStorage` access are mocked or cleared per test
- Custom `renderWithProviders` helper wraps components in Redux `Provider`, `ThemeProvider`, and `MemoryRouter`
- Reducer logic is tested directly as a pure function; UI integration tests use `preloadedState` to avoid timing issues
- Tests pass automatically on `git push` via Husky pre-push hook

## Deployment

[https://rss-react-tasks.vercel.app](https://rss-react-tasks.vercel.app)

## Branch structure

- `main` — baseline setup
- `class-components` — class components task
- `unit-testing` — Vitest + RTL test suite
- `hooks-and-routing` — function components, router, master-detail
- `app-state-management` — current branch: Redux Toolkit + Context API + CSV export + theme switching

## Project structure

```
src/
  api/                      STAPI client and response mappers
  components/               Reusable presentational components
    ErrorBoundary/
    ErrorMessage/
    Layout/                 Header, Main wrappers
    Loader/
    Pagination/
    Results/                Card, CardList, Results
    Search/
  features/                 Feature-folders (Redux slices, Context, related components)
    selectedItems/          Slice, Flyout, downloadCsv utility, tests
    theme/                  Context, Provider, useTheme hook, ThemeToggle, tests
  hooks/                    useLocalStorage
  pages/                    Route-level components (MainPage, CharacterDetails, About, NotFound)
  store/                    Redux store configuration and typed hooks
  test-utils/               renderWithProviders helper, setup file
  types/                    Domain types (Character, etc.)
```


## State management

- **Redux Toolkit** holds the selected-items collection: `state.selectedItems.items` is a `Record<string, Character>`. The slice exposes `toggle` and `clear` actions plus memoized selectors (`selectSelectedItems`, `selectSelectedCount`, `selectIsSelected`).
- **Context API** holds the theme. `ThemeProvider` syncs theme to `document.documentElement` class via `useEffect` and persists user preference in `localStorage` via the existing `useLocalStorage` hook.

The two systems are intentionally separated: Redux for application state that affects multiple components; Context for cross-cutting infrastructure (theme) that does not benefit from Redux DevTools, middleware, or selector memoization.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run format` — format files with Prettier
- `npm test` — run tests in watch mode
- `npm run test:coverage` — run tests once with coverage report

## Testing

- Test runner: Vitest with jsdom environment
- Component testing: React Testing Library + `@testing-library/jest-dom`
- User interaction simulation: `@testing-library/user-event`
- Coverage provider: `@vitest/coverage-v8`
- All API calls and `localStorage` access are mocked or cleared per test
- Custom `renderWithProviders` helper wraps components in Redux `Provider`, `ThemeProvider`, and `MemoryRouter`
- Reducer logic is tested directly as a pure function; UI integration tests use `preloadedState` to avoid timing issues
- Tests pass automatically on `git push` via Husky pre-push hook

## Deployment

[https://rss-react-tasks.vercel.app](https://rss-react-tasks.vercel.app)

## Branch structure

- `main` — baseline setup
- `class-components` — class components task
- `unit-testing` — Vitest + RTL test suite
- `hooks-and-routing` — function components, router, master-detail
- `app-state-management` — current branch: Redux Toolkit + Context API + CSV export + theme switching
