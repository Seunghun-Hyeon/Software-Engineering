# Handong ClubHub: System Instructions

You are an expert full-stack engineer. Write clean, modular, and scalable code.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Zustand.
- **Backend:** Node.js, Express, Supabase (PostgreSQL).

## Design System (Modern Glassmorphism + Soft Bento)

- **Style:** Glassmorphism meets Soft Bento. Frosted glass layers, soft shadows, rounded shapes.
- **No solid borders.** Use semi-transparent white inner strokes only if needed.
- **No sharp corners.** Minimum 16px border radius. Bento cards use 24px (rounded-3xl).
- **Buttons:** Pill-shaped (rounded-full). Primary uses #4F46E5 with glow on hover.
- **Shadows:** Soft and diffused only. `0px 10px 30px rgba(0,0,0,0.05)`. No hard shadows.
- **Glass effect:** backdrop-blur-md with rgba(255,255,255,0.7) fill.
- **Primary:** #4F46E5 (Indigo)
- **Secondary:** #10B981 (Neon Green)
- **Background:** #F9FAFB or #FFFFFF
- **Fonts:** Poppins for headlines, Inter for body and labels.

## Architectural Rules

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
components/ # Reusable UI components
Button.tsx # Pill-shaped primary button
Card.tsx # Glassmorphism card container
Input.tsx # Form input with indigo focus glow
EventCard.tsx # Upcoming events card
CategoryBadge.tsx # Event category badge (ACADEMIC, FREE, etc.)
FeatureTile.tsx # Feature highlight tile
CategoryCard.tsx # Explore Interests category card
login/
page.tsx # /login route
signup/
page.tsx # /signup route
homepage/
page.tsx # /homepage route
layout.tsx # Global layout
page.tsx # Landing page (redirects to /login)
store/
useAuthStore.ts # Zustand auth store (token, role)
lib/
utils.ts # cn() utility function
public/
handongunilogo.png # HGU official logo
handongbackground.png # HGU university background for hero
zizzy.jpg # Zizzy club image
computerscience.jpg # Computer category image

## Backend Connection Rules

When building any page that displays data, always follow these rules to make backend integration easy:

1. Store all static/mock data in clearly named arrays at the TOP of the file
2. Add a TODO comment above every data array with the exact API endpoint:
   // TODO: Replace with GET /api/events when backend is connected
3. Keep data fetching logic separate from UI rendering logic
4. Use axios from lib/axios.ts for all API calls - never use fetch directly
5. Name data variables clearly so they match what the backend will return:
   - events, clubs, categories, applications — not "data" or "items"
6. Add loading and error states to every section that will fetch data:
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
7. Never hardcode the backend URL — always use the axios instance in lib/axios.ts

## Comments Policy

Every file must have:

- A comment block at the top explaining what the file does
- Inline comments explaining each section
- TODO comments above all static data arrays
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
- Card.tsx — glassmorphism card container, used on all pages
- Input.tsx — form input with indigo focus glow, used in login/signup forms
- EventCard.tsx — upcoming events card, used on homepage and events page
- CategoryBadge.tsx — category label badge (ACADEMIC, FREE, etc.), used on event cards
- FeatureTile.tsx — feature highlight tile, used in "Tired of Missing Out?" section
- CategoryCard.tsx — explore interests category card, used on homepage and directory page
- Navbar.tsx — sticky frosted-glass navigation bar, used on all pages, accepts activeLabel prop
- Footer.tsx — page footer with HGU logo and copyright, used on all pages

When a UI pattern is used more than once, extract it into a component immediately.
