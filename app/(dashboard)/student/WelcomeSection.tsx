'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface WelcomeSectionProps {
  profile?: {
    name?: string | null;
  };
}

export function WelcomeSection({ profile }: WelcomeSectionProps = {}) {
  const { userName } = useAuthStore();

  // Primary source of truth is userName from useAuthStore, fallback to profile.name if provided
  const name = userName || profile?.name;

  return (
    <section className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8">
      <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-4xl">
        {name ? (
          <>
            Welcome back, <span className="text-[#4F46E5]">{name}</span>
          </>
        ) : (
          'Welcome back!'
        )}
      </h1>
    </section>
  );
}
