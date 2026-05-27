/**
 * ============================================================================
 * Footer Component (Global Application Footer)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the global footer component for the Handong ClubHub application.
 * It ensures branding consistency, displays copyright information, and coordinates versioning
 * info across different routes of the web application.
 *
 * [WHAT IT LOOKS LIKE]
 * A sleek, bottom-aligned layout card (`backdrop-blur-md bg-white/40`) with a horizontal rule,
 * displaying the official "ClubHub" logo brand on the left and standard copyright metadata
 * on the right.
 *
 * [WHERE IT IS USED]
 * - Homepage (`app/homepage/page.tsx`) at the bottom of the landing layout.
 * - Extensible to any future main pages (e.g. Clubs, Events, Directory directories).
 *
 * [PROPS CONTRACT]
 * - className: (string) Custom CSS classes to override positioning styles.
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type FooterProps = React.HTMLAttributes<HTMLElement>;

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          // Frosted bento footer panel styling
          'w-full border-t border-white/50 bg-white/40 py-10 backdrop-blur-md',
          className
        )}
        {...props}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs font-semibold text-gray-400 sm:flex-row lg:px-8">
          {/* Footer Logo Title */}
          <span className="font-display text-xl font-black tracking-tight text-[#4F46E5]">
            ClubHub
          </span>
          {/* Copyright branding details */}
          <div>Handong ClubHub © 2026. All rights reserved.</div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
