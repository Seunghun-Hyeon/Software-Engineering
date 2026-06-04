import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/Button';

interface HeroProfileProps {
  clubName: string;
  description: string;
  logoUrl: string;
  bgImageUrl: string;
  category: string;
  isAcceptingApplications: boolean;
}

export function HeroProfile({
  clubName,
  description,
  logoUrl,
  bgImageUrl,
  category,
  isAcceptingApplications,
}: HeroProfileProps) {
  return (
    <section className="relative mb-12 w-full rounded-[24px] border border-gray-100 bg-white pb-8 shadow-sm">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-[24px] bg-gray-200">
        <Image
          src={bgImageUrl || '/concert.jpg'}
          alt={`${clubName} Background`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#001026]/40"></div>
      </div>

      <div className="relative w-full px-8">
        <div className="flex flex-col items-start justify-between md:flex-row">
          {/* Left Side: Avatar and Text */}
          <div className="relative -mt-16 flex w-full flex-col md:w-2/3">
            {/* Avatar overlapping the banner */}
            <div className="relative mb-4 flex h-32 w-32 items-center justify-center rounded-full border-2 border-white bg-white p-2 shadow-sm md:h-36 md:w-36">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                <Image
                  src={logoUrl || '/concert.jpg'}
                  alt={`${clubName} Logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Title and Tags */}
            <h1 className="font-display mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {clubName}
            </h1>

            <p className="mb-4 max-w-3xl font-sans text-sm leading-relaxed text-gray-600 md:text-base">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#4F46E5]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#4F46E5] uppercase">
                {category}
              </span>
              {isAcceptingApplications && (
                <span className="flex items-center gap-2 rounded-full bg-[#10B981]/15 px-3 py-1 text-xs font-bold text-[#10B981] uppercase">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]"></span>
                  Accepting Applications
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="mt-6 flex w-full flex-row gap-3 md:mt-4 md:w-1/3 md:justify-end">
            <Button className="rounded-full bg-[#10B981] px-6 font-bold text-white shadow-sm hover:bg-[#059669]">
              Follow
            </Button>
            <Button className="rounded-full bg-[#3323cc] px-6 font-bold shadow-md hover:bg-[#2a1ca8]">
              Join Society
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
