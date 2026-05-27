/**
 * ============================================================================
 * FeatureTile Component (Bento Feature Showcase Card)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is a highly polished, reusable feature tile component designed to display
 * value propositions or features of the platform in a bento-grid style format.
 * It builds upon the core glassmorphism design language using the reusable Card component.
 *
 * [WHAT IT LOOKS LIKE]
 * A frosted glass card with soft shadows, subtle micro-interactions (lifts up and
 * intensifies shadow on hover), featuring a colorful rounded-xl container for a
 * vector icon, followed by a bold text title and a soft muted gray description.
 *
 * [WHERE IT IS USED]
 * - Homepage: Featured in the 2x2 grid under the "Tired of missing out?" section
 *   to highlight key platform offerings (Alerts, Applications, Scheduling, etc.)
 *
 * [PROPS CONTRACT]
 * - title: (string) The main headline for the feature tile (e.g. "Smart Scheduling").
 * - description: (string) A short explanation of the feature's capability.
 * - icon: (LucideIcon) A reference to a Lucide icon component to display dynamically.
 * - colorClass: (string) Custom CSS classes to style the icon's background, border, and color.
 * - className: (string) Custom CSS classes for general container adjustments.
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BentoCard } from '@/app/components/BentoCard';
import { cn } from '@/lib/utils';

export interface FeatureTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string; // Heading for the feature card
  description: string; // Explanatory body text
  icon: LucideIcon; // Lucide component passed as a prop for vector graphics
  colorClass?: string; // CSS classes for color styling the icon badge (e.g., 'text-indigo-600 bg-indigo-50 border-indigo-100')
}

export const FeatureTile = React.forwardRef<HTMLDivElement, FeatureTileProps>(
  (
    {
      className,
      title,
      description,
      icon: IconComponent,
      colorClass = 'text-indigo-600 bg-indigo-50 border-indigo-100', // Default Indigo badge styling
      ...props
    },
    ref
  ) => {
    return (
      <BentoCard
        ref={ref}
        className={cn(
          // Design rules: frosted glass styling, soft shadows, rounded corners, and translate transition on hover
          'border border-white/60 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.03)]',
          className
        )}
        {...props}
      >
        {/* Colorful icon badge container */}
        <div
          className={cn(
            'mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
            colorClass
          )}
        >
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Feature Title */}
        <h3 className="font-display text-sm font-bold text-gray-900">
          {title}
        </h3>

        {/* Feature Description */}
        <p className="mt-2 font-sans text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </BentoCard>
    );
  }
);

FeatureTile.displayName = 'FeatureTile';
