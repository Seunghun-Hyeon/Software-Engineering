import React from 'react';

export function NewsTab() {
  return (
    <section className="min-h-[500px] rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display mb-6 text-2xl font-bold text-gray-900">
        All News
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-1 text-sm font-semibold text-[#10B981]">
              OCT 24, 2023
            </p>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Fall Hackathon Registration Now Open
            </h3>
            <p className="mb-4 text-gray-600">
              Join us for the largest coding event of the semester. Compete with
              teams of up to 4 for a total prize pool of $5,000, and get a
              chance to network with direct recruiters from top tech firms.
            </p>
            <button className="text-sm font-bold text-[#3323cc] hover:underline">
              Read full article &rarr;
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-1 text-sm font-semibold text-gray-500">
              OCT 20, 2023
            </p>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              New Partnership: TechGiant Cloud
            </h3>
            <p className="mb-4 text-gray-600">
              We are thrilled to announce a new partnership. All active members
              will now receive $500 in cloud credits for their personal projects
              and research deployments.
            </p>
            <button className="text-sm font-bold text-[#3323cc] hover:underline">
              Read full article &rarr;
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-[20px] border border-gray-100 bg-gray-50 p-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-1 text-sm font-semibold text-gray-500">
              OCT 15, 2023
            </p>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Community Spotlight: The Solar Project
            </h3>
            <p className="mb-4 text-gray-600">
              See how a team of our junior members collaborated to build a
              low-cost, open-source solar tracker that is now installed in the
              campus library garden.
            </p>
            <button className="text-sm font-bold text-[#3323cc] hover:underline">
              Read full article &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
