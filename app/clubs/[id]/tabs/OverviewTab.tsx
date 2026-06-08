'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Clock, MapPin, ImageIcon } from 'lucide-react';
import api from '@/lib/axios';

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
  const [photos, setPhotos] = useState<GalleryItem[]>([]);

  useEffect(() => {
    if (!clubId) return;
    api
      .get(`/gallery/club/${clubId}`)
      .then((res) => {
        const items = (res.data as GalleryItem[]).filter((i) => i.type === 'photo').slice(0, 2);
        setPhotos(items);
      })
      .catch(() => setPhotos([]));
  }, [clubId]);

  return (
    <>
      {/* Latest News */}
      <section>
        <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
          Latest News
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col rounded-[20px] border-2 border-[#10B981] bg-white p-6">
            <p className="mb-2 text-xs font-semibold text-gray-500">
              OCT 24, 2023
            </p>
            <h3 className="font-display mb-3 text-lg leading-tight font-bold text-[#3323cc]">
              Fall Hackathon Registration Now Open
            </h3>
            <p className="mb-6 flex-grow text-sm text-gray-600">
              Secure your spot for the biggest coding event of the semester.
              $5,000 in prizes.
            </p>
            <button
              onClick={() => setActiveTab('news')}
              className="flex items-center gap-1 text-sm font-semibold text-[#10B981] hover:underline"
            >
              Read More <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold text-gray-500">
              OCT 20, 2023
            </p>
            <h3 className="font-display mb-3 text-lg leading-tight font-bold text-gray-900">
              New Partnership: TechGiant Cloud
            </h3>
            <p className="mb-6 flex-grow text-sm text-gray-600">
              All members now receive $500 in cloud credits for their personal
              projects.
            </p>
            <button
              onClick={() => setActiveTab('news')}
              className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
            >
              Read More <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col rounded-[20px] bg-[#3323cc] p-6 shadow-md">
            <p className="mb-2 text-xs font-semibold text-[#c0c1ff]">
              OCT 15, 2023
            </p>
            <h3 className="font-display mb-3 text-lg leading-tight font-bold text-white">
              Community Spotlight: The Solar Project
            </h3>
            <p className="mb-6 flex-grow text-sm text-[#dad7ff]">
              How our junior members built a low-cost solar tracker for the
              library.
            </p>
            <button
              onClick={() => setActiveTab('news')}
              className="flex items-center gap-1 text-sm font-semibold text-[#6ffbbe] hover:underline"
            >
              View Story <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            Upcoming Events
          </h2>
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-1 text-sm font-semibold text-[#3323cc] hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6 rounded-[16px] p-4 transition-colors hover:bg-gray-50">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] bg-[#4F46E5] text-white">
              <span className="text-xs font-bold tracking-wider uppercase opacity-90">
                OCT
              </span>
              <span className="text-xl font-black">15</span>
            </div>
            <div>
              <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
                Intro to React Workshop
              </h3>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Clock className="h-4 w-4" /> 18:00 - 20:00 •{' '}
                <MapPin className="h-4 w-4" /> IT Center Room 204
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 rounded-[16px] p-4 transition-colors hover:bg-gray-50">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[12px] bg-gray-200 text-gray-700">
              <span className="text-xs font-bold tracking-wider uppercase opacity-70">
                NOV
              </span>
              <span className="text-xl font-black">02</span>
            </div>
            <div>
              <h3 className="font-display mb-1 text-lg font-bold text-gray-900">
                Annual Hackathon Kickoff
              </h3>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Clock className="h-4 w-4" /> 09:00 - 21:00 •{' '}
                <MapPin className="h-4 w-4" /> Main Auditorium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Pictures — real data from gallery */}
      <section className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            Recent Pictures
          </h2>
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
