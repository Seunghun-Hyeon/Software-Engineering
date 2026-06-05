'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [1, 2, 3, 4].map(
    (i) => `/concert${i === 1 || i === 2 ? i : ''}.jpg`
  );

  return (
    <>
      <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
          Gallery
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(src)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:aspect-video"
            >
              <Image
                src={src} // using existing mock images
                alt={`Gallery Image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                <span className="font-bold tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                  VIEW
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Glassmorphism modal container */}
          <div
            className="relative flex max-h-[85vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-[24px] border border-white/30 bg-white/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md"
            onClick={(e) => e.stopPropagation()} // prevent click from closing modal
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Centered Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/5">
              <Image
                src={selectedImage}
                alt="Selected Gallery Image"
                fill
                sizes="(max-width: 1200px) 100vw, 80vw"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
