'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { Shield, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Membership {
  clubName: string;
  categoryName: string;
  role: string;
}

export default function MyClubsTab() {
  const supabase = createClient();
  const userId = useAuthStore((state) => state.userId);

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyClubs = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setErrorMsg(null);

      try {
        // TODO: Connect to GET /api/clubs/my-clubs when backend adds this endpoint
        const { data, error } = await supabase
          .from('club_members')
          .select(
            `
            role,
            clubs (
              name,
              categories (
                name
              )
            )
          `
          )
          .eq('user_id', userId);

        if (error) throw error;

        if (data) {
          const mapped: Membership[] = (
            data as unknown as {
              role: string;
              clubs: {
                name: string;
                categories: { name: string } | null;
              } | null;
            }[]
          ).map((item) => ({
            clubName: item.clubs?.name || 'Unknown Club',
            categoryName: item.clubs?.categories?.name || 'Uncategorized',
            role: item.role || 'Member',
          }));
          setMemberships(mapped);
        }
      } catch (err) {
        console.error('Failed to load my clubs:', err);
        setErrorMsg('Failed to load club memberships.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyClubs();
  }, [userId, supabase]);

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'leader':
      case 'president':
      case 'club president':
        return 'bg-indigo-50 text-[#4F46E5] border-indigo-100';
      case 'treasurer':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'committee':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900">
          My Club Memberships
        </h2>
        <p className="mt-1 text-sm font-medium text-gray-400">
          View all the student organizations and clubs you currently participate
          in.
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-[24px] border border-white/30 bg-white/70 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin text-[#4F46E5]" />
            <span>Loading your clubs...</span>
          </div>
        </div>
      ) : errorMsg ? (
        <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 text-center text-sm font-semibold text-red-600">
          {errorMsg}
        </div>
      ) : memberships.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberships.map((membership, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    {membership.categoryName}
                  </span>
                  <Shield className="h-4 w-4 text-[#4F46E5]/40" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-gray-800">
                    {membership.clubName}
                  </h3>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100/50 pt-4">
                <span className="text-[11px] font-medium text-gray-400">
                  Role Profile
                </span>
                <span
                  className={cn(
                    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase',
                    getRoleBadgeColor(membership.role)
                  )}
                >
                  {membership.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[24px] border border-white/30 bg-white/70 p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <div className="mb-4 rounded-full border border-slate-100 bg-slate-50 p-4 text-slate-400">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800">No Memberships</h3>
          <p className="mt-1 max-w-xs text-sm font-medium text-gray-400">
            You are not currently a member of any clubs. Explore clubs on the
            main page to join them!
          </p>
        </div>
      )}
    </div>
  );
}
