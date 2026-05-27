'use client';

/**
 * ============================================================================
 * Input Component (Form Field Text/Password Input Control)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the standard, reusable text input component. It automatically handles
 * top-aligned form labels, left-side helper icons, and provides a built-in
 * show/hide toggle trigger button for password input fields.
 *
 * [WHAT IT LOOKS LIKE]
 * A clean, rounded input bar (16px border-radius) with a light cool-gray fill
 * (#F3F4F6). On focus, the background turns to pure white, and an ambient
 * 2px indigo glow shadow outlines the input boundary (focus:ring-[#4F46E5]).
 *
 * [WHERE IT IS USED]
 * - Email / Password entry fields (login/signup pages)
 * - Hero section search bar (homepage)
 * - Newsletter subscribe email forms (footer)
 * - Custom query filter inputs
 *
 * [PROPS CONTRACT]
 * - label: (string) Optional text label printed above the input field.
 * - icon: (ReactNode) Optional Lucide helper icon displayed on the left inside the input.
 * - type: (string) Input type attribute (text, email, password, etc.).
 * - className: (string) Used for custom CSS overrides (e.g. transparent background).
 * - All standard HTML input attributes (placeholder, value, onChange, etc.)
 */

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

// Define the properties contract for our Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional: Displays a text label above the input
  icon?: React.ReactNode; // Optional: Renders an icon inside the input on the left
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, type = 'text', id, ...props }, ref) => {
    // Password visibility toggle state
    const [showPassword, setShowPassword] = useState(false);

    // Check if the input field is a password field
    const isPassword = type === 'password';

    // Determine target input type depending on password toggle state
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5 text-left">
        {/* Render the label block if provided */}
        {label && (
          <label
            htmlFor={id}
            className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Render the left icon block if provided */}
          {icon && (
            <span
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 flex items-center text-gray-400',
                label === 'First Name' || label === 'Last Name'
                  ? 'pl-3.5'
                  : 'pl-4'
              )}
            >
              {icon}
            </span>
          )}

          {/* Standard Input Element */}
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              // Design rules: rounded-2xl (16px), light gray background, focus transition with indigo border glow
              'w-full rounded-2xl border border-transparent bg-[#F3F4F6] text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none',
              // Dynamic left/right padding adjustments depending on icons
              icon
                ? label === 'First Name' || label === 'Last Name'
                  ? 'py-3 pr-3 pl-10'
                  : 'py-3.5 pr-4 pl-11'
                : 'px-4 py-3.5',
              isPassword && 'pr-11', // Add right padding to prevent text overlap with show/hide button
              className // Merge custom overrides (e.g. overriding bg-cool-gray with bg-transparent for hero search bar)
            )}
            {...props}
          />

          {/* Show/Hide password toggle trigger for password inputs */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={props.disabled}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
