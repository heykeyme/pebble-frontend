# Pebble

A no-nonsense place for your notes and tasks.

Pebble is a to-do list web app with a bold, neo-brutalist look. It includes a full sign-up, email verification, and login flow, plus a dashboard for creating, editing, completing, and deleting tasks.

> **Status: front-end prototype.** There is no backend yet. Authentication is simulated and tasks live in memory, so they reset when you refresh the page. See [Demo behaviour](#demo-behaviour) and [Roadmap](#roadmap).

## Features

- **Sign up and log in** with email and password
- **Email verification screen** with a 4-digit code input (auto-advance, backspace navigation, paste support) and a "Resend email" action
- **Task dashboard** showing the total number of items and how many are done
- **Create, edit, delete, and complete** tasks through a modal form
- **Empty state** for when you have no tasks
- **Responsive layout** styled with Tailwind CSS

## Tech Stack

| Area      | Technology                                            |
| --------- | ----------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router)         |
| UI        | [React](https://react.dev) 19                         |
| Language  | [TypeScript](https://www.typescriptlang.org) 5        |
| Styling   | [Tailwind CSS](https://tailwindcss.com) 4             |
| Fonts     | Space Grotesk and Work Sans via `next/font/google`    |
| Linting   | ESLint 9 with `eslint-config-next`                    |

## Getting Started

### Prerequisites

- Node.js (a current LTS release; check the Next.js docs for the minimum version required by Next 16)
- npm (a `package-lock.json` is included)

### Installation

```bash
git clone <your-repository-url>
cd pebble-frontend
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm start`     | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Demo Behaviour

Because there is no backend, the auth flow is mocked so you can see every state:

| Screen       | What to try                                   | Result                                |
| ------------ | --------------------------------------------- | ------------------------------------- |
| Sign up      | Submit any values                             | Goes to the verification screen       |
| Verification | Enter any 4-digit code except `0000`          | Verified, then goes to login          |
| Verification | Enter `0000`                                  | Shows the invalid-code error          |
| Login        | Use any email and password                    | Opens the dashboard                   |
| Login        | Use an email containing the word `unverified` | Shows the unverified-account error    |

The dashboard starts with four sample tasks. Changes are kept in React state only.

## Project Structure

```
src/
├── app/                        # Next.js App Router (layout, global styles, home page)
│   ├── layout.tsx              # Root layout, fonts, and metadata
│   ├── page.tsx                # Renders <TodoApp />
│   └── globals.css             # Tailwind import and shared "neo" utility styles
└── features/
    └── todos/
        ├── components/
        │   ├── TodoApp.tsx         # Root component: owns all state and screen routing
        │   ├── ScreenSignUp.tsx    # Sign-up screen
        │   ├── ScreenVerify.tsx    # Email verification (4-digit code)
        │   ├── ScreenLogin.tsx     # Login screen
        │   ├── ScreenDashboard.tsx # Task list, counts, and empty state
        │   ├── TodoCard.tsx        # A single task card
        │   ├── TodoModal.tsx       # Create/edit task modal
        │   ├── AuthCard.tsx        # Shared wrapper for auth screens
        │   ├── FormField.tsx       # Reusable labelled input
        │   └── BrandBadge.tsx      # Pebble logo badge
        └── types/
            └── todo.ts             # TodoItem, TodoStatus, ScreenState types
```

### How it works

`TodoApp` is a client component that holds all application state and switches between screens using a single `ScreenState` value (`"signup" | "verify" | "login" | "dashboard"`). The screen components are presentational: they receive data and callbacks as props. This keeps the UI easy to follow and straightforward to connect to a real API later.

## Roadmap

- [ ] Connect to a backend API for real authentication and email verification
- [ ] Persist tasks to a database
- [ ] Add form validation and password rules
- [ ] Add tests
- [ ] Use real routes (`/login`, `/signup`, `/dashboard`) instead of in-component screen state

## Note for Contributors

This project uses a recent Next.js version with breaking changes from older releases. Before changing framework-level code, read the relevant guide in `node_modules/next/dist/docs/`. See [AGENTS.md](AGENTS.md) for details.

## License

No license has been specified yet. Add one before distributing this project.
