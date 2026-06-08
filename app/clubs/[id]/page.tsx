import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { HeroProfile } from '@/app/clubs/[id]/HeroProfile';
import { ClubContent } from '@/app/clubs/[id]/ClubContent';
import { headers } from 'next/headers';

interface ApiClub {
  id: string;
  name: string;
  categories: { name: string } | null;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
}

export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let apiEndpoint = '';
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    apiEndpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/clubs`;
  } else {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol =
      host.includes('localhost') || host.includes('127.0.0.1')
        ? 'http'
        : 'https';
    apiEndpoint = `${protocol}://${host}/api/clubs`;
  }

  // TODO: Replace with GET /api/clubs/:id when backend adds this endpoint
  let foundClub: ApiClub | null = null;
  try {
    const res = await fetch(`${apiEndpoint}/${id}`);
    if (res.ok) {
      foundClub = await res.json();
    }
  } catch (err) {
    console.error(`Failed to fetch club ${id} from backend:`, err);
  }

  if (!foundClub) {
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

  const clubData = {
    id: foundClub.id,
    name: foundClub.name,
    category: foundClub.categories?.name || 'Uncategorized',
    shortDescription: foundClub.description || 'No description available.',
    logo: foundClub.logoUrl || '',
    heroImage: foundClub.coverImageUrl || '',
    isAcceptingApplications: false, // Hide join CTA section in sidebar

    // Placeholders for fields the backend doesn't return yet
    mission: 'No mission statement provided.',
    coreValues: 'No core values listed.',
    memberCount: 0,
    meetingTime: 'TBD',
    meetingLocation: 'TBD',
    fee: 'TBD',
    executives: [],
    socials: {
      instagram: 'TBD',
      kakao: 'TBD',
      youtube: 'TBD',
    },
  };

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
