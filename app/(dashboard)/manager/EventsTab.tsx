'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ClipboardList } from 'lucide-react';
import api from '@/lib/axios';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

interface EventData {
  id?: string;
  club_id: string;
  title: string;
  description: string;
  event_date: string;
  poster_url: string;
}

interface Club {
  id: string;
  name: string;
  exec_user_id: string;
}

function getUserIdFromToken(token: string | null): string | null {
  if (!token || typeof window === 'undefined') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.sub || null;
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
}

export default function EventsTab() {
  const token = useAuthStore((state) => state.token);
  const userId = getUserIdFromToken(token);

  const [activeSubTab, setActiveSubTab] = useState<
    'create' | 'upcoming' | 'past'
  >('create');
  const [clubId, setClubId] = useState<string | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  // Fetch manager's club and events
  useEffect(() => {
    if (token && userId) {
      Promise.resolve().then(() => {
        setIsLoading(true);
        setErrorMsg(null);
      });
      api
        .get('/api/clubs/')
        .then((res) => {
          const clubs = res.data;
          console.log('clubs:', clubs, 'userId:', userId);
          if (Array.isArray(clubs)) {
            const myClub = clubs.find((c: Club) => c.exec_user_id === userId);
            if (myClub) {
              setClubId(myClub.id);
              return myClub.id;
            } else {
              setErrorMsg('No club found for your account.');
              return null;
            }
          } else {
            setErrorMsg('Failed to parse club data: Response is not an array.');
            return null;
          }
        })
        .then((myClubId) => {
          if (myClubId) {
            return api.get('/api/events/').then((res) => {
              const allEvents = res.data;
              if (Array.isArray(allEvents)) {
                const clubEvents = allEvents.filter(
                  (e: EventData) => e.club_id === myClubId
                );
                setEvents(clubEvents);
              }
            });
          }
        })
        .catch((err) => {
          console.error('Failed to load events tab data:', err);
          const friendlyMessage =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            'Unknown network error';
          setErrorMsg(`Failed to load club events data: ${friendlyMessage}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [token, userId]);

  // Handles publishing a new event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    if (!title || !eventDate) {
      setErrorMsg('Event Title and Date/Time are required!');
      return;
    }

    setIsLoading(true);

    try {
      // Connected to POST /api/events/
      const response = await api.post('/api/events/', {
        club_id: clubId,
        title,
        description,
        event_date: eventDate,
        poster_url:
          posterUrl ||
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      });

      const newEvent = response.data;
      setEvents((prev) => [newEvent, ...prev]);
      setSuccessMsg(`Event "${title}" has been successfully published!`);

      // Clear Form Fields
      setTitle('');
      setEventDate('');
      setDescription('');
      setPosterUrl('');
    } catch (err: unknown) {
      console.error('Failed to publish event:', err);
      let friendlyMessage = 'Unknown network error';
      if (axios.isAxiosError(err)) {
        friendlyMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message;
      } else if (err instanceof Error) {
        friendlyMessage = err.message;
      }
      setErrorMsg(`Failed to publish event: ${friendlyMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= now);
  const pastEvents = events.filter((e) => new Date(e.event_date) < now);

  return (
    <div className="w-full font-sans text-slate-900 antialiased">
      <div className="w-full">
        {/* Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Events Management
          </h1>
          <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
            Publish new activities and view upcoming or historical club events.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="mb-8 flex items-center gap-6 border-b border-gray-200/60 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('create')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'create'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Create Event
            {activeSubTab === 'create' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('upcoming')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'upcoming'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Upcoming Events ({upcomingEvents.length})
            {activeSubTab === 'upcoming' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('past')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'past'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Past Events ({pastEvents.length})
            {activeSubTab === 'past' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
        </div>

        {/* Errors & Success Feedback */}
        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-semibold text-red-600">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-semibold text-emerald-600">
            {successMsg}
          </div>
        )}

        {/* Create Event Form */}
        {activeSubTab === 'create' && (
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-gray-50 bg-slate-50/30 px-6 py-5">
              <ClipboardList className="h-4 w-4 text-[#4F46E5]" />
              <h2 className="text-sm font-bold tracking-tight text-gray-800">
                Event Details Form
              </h2>
            </div>

            <div className="space-y-5 p-6">
              {/* Event Title */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  EVENT TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Generative AI Seminar"
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                  disabled={isLoading}
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    DATE AND TIME
                  </label>
                  <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                    disabled={isLoading}
                  />
                </div>

                {/* Poster Image URL */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    POSTER IMAGE URL
                  </label>
                  <input
                    type="text"
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Event Description */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  EVENT DESCRIPTION
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed introduction and schedule of the event..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA]/70 px-4 py-3 text-xs font-medium transition outline-none placeholder:text-gray-300 focus:border-[#4F46E5] focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-50 bg-slate-50/50 px-6 py-4">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 disabled:opacity-50"
              >
                Publish Event
              </button>
            </div>
          </form>
        )}

        {/* Upcoming Events Tab */}
        {activeSubTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="p-8 text-center text-xs font-semibold text-gray-400">
                No upcoming events published yet.
              </div>
            ) : (
              upcomingEvents.map((e) => (
                <div
                  key={e.id}
                  className="max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-bold text-gray-800">
                    {e.title}
                  </h3>
                  <p className="mb-4 text-xs font-medium text-gray-400">
                    Date: {new Date(e.event_date).toLocaleString()}
                  </p>
                  <p className="text-xs leading-relaxed font-medium text-gray-500">
                    {e.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Past Events Tab */}
        {activeSubTab === 'past' && (
          <div className="space-y-4">
            {pastEvents.length === 0 ? (
              <div className="p-8 text-center text-xs font-semibold text-gray-400">
                No past events found.
              </div>
            ) : (
              pastEvents.map((e) => (
                <div
                  key={e.id}
                  className="max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 opacity-75 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-bold text-gray-800">
                    {e.title}
                  </h3>
                  <p className="mb-4 text-xs font-medium text-gray-400">
                    Date: {new Date(e.event_date).toLocaleString()}
                  </p>
                  <p className="text-xs leading-relaxed font-medium text-gray-500">
                    {e.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
