'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Clock, MapPin, ImageIcon, Loader2 } from 'lucide-react';
import api from '@/lib/axios';

interface Article {
  id: string;
  date: string;
  title: string;
  content?: string;
  summary?: string;
}

interface EventData {
  id: string;
  club_id: string;
  title: string;
  description: string;
  event_date: string;
  location?: string;
}

interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
}

export function OverviewTab({
  clubId,
  setActiveTab,
}: {
  clubId: string;
  setActiveTab: (tab: string) => void;
}) {
  const [news, setNews] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clubId) return;
    Promise.all([
      api.get(`/clubs/${clubId}/news`).then((r) => r.data as Article[]).catch(() => [] as Article[]),
      api
        .get('/api/events')
        .then((r) => {
          const all = Array.isArray(r.data) ? (r.data as EventData[]) : [];
          const now = Date.now();
          return all
            .filter((e) => String(e.club_id) === clubId && new Date(e.event_date).getTime() >= now)
            .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
            .slice(0, 2);
        })
        .catch(() => [] as EventData[]),
      api
        .get(`/gallery/club/${clubId}`)
        .then((r) => (r.data as GalleryItem[]).filter((i) => i.type === 'photo').slice(0, 2))
        .catch(() => [] as GalleryItem[]),
    ]).then(([newsData, eventsData, photosData]) => {
      setNews(newsData.slice(0, 3));
      setEvents(eventsData);
      setPhotos(photosData);
      setLoading(false);
    });
  }, [clubId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  const newsCardVariants = [
    {
      card: 'flex flex-col rounded-[20px] border-2 border-[#10B981] bg-white p-6',
      date: 'mb-2 text-xs font-semibold text-gray-500',
      title: 'font-display mb-3 text-lg leading-tight font-bold text-[#3323cc]',
      body: 'mb-6 flex-grow text-sm text-gray-600',
      btn: 'flex items-center gap-1 text-sm font-semibold text-[#10B981] hover:underline',
    },
    {
      card: 'flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm',
      date: 'mb-2 text-xs font-semibold text-gray-500',
      title: 'font-display mb-3 text-lg leading-tight font-bold text-gray-900',
      body: 'mb-6 flex-grow text-sm text-gray-600',
      btn: 'flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline',
    },
    {
      card: 'flex flex-col rounded-[20px] bg-[#3323cc] p-6 shadow-md',
      date: 'mb-2 text-xs font-semibold text-[#c0c1ff]',
      title: 'font-display mb-3 text-lg leading-tight font-bold text-white',
      body: 'mb-6 flex-grow text-sm text-[#dad7ff]',
      btn: 'flex items-center gap-1 text-sm font-semibold text-[#6ffbbe] hover:underline',
    },
  ];

  return (
    <>
      {/* Latest News */}
      <section>
        <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">Latest News</h2>
        {news.length === 0 ? (
          <div className="rounded-[20px] border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-400 shadow-sm">
            No news posted yet
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {news.map((article, i) => {
              const v = newsCardVariants[i % 3];
              const body = article.content || article.summary || '';
              return (
                <div key={article.id} className={v.card}>
                  <p className={v.date}>{article.date}</p>
                  <h3 className={v.title}>{article.title}</h3>
                  <p className={v.body}>
                    {body.slice(0, 120)}{body.length > 120 ? '…' : ''}
                  </p>
                  <button
                    onClick={() => setActiveTab('news')}
                    className={v.btn}
                  >
                    Read More <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {events.length === 0 ? (
          <div className="p-4 text-center text-sm font-semibold text-gray-400">
            No upcoming events
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event, i) => {
              const dateObj = new Date(event.event_date);
              const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const day = dateObj.getDate();
              const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
              return (
                <div key={event.id} className="flex items-center gap-6 rounded-[16px] p-4 transition-colors hover:bg-gray-50">
                  <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] text-white ${i === 0 ? 'bg-[#4F46E5]' : 'bg-gray-400'}`}>
                    <span className="text-xs font-bold tracking-wider uppercase opacity-90">{month}</span>
                    <span className="text-xl font-black">{day}</span>
                  </div>
                  <div>
                    <h3 className="font-display mb-1 text-lg font-bold text-gray-900">{event.title}</h3>
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Clock className="h-4 w-4" /> {time}
                      {event.location && (
                        <> • <MapPin className="h-4 w-4" /> {event.location}</>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Pictures */}
      <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900">Recent Pictures</h2>
          <button
            onClick={() => setActiveTab('gallery')}
            className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
          >
            View Gallery <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 text-gray-400">
            <ImageIcon size={32} />
            <p className="text-sm font-medium">No photos yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-opacity hover:opacity-90"
                onClick={() => setActiveTab('gallery')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={`Preview ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/600x400?text=Image+Not+Found';
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
