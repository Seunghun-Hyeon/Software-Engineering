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

## 2. Design System: Modern Glassmorphism & Soft Bento

- **Layouts:** Use CSS Grid extensively to create distinct "Soft Bento" compartments.
- **Borders & Shadows:** Avoid solid borders. Use translucent glass layers (`backdrop-blur-md bg-white/70`) and soft diffused shadows (like `shadow-[0px_10px_30px_rgba(0,0,0,0.05)]`) instead of harsh shadows.
- **Corner Radii:** Embrace extreme roundedness. Use large radii (`rounded-2xl` or `rounded-[24px]`) for bento cards, and pill-shapes (`rounded-full`) for interactive elements like buttons and chips. Sharp 90-degree angles are strictly forbidden.
- **Colors:**
  - Background: Pure white or subtle cool-gray (`#F9FAFB`).
  - Primary: Deep indigo (`#4F46E5`) for primary actions and branding.
  - Secondary/Accents: High-contrast dark neon green (`#10B981`) for active states and glow effects.
- **Typography:** Poppins for expressive headings and Inter for utilitarian body text, labels, and small tags.

## 3. Architectural & Coding Rules

- **Server vs. Client:** Default to React Server Components (RSC). Only add the `'use client'` directive at the top of the file when explicitly required (e.g., when using `useState`, `useEffect`, `onClick`, or `Zustand` hooks).
- **TypeScript Strictness:** Never use `any`. Always explicitly define `interface` or `type` for component props and API payloads. Centralize global types in a `@/types` folder.
- **Routing:** Never use `react-router-dom`. Rely exclusively on the Next.js App Router directory structure (`/app`).
- **Component Modularity:** Extract highly repetitive UI elements (like a Bento Card or a Pill Button) into the `/components` folder to keep page files clean.
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
(auth)/ # Route group for auth pages
login/
page.tsx # /login route
signup/
page.tsx # /signup route
(dashboard)/ # Route group for dashboard pages
manager/
dashboard/
page.tsx # /manager/dashboard route
AnalyticsTab.tsx
ApplicationsTab.tsx
DashboardTab.tsx
MembersTab.tsx
SettingsTab.tsx
student/
dashboard/
page.tsx # /student/dashboard route
ApplicationsTab.tsx
FavouriteClubsTab.tsx
SavedEventsTab.tsx
WelcomeSection.tsx
api/
categories/
route.ts
clubs/
route.ts
events/
route.ts
clubs/
[id]/
tabs/ # Club detail page tabs
EventsTab.tsx
GalleryTab.tsx
InfoTab.tsx
NewsTab.tsx
OverviewTab.tsx
ClubContent.tsx
HeroProfile.tsx
page.tsx
PostFeed.tsx
Sidebar.tsx
SidebarWidget.tsx
types.ts
page.tsx # /clubs route
components/ # Reusable UI components
Badge.tsx
BentoCard.tsx
Button.tsx
CategoryCard.tsx
ClubFilters.tsx
EventCard.tsx
FeatureTile.tsx
Footer.tsx
Header.tsx
Input.tsx
Pagination.tsx
events/
BentoView.tsx
EventFilters.tsx
page.tsx
StructuredView.tsx
ViewToggle.tsx
homepage/
ExploreInterestsSection.tsx
FeaturesSection.tsx
HeroSection.tsx
UpcomingEventsSection.tsx
favicon.ico
globals.css
layout.tsx
page.tsx # Landing page /
data/
categories.json
clubs.json
events.json
lib/
supabase/
client.ts
middleware.ts
server.ts
axios.ts
utils.ts
store/
useAuthStore.ts
types/
category.ts
club.ts
event.ts
types.ts

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
