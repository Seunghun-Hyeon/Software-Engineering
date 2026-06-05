'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { BentoCard } from '@/app/components/BentoCard';
import { Badge } from '@/app/components/Badge';
import { ClubFilters } from '@/app/components/ClubFilters';
import { Pagination } from '@/app/components/Pagination';
import type { Club } from '@/types/club';
import api from '@/lib/axios';
import { Heart, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

function ClubsDirectoryContent() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const favouriteClubIds = useAuthStore((state) => state.favouriteClubIds);
  const toggleFavouriteClub = useAuthStore(
    (state) => state.toggleFavouriteClub
  );
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Search and Category Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(',') : ['All']
  );
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [showAuthModal, setShowAuthModal] = useState(false);

  interface BackendClubItem {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    coverImageUrl?: string;
    logoUrl?: string;
    categories: {
      name: string;
    } | null;
  }

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/clubs');

        // Map the backend structure to populate the club.category field
        const mappedClubs: Club[] = (response.data as BackendClubItem[]).map(
          (item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            isActive: item.isActive,
            coverImageUrl: item.coverImageUrl,
            logoUrl: item.logoUrl,
            category: item.categories?.name || 'Uncategorized',
          })
        );

        setClubs(mappedClubs);
      } catch (err) {
        console.error(err);
        setError('Failed to load clubs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Filter clubs based on active filters
  const filteredClubs = clubs.filter((club) => {
    const matchesCategory =
      selectedCategories.includes('All') ||
      selectedCategories.some(
        (cat) => cat.toLowerCase() === club.category.toLowerCase()
      );

    const query = searchQuery.trim().toLowerCase();
    const name = (club.name || '').toLowerCase();
    const description = (club.description || '').toLowerCase();

    const matchesSearch =
      query.length < 3 ||
      name === query ||
      name.includes(query) ||
      description.includes(query);

    return matchesCategory && matchesSearch;
  });

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
        <ClubFilters
          onCategoriesChange={(categories) => {
            setSelectedCategories(categories);
            const params = new URLSearchParams(window.location.search);
            if (categories.includes('All') || categories.length === 0) {
              params.delete('category');
            } else {
              params.set('category', categories.join(','));
            }
            router.push(`/clubs?${params.toString()}`);
          }}
          onSearchChange={(query) => {
            setSearchQuery(query);
            const params = new URLSearchParams(window.location.search);
            if (query) {
              params.set('search', query);
            } else {
              params.delete('search');
            }
            window.history.replaceState(
              null,
              '',
              `/clubs?${params.toString()}`
            );
          }}
        />

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
            {filteredClubs.map((club) => (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                    className="object-cover"
                  />

                  {/* Heart Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (token) {
                        // TODO: Connect to POST /api/clubs/favourite when backend adds this endpoint
                        toggleFavouriteClub(String(club.id));
                      } else {
                        setShowAuthModal(true);
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
                  <div className="absolute -bottom-6 left-6 h-12 w-12 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm">
                    <Image
                      src={`https://picsum.photos/seed/logo${club.id}/100/100`}
                      alt={`${club.name} logo`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                      className="object-cover"
                    />
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

                  {/* View details links to /clubs/[club.id] using Next.js Link component */}
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

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold tracking-tight text-gray-900">
                Authentication Required
              </h3>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Please log in or sign up to save your favourite clubs.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="flex-1 rounded-full bg-[#4F46E5] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-full border border-[#4F46E5] bg-transparent py-2.5 text-center text-sm font-semibold text-[#4F46E5] transition-colors hover:bg-[#4F46E5]/10"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClubsDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
        </div>
      }
    >
      <ClubsDirectoryContent />
    </Suspense>
  );
}
