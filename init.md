# 🚀 Handong ClubHub: Frontend Initialization Guide

Follow these steps sequentially in your terminal to bootstrap the Next.js frontend with all required dependencies, strict linting rules, and pre-commit hooks for the Handong ClubHub project.

## Step 1: Scaffold Next.js & Install Dependencies

Run the following commands to create the app and install all necessary UI, state management, and formatting libraries.

_(Note: When prompted by `create-next-app`, select **Yes** for TypeScript, ESLint, Tailwind CSS, App Router, and the `@/` import alias)._

```bash
# 1. Create the base project
npx create-next-app@latest clubhub-client
cd clubhub-client

# 2. Install Core Dependencies
npm install zustand axios framer-motion lucide-react clsx tailwind-merge

# 3. Install QA & Formatting Tools
npm install -D prettier prettier-plugin-tailwindcss husky lint-staged

```

## Step 2: Configure Prettier

Create a `.prettierrc` file in your root directory to enforce the team's formatting standards (this also enables automatic Tailwind class sorting).

Run this command to generate the file instantly:

```bash
echo '{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}' > .prettierrc

```

## Step 3: Setup Husky & Lint-Staged

This creates a pre-commit hook that automatically formats your code and checks for ESLint errors every time you run `git commit`.

**1. Initialize Husky:**

```bash
npx husky install
npm pkg set scripts.prepare="husky install"

```

**2. Configure `lint-staged`:**
Open your `package.json` file and paste this block at the very bottom, right before the final closing brace `}`:

```json
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }

```

**3. Add the pre-commit hook:**

```bash
npx husky add .husky/pre-commit "npx lint-staged"

```

## Step 4: Create the Tailwind Utility Function

To safely merge Tailwind classes (crucial for building the custom Neo-Brutalist components without CSS conflicts), we need a `cn` utility function.

**1. Create the `lib` directory:**

```bash
mkdir -p lib

```

**2. Create `lib/utils.ts`:**
Open your code editor, create `lib/utils.ts`, and paste the following code:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
