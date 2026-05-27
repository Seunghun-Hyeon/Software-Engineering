import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * CategoryBadge Component (Visual Category / Status Badge Pill)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is a highly flexible, rounded label tag or status chip component. It is
 * designed to classify events, show pricing levels, or highlight active states
 * with consistent branding colors.
 *
 * [WHAT IT LOOKS LIKE]
 * A small, compact pill (rounded-full) with custom background/border accenting
 * depending on the specified variant. It displays uppercase typography in a
 * bold, readable format.
 *
 * [WHERE IT IS USED]
 * - Event category chips (e.g., "ACADEMIC", "ARTS", "COMPUTER" on event cards)
 * - Pricing / Access status tags (e.g., "FREE" or "TICKETED" status chips)
 * - General list categorization markers
 *
 * [PROPS CONTRACT]
 * - label: (string) The tag text printed inside the pill (automatically capitalized).
 * - variant: (string) Visual color variant layout. Supported values:
 *   - 'primary': Solid Indigo background with white text.
 *   - 'secondary': Solid Neon Green background with white text.
 *   - 'emerald': Frosted light green background with green text and border.
 *   - 'rose': Frosted light rose background with pink text and border.
 *   - 'amber': Frosted light gold background with orange text and border.
 *   - 'indigo': Frosted light indigo background with indigo text and border.
 *   - 'violet': Frosted light violet background with violet text and border.
 *   - 'gray': Frosted gray background with slate text and border.
 * - className: (string) Custom styles overrides.
 * - All standard HTML span attributes (style, onClick, etc.)
 */

export interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string; // The label text printed inside the pill badge
  variant?:
    | 'primary'
    | 'secondary'
    | 'emerald'
    | 'rose'
    | 'amber'
    | 'indigo'
    | 'gray'
    | 'violet'; // The visual theme variant
}

export const CategoryBadge = React.forwardRef<
  HTMLSpanElement,
  CategoryBadgeProps
>(({ className, label, variant = 'primary', ...props }, ref) => {
  // Mapping of visual variants to CSS classes
  const variantClasses = {
    primary: 'bg-[#4F46E5] text-white shadow-sm',
    secondary: 'bg-[#10B981] text-white shadow-sm',
    emerald:
      'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm',
    rose: 'bg-rose-50 text-rose-600 border border-rose-100 shadow-sm',
    amber: 'bg-amber-50 text-amber-600 border border-amber-100 shadow-sm',
    indigo: 'bg-indigo-50 border border-indigo-100 text-[#4F46E5] shadow-sm',
    violet: 'bg-violet-50 border border-violet-100 text-violet-600 shadow-sm',
    gray: 'bg-gray-100/70 border border-gray-200/50 text-gray-500 shadow-sm',
  };

  return (
    <span
      ref={ref}
      className={cn(
        // Design standard rules: fully rounded pill (rounded-full), bold capitalized font tracking
        'inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black tracking-wider uppercase',
        variantClasses[variant], // Load target variant color scheme
        className // Merge custom layout overrides if any
      )}
      {...props}
    >
      {/* Render tag text */}
      {label}
    </span>
  );
});

CategoryBadge.displayName = 'CategoryBadge';
