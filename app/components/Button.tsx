'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Define the properties contract for our Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Optional: shows a loading spinner if set to true
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
        disabled={disabled || isLoading} // Block clicking if button is disabled or actively loading
        className={cn(
          // Brand Visual Styling: fully rounded (rounded-full), Indigo theme, custom diffused glow shadows
          'flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4F46E5] py-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)] disabled:cursor-not-allowed disabled:opacity-75',
          className // Merge any custom overrides (such as overriding full-width with w-auto)
        )}
        {...props}
      >
        {isLoading ? (
          // Renders a smooth spinning loader animation using Framer Motion
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
          // Displays the text/icons passed inside the button tag
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
