'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { BentoCard } from '@/app/components/BentoCard';
import { Badge } from '@/app/components/Badge';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

interface ClubCardProps {
  club: {
    id: string;
    name: string;
    category: string;
    description: string;
    isActive: boolean;
    cover_image_url?: string | null;
    logo_url?: string | null;
  };
  onShowAuthModal: () => void;
}

export default function Card({ club, onShowAuthModal }: ClubCardProps) {
  const token = useAuthStore((state) => state.token);
  const favouriteClubIds = useAuthStore((state) => state.favouriteClubIds);
  const toggleFavouriteClub = useAuthStore(
    (state) => state.toggleFavouriteClub
  );

  const isValidUrl = (url?: string | null): boolean => {
    if (!url) return false;
    const trimmed = url.trim();
    if (trimmed === 'N/A' || trimmed === '' || trimmed === 'TBD') return false;
    return (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/')
    );
  };

  return (
    <BentoCard className="overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0px_15px_40px_rgba(0,0,0,0.08)]">
      {/* Image Section */}
      <div className="relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden bg-linear-to-r from-indigo-100/50 to-purple-100/50">
        {club.cover_image_url !== null &&
        club.cover_image_url !== undefined &&
        isValidUrl(club.cover_image_url) ? (
          <Image
            src={club.cover_image_url}
            alt={`${club.name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-indigo-100/40 to-purple-100/40">
            <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase select-none">
              No Cover Image
            </span>
          </div>
        )}

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (token) {
              toggleFavouriteClub(String(club.id));
            } else {
              onShowAuthModal();
            }
          }}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus:outline-none"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-all duration-300',
              token && favouriteClubIds.includes(String(club.id))
                ? 'scale-110 fill-red-500 text-red-500'
                : 'text-gray-500'
            )}
          />
        </button>

        {/* Small Circle Logo */}
        <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-indigo-50 text-xs font-bold text-[#4F46E5] shadow-sm">
          {club.logo_url !== null &&
          club.logo_url !== undefined &&
          isValidUrl(club.logo_url) ? (
            <Image
              src={club.logo_url}
              alt={`${club.name} logo`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-50 font-bold text-[#4F46E5]">
              {club.name ? club.name.substring(0, 2).toUpperCase() : 'CH'}
            </div>
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="flex grow flex-col p-6 pt-8">
        <div className="mb-4 flex items-start justify-between">
          <Badge>{club.category}</Badge>
          {club.isActive && <Badge variant="active">Active</Badge>}
        </div>

        <h3 className="font-display mb-2 line-clamp-1 text-xl font-semibold text-gray-900">
          {club.name}
        </h3>

        <p className="mb-6 line-clamp-2 grow text-sm text-gray-600">
          {club.description}
        </p>

        <Link
          href={`/clubs/${club.id}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-[#4F46E5]/10 px-4 py-2.5 text-sm font-semibold text-[#4F46E5] transition-colors hover:bg-[#4F46E5] hover:text-white"
        >
          View Details
        </Link>
      </div>
    </BentoCard>
  );
}
