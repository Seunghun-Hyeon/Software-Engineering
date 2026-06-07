'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BentoCard } from '@/app/components/BentoCard';

const sections = [
  { id: 'info-collect', title: '1. Information We Collect' },
  { id: 'how-use', title: '2. How We Use Data' },
  { id: 'data-sharing', title: '3. Data Sharing' },
  { id: 'financial', title: '4. Financial Information' },
  { id: 'privacy-rights', title: '5. Privacy Rights' },
  { id: 'cookies', title: '6. Cookies & Security' },
  { id: 'contact', title: '7. Contact Us' },
];

export function PolicyNavigation() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-28 hidden lg:col-span-4 lg:block">
      <BentoCard className="p-8">
        <h3 className="font-display mb-8 text-2xl font-bold text-gray-900">
          Policy Navigation
        </h3>
        <nav className="relative flex flex-col gap-0">
          {/* Vertical Track Line */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

          {sections.map(({ id, title }) => {
            const isActive = activeId === id;
            return (
              <Link
                key={id}
                href={`#${id}`}
                className={cn(
                  '-ml-px border-l-2 py-3 pl-6 font-sans text-sm transition-all hover:border-[#4F46E5] hover:text-[#4F46E5]',
                  isActive
                    ? 'border-[#4F46E5] font-bold text-[#4F46E5]'
                    : 'border-transparent font-medium text-gray-600'
                )}
              >
                {title}
              </Link>
            );
          })}
        </nav>
      </BentoCard>
    </aside>
  );
}
