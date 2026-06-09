import React from 'react';
import type { ClubDataProps } from '../types';

export function InfoTab({ clubData }: { clubData: ClubDataProps }) {
  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        About the Club
      </h2>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
            Description
          </h3>
          <p className="leading-relaxed text-gray-600">
            {clubData.shortDescription &&
            clubData.shortDescription !== 'No description available.'
              ? clubData.shortDescription
              : 'No description provided.'}
          </p>
        </div>

        <div>
          <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
            Core Values
          </h3>
          <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-600">
            {Array.isArray(clubData.coreValues) ? (
              clubData.coreValues.map((value: string, idx: number) => (
                <li key={idx}>{value}</li>
              ))
            ) : typeof clubData.coreValues === 'string' ? (
              <li>{clubData.coreValues}</li>
            ) : (
              <li>No core values listed.</li>
            )}
          </ul>
        </div>

        {!clubData.mission ||
        clubData.mission === 'N/A' ||
        clubData.mission === 'No mission statement provided.' ? null : (
          <div>
            <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
              Mission
            </h3>
            <p className="leading-relaxed text-gray-600">{clubData.mission}</p>
          </div>
        )}

        {!clubData.history ||
        clubData.history === 'N/A' ||
        clubData.history === 'No history provided.' ? null : (
          <div>
            <h3 className="font-display mb-3 text-xl font-bold text-[#3323cc]">
              History
            </h3>
            <p className="leading-relaxed text-gray-600">{clubData.history}</p>
          </div>
        )}
      </div>
    </section>
  );
}
