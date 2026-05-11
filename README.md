# RSS React Tasks — Unit Testing

React + TypeScript application demonstrating class components, lifecycle methods, the Error Boundary pattern, and a comprehensive unit test suite. Built as part of the RSSchool React course.

The application searches Star Trek characters via STAPI, persists the search term in localStorage, handles loading and error states, and includes an application-level error boundary with a test trigger.

## Stack

- React 19 (class components only — no hooks in this task)
- TypeScript
- Vite
- Tailwind CSS v4
- Vitest + React Testing Library + jsdom

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
- All API calls and external dependencies are mocked
- Tests pass automatically on `git push` via Husky pre-push hook

## Deployment

[https://rss-react-tasks.vercel.app](https://rss-react-tasks.vercel.app)

## Branch structure

- `main` — baseline setup (Vite, ESLint, Prettier, Tailwind, Husky)
- `class-components` — class components task implementation
- `unit-testing` — current task: unit test suite for class components

## Branch Information

This branch contains the **Unit Testing** task: a comprehensive Vitest + React Testing Library test suite covering all components from the previous (`class-components`) task. Components themselves were not modified.
