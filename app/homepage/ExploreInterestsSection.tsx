import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CategoryCard } from '@/app/components/CategoryCard';
import type { Category } from '@/types/category';

interface ExploreInterestsSectionProps {
  categories: Category[];
  isLoadingCategories: boolean;
}

export function ExploreInterestsSection({
  categories,
  isLoadingCategories,
}: ExploreInterestsSectionProps) {
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
          href="/directory"
          className="group inline-flex items-center gap-1.5 font-sans text-sm font-bold text-[#4F46E5] transition-all hover:text-[#4F46E5]"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {isLoadingCategories ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
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
