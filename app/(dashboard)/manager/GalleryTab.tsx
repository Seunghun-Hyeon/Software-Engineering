'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Trash2,
  Image as ImageIcon,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import api from '@/lib/axios';

interface GalleryItem {
  id?: string;
  type: 'photo' | 'video';
  url: string;
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-xs font-semibold text-gray-800 transition focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10';
const primaryBtnClass =
  'cursor-pointer rounded-full bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:bg-gray-300';

export default function GalleryTab() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  // Modal State
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/api/gallery');
        setGallery(response.data);
      } catch (error) {
        console.error('Failed to fetch gallery', error);
      } finally {
        setIsLoadingGallery(false);
      }
    };
    fetchGallery();
  }, []);

  const handleAddPhotoUrl = async () => {
    if (!newPhotoUrl) return;
    try {
      const response = await api.post('/api/gallery', {
        type: 'photo',
        url: newPhotoUrl,
      });
      setGallery((prev) => [response.data, ...prev]);
      setNewPhotoUrl('');
    } catch {
      alert('Failed to add photo URL');
    }
  };

  const handleAddVideoUrl = async () => {
    if (!newVideoUrl) return;
    try {
      const response = await api.post('/api/gallery', {
        type: 'video',
        url: newVideoUrl,
      });
      setGallery((prev) => [response.data, ...prev]);
      setNewVideoUrl('');
    } catch {
      alert('Failed to add video URL');
    }
  };

  const handleDeleteGalleryItem = async (index: number) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    const item = gallery[index];
    if (item.id) {
      try {
        await api.delete(`/api/gallery?id=${item.id}`);
        setGallery((prev) => prev.filter((_, i) => i !== index));
      } catch {
        alert('Failed to delete media');
      }
    } else {
      setGallery((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    expectedType: 'photo' | 'video'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (expectedType === 'video' && file.size > 100 * 1024 * 1024) {
      alert('Video size must be less than 100MB');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await api.post('/api/upload', formData);

      if (response.status === 200 && response.data.url) {
        const galleryResponse = await api.post('/api/gallery', {
          type: expectedType,
          url: response.data.url,
        });
        setGallery((prev) => [galleryResponse.data, ...prev]);
      }
    } catch (error) {
      console.error('Upload error:', error);
      const err = error as { response?: { data?: { error?: string } } };
      alert(err.response?.data?.error || 'Failed to upload file');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setPreviewIndex((prev) => {
        if (prev === null) return null;
        return prev === 0 ? gallery.length - 1 : prev - 1;
      });
    },
    [gallery.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.stopPropagation();
      setPreviewIndex((prev) => {
        if (prev === null) return null;
        return prev === gallery.length - 1 ? 0 : prev + 1;
      });
    },
    [gallery.length]
  );

  // Keyboard navigation for Modal
  useEffect(() => {
    if (previewIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewIndex(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewIndex, handleNext, handlePrev]);

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Gallery Showcase
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Upload and manage photos and videos to showcase your club&apos;s
          activities.
        </p>
      </div>

      <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        {/* Upload Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 border-b border-gray-100 pb-8 md:grid-cols-2">
          {/* Photo Upload */}
          <div className="rounded-2xl border border-gray-100 bg-white/50 p-5 shadow-sm">
            <label className="mb-3 block text-xs font-bold text-gray-700">
              Add Photo
            </label>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Paste image URL..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={handleAddPhotoUrl}
                className={primaryBtnClass}
              >
                Add
              </button>
            </div>

            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/20 p-2.5 text-xs font-semibold text-gray-500 transition ${isUploading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
            >
              {isUploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ImageIcon size={14} />
              )}
              {isUploading ? 'Uploading...' : 'Choose Local Photo File'}
              <input
                type="file"
                accept="image/*"
                disabled={isUploading}
                onChange={(e) => handleFileUpload(e, 'photo')}
                className="hidden"
              />
            </label>
          </div>

          {/* Video Upload */}
          <div className="rounded-2xl border border-gray-100 bg-white/50 p-5 shadow-sm">
            <label className="mb-3 block text-xs font-bold text-gray-700">
              Add Video
            </label>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="Paste video URL..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={handleAddVideoUrl}
                className={primaryBtnClass}
              >
                Add
              </button>
            </div>

            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/20 p-2.5 text-xs font-semibold text-gray-500 transition ${isUploading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
            >
              {isUploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Video size={14} />
              )}
              {isUploading ? 'Uploading...' : 'Choose Local Video File'}
              <input
                type="file"
                accept="video/*"
                disabled={isUploading}
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {isLoadingGallery ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              <Loader2
                size={32}
                className="mx-auto mb-4 animate-spin text-[#4F46E5]"
              />
              <p className="text-sm font-medium">Loading gallery...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-gray-50 p-4">
                <ImageIcon size={32} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                No gallery items added yet. Add URLs above to showcase media.
              </p>
            </div>
          ) : (
            gallery.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-[20px] border border-gray-100 bg-gray-50 shadow-sm transition hover:shadow-md"
                onClick={() => setPreviewIndex(idx)}
              >
                {item.type === 'photo' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={`Gallery item ${idx}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/400x400?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-800 text-xs font-bold text-white transition group-hover:bg-slate-900">
                    <Video size={24} className="mb-2 text-gray-400" />
                    VIDEO
                  </div>
                )}

                {/* Delete Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGalleryItem(idx);
                    }}
                    className="rounded-full bg-red-600 p-3 text-white shadow-lg transition hover:scale-110 hover:bg-red-700"
                    title="Delete media"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all"
          onClick={() => setPreviewIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={() => setPreviewIndex(null)}
          >
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:scale-110 hover:bg-white/20 sm:left-8"
            onClick={handlePrev}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Right Arrow */}
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:scale-110 hover:bg-white/20 sm:right-8"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </button>

          {/* Media Content */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent click-outside closing when clicking the image
          >
            {gallery[previewIndex].type === 'photo' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gallery[previewIndex].url}
                alt="Preview"
                className="max-h-[85vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/800x600?text=Image+Not+Found';
                }}
              />
            ) : (
              <div className="flex aspect-video w-[80vw] max-w-4xl flex-col items-center justify-center bg-slate-900 text-white">
                <Video size={48} className="mb-4 text-gray-500" />
                <p className="font-bold tracking-widest text-gray-400">
                  VIDEO PREVIEW: {gallery[previewIndex].url}
                </p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold tracking-widest text-white backdrop-blur-md">
              {previewIndex + 1} / {gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
