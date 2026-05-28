/**
 * ============================================================================
 * Homepage Component (`/homepage` route page)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the primary landing page and user interface entry point of the Handong ClubHub
 * application. It features a sticky navigation header, a full-bleed Hero section
 * with search and filtering capabilities, a bento-grid feature showcase, an interactive
 * "Explore Interests" category grid, and a dynamic "Upcoming Events" calendar displaying
 * real Handong Global University (HGU) club activities with multi-layout styling tabs.
 *
 * [ROUTE MAP]
 * - Path: `/homepage`
 * - Links to: `/login` (authentication), `/signup` (registration), `/directory` (club search results page).
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { Event } from '@/types/event';
import type { Category } from '@/types/category';
import api from '@/lib/axios';

import { HeroSection } from '@/app/homepage/HeroSection';
import { FeaturesSection } from '@/app/homepage/FeaturesSection';
import { ExploreInterestsSection } from '@/app/homepage/ExploreInterestsSection';
import { UpcomingEventsSection } from '@/app/homepage/UpcomingEventsSection';

export default function Homepage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Data Fetching
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setIsLoadingCategories(true);
        setIsLoadingEvents(true);

        const [categoriesRes, eventsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/events'),
        ]);

        setCategories(categoriesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error('Failed to load homepage data', error);
      } finally {
        setIsLoadingCategories(false);
        setIsLoadingEvents(false);
      }
    };

    fetchHomepageData();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      <HeroSection />
      <FeaturesSection />
      <ExploreInterestsSection
        categories={categories}
        isLoadingCategories={isLoadingCategories}
      />
      <UpcomingEventsSection
        events={events}
        isLoadingEvents={isLoadingEvents}
      />
    </div>
  );
}
