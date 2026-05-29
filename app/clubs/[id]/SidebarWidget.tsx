import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarWidgetProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  isPrimary?: boolean;
}

export function SidebarWidget({
  title,
  icon: Icon,
  children,
  className,
  isPrimary = false,
}: SidebarWidgetProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]',
        isPrimary
          ? 'bg-[#4F46E5] text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
          : 'border border-white/30 bg-white/70 backdrop-blur-xl',
        className
      )}
    >
      {title && (
        <div className="mb-6 flex items-center gap-3">
          {Icon && (
            <Icon
              className={cn(
                'h-6 w-6',
                isPrimary ? 'text-white/80' : 'text-[#4F46E5]'
              )}
            />
          )}
          <h3
            className={cn(
              'font-display text-xl font-bold tracking-tight',
              isPrimary ? 'text-white' : 'text-gray-900'
            )}
          >
            {title}
          </h3>
        </div>
      )}
      <div
        className={cn(
          isPrimary ? 'text-white/90' : 'text-gray-600',
          'font-sans'
        )}
      >
        {children}
      </div>
    </div>
  );
}
