'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { WelcomeSection } from '../WelcomeSection';
import { SavedEventsTab } from '../SavedEventsTab';
import { FavouriteClubsTab } from '../FavouriteClubsTab';
import { ApplicationsTab } from '../ApplicationsTab';
import { MyClubsTab } from '../MyClubsTab';
import SettingsTab from '../SettingsTab';
import { createClient } from '@/lib/supabase/client';
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
  event_date?: string;
}

interface BackendClub {
  id: string | number;
  name: string;
  description: string;
  categories: {
    name: string;
  } | null;
}

interface BackendApplication {
  id: string | number;
  club_id: string | number;
  status?: string;
  clubs?: {
    id: string | number;
    name: string;
    logo_url?: string | null;
  } | null;
}

import api from '@/lib/axios';

export default function StudentDashboard() {
  // Retrieve the authenticated user's name and major from global Zustand auth store
  const { userName, major, userId } = useAuthStore();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<
    | 'saved_events'
    | 'favourite_clubs'
    | 'applications'
    | 'my_clubs'
    | 'settings'
  >('saved_events');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [favouriteClubs, setFavouriteClubs] = useState<FavouriteClub[]>([]);
  const [memberClubs, setMemberClubs] = useState<FavouriteClub[]>([]);
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
            event_date: item.event_date,
          }));
          setSavedEvents(mappedEvents);
        } catch (err) {
          console.error('Failed to fetch saved events:', err);
        }

        // Fetch all clubs
        let allClubs: FavouriteClub[] = [];
        try {
          const clubsResponse = await api.get('/clubs');
          allClubs = (clubsResponse.data as BackendClub[]).map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            categories: item.categories || { name: 'Uncategorized' },
          }));
          setFavouriteClubs(allClubs);
        } catch (err) {
          console.error('Failed to fetch clubs:', err);
        }

        // Fetch club memberships from Supabase if userId is present and is a valid UUID
        const memberClubIds: string[] = [];
        const isUuid = (val: string | null | undefined): boolean => {
          if (!val) return false;
          const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return uuidRegex.test(val);
        };

        if (userId && isUuid(userId)) {
          try {
            const { data: memberRows, error: memberErr } = await supabase
              .from('club_members')
              .select('club_id')
              .eq('user_id', userId);

            if (!memberErr && memberRows) {
              memberRows.forEach((row) => {
                memberClubIds.push(String(row.club_id));
              });
            }
          } catch (err) {
            console.error(
              'Failed to fetch club memberships from Supabase:',
              err
            );
          }
        }

        // Fetch applications
        try {
          const applicationsResponse = await api.get('/applications');
          const rawApps = applicationsResponse.data;
          if (Array.isArray(rawApps)) {
            const mappedApps = rawApps.map((item: BackendApplication) => {
              let status: 'submitted' | 'under_review' | 'accepted' =
                'submitted';
              const dbStatus = String(item.status || '').toLowerCase();
              if (dbStatus === 'accepted') {
                status = 'accepted';
              } else if (
                dbStatus === 'pending' ||
                dbStatus === 'under_review'
              ) {
                status = 'under_review';
              } else {
                status = 'submitted';
              }

              // Also collect club ID if accepted
              if (dbStatus === 'accepted') {
                memberClubIds.push(String(item.club_id));
              }

              return {
                id: String(item.id),
                clubName: item.clubs?.name || 'Unknown Club',
                status,
              };
            });
            setApplications(mappedApps);
          }
        } catch (err) {
          console.error('Failed to fetch applications:', err);
        }

        // Deduplicate member club IDs
        const uniqueMemberClubIds = Array.from(new Set(memberClubIds));

        // Filter allClubs to get student joined clubs
        const studentJoinedClubs = allClubs.filter((club) =>
          uniqueMemberClubIds.includes(club.id)
        );
        setMemberClubs(studentJoinedClubs);

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
  }, [userName, major, userId, supabase]);

  return (
    <div className="relative min-h-screen w-full bg-[#F9FAFB] font-sans selection:bg-[#4F46E5]/20">
      <main className="mx-auto max-w-7xl space-y-10 px-6 pt-32 pb-20 lg:px-8">
        {/* Welcome Section */}
        {profile && <WelcomeSection profile={profile} />}

        {/* Tab Controls Bar */}
        <div className="hide-scrollbar flex w-fit max-w-full overflow-x-auto rounded-[18px] border border-white/40 bg-white/50 p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('saved_events')}
            className={cn(
              'rounded-[14px] px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none',
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
              'rounded-[14px] px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none',
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
              'rounded-[14px] px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none',
              activeTab === 'applications'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            Applications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('my_clubs')}
            className={cn(
              'rounded-[14px] px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none',
              activeTab === 'my_clubs'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            My Clubs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={cn(
              'rounded-[14px] px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 focus:outline-none',
              activeTab === 'settings'
                ? 'bg-[#4F46E5] text-white shadow-md'
                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'
            )}
          >
            Settings
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
            {activeTab === 'my_clubs' && <MyClubsTab clubs={memberClubs} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        )}
      </main>
    </div>
  );
}
