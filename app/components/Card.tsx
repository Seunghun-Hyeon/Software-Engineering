import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * Card Component (Glassmorphic Container Card)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the core container component representing our "Soft Bento" grid layout.
 * It encapsulates children in a glassmorphic container box.
 *
 * [WHAT IT LOOKS LIKE]
 * A frosted-glass rectangle with soft diffused drop shadows, extreme border
 * roundedness (24px matching 'rounded-3xl' standards), and a subtle 1px
 * semi-transparent white inner stroke boundary (border-white/40). It provides
 * a 12px backdrop blur that dynamically diffuses any background elements underneath.
 *
 * [WHERE IT IS USED]
 * - Main bento grid tiles (feature tiles, upcoming event cards)
 * - Search bar container overlays
 * - Authentication boxes (login/signup pages)
 * - Dynamic directories and profile listings
 *
 * [PROPS CONTRACT]
 * - children: (ReactNode) Elements to render inside the card padding container.
 * - className: (string) Used for custom CSS overrides (e.g. padding adjustments).
 * - All standard HTML div attributes (onClick, style, etc.)
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // Content inside the card
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Brand Glassmorphism Styling: 24px border radius, frosted fill (bg-white/70), white stroke, ambient shadow, backdrop-blur-md
          'w-full rounded-[24px] border border-white/40 bg-white/70 p-7 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md sm:p-9',
          className // Merge any custom utility overrides (e.g. p-0 or customized heights)
        )}
        {...props}
      >
        {/* Render card content */}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
