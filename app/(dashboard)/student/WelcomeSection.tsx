'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { ArrowRightLeft } from 'lucide-react';

interface WelcomeSectionProps {
  profile?: {
    name?: string | null;
    major?: string | null;
  };
}

export function WelcomeSection({ profile }: WelcomeSectionProps = {}) {
  const router = useRouter();
  const userName = useAuthStore((state) => state.userName);
  const userMajor = useAuthStore((state) => state.major);
  const isExecutive = useAuthStore((state) => state.isExecutive);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);

  // Primary source of truth is userName from useAuthStore, fallback to profile.name if provided
  const name = userName || profile?.name;
  const major = userMajor || profile?.major;

  return (
    <section className="flex flex-col gap-6 rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {name ? (
            <>
              Welcome back, <span className="text-[#4F46E5]">{name}</span>
            </>
          ) : (
            'Welcome back!'
          )}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your student profile, saved events, and club applications.
        </p>
        {major && (
          <p className="mt-1.5 text-xs font-bold tracking-wider text-[#4F46E5] uppercase">
            Major: {major}
          </p>
        )}
      </div>

      {isExecutive && (
        <button
          onClick={() => {
            setActiveRole('executive');
            router.push('/manager/dashboard');
          }}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-indigo-600 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-sm transition-all duration-300 hover:bg-indigo-600 hover:text-white"
        >
          <ArrowRightLeft size={16} />
          Switch to Executive Account
        </button>
      )}
    </section>
  );
}
