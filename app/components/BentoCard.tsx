import { cn } from '@/lib/utils';
import React from 'react';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoCard({ children, className, ...props }: BentoCardProps) {
  return (
    <div
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
