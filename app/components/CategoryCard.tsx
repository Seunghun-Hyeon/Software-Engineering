import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { BentoCard } from '@/app/components/BentoCard';
import { cn } from '@/lib/utils';

export interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string; // Name of the club category
  description: string; // Explanatory subtext detailing typical clubs included
  count: string; // Count indicator badge (e.g. '12 Clubs')
  icon: LucideIcon; // Icon component definition
  gradient: string; // CSS gradients used to color overlay the background image
  bgImage: string; // URL path to the cover image representing the category
}

export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      className,
      title,
      description,
      count,
      icon: IconComponent,
      gradient,
      bgImage,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        href={`/clubs?category=${encodeURIComponent(title)}`}
        className="block"
      >
        <BentoCard
          ref={ref}
          className={cn(
            // Parent container uses absolute overlays, high border radius (24px/rounded-3xl), overflow hidden, shadow-md, and float animation
            'group relative h-80 cursor-pointer overflow-hidden rounded-[24px] border border-white/40 p-0 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl',
            className
          )}
          {...props}
        >
          {/* Background image cover that slowly zooms in on hover */}
          <Image
            src={bgImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Colored gradient overlay that adds consistent styling and keeps text readable */}
          <div
            className={cn(
              'absolute inset-0 bg-linear-to-b opacity-90 transition-opacity duration-300 group-hover:opacity-95',
              gradient
            )}
          />

          {/* Floating Category details container overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-white select-none">
            {/* Top Circle/Square wrapper with soft blur background */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
              <IconComponent className="h-5 w-5" />
            </div>

            {/* Premium Glassmorphic text details panel at the bottom of the card */}
            <div className="rounded-2xl border border-white/50 bg-white/95 p-4 text-gray-900 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between">
                {/* Category Name */}
                <h3 className="font-display text-base font-bold tracking-tight">
                  {title}
                </h3>
                {/* Count Indicator Badge */}
                <span className="rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-[10px] font-black whitespace-nowrap text-[#4F46E5]">
                  {count}
                </span>
              </div>
              {/* Category Subtext Description (capped at 2 lines) */}
              <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          </div>
        </BentoCard>
      </Link>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
