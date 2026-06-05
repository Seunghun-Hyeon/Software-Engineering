/**
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
