'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BentoCard } from './BentoCard';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <BentoCard
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'bg-white/95' : 'bg-white/70 hover:bg-white/90'
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display text-xl font-bold text-gray-900">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'h-6 w-6 text-[#4F46E5] transition-transform duration-300',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 pb-6 leading-relaxed text-gray-600">
          {children}
        </div>
      </div>
    </BentoCard>
  );
}
