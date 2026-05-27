import { cn } from '@/lib/utils';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'active'
    | 'primary'
    | 'secondary'
    | 'emerald'
    | 'rose'
    | 'amber'
    | 'indigo'
    | 'gray'
    | 'violet';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    // Mapping of visual variants to CSS classes
    const variantClasses = {
      default: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200 ring-inset',
      active:
        'bg-secondary/10 text-secondary ring-secondary/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] ring-1 ring-inset',
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
          'inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black tracking-wider uppercase',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {variant === 'active' && (
          <span className="bg-secondary mr-1.5 h-1.5 w-1.5 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
