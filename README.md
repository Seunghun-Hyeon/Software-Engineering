# 🚀 Handong ClubHub

Welcome to the **Handong ClubHub** frontend repository! This project is the central platform for managing and exploring university clubs, built with a focus on modern aesthetics, a dynamic "Glassmorphism & Soft Bento" design, and robust code quality.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge`
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching:** [Axios](https://axios-http.com/)

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.17.0 or higher
- **npm**: v9 or higher (or equivalent `pnpm`/`yarn`)

## 🚀 Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd Software-Engineering
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   _Note: This will also automatically install Husky git hooks via the `prepare` script._

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **View the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

The application strictly follows a **Modern Glassmorphism** and **Soft Bento** design language.

- **Colors & Typography:** Deep Indigo (`#4F46E5`) primary, neon green (`#10B981`) secondary, paired with _Poppins_ and _Inter_ fonts.
- For a complete breakdown of our colors, typography scale, spacing, and component shapes, please refer to the **[`DESIGN.md`](./DESIGN.md)** file in the root directory.

_Note:_ We use a custom utility function `cn()` located at `lib/utils.ts` to safely merge Tailwind classes and avoid CSS conflicts when building our soft, rounded UI components. Always use `cn()` when applying conditional or dynamic Tailwind classes!

## 🛡 Code Quality & Git Hooks

To maintain high standards, this project enforces automated formatting and linting:

- **ESLint & Prettier**: We use strict linting and a custom Prettier config (`.prettierrc`) that automatically sorts Tailwind classes.
- **Husky & lint-staged**: Pre-commit hooks are active. Whenever you run `git commit`, `lint-staged` will automatically run Prettier and ESLint on all staged files.
- If formatting or linting fails and cannot be auto-fixed, your commit will be aborted. Please fix the errors and try committing again.

## 📁 Key Directories

- `/app`: Next.js App Router pages and layouts.
- `/lib`: Utility functions (like our `cn` Tailwind merger).
- `/public`: Static assets (images, icons).

---

_Happy coding! If you run into any issues during setup, feel free to reach out to the team._
