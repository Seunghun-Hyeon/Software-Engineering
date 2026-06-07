'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Badge } from '@/app/components/Badge';

export interface JoinedClub {
  id: string;
  name: string;
  categories: {
    name: string;
  };
  description?: string;
}

interface MyClubsTabProps {
  clubs: JoinedClub[];
}

export function MyClubsTab({ clubs }: MyClubsTabProps) {
  if (clubs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-white/40 px-6 py-20 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
          Not a member of any clubs yet
        </h3>
        <p className="mb-6 max-w-xs text-sm font-medium text-gray-500">
          Apply to societies or wait for your applications to be approved!
        </p>
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 rounded-[14px] bg-[#4F46E5] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#4338CA]"
        >
          Explore Societies
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => {
          return (
            <div
              key={club.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Top Category Badge and Membership status */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Badge variant="indigo">
                    {club.categories?.name || 'Uncategorized'}
                  </Badge>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>

              {/* Club Content Details */}
              <div className="grow">
                <h3 className="font-display mb-2 line-clamp-1 text-xl leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]">
                  {club.name}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm font-medium text-gray-500">
                  {club.description}
                </p>
              </div>

              {/* Card Footer Details */}
              <div className="mt-auto flex items-center justify-between border-t border-gray-200/50 pt-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
                  Active Member
                </span>
                <Link
                  href={`/clubs/${club.id}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#4F46E5] hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
