'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  UserPlus,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  major: string;
  role: string;
  joinDate: string;
  initials: string;
  avatarColor: string;
  roleColor: string;
}

const roleColors: Record<string, string> = {
  Leader: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  Treasurer: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Committee: 'bg-purple-50 text-purple-600 border-purple-100',
  'Regular Member': 'bg-slate-50 text-slate-600 border-slate-200',
  Member: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function Members() {
  const supabase = createClient();
  const userId = useAuthStore((state) => state.userId);

  const [clubId, setClubId] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Add Member Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [foundUser, setFoundUser] = useState<{
    id: string;
    name: string;
    email: string;
    major: string;
  } | null>(null);
  const [newMemberRole, setNewMemberRole] = useState('Regular Member');
  const todayStr = new Date().toISOString().split('T')[0];
  const [newMemberJoinDate, setNewMemberJoinDate] = useState(todayStr);

  // Edit Member Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editRole, setEditRole] = useState('Regular Member');
  const [editJoinDate, setEditJoinDate] = useState(todayStr);

  const loadClubAndMembers = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data: clubs, error: clubsError } = await supabase
        .from('clubs')
        .select('id')
        .eq('exec_user_id', userId);
      if (clubsError) throw clubsError;
      if (clubs && clubs.length > 0) {
        const currentClubId = clubs[0].id;
        setClubId(currentClubId);
        const { data: membersData, error: membersError } = await supabase
          .from('club_members')
          .select(
            `
            id,
            role,
            joined_at,
            user_id,
            users (
              id,
              name,
              email
            )
          `
          )
          .eq('club_id', currentClubId);
        if (membersError) throw membersError;
        if (membersData) {
          const mapped = (
            membersData as unknown as {
              id: string;
              role: string;
              joined_at: string;
              user_id: string;
              users: { id: string; name: string; email: string } | null;
            }[]
          ).map((m) => {
            const dbName = m.users?.name || '';
            let name = dbName;
            let major = 'Global Leadership School';
            if (dbName.includes('|')) {
              const parts = dbName.split('|');
              name = parts[0].trim();
              major = parts[1].trim();
            }
            const initials =
              name
                .split(' ')
                .map((w: string) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'M';
            return {
              id: m.id,
              userId: m.user_id,
              name,
              email: m.users?.email || '',
              major,
              role: m.role || 'Regular Member',
              joinDate: m.joined_at ? m.joined_at.split('T')[0] : '',
              initials,
              avatarColor: 'bg-indigo-100 text-indigo-600',
              roleColor: roleColors[m.role] || roleColors['Regular Member'],
            };
          });
          setMembers(mapped);
        }
      }
    } catch (err) {
      console.error('Failed to load club members:', err);
      setErrorMsg('Failed to load club members.');
    } finally {
      setIsLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadClubAndMembers().catch(console.error);
  }, [loadClubAndMembers]);

  // Handle Search for Email
  const handleSearchEmail = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setFoundUser(null);

    if (!searchEmail) {
      setErrorMsg('Please enter an email address.');
      return;
    }

    const emailLower = searchEmail.trim().toLowerCase();
    if (
      !emailLower.endsWith('@handong.ac.kr') &&
      !emailLower.endsWith('@handong.edu')
    ) {
      setErrorMsg(
        'Only @handong.ac.kr or @handong.edu email domains are allowed.'
      );
      return;
    }

    setIsSearching(true);
    try {
      // TODO: Connect to GET /api/users?email= when backend adds this endpoint
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('email', emailLower)
        .maybeSingle();

      if (userError) throw userError;

      if (!user) {
        setErrorMsg('No account found with this email address.');
        return;
      }

      const dbName = user.name || '';
      let name = dbName;
      let major = 'Global Leadership School';
      if (dbName.includes('|')) {
        const parts = dbName.split('|');
        name = parts[0].trim();
        major = parts[1].trim();
      }

      setFoundUser({
        id: user.id,
        name,
        email: user.email,
        major,
      });
      setNewMemberRole('Regular Member');
      setNewMemberJoinDate(todayStr);
    } catch (err) {
      console.error('Search user account failed:', err);
      setErrorMsg('Error searching for user account.');
    } finally {
      setIsSearching(false);
    }
  };

  // Add Member
  const handleAddMember = async () => {
    if (!foundUser) return;
    if (!clubId) {
      setErrorMsg(
        'No active club context found. Please ensure you are logged in as a club executive.'
      );
      return;
    }

    // Prevent duplicate memberships
    const isDuplicate = members.some((m) => m.userId === foundUser.id);
    if (isDuplicate) {
      setErrorMsg('This user is already a member of the club.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error: insertError } = await supabase
        .from('club_members')
        .insert({
          club_id: clubId,
          user_id: foundUser.id,
          role: newMemberRole,
          joined_at: newMemberJoinDate
            ? new Date(newMemberJoinDate).toISOString()
            : new Date().toISOString(),
        });

      if (insertError) throw insertError;

      setSuccessMsg('Member successfully added to the club!');
      setIsAddModalOpen(false);
      setSearchEmail('');
      setFoundUser(null);
      loadClubAndMembers();
    } catch (err) {
      console.error('Failed to add member:', err);
      setErrorMsg('Failed to add member to the club.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start Edit Member
  const handleStartEdit = (member: Member) => {
    setEditingMember(member);
    setEditRole(member.role);
    setEditJoinDate(member.joinDate);
    setIsEditModalOpen(true);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Save Edit Member
  const handleSaveEdit = async () => {
    if (!editingMember) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // TODO: Connect to PATCH /api/clubs/:id/members/:memberId when backend adds this endpoint
      const { error: updateError } = await supabase
        .from('club_members')
        .update({
          role: editRole,
          joined_at: new Date(editJoinDate).toISOString(),
        })
        .eq('id', editingMember.id);

      if (updateError) throw updateError;

      setSuccessMsg('Member updated successfully.');
      setIsEditModalOpen(false);
      loadClubAndMembers();
    } catch (err) {
      console.error('Failed to edit member:', err);
      setErrorMsg('Failed to update member.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove Member
  const handleRemove = async (id: string, name: string) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${name} from the club?`
    );
    if (!confirmRemove) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error: deleteError } = await supabase
        .from('club_members')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setSuccessMsg('Member removed successfully.');
      loadClubAndMembers();
    } catch (err) {
      console.error('Failed to remove member:', err);
      setErrorMsg('Failed to remove member.');
    }
  };

  // Filter members by query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <div className="flex flex-1">
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          {/* Header Info */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
                Member Management
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-400">
                View, edit roles, and manage active members in your club.
              </p>
            </div>

            {/* Actions: Add Member & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setFoundUser(null);
                  setSearchEmail('');
                  setIsAddModalOpen(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95"
              >
                <UserPlus className="h-4 w-4" /> Add Member
              </button>

              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-64 rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-xs font-medium shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-3 rounded-[24px] border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-600">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 flex items-start gap-3 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-hidden rounded-[24px] border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    <th className="w-[45%] px-6 py-4">MEMBER NAME</th>
                    <th className="w-[25%] px-6 py-4">ROLE</th>
                    <th className="w-[20%] px-6 py-4">JOIN DATE</th>
                    <th className="w-[10%] px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-sm font-medium text-gray-400"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-[#4F46E5]" />
                          <span>Loading members...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="group transition-colors hover:bg-gray-50/40"
                      >
                        {/* Name & Email */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#4F46E5]/10 bg-indigo-50 text-xs font-bold text-[#4F46E5] shadow-inner">
                              {member.initials}
                            </div>
                            <div>
                              <div className="text-sm font-bold tracking-tight text-gray-800">
                                {member.name}
                              </div>
                              <div className="mt-0.5 text-xs font-medium text-gray-400">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold',
                              member.roleColor
                            )}
                          >
                            {member.role}
                          </span>
                        </td>

                        {/* Join Date */}
                        <td className="px-6 py-4 text-xs font-semibold tracking-wide text-gray-400">
                          {member.joinDate}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3 text-xs font-bold">
                            <button
                              onClick={() => handleStartEdit(member)}
                              className="inline-flex items-center gap-1 text-indigo-600 transition-colors hover:text-indigo-900"
                              title="Edit Member Role / Join Date"
                            >
                              <Edit2 className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              onClick={() =>
                                handleRemove(member.id, member.name)
                              }
                              className="inline-flex items-center gap-1 text-rose-500 transition-colors hover:text-rose-800"
                              title="Remove Member"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-sm font-medium text-gray-400"
                      >
                        No matching members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add New Member Modal (Glassmorphic) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[4px]">
          <div className="animate-in fade-in-50 zoom-in-95 relative w-full max-w-md rounded-[24px] border border-white/30 bg-white/95 p-8 shadow-2xl backdrop-blur-xl duration-150">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="font-display text-lg font-bold tracking-tight text-gray-900">
              Add New Member
            </h2>
            <p className="mb-6 text-xs font-medium text-gray-400">
              Search a university account by email and configure their role.
            </p>

            {errorMsg && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Email lookup input */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  University Email Lookup
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-medium transition outline-none focus:border-[#4F46E5] focus:bg-white"
                    placeholder="e.g. user@handong.ac.kr"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchEmail()}
                  />
                  <button
                    onClick={handleSearchEmail}
                    disabled={isSearching}
                    className="rounded-xl bg-slate-800 px-4 text-xs font-bold text-white transition hover:bg-slate-700 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>

              {/* Account found section */}
              {foundUser && (
                <div className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/30 p-4">
                  <span className="text-[10px] font-bold tracking-wide text-indigo-500 uppercase">
                    Account Details (Read-only)
                  </span>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                    <div className="col-span-2">
                      <span className="block text-[10px] font-medium text-gray-400">
                        Name
                      </span>
                      <span className="font-bold text-gray-800">
                        {foundUser.name}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[10px] font-medium text-gray-400">
                        Email
                      </span>
                      <span className="font-bold text-gray-800">
                        {foundUser.email}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Membership details */}
              {foundUser && (
                <div className="space-y-4 border-t border-gray-100 pt-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Club Role *
                    </label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                    >
                      <option value="Regular Member">Regular Member</option>
                      <option value="Committee">Committee</option>
                      <option value="Treasurer">Treasurer</option>
                      <option value="Leader">Leader</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Join Date
                    </label>
                    <input
                      type="date"
                      value={newMemberJoinDate}
                      onChange={(e) => setNewMemberJoinDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!foundUser || isSubmitting}
                className="rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add to Club'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal (Glassmorphic) */}
      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[4px]">
          <div className="animate-in fade-in-50 zoom-in-95 relative w-full max-w-md rounded-[24px] border border-white/30 bg-white/95 p-8 shadow-2xl backdrop-blur-xl duration-150">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <Edit2 className="h-5 w-5" />
            </div>
            <h2 className="font-display text-lg font-bold tracking-tight text-gray-900">
              Edit Member Info
            </h2>
            <p className="mb-6 text-xs font-medium text-gray-400">
              Update member role and joined date. User details are read-only.
            </p>

            {errorMsg && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-600">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Read-only User Details */}
              <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <span className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                  Member Profile (Read-only)
                </span>

                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                  <div className="col-span-2">
                    <span className="block text-[10px] font-medium text-gray-400">
                      Name
                    </span>
                    <span className="font-bold text-gray-800">
                      {editingMember.name}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[10px] font-medium text-gray-400">
                      Email
                    </span>
                    <span className="font-bold text-gray-800">
                      {editingMember.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4 border-t border-gray-100 pt-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Club Role *
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  >
                    <option value="Regular Member">Regular Member</option>
                    <option value="Committee">Committee</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Leader">Leader</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={editJoinDate}
                    onChange={(e) => setEditJoinDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-xs font-semibold text-gray-600 transition outline-none focus:border-[#4F46E5] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSubmitting}
                className="rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
