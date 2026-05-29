'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BentoCard } from '@/app/components/BentoCard';
import { Badge } from '@/app/components/Badge';
import { ClubFilters } from '@/app/components/ClubFilters';
import { Pagination } from '@/app/components/Pagination';
import type { Club } from '@/types/club';
import api from '@/lib/axios';

export default function ClubsDirectoryPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with GET /api/clubs when backend is connected
        const response = await api.get('/clubs');
        setClubs(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load clubs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-4 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Club Finder
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Explore and join over 100+ active student organizations. Find your
            community, build new skills, and make lasting connections.
          </p>
        </div>

        {/* Search & Filter Section */}
        <ClubFilters />

        {/* Minimalist 4-Column Split Grid */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club) => (
              <BentoCard
                key={club.id}
                className="overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0px_15px_40px_rgba(0,0,0,0.08)]"
              >
                {/* Image Section */}
                <div className="relative h-32 w-full shrink-0 bg-gray-200">
                  <Image
                    src={`https://picsum.photos/seed/${club.id}/400/200`}
                    alt={`${club.name} cover`}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  {/* Small Circle Logo */}
                  <div className="absolute -bottom-6 left-6 h-12 w-12 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm">
                    <Image
                      src={`https://picsum.photos/seed/logo${club.id}/100/100`}
                      alt={`${club.name} logo`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-grow flex-col p-6 pt-8">
                  <div className="mb-4 flex items-start justify-between">
                    <Badge>{club.category}</Badge>
                    {club.isActive && <Badge variant="active">Active</Badge>}
                  </div>

                  <h3 className="font-display mb-2 line-clamp-1 text-xl font-semibold text-gray-900">
                    {club.name}
                  </h3>

                  <p className="mb-6 line-clamp-2 flex-grow text-sm text-gray-600">
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
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {/* TODO: API INTEGRATION - Pass actual pagination metadata from the backend response here */}
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
}
