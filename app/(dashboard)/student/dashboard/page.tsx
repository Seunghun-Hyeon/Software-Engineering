'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { WelcomeSection } from '../WelcomeSection';
import { SavedEventsTab } from '../SavedEventsTab';
import { FavouriteClubsTab } from '../FavouriteClubsTab';
import { ApplicationsTab } from '../ApplicationsTab';
import type {
  StudentProfile,
  SavedEvent,
  Application,
} from '../../../../types/types';

interface FavouriteClub {
  id: string;
  name: string;
  categories: {
    name: string;
  };
  description?: string;
}

interface BackendEvent {
  id: string | number;
  title: string;
  date: string;
  time?: string;
  location: string;
  category?: string;
}

interface BackendClub {
  id: string | number;
  name: string;
  description: string;
  categories: {
    name: string;
  } | null;
}

import api from '@/lib/axios';

export default function StudentDashboard() {
  // Retrieve the authenticated user's name and major from global Zustand auth store
  const { userName, major } = useAuthStore();

  // Establish state parameters for dynamic views
  const [activeTab, setActiveTab] = useState<
    'saved_events' | 'favourite_clubs' | 'applications'
  >('saved_events');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [favouriteClubs, setFavouriteClubs] = useState<FavouriteClub[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch saved events
        try {
          const savedEventsResponse = await api.get('/events');
          const mappedEvents: SavedEvent[] = (
            savedEventsResponse.data as BackendEvent[]
          ).map((item) => ({
            id: String(item.id),
            title: item.title,
            date: item.date,
            time: item.time || '',
            location: item.location,
            category: item.category || 'General',
          }));
          setSavedEvents(mappedEvents);
        } catch (err) {
          console.error('Failed to fetch saved events:', err);
        }

        // Fetch all clubs to populate favourites
        // Connected to GET /api/clubs/
        try {
          const favouriteClubsResponse = await api.get('/clubs');
          const mappedClubs: FavouriteClub[] = (
            favouriteClubsResponse.data as BackendClub[]
          ).map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            categories: item.categories || { name: 'Uncategorized' },
          }));
          setFavouriteClubs(mappedClubs);
        } catch (err) {
          console.error('Failed to fetch clubs:', err);
        }

        // Fetch applications
        try {
          const applicationsResponse = await api.get('/applications');
          setApplications(applicationsResponse.data);
        } catch (err) {
          console.error('Failed to fetch applications:', err);
        }

        // Setup student profile details dynamically
        setProfile({
          id: 'student-777',
          name: userName,
          email: 'elise@handong.edu',
          major: major || 'Global Leadership School',
          avatarUrl: '', // Falls back to default asset in WelcomeSection
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [userName, major]);

  return (
    <div className="relative min-h-screen w-full bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      <main className="mx-auto max-w-7xl space-y-10 px-6 pt-32 pb-20 lg:px-8">
        {/* Welcome Section */}
        {profile && <WelcomeSection profile={profile} />}

        {/* Tab Controls Bar */}
        <div className="flex max-w-md rounded-[18px] border border-white/40 bg-white/50 p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('saved_events')}
            className={cn(
              'flex-1 rounded-[14px] px-5 py-2.5 text-sm font-bold transition-all duration-300 focus:outline-none',
              activeTab === 'saved_events'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            Saved Events
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favourite_clubs')}
            className={cn(
              'flex-1 rounded-[14px] px-5 py-2.5 text-sm font-bold transition-all duration-300 focus:outline-none',
              activeTab === 'favourite_clubs'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            Favourite Clubs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={cn(
              'flex-1 rounded-[14px] px-5 py-2.5 text-sm font-bold transition-all duration-300 focus:outline-none',
              activeTab === 'applications'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            My Applications
          </button>
        </div>

        {/* Tab Layout Render Views */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center font-semibold text-red-500">
            {error}
          </div>
        ) : (
          <div>
            {activeTab === 'saved_events' && (
              <SavedEventsTab events={savedEvents} />
            )}
            {activeTab === 'favourite_clubs' && (
              <FavouriteClubsTab clubs={favouriteClubs} />
            )}
            {activeTab === 'applications' && (
              <ApplicationsTab applications={applications} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
