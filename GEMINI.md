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
