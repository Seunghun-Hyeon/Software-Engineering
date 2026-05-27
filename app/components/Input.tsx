'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, icon, type = 'text', id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
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
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              'w-full rounded-2xl border border-transparent bg-[#F3F4F6] text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none',
              icon
                ? label === 'First Name' || label === 'Last Name'
                  ? 'py-3 pr-3 pl-10'
                  : 'py-3.5 pr-4 pl-11'
                : 'px-4 py-3.5',
              isPassword && 'pr-11',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={props.disabled}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
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
