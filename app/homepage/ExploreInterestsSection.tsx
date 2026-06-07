'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CategoryCard } from '@/app/components/CategoryCard';
import type { Category } from '@/types/category';
import api from '@/lib/axios';

interface BackendClub {
  id: string | number;
  name: string;
  categories: {
    name: string;
  } | null;
}

interface ExploreInterestsSectionProps {
  categories?: Category[];
  isLoadingCategories?: boolean;
}

export function ExploreInterestsSection({
  categories: propCategories,
  isLoadingCategories: propIsLoading,
}: ExploreInterestsSectionProps) {
  const [clubs, setClubs] = useState<BackendClub[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Connected to GET /api/clubs/
        const response = await api.get('/clubs/');
        setClubs(response.data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError(
          'We encountered a problem loading the categories. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchClubs();
  }, []);

  // Group clubs by category to count them
  const categoryCounts = clubs.reduce(
    (acc, club) => {
      const catName = club.categories?.name;
      if (catName) {
        acc[catName] = (acc[catName] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const CATEGORY_METADATA: Record<
    string,
    {
      description: string;
      iconName: string;
      gradient: string;
      bgImage: string;
    }
  > = {
    'Performing Arts': {
      description:
        'Traditional drum play, street hip-hop, orchestral classical, musical theatre, and acappella.',
      iconName: 'Palette',
      gradient: 'from-rose-600/75 to-rose-950/90',
      bgImage: '/zizzy.jpg',
    },
    Computer: {
      description:
        'Full-stack software application engineering, cybersecurity CTFs, and OS kernel hacking.',
      iconName: 'Cpu',
      gradient: 'from-indigo-600/80 to-indigo-950/90',
      bgImage: '/computerscience.jpg',
    },
    'Computer Science': {
      description:
        'Full-stack software application engineering, cybersecurity CTFs, and OS kernel hacking.',
      iconName: 'Cpu',
      gradient: 'from-indigo-600/80 to-indigo-950/90',
      bgImage: '/computerscience.jpg',
    },
    Sports: {
      description:
        'Collegiate American football, calisthenics routines, and local university cup tournaments.',
      iconName: 'Trophy',
      gradient: 'from-[#10B981]/70 to-[#064e3b]/90',
      bgImage: '/spring_fest.png',
    },
    'Sports & Health': {
      description:
        'Collegiate American football, calisthenics routines, and local university cup tournaments.',
      iconName: 'Trophy',
      gradient: 'from-[#10B981]/70 to-[#064e3b]/90',
      bgImage: '/spring_fest.png',
    },
    'Christian Groups': {
      description:
        'International mission mobilization, morning worship, and fellowship chapels.',
      iconName: 'HeartHandshake',
      gradient: 'from-amber-600/70 to-amber-950/90',
      bgImage: '/handongbackground.jpg',
    },
    'Christian & Service': {
      description:
        'International mission mobilization, morning worship, and fellowship chapels.',
      iconName: 'HeartHandshake',
      gradient: 'from-amber-600/70 to-amber-950/90',
      bgImage: '/handongbackground.jpg',
    },
    Academic: {
      description: 'Creation science studies, academic conferences and more',
      iconName: 'BookOpen',
      gradient: 'from-blue-600/70 to-blue-950/90',
      bgImage: '/handongbackground.jpg',
    },
    'Social Service': {
      description:
        'Volunteer service in local senior centers and mentoring for children.',
      iconName: 'Heart',
      gradient: 'from-teal-600/70 to-teal-950/90',
      bgImage: '/handongbackground.jpg',
    },
    'Exhibition Arts': {
      description: 'Sharing creative ideas and hosting art exhibitions.',
      iconName: 'Sparkles',
      gradient: 'from-purple-600/70 to-purple-950/90',
      bgImage: '/zizzy.jpg',
    },
  };

  const categories: Category[] = Object.keys(categoryCounts).map((catName) => {
    const meta = CATEGORY_METADATA[catName] || {
      description: 'Explore student organizations in this category.',
      iconName: 'Circle',
      gradient: 'from-gray-600/75 to-gray-950/90',
      bgImage: '/handongbackground.jpg',
    };
    return {
      title: catName,
      description: meta.description,
      count: `${categoryCounts[catName]} ${categoryCounts[catName] === 1 ? 'Club' : 'Clubs'}`,
      iconName: meta.iconName,
      gradient: meta.gradient,
      bgImage: meta.bgImage,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left">
        <div>
          <h2 className="font-display text-2.5xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Explore Interests
          </h2>
          <p className="mt-1.5 font-sans text-sm text-gray-500">
            Find the community that fits your vibe
          </p>
        </div>
        <Link
          href="/clubs"
          className="group inline-flex items-center gap-1.5 font-sans text-sm font-bold text-[#4F46E5] transition-all hover:text-[#4F46E5]"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="flex h-32 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/50 p-6 text-sm font-semibold text-rose-600 shadow-sm backdrop-blur-md">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => {
            const IconComponent =
              (LucideIcons[
                cat.iconName as keyof typeof LucideIcons
              ] as LucideIcons.LucideIcon) || LucideIcons.Circle;
            return (
              <CategoryCard
                key={idx}
                title={cat.title}
                description={cat.description}
                count={cat.count}
                icon={IconComponent}
                gradient={cat.gradient}
                bgImage={cat.bgImage}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
