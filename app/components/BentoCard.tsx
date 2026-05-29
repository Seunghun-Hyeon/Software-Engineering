import { cn } from '@/lib/utils';
import React from 'react';

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[24px] bg-white/70 backdrop-blur-md',
          'shadow-[0px_10px_30px_rgba(0,0,0,0.05)]',
          'ring-1 ring-white/50',
          'flex flex-col p-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoCard.displayName = 'BentoCard';
