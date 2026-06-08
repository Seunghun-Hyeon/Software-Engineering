'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Loader2, ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import api from '@/lib/axios';

interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
}

export function GalleryTab({ clubId }: { clubId: string }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!clubId) return;
    api
      .get(`/gallery/club/${clubId}`)
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [clubId]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setPreviewIndex((prev) =>
        prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
      );
    },
    [items.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setPreviewIndex((prev) =>
        prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
      );
    },
    [items.length]
  );

  useEffect(() => {
    if (previewIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewIndex(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewIndex, handleNext, handlePrev]);

  const photoItems = items.filter((i) => i.type === 'photo');

  return (
    <>
      <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
          Gallery
        </h2>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : photoItems.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-gray-400">
            <ImageIcon size={36} />
            <p className="text-sm font-medium">No gallery images yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            {photoItems.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setPreviewIndex(i)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:aspect-video"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`Gallery image ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/600x400?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <span className="font-bold tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                    VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {previewIndex !== null && photoItems[previewIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewIndex(null)}
        >
          <button
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={() => setPreviewIndex(null)}
          >
            <X size={24} />
          </button>

          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-white/20 sm:left-8"
            onClick={handlePrev}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-white/20 sm:right-8"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </button>

          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoItems[previewIndex].url}
              alt="Preview"
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold tracking-widest text-white backdrop-blur-md">
              {previewIndex + 1} / {photoItems.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
