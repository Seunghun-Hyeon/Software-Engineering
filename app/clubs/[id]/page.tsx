import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { HeroProfile } from '@/app/clubs/[id]/HeroProfile';
import { ClubContent } from '@/app/clubs/[id]/ClubContent';

import fs from 'fs/promises';
import path from 'path';

export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Read clubs.json
  const filePath = path.join(process.cwd(), 'data', 'clubs.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  const CLUBS = JSON.parse(fileData);

  const clubData = CLUBS.find(
    (c: { id: string | number; [key: string]: unknown }) =>
      c.id.toString() === id
  );

  if (!clubData) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F9FAFB] font-sans">
        <Header activeLabel="Clubs" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Club not found</h1>
          <Link
            href="/clubs"
            className="mt-4 inline-block text-[#4F46E5] hover:underline"
          >
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#F3F4F6] font-sans selection:bg-[#4F46E5]/20">
      <Header activeLabel="Clubs" />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroProfile
          clubName={clubData.name}
          description={clubData.shortDescription}
          logoUrl={clubData.logo}
          bgImageUrl={clubData.heroImage}
          category={clubData.category}
          isAcceptingApplications={clubData.isAcceptingApplications}
        />

        {/* Tabs and Main Content */}
        <ClubContent clubData={clubData} />
      </main>
    </div>
  );
}
