import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { HeroProfile } from '@/app/clubs/[id]/HeroProfile';
import { ClubContent } from '@/app/clubs/[id]/ClubContent';
import { headers } from 'next/headers';

interface Article {
  id: string;
  date: string;
  title: string;
  type: string;
  url?: string;
  content?: string;
  summary?: string;
}

interface GalleryItem {
  type: string;
  url: string;
}

interface ApiClub {
  id: string;
  name: string;
  categories: { name: string } | null;
  description?: string;
  logo_url?: string;
  cover_image_url?: string;
  is_recruiting?: boolean;
  mission?: string;
  history?: string;
  core_values?: string[] | string;
  memberCount?: number;
  meeting_schedule?: string;
  meeting_location?: string;
  membership_fee?: string;
  executives?: { name: string; role: string; avatar?: string }[];
  social_links?: {
    instagram?: string;
    kakao?: string;
    youtube?: string;
    website?: string;
    leadership?: { name: string; title: string; avatar?: string }[];
  };
  articles?: Article[];
  gallery?: GalleryItem[];
}

export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let apiEndpoint = '';
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    apiEndpoint = serverUrl.endsWith('/api')
      ? `${serverUrl}/clubs`
      : `${serverUrl}/api/clubs`;
  } else {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol =
      host.includes('localhost') || host.includes('127.0.0.1')
        ? 'http'
        : 'https';
    apiEndpoint = `${protocol}://${host}/api/clubs`;
  }

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
    logo: foundClub.logo_url || '',
    heroImage: foundClub.cover_image_url || '',
    isAcceptingApplications: foundClub.is_recruiting ?? false,
    mission: foundClub.mission || 'No mission statement provided.',
    history: foundClub.history || 'No history provided.',
    coreValues: Array.isArray(foundClub.core_values)
      ? foundClub.core_values
      : typeof foundClub.core_values === 'string'
        ? foundClub.core_values
            .split(',')
            .map((v: string) => v.trim())
            .filter(Boolean)
        : 'No core values listed.',
    memberCount: foundClub.memberCount || 0,
    meetingTime: foundClub.meeting_schedule || 'TBD',
    meetingLocation: foundClub.meeting_location || 'TBD',
    fee: foundClub.membership_fee || 'TBD',
    executives: Array.isArray(foundClub.social_links?.leadership)
      ? foundClub.social_links.leadership.map(
          (ex: { name: string; title: string }) => ({
            name: ex.name || '',
            role: ex.title || '',
          })
        )
      : Array.isArray(foundClub.executives)
        ? foundClub.executives.map((ex: { name: string; role: string }) => ({
            name: ex.name || '',
            role: ex.role || '',
          }))
        : [],
    socials: {
      instagram: foundClub.social_links?.instagram || 'TBD',
      kakao: foundClub.social_links?.kakao || 'TBD',
      youtube: foundClub.social_links?.youtube || 'TBD',
      website: foundClub.social_links?.website || 'TBD',
    },
    articles: foundClub.articles || [],
    gallery: foundClub.gallery || [],
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
