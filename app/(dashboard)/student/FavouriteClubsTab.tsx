'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
export interface FavouriteClub {
  id: string;
  name: string;
  categories: {
    name: string;
  };
  description?: string;
}
import { Badge } from '@/app/components/Badge';
import { useAuthStore } from '@/store/useAuthStore';

interface FavouriteClubsTabProps {
  clubs: FavouriteClub[];
}

export function FavouriteClubsTab({ clubs }: FavouriteClubsTabProps) {
  // TODO: Replace with GET /api/clubs/favourites when backend adds this endpoint
  const { favouriteClubIds, toggleFavouriteClub } = useAuthStore();

  const activeClubs = clubs.filter((club) =>
    favouriteClubIds.includes(club.id)
  );

  if (activeClubs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-300 bg-white/40 px-6 py-20 text-center backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Heart className="h-8 w-8" />
        </div>
        <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
          No favourite clubs yet
        </h3>
        <p className="mb-6 max-w-xs text-sm font-medium text-gray-500">
          Browse the directory to add some!
        </p>
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 rounded-[14px] bg-[#4F46E5] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#4338CA]"
        >
          Browse Clubs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeClubs.map((club) => {
          return (
            <div
              key={club.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Top Category Badge and Interactive Favourite Heart Toggle */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Badge variant="indigo">
                    {club.categories?.name || 'Uncategorized'}
                  </Badge>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Replace with GET /api/clubs/favourites when backend adds this endpoint
                    toggleFavouriteClub(club.id);
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100/50 bg-white/80 text-gray-400 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none active:scale-95"
                  title="Remove from favourites"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
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
                  Favourited
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
