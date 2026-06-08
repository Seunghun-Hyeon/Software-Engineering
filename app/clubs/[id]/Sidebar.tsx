import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  MapPin,
  CreditCard,
  Globe,
  MessageCircle,
  Video,
  ArrowRight,
} from 'lucide-react';
import type { ClubDataProps, ClubExecutive } from './types';
import api from '@/lib/axios';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface SidebarSocialLinks {
  instagram?: string;
  youtube?: string;
  kakaotalk?: string;
  website?: string;
  leadership?: { name: string; title: string; avatar?: string }[];
}

export function Sidebar({ clubData }: { clubData: ClubDataProps }) {
  const [dbSocialLinks, setDbSocialLinks] = useState<SidebarSocialLinks | null>(
    null
  );

  useEffect(() => {
    if (clubData.id) {
      api
        .get(`/api/clubs/${clubData.id}`)
        .then((res) => {
          setDbSocialLinks(res.data?.social_links || {});
        })
        .catch((err) => {
          console.error('Failed to fetch fresh social links in Sidebar:', err);
        });
    }
  }, [clubData.id]);

  const club = {
    social_links: dbSocialLinks || {
      instagram:
        clubData.socials?.instagram !== 'TBD'
          ? clubData.socials?.instagram
          : undefined,
      youtube:
        clubData.socials?.youtube !== 'TBD'
          ? clubData.socials?.youtube
          : undefined,
      kakaotalk:
        clubData.socials?.kakao !== 'TBD' ? clubData.socials?.kakao : undefined,
      website:
        clubData.socials?.website !== 'TBD'
          ? clubData.socials?.website
          : undefined,
    },
  };

  console.log('Reading social links:', club.social_links);

  const hasLink = (val?: string | null) => {
    if (val === null || val === undefined) return false;
    const trimmed = val.trim();
    return trimmed !== '' && trimmed !== 'TBD' && trimmed !== 'N/A';
  };

  const getFormatUrl = (url: string, type: string) => {
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    if (type === 'instagram') {
      if (trimmed.startsWith('@')) {
        return `https://instagram.com/${trimmed.substring(1)}`;
      }
      return `https://instagram.com/${trimmed}`;
    }
    return `https://${trimmed}`;
  };

  return (
    <aside className="flex flex-col gap-6 lg:col-span-4">
      {/* Details Section */}
      <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="font-display mb-6 text-xl font-bold text-gray-900">
          Details
        </h3>

        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Meeting Time</p>
              <p className="text-sm font-bold text-gray-900">
                {clubData.meetingTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-sm font-bold text-gray-900">
                {clubData.meetingLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-full bg-[#e1e0ff]/50 p-3 text-[#3323cc]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Membership Fee
              </p>
              <p className="text-sm font-bold text-gray-900">{clubData.fee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join CTA */}
      {clubData.isAcceptingApplications && (
        <div className="flex flex-col items-center rounded-[24px] border-2 border-[#e1e0ff] bg-white p-6 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1e0ff] text-[#3323cc]">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="font-display mb-2 text-2xl font-bold text-gray-900">
            Join {clubData.name}
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            Applications for the Spring semester are currently open. Don&apos;t
            miss out!
          </p>
          <button className="w-full rounded-full bg-[#3323cc] py-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#2a1ca8]">
            Apply Now
          </button>
        </div>
      )}

      {/* Leadership Team */}
      {clubData.executives && clubData.executives.length > 0 && (
        <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-display mb-6 text-xl font-bold text-gray-900">
            Leadership Team
          </h3>
          <ul className="flex flex-col gap-5">
            {clubData.executives.map((exec: ClubExecutive, i: number) => (
              <li key={i} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c3c0ff] bg-[#e1e0ff] text-[#3323cc]">
                  <span className="text-sm font-bold">
                    {exec.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{exec.name}</p>
                  <p className="text-sm font-semibold text-[#3323cc]">
                    {exec.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Links */}
      {(hasLink(club.social_links?.website) ||
        hasLink(club.social_links?.instagram) ||
        hasLink(club.social_links?.kakaotalk) ||
        hasLink(club.social_links?.youtube)) && (
        <div className="flex flex-col gap-2 rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
          {hasLink(club.social_links?.website) && (
            <a
              href={getFormatUrl(club.social_links.website!, 'website')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-black text-white">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">Website</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </a>
          )}

          {hasLink(club.social_links?.instagram) && (
            <a
              href={getFormatUrl(club.social_links.instagram!, 'instagram')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#E1306C] text-white">
                  <InstagramIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  Instagram
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </a>
          )}

          {hasLink(club.social_links?.kakaotalk) && (
            <a
              href={getFormatUrl(club.social_links.kakaotalk!, 'kakaotalk')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border-2 border-yellow-400 text-yellow-400">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  KakaoTalk
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </a>
          )}

          {hasLink(club.social_links?.youtube) && (
            <a
              href={getFormatUrl(club.social_links.youtube!, 'youtube')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[12px] p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-red-600 text-white">
                  <Video className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">YouTube</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-[#4F46E5]" />
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
