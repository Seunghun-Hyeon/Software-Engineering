import React from 'react';
import Image from 'next/image';

export function GalleryTab() {
  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        Gallery
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:aspect-video"
          >
            <Image
              src={`/concert${i === 1 || i === 2 ? i : ''}.jpg`} // using existing mock images
              alt={`Gallery Image ${i}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
  );
}
