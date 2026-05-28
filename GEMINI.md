# Handong ClubHub: Frontend System Instructions

You are an expert full-stack Next.js developer. Your goal is to write clean, modular, and scalable code for the Handong ClubHub platform. You strictly adhere to the following tech stack, design system, and architectural rules.

## 1. Tech Stack

- **Framework:** Next.js (App Router).
- **Language:** TypeScript (Strict mode enabled).
- **Styling:** Tailwind CSS.
- **State Management:** Zustand.
- **Data Fetching:** Axios.
- **Icons & Animation:** Lucide-react, Framer-motion.
- **Utility:** `clsx` and `tailwind-merge` (for dynamic class merging).

## 2. Design System: Futurist / Pixel-Bento

- **Layouts:** Use CSS Grid extensively to create distinct "Bento Box" compartments.
- **Borders & Shadows:** Apply thick solid borders (`border-2 border-black`) and harsh, unblurred drop shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`) to all cards, buttons, and containers.
- **Corner Radii:** Keep corners sharp. Use `rounded-none` or a maximum of `rounded-sm` (0px to 4px).
- **Colors:**
  - Background: Subtle light-gray or grid-paper texture.
  - Primary: Deep indigo / purple-blue.
  - Secondary/Accents: High-contrast neon green or bright orange (for active states and glowing status dots).
- **Typography:** Bold geometric sans-serif for headers, clean sans-serif for body, and a monospace/pixel font for small tags and system statuses.

## 3. Architectural & Coding Rules

- **Server vs. Client:** Default to React Server Components (RSC). Only add the `'use client'` directive at the top of the file when explicitly required (e.g., when using `useState`, `useEffect`, `onClick`, or `Zustand` hooks).
- **TypeScript Strictness:** Never use `any`. Always explicitly define `interface` or `type` for component props and API payloads. Centralize global types in a `@/types` folder.
- **Routing:** Never use `react-router-dom`. Rely exclusively on the Next.js App Router directory structure (`/app`).
- **Component Modularity:** Extract highly repetitive UI elements (like a Bento Card or a Neo-Brutalist Button) into the `/components` folder to keep page files clean.
- **Tailwind Best Practices:** Always use the `cn()` utility function (combining `clsx` and `twMerge`) when passing custom `className` props to reusable components to prevent style conflicts.

## 4. Git & Workflow Enforcement

- Before generating code, verify if the required dependencies are present in `package.json`. If not, provide the installation command first.
- Always write concise, modular functions.
- Do not generate test files (Jest/Cypress) as they are out of scope for this sprint.
- Never use `react-router-dom`; use Next.js native routing.
- Default to React Server Components. Only add `'use client'` when using hooks.
- Never use `any` in TypeScript. Always define explicit types.
- Use `cn()` from `lib/utils.ts` for dynamic class names.

## Project Structure (Next.js App Router)

Follow the official Next.js project structure guidelines: https://nextjs.org/docs/app/getting-started/project-structure

- All application code lives inside the `app` directory
- Reusable components go in `app/components/`
- Route-specific pages use folder-based routing: `app/login/page.tsx` = `/login`
- Dynamic routes use square brackets: `app/directory/[id]/page.tsx` = `/directory/123`
- Never place routable files outside the `app` directory
- Use `store/` in the root for Zustand stores
- Use `lib/` in the root for utility functions like `cn()`

## Current File Structure

app/
api/
categories/route.ts # API for categories
clubs/route.ts # API for clubs
events/route.ts # API for events
components/ # Reusable UI components
Button.tsx # Pill-shaped primary button
BentoCard.tsx # Glassmorphism bento card container
Input.tsx # Form input with indigo focus glow
EventCard.tsx # Upcoming events card
Badge.tsx # Unified label badge (e.g. ACADEMIC, FREE)
FeatureTile.tsx # Feature highlight tile
CategoryCard.tsx # Explore Interests category card
Header.tsx # Sticky frosted-glass navigation bar
Footer.tsx # Page footer with HGU logo and copyright
login/
page.tsx # /login route
signup/
page.tsx # /signup route
clubs/
page.tsx # /clubs directory route
layout.tsx # Global layout
page.tsx # Main homepage route
data/
categories.json # JSON mock data for categories
clubs.json # JSON mock data for clubs
events.json # JSON mock data for events
types/
category.ts # Type for Category
club.ts # Type for Club
event.ts # Type for Event
store/
useAuthStore.ts # Zustand auth store (token, role)
lib/
utils.ts # cn() utility function
axios.ts # Axios base configuration
public/
handongunilogo.png # HGU official logo
handongbackground.png # HGU university background for hero
zizzy.jpg # Zizzy club image
computerscience.jpg # Computer category image

## Backend Connection Rules

When building any page that displays data, always follow these rules to make backend integration easy:

1. Store all static/mock data in the `data/` folder as `.json` files.
2. Next.js API routes (`app/api/*/route.ts`) should read these `.json` files using `fs/promises`.
3. Add a TODO comment inside every API route indicating where to connect the real database:
   // TODO: Replace this file read with actual database calls (e.g., Prisma or Drizzle query to PostgreSQL)
4. Keep data fetching logic separate from UI rendering logic.
5. Use axios from `lib/axios.ts` for all API calls - never use fetch directly.
6. Name data variables clearly so they match what the backend will return:
   - events, clubs, categories, applications — not "data" or "items"
7. Add loading and error states to every section that will fetch data:
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
8. Never hardcode the backend URL — always use the axios instance in `lib/axios.ts`.

## Comments Policy

Every file must have:

- A comment block at the top explaining what the file does
- Inline comments explaining each section
- TODO comments in API routes for real DB connections
- Plain English comments that any developer can understand

## Reusable Components Rules

Before building any new UI element, check app/components/ first to see if it already exists.

When creating a new component:

- Save it in app/components/
- Give it a clear descriptive name (EventCard.tsx not Card2.tsx)
- Add a comment block at the top explaining what it does and where it is used
- Always accept a className prop for customization
- Always define TypeScript interfaces for props
- Never hardcode colors — use the design system tokens

Current reusable components:

- Button.tsx — pill-shaped primary button, used on all pages
- BentoCard.tsx — glassmorphism card container, used on all pages
- Input.tsx — form input with indigo focus glow, used in login/signup forms
- EventCard.tsx — upcoming events card, used on homepage and events page
- Badge.tsx — unified label badge (ACADEMIC, FREE, etc.), used across cards
- FeatureTile.tsx — feature highlight tile, used in "Tired of Missing Out?" section
- CategoryCard.tsx — explore interests category card, used on homepage and directory page
- Header.tsx — sticky frosted-glass navigation bar, used on all pages, accepts activeLabel prop
- Footer.tsx — page footer with HGU logo and copyright, used on all pages

When a UI pattern is used more than once, extract it into a component immediately.
