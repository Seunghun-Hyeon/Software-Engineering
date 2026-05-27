import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'active';
}

export function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variant === 'default' &&
          'bg-gray-100 text-gray-700 ring-1 ring-gray-200 ring-inset',
        variant === 'active' &&
          'bg-secondary/10 text-secondary ring-secondary/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] ring-1 ring-inset',
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
