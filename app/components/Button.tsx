'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, isLoading, children, disabled, type = 'submit', ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4F46E5] py-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)] disabled:cursor-not-allowed disabled:opacity-75',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear',
            }}
            className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
