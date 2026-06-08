/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Archive,
  Plus,
  X,
  Edit2,
  Image as ImageIcon,
  Video,
  Globe,
  MessageCircle,
  Upload,
  Loader2,
} from 'lucide-react';
import api from '@/lib/axios';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

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

function YoutubeIcon({ className }: { className?: string }) {
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
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

interface ClubData {
  id: string;
  name: string;
  description?: string;
  is_recruiting?: boolean;
  exec_user_id: string;
  category?: string;
  category_id?: string;
  mission?: string;
  history?: string;
  cover_image_url?: string;
  logo_url?: string;
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
  core_values?: string[] | string;
}

interface Category {
  id: string;
  name: string;
}

interface ExecutiveMember {
  name: string;
  role: string;
  avatar: string;
}

function getUserIdFromToken(token: string | null): string | null {
  if (!token || typeof window === 'undefined') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.sub || null;
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
}

function isValidUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === 'N/A' || trimmed === '') return false;
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/')
  );
}

export default function SettingsTab() {
  const token = useAuthStore((state) => state.token);
  const userId = getUserIdFromToken(token);
  const router = useRouter();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'danger'>(
    'profile'
  );
  const [clubId, setClubId] = useState<string | null>(null);

  const [dbUsers, setDbUsers] = useState<
    { id: string; name: string | null; email: string; role: string | null }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Dynamic Categories from API
  const [categories, setCategories] = useState<Category[]>([]);

  // Extended Club Info editor fields mapping DB schema properties
  const [clubInfo, setClubInfo] = useState({
    name: '',
    description: '',
    category: '',
    mission: '',
    history: '',
    instagram: '',
    kakao: '',
    youtube: '',
    website: '',
    cover_image_url: '',
    logo_url: '',
    core_values: [] as string[],
    meeting_schedule: '',
    meeting_location: '',
    membership_fee: '',
  });

  // Multiple executives state
  const [executives, setExecutives] = useState<ExecutiveMember[]>([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberIdx, setEditingMemberIdx] = useState<number | null>(null);
  const [newMember, setNewMember] = useState<ExecutiveMember>({
    name: '',
    role: '',
    avatar: '',
  });

  // Club members list fetched from Supabase
  const [clubMembers, setClubMembers] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  // Currently selected member ID for adding/editing leadership members
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');

  // Core Value Input State
  const [newCoreValue, setNewCoreValue] = useState('');

  // Fetch categories and current club configuration on page load to pre-fill all fields
  useEffect(() => {
    if (token && userId) {
      Promise.resolve().then(() => {
        setIsLoading(true);
        setErrorMsg(null);
      });

      const categoriesPromise = api.get('/categories').catch((err) => {
        console.error('Failed to load categories:', err);
        return { data: [] }; // fallback to empty array if categories fetch fails
      });

      const clubsPromise = api.get('/api/clubs/');

      const supabase = createClient();

      Promise.all([categoriesPromise, clubsPromise])
        .then(async ([categoriesRes, clubsRes]) => {
          const fetchedCategories = categoriesRes.data;
          if (Array.isArray(fetchedCategories)) {
            setCategories(fetchedCategories);
          }

          const clubs = clubsRes.data;
          console.log('clubs:', clubs, 'userId:', userId);

          if (Array.isArray(clubs)) {
            const myClubSummary = clubs.find(
              (c: ClubData) => c.exec_user_id === userId
            );
            if (myClubSummary) {
              setClubId(myClubSummary.id);

              const clubDetailRes = await api.get(
                `/api/clubs/${myClubSummary.id}`
              );
              const myClub = clubDetailRes.data;

              // Restrict candidate list to members of the current club
              const { data: membersData, error: membersError } = await supabase
                .from('club_members')
                .select('user_id, users(id, name, email, role)')
                .eq('club_id', myClub.id);

              if (membersError) {
                console.error(
                  'Failed to load club members for settings:',
                  membersError
                );
              } else if (Array.isArray(membersData)) {
                // Extract all members
                const allMembers = (
                  membersData as unknown as {
                    users: {
                      id: string;
                      name: string | null;
                      email: string;
                      role: string | null;
                    } | null;
                  }[]
                )
                  .map((m) => m.users)
                  .filter(
                    (
                      u
                    ): u is {
                      id: string;
                      name: string | null;
                      email: string;
                      role: string | null;
                    } => u !== null
                  )
                  .map((u) => {
                    const dbName = u.name || '';
                    let name = dbName;
                    if (dbName.includes('|')) {
                      name = dbName.split('|')[0].trim();
                    }
                    if (!name) {
                      name = u.email || 'No Name';
                    }
                    return {
                      id: u.id,
                      name,
                      email: u.email,
                    };
                  });
                setClubMembers(allMembers);

                // Extract unique users, filter out current owner for Transfer Ownership
                const candidateUsers = (
                  membersData as unknown as {
                    users: {
                      id: string;
                      name: string | null;
                      email: string;
                      role: string | null;
                    } | null;
                  }[]
                )
                  .map((m) => m.users)
                  .filter(
                    (
                      u
                    ): u is {
                      id: string;
                      name: string | null;
                      email: string;
                      role: string | null;
                    } => u !== null && u.id !== userId
                  )
                  .map((u) => {
                    const dbName = u.name || '';
                    let name = dbName;
                    if (dbName.includes('|')) {
                      name = dbName.split('|')[0].trim();
                    }
                    if (!name) {
                      name = u.email || 'No Name';
                    }
                    return {
                      id: u.id,
                      name,
                      email: u.email,
                      role: u.role,
                    };
                  });
                setDbUsers(candidateUsers);
                if (candidateUsers.length > 0) {
                  setSelectedUserId(candidateUsers[0].id);
                }
              }

              // Match the club's category_id with the correct category name
              let matchedCategoryName = '';
              if (Array.isArray(fetchedCategories)) {
                const foundCat = fetchedCategories.find(
                  (cat: Category) => cat.id === myClub.category_id
                );
                if (foundCat) {
                  matchedCategoryName = foundCat.name;
                }
              }

              setClubInfo({
                name: myClub.name || '',
                description: myClub.description || '',
                category: matchedCategoryName || myClub.category || '',
                mission: myClub.mission || '',
                history: myClub.history || '',
                instagram: myClub.social_links?.instagram || '',
                kakao:
                  myClub.social_links?.kakaotalk ||
                  myClub.social_links?.kakao ||
                  '',
                youtube: myClub.social_links?.youtube || '',
                website: myClub.social_links?.website || '',
                cover_image_url: myClub.cover_image_url || '',
                logo_url: myClub.logo_url || '',
                core_values: Array.isArray(myClub.core_values)
                  ? myClub.core_values
                  : typeof myClub.core_values === 'string'
                    ? myClub.core_values
                        .split(',')
                        .map((v: string) => v.trim())
                        .filter(Boolean)
                    : [],
                meeting_schedule: myClub.meeting_schedule || '',
                meeting_location: myClub.meeting_location || '',
                membership_fee: myClub.membership_fee || '',
              });

              // Load leadership from social_links?.leadership or fall back to executives
              const leadershipFromSocialLinks = myClub.social_links?.leadership;
              setExecutives(
                Array.isArray(leadershipFromSocialLinks)
                  ? leadershipFromSocialLinks.map(
                      (ex: {
                        name?: string;
                        title?: string;
                        role?: string;
                        avatar?: string;
                      }) => ({
                        name: ex.name || '',
                        role: ex.title || ex.role || '',
                        avatar: ex.avatar || '',
                      })
                    )
                  : Array.isArray(myClub.executives)
                    ? myClub.executives.map(
                        (ex: {
                          name?: string;
                          role?: string;
                          avatar?: string;
                        }) => ({
                          name: ex.name || '',
                          role: ex.role || '',
                          avatar: ex.avatar || '',
                        })
                      )
                    : []
              );
            } else {
              setErrorMsg('No club found for your account');
            }
          } else {
            setErrorMsg('Failed to parse club data: Response is not an array.');
          }
        })
        .catch((err) => {
          console.error('Failed to load settings data:', err);
          let specificMessage = 'Unknown error';
          if (axios.isAxiosError(err)) {
            const data = err.response?.data;
            if (data) {
              if (typeof data.error === 'string') {
                specificMessage = data.error;
              } else if (data.error && typeof data.error === 'object') {
                const fieldErrors = data.error.fieldErrors;
                if (fieldErrors && typeof fieldErrors === 'object') {
                  const messages = Object.entries(fieldErrors).map(
                    ([field, msgs]) => {
                      const fieldName = field.replace('_', ' ');
                      const msgStr = Array.isArray(msgs)
                        ? msgs.join(', ')
                        : String(msgs);
                      return `${fieldName}: ${msgStr}`;
                    }
                  );
                  if (messages.length > 0) {
                    specificMessage = messages.join('; ');
                  } else if (data.error.message) {
                    specificMessage = String(data.error.message);
                  } else {
                    specificMessage = JSON.stringify(data.error);
                  }
                } else if (data.error.message) {
                  specificMessage = String(data.error.message);
                } else {
                  specificMessage = JSON.stringify(data.error);
                }
              } else if (typeof data.message === 'string') {
                specificMessage = data.message;
              } else {
                specificMessage = JSON.stringify(data);
              }
            } else {
              specificMessage = err.message;
            }
          } else if (err instanceof Error) {
            specificMessage = err.message;
          }
          setErrorMsg(`Failed to load club settings: ${specificMessage}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [token, userId]);

  function getFriendlyErrorMessage(err: unknown): string {
    let friendlyMessage = 'Unknown error';
    if (axios.isAxiosError(err)) {
      const data = err.response?.data;
      if (data) {
        if (typeof data.error === 'string') {
          friendlyMessage = data.error;
        } else if (data.error && typeof data.error === 'object') {
          const fieldErrors = data.error.fieldErrors;
          if (fieldErrors && typeof fieldErrors === 'object') {
            const messages = Object.entries(fieldErrors).map(
              ([field, msgs]) => {
                const fieldName = field.replace('_', ' ');
                const msgStr = Array.isArray(msgs)
                  ? msgs.join(', ')
                  : String(msgs);
                return `${fieldName}: ${msgStr}`;
              }
            );
            if (messages.length > 0) {
              friendlyMessage = messages.join('; ');
            } else if (data.error.message) {
              friendlyMessage = String(data.error.message);
            } else {
              friendlyMessage = JSON.stringify(data.error);
            }
          } else if (data.error.message) {
            friendlyMessage = String(data.error.message);
          } else {
            friendlyMessage = JSON.stringify(data.error);
          }
        } else if (typeof data.message === 'string') {
          friendlyMessage = data.message;
        } else {
          friendlyMessage = JSON.stringify(data);
        }
      } else {
        friendlyMessage = err.message;
      }
    } else if (err instanceof Error) {
      friendlyMessage = err.message;
    }
    return friendlyMessage;
  }

  // Save handlers for individual sections
  const handleSaveClubInfo = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const categoryToSend = clubInfo.category?.trim();
      const selectedCat = categoryToSend
        ? categories.find((cat) => cat.name === categoryToSend)
        : null;
      const categoryIdToSend = selectedCat ? selectedCat.id : '';

      const coreValuesToSend =
        clubInfo.core_values.length > 0
          ? clubInfo.core_values.map((v) => v?.trim()).filter(Boolean)
          : [];

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        name: clubInfo.name?.trim() || '',
        description: clubInfo.description?.trim() || '',
        mission: clubInfo.mission?.trim() || '',
        history: clubInfo.history?.trim() || '',
        core_values: coreValuesToSend,
        category_id: categoryIdToSend,
      });
      setSuccessMsg('Club Information saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save club info:', err);
      setErrorMsg(
        `Failed to save Club Information: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClubDetails = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        meeting_schedule: clubInfo.meeting_schedule?.trim() || '',
        meeting_location: clubInfo.meeting_location?.trim() || '',
        membership_fee: clubInfo.membership_fee?.trim() || '',
      });
      setSuccessMsg('Club Details saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save club details:', err);
      setErrorMsg(
        `Failed to save Club Details: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLeadership = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const executivesToSend = executives.map((ex) => {
        const item: { name: string; title: string; avatar?: string } = {
          name: ex.name?.trim() || '',
          title: ex.role?.trim() || '',
        };
        if (
          ex.avatar &&
          (ex.avatar.startsWith('http://') || ex.avatar.startsWith('https://'))
        ) {
          item.avatar = ex.avatar.trim();
        }
        return item;
      });

      const payload = {
        instagram: clubInfo.instagram?.trim() || '',
        youtube: clubInfo.youtube?.trim() || '',
        kakaotalk: clubInfo.kakao?.trim() || '',
        website: clubInfo.website?.trim() || '',
        leadership: executivesToSend,
      };

      console.log('Saving social links:', payload);

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        social_links: payload,
      });
      setSuccessMsg('Leadership Team saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save leadership team:', err);
      setErrorMsg(
        `Failed to save Leadership Team: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSocialLinks = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const executivesToSend = executives.map((ex) => {
        const item: { name: string; title: string; avatar?: string } = {
          name: ex.name?.trim() || '',
          title: ex.role?.trim() || '',
        };
        if (
          ex.avatar &&
          (ex.avatar.startsWith('http://') || ex.avatar.startsWith('https://'))
        ) {
          item.avatar = ex.avatar.trim();
        }
        return item;
      });

      const payload = {
        instagram: clubInfo.instagram?.trim() || '',
        youtube: clubInfo.youtube?.trim() || '',
        kakaotalk: clubInfo.kakao?.trim() || '',
        website: clubInfo.website?.trim() || '',
        leadership: executivesToSend,
      };

      console.log('Saving social links:', payload);

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        social_links: payload,
      });
      setSuccessMsg('Social Channels and Links saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save social links:', err);
      setErrorMsg(
        `Failed to save Social Channels and Links: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClubAssets = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const payload: { cover_image_url?: string; logo_url?: string } = {};
      if (clubInfo.cover_image_url && isValidUrl(clubInfo.cover_image_url)) {
        payload.cover_image_url = clubInfo.cover_image_url.trim();
      }
      if (clubInfo.logo_url && isValidUrl(clubInfo.logo_url)) {
        payload.logo_url = clubInfo.logo_url.trim();
      }

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, payload);
      setSuccessMsg('Club Assets Preview saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save club assets:', err);
      setErrorMsg(
        `Failed to save Club Assets Preview: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCoverUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/upload?bucket=club_banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const returnedUrl = response.data?.url;
      if (returnedUrl && typeof returnedUrl === 'string') {
        setClubInfo((prev) => ({ ...prev, cover_image_url: returnedUrl }));
        setSuccessMsg('Cover image uploaded successfully');
      } else {
        throw new Error('No image URL returned from upload.');
      }
    } catch (err) {
      setErrorMsg(`Failed to upload cover image: ${getFriendlyErrorMessage(err)}`);
    } finally {
      setIsCoverUploading(false);
      e.target.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      try {
        // Connected to POST /api/upload
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const returnedUrl =
          response.data?.url ||
          response.data?.secure_url ||
          response.data?.fileUrl ||
          response.data;
        if (returnedUrl && typeof returnedUrl === 'string') {
          setClubInfo((prev) => ({
            ...prev,
            logo_url: returnedUrl,
          }));
          setSuccessMsg('Logo uploaded successfully');
        } else {
          throw new Error(
            'Invalid response format: No image URL returned from upload endpoint.'
          );
        }
      } catch (err) {
        console.error('Failed to upload logo:', err);
        setErrorMsg(`Failed to upload logo: ${getFriendlyErrorMessage(err)}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // TODO: Connect to PATCH /api/clubs/:id/transfer when backend adds this endpoint
  const handleTransferOwnership = async () => {
    if (!userId) {
      setErrorMsg('User session expired. Please log in again.');
      return;
    }
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    if (!selectedUserId) {
      setErrorMsg('Please select a member to transfer ownership to.');
      return;
    }

    const selectedUserObj = dbUsers.find((u) => u.id === selectedUserId);
    const targetName = selectedUserObj
      ? selectedUserObj.name || selectedUserObj.email
      : 'the selected member';

    const confirmTransfer = window.confirm(
      `WARNING: You are about to transfer ownership of this club to ${targetName}.\n\n` +
        `Once completed:\n` +
        `1. You will lose all manager access to this club.\n` +
        `2. ${targetName} will become the new club leader.\n` +
        `3. You will be redirected to the student experience.\n\n` +
        `Are you sure you want to proceed?`
    );

    if (!confirmTransfer) return;

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const supabase = createClient();

    try {
      // 1. Update club's exec_user_id to the new leader in clubs table
      const { error: clubUpdateError } = await supabase
        .from('clubs')
        .update({ exec_user_id: selectedUserId })
        .eq('id', clubId);

      if (clubUpdateError) {
        throw new Error(
          `Failed to update club owner: ${clubUpdateError.message}`
        );
      }

      // 2. Grant executive/manager role to the new leader in users table
      const { error: newLeaderUpdateError } = await supabase
        .from('users')
        .update({ role: 'executive' })
        .eq('id', selectedUserId);

      if (newLeaderUpdateError) {
        console.error(
          'Failed to update new leader role:',
          newLeaderUpdateError
        );
      }

      // 2b. Update the selected member's role to 'Leader' in the club_members table
      const { data: newMemberRow, error: newMemberCheckError } = await supabase
        .from('club_members')
        .select('id')
        .eq('club_id', clubId)
        .eq('user_id', selectedUserId)
        .maybeSingle();

      if (newMemberCheckError) {
        console.error(
          'Failed to query new leader club membership:',
          newMemberCheckError
        );
      }

      if (newMemberRow) {
        const { error: newLeaderRoleError } = await supabase
          .from('club_members')
          .update({ role: 'Leader' })
          .eq('id', newMemberRow.id);
        if (newLeaderRoleError) {
          console.error(
            'Failed to update new leader role in club_members:',
            newLeaderRoleError
          );
        }
      } else {
        const { error: newLeaderInsertError } = await supabase
          .from('club_members')
          .insert({
            club_id: clubId,
            user_id: selectedUserId,
            role: 'Leader',
            joined_at: new Date().toISOString(),
          });
        if (newLeaderInsertError) {
          console.error(
            'Failed to insert new leader to club_members:',
            newLeaderInsertError
          );
        }
      }

      // 2c. Update or insert the former leader's role to 'Regular Member' in the club_members table
      const { data: formerMemberRow, error: formerMemberCheckError } =
        await supabase
          .from('club_members')
          .select('id')
          .eq('club_id', clubId)
          .eq('user_id', userId)
          .maybeSingle();

      if (formerMemberCheckError) {
        console.error(
          'Failed to query former leader club membership:',
          formerMemberCheckError
        );
      }

      if (formerMemberRow) {
        const { error: formerLeaderRoleError } = await supabase
          .from('club_members')
          .update({ role: 'Regular Member' })
          .eq('id', formerMemberRow.id);
        if (formerLeaderRoleError) {
          console.error(
            'Failed to update former leader role to Regular Member:',
            formerLeaderRoleError
          );
        }
      } else {
        const { error: formerLeaderInsertError } = await supabase
          .from('club_members')
          .insert({
            club_id: clubId,
            user_id: userId,
            role: 'Regular Member',
            joined_at: new Date().toISOString(),
          });
        if (formerLeaderInsertError) {
          console.error(
            'Failed to insert former leader to club_members:',
            formerLeaderInsertError
          );
        }
      }

      // 3. Check if the former leader still has other clubs under management
      const { data: otherClubs, error: otherClubsError } = await supabase
        .from('clubs')
        .select('id')
        .eq('exec_user_id', userId);

      if (otherClubsError) {
        console.error(
          'Failed to check other clubs for former leader:',
          otherClubsError
        );
      }

      const stillExecutive = !!(otherClubs && otherClubs.length > 0);

      // 4. Downgrade former leader's role to student if they manage no other clubs
      if (!stillExecutive) {
        const { error: formerLeaderUpdateError } = await supabase
          .from('users')
          .update({ role: 'student' })
          .eq('id', userId);

        if (formerLeaderUpdateError) {
          console.error(
            'Failed to downgrade former leader role:',
            formerLeaderUpdateError
          );
        }
      }

      // 5. Update local Zustand state
      useAuthStore.setState({
        isExecutive: stillExecutive,
        role: stillExecutive ? 'club_executive' : 'student',
        activeRole: 'student',
      });

      alert(`Ownership has been successfully transferred to ${targetName}.`);

      // 6. Redirect to the student experience
      router.push('/');
    } catch (err) {
      console.error('Transfer ownership failed:', err);
      const msg =
        err instanceof Error ? err.message : 'Unknown error during transfer';
      setErrorMsg(`Transfer ownership failed: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Leadership Add/Edit triggers
  const handleMemberAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewMember((prev) => ({
            ...prev,
            avatar: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    if (editingMemberIdx !== null) {
      setExecutives((prev) =>
        prev.map((m, idx) => (idx === editingMemberIdx ? newMember : m))
      );
      setEditingMemberIdx(null);
    } else {
      setExecutives((prev) => [...prev, newMember]);
      // TODO: Connect to PATCH /api/clubs/:id/leadership when backend adds this endpoint
    }

    setNewMember({ name: '', role: '', avatar: '' });
    setSelectedMemberId('');
    setIsAddingMember(false);
  };

  const handleEditMember = (idx: number) => {
    const memberToEdit = executives[idx];
    setNewMember(memberToEdit);
    const found = clubMembers.find((m) => m.name === memberToEdit.name);
    setSelectedMemberId(found ? found.id : '');
    setEditingMemberIdx(idx);
    setIsAddingMember(true);
  };

  const handleDeleteMember = (idx: number) => {
    setExecutives((prev) => prev.filter((_, i) => i !== idx));
    // TODO: Connect to PATCH /api/clubs/:id/leadership when backend adds this endpoint
  };

  // Reusable Classes mapping Glassmorphism guidelines
  const bentoCardClass =
    'rounded-[24px] border border-white/30 bg-white/70 backdrop-blur-md p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]';
  const labelClass =
    'mb-2 block text-xs font-semibold text-gray-500 tracking-wide uppercase font-sans';
  const inputClass =
    'w-full rounded-[16px] border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-800 transition outline-none focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-[#4F46E5]/20';
  const selectClass =
    'w-full rounded-[16px] border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-800 transition outline-none focus:border-[#4F46E5] focus:bg-white cursor-pointer';
  const primaryBtnClass =
    'rounded-full bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition hover:bg-[#4338CA] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5';
  const secondaryBtnClass =
    'rounded-full border border-gray-200 bg-white/30 hover:bg-white/80 transition px-4 py-2 text-xs font-bold text-gray-600 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5';

  return (
    <div className="w-full font-sans text-slate-900 antialiased">
      <div className="w-full">
        {/* Title and Top Header Actions */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">
              Executive Settings
            </h1>
            <p className="mt-1 text-sm leading-relaxed font-medium text-gray-400">
              Manage your club&apos;s lifecycle and administrative settings.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mb-8 flex items-center gap-6 border-b border-gray-200/60 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'profile'
                ? 'text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Club Profile
            {activeSubTab === 'profile' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('danger')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'danger'
                ? 'text-rose-600'
                : 'text-gray-400 hover:text-rose-400'
            )}
          >
            Danger Zone
            {activeSubTab === 'danger' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-rose-600" />
            )}
          </button>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="animate-in fade-in mb-6 rounded-[16px] border border-red-100 bg-red-50 p-4 text-xs font-semibold text-red-600">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="animate-in fade-in mb-6 rounded-[16px] border border-emerald-100 bg-emerald-50 p-4 text-xs font-semibold text-emerald-600">
            {successMsg}
          </div>
        )}

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent"></div>
          </div>
        ) : activeSubTab === 'profile' ? (
          <>
            <div className="mb-6 rounded-[24px] border border-indigo-100/60 bg-indigo-50/50 p-4 text-sm font-semibold text-[#4F46E5] backdrop-blur-md">
              The information below is what students currently see on your club
              profile. Edit and save to update it.
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* Left Column Fields */}
              <div className="space-y-6 lg:col-span-2">
                {/* Club Info Section */}
                <div className={bentoCardClass}>
                  <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
                    Club Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Club Name</label>
                      <input
                        type="text"
                        value={clubInfo.name}
                        onChange={(e) =>
                          setClubInfo({ ...clubInfo, name: e.target.value })
                        }
                        className={inputClass}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        rows={4}
                        value={clubInfo.description}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            description: e.target.value,
                          })
                        }
                        className={cn(inputClass, 'resize-none')}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Mission</label>
                      <textarea
                        rows={4}
                        value={clubInfo.mission}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            mission: e.target.value,
                          })
                        }
                        placeholder="Enter the club's mission statement..."
                        className={cn(inputClass, 'resize-none')}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>History</label>
                      <textarea
                        rows={4}
                        value={clubInfo.history}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            history: e.target.value,
                          })
                        }
                        placeholder="Enter the club's history..."
                        className={cn(inputClass, 'resize-none')}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Core Values tags section */}
                    <div>
                      <label className={labelClass}>Core Values</label>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {clubInfo.core_values.map((val, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5]/10 px-3.5 py-1.5 text-xs font-semibold text-[#4F46E5]"
                          >
                            {val}
                            <button
                              type="button"
                              onClick={() => {
                                setClubInfo((prev) => ({
                                  ...prev,
                                  core_values: prev.core_values.filter(
                                    (_, i) => i !== idx
                                  ),
                                }));
                              }}
                              className="text-[#4F46E5] transition outline-none hover:text-[#4338CA]"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        {clubInfo.core_values.length === 0 && (
                          <span className="text-xs font-medium text-gray-400">
                            No core values tags added.
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCoreValue}
                          onChange={(e) => setNewCoreValue(e.target.value)}
                          placeholder="Add a new core value..."
                          className={inputClass}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newCoreValue.trim()) {
                                setClubInfo((prev) => ({
                                  ...prev,
                                  core_values: [
                                    ...prev.core_values,
                                    newCoreValue.trim(),
                                  ],
                                }));
                                setNewCoreValue('');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newCoreValue.trim()) {
                              setClubInfo((prev) => ({
                                ...prev,
                                core_values: [
                                  ...prev.core_values,
                                  newCoreValue.trim(),
                                ],
                              }));
                              setNewCoreValue('');
                            }
                          }}
                          className={primaryBtnClass}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Club Category */}
                    <div>
                      <label className={labelClass}>Club Category</label>
                      <select
                        value={clubInfo.category}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            category: e.target.value,
                          })
                        }
                        className={selectClass}
                        disabled={isLoading}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveClubInfo}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className={bentoCardClass}>
                  <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
                    Club Details
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Meeting Schedule</label>
                      <input
                        type="text"
                        value={clubInfo.meeting_schedule}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            meeting_schedule: e.target.value,
                          })
                        }
                        placeholder="e.g. Thursdays @ 6:00 PM"
                        className={inputClass}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Meeting Location</label>
                      <input
                        type="text"
                        value={clubInfo.meeting_location}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            meeting_location: e.target.value,
                          })
                        }
                        placeholder="e.g. Oseok Hall, Room 402"
                        className={inputClass}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Membership Fee</label>
                      <input
                        type="text"
                        value={clubInfo.membership_fee}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            membership_fee: e.target.value,
                          })
                        }
                        placeholder="e.g. ₩20,000 / Semester"
                        className={inputClass}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveClubDetails}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Leadership Section */}
                <div className={bentoCardClass}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-gray-900">
                      Leadership Team
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMemberIdx(null);
                        setNewMember({ name: '', role: '', avatar: '' });
                        setIsAddingMember(!isAddingMember);
                      }}
                      className={secondaryBtnClass}
                    >
                      <Plus size={14} /> Add Member
                    </button>
                  </div>

                  {isAddingMember && (
                    <form
                      onSubmit={handleSaveMember}
                      className="animate-in fade-in mb-6 space-y-4 border-b border-gray-100 pb-6"
                    >
                      <h3 className="font-sans text-xs font-bold text-gray-700">
                        {editingMemberIdx !== null
                          ? 'Edit Leader Details'
                          : 'Add New Leader'}
                      </h3>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className={labelClass}>Select Member</label>
                          <select
                            value={selectedMemberId}
                            onChange={(e) => {
                              const mId = e.target.value;
                              setSelectedMemberId(mId);
                              const found = clubMembers.find(
                                (m) => m.id === mId
                              );
                              if (found) {
                                setNewMember({
                                  ...newMember,
                                  name: found.name,
                                });
                              } else {
                                setNewMember({
                                  ...newMember,
                                  name: '',
                                });
                              }
                            }}
                            className={selectClass}
                            required
                          >
                            <option value="">Select a member</option>
                            {clubMembers.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {(selectedMemberId || newMember.name) && (
                          <div>
                            <label className={labelClass}>Role / Title</label>
                            <input
                              type="text"
                              value={newMember.role}
                              onChange={(e) =>
                                setNewMember({
                                  ...newMember,
                                  role: e.target.value,
                                })
                              }
                              placeholder="e.g. President"
                              className={inputClass}
                              required
                            />
                          </div>
                        )}
                      </div>

                      {(selectedMemberId || newMember.name) && (
                        <div>
                          <label className={labelClass}>Profile Picture</label>
                          <div className="flex items-center gap-4">
                            {newMember.avatar && (
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200">
                                <img
                                  src={newMember.avatar}
                                  alt="New member thumbnail"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/20 px-4 py-2.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-50">
                              <Upload size={14} />
                              Choose Picture File
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMemberAvatarUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingMember(false);
                            setSelectedMemberId('');
                            setNewMember({ name: '', role: '', avatar: '' });
                          }}
                          className={secondaryBtnClass}
                        >
                          Cancel
                        </button>
                        {(selectedMemberId || newMember.name) && (
                          <button type="submit" className={primaryBtnClass}>
                            Save Member
                          </button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* Executives List Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {executives.map((exec, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white/50 p-4 shadow-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#4F46E5]/20 bg-indigo-50 text-xs font-bold text-[#4F46E5]">
                            {exec.avatar ? (
                              <img
                                src={exec.avatar}
                                alt={exec.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              exec.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-bold text-gray-800">
                              {exec.name}
                            </h4>
                            <p className="truncate text-xs font-medium text-gray-400">
                              {exec.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditMember(idx)}
                            className="p-1 text-gray-400 transition hover:text-gray-600"
                            title="Edit member"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(idx)}
                            className="p-1 text-red-400 transition hover:text-red-600"
                            title="Delete member"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {executives.length === 0 && (
                      <p className="col-span-2 py-4 text-center text-xs font-medium text-gray-400">
                        No leadership team members added.
                      </p>
                    )}
                  </div>
                  {/* TODO: Connect to PATCH /api/clubs/:id/leadership when backend adds this endpoint */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveLeadership}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className={bentoCardClass}>
                  <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
                    Social Channels & Links
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative">
                      <label className={labelClass}>Instagram Account</label>
                      <div className="relative">
                        <InstagramIcon className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={clubInfo.instagram}
                          onChange={(e) =>
                            setClubInfo({
                              ...clubInfo,
                              instagram: e.target.value,
                            })
                          }
                          placeholder="@club_username"
                          className={cn(inputClass, 'pl-11')}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className={labelClass}>KakaoTalk Open Chat</label>
                      <div className="relative">
                        <MessageCircle className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={clubInfo.kakao}
                          onChange={(e) =>
                            setClubInfo({ ...clubInfo, kakao: e.target.value })
                          }
                          placeholder="Kakao open chat links..."
                          className={cn(inputClass, 'pl-11')}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className={labelClass}>YouTube Link</label>
                      <div className="relative">
                        <YoutubeIcon className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={clubInfo.youtube}
                          onChange={(e) =>
                            setClubInfo({
                              ...clubInfo,
                              youtube: e.target.value,
                            })
                          }
                          placeholder="https://youtube.com/channel/..."
                          className={cn(inputClass, 'pl-11')}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className={labelClass}>Website Link</label>
                      <div className="relative">
                        <Globe className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={clubInfo.website}
                          onChange={(e) =>
                            setClubInfo({
                              ...clubInfo,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://yourclubwebsite.com"
                          className={cn(inputClass, 'pl-11')}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveSocialLinks}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column previews/widgets */}
              <div className="space-y-6">
                {/* Media Preview Widget */}
                <div className="flex flex-col items-center rounded-[24px] border border-white/30 bg-white/70 p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                  <label className="mb-4 block self-start text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Club Assets Preview
                  </label>

                  {/* URL Text Inputs with Previews Below */}
                  <div className="mb-4 w-full space-y-4 text-left">
                    <div>
                      <label className={labelClass}>Cover Image</label>
                      <label
                        className={`group relative flex h-36 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${
                          isCoverUploading || isLoading
                            ? 'cursor-not-allowed border-gray-200'
                            : 'border-gray-300 hover:border-[#4F46E5]'
                        }`}
                      >
                        {/* Current image */}
                        {isValidUrl(clubInfo.cover_image_url) && (
                          <img
                            src={clubInfo.cover_image_url}
                            alt="Cover"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}

                        {/* Placeholder when no image */}
                        {!isValidUrl(clubInfo.cover_image_url) && !isCoverUploading && (
                          <div className="flex flex-col items-center gap-2 text-gray-400">
                            <ImageIcon size={28} />
                            <span className="text-xs font-bold">Upload Cover Image</span>
                            <span className="text-[10px] font-medium text-gray-400">
                              PNG, JPG, WEBP · max 10 MB
                            </span>
                          </div>
                        )}

                        {/* Uploading overlay */}
                        {isCoverUploading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80">
                            <Loader2 size={22} className="animate-spin text-[#4F46E5]" />
                            <span className="text-xs font-semibold text-gray-500">
                              Uploading...
                            </span>
                          </div>
                        )}

                        {/* Hover overlay (only when image exists and not uploading) */}
                        {isValidUrl(clubInfo.cover_image_url) && !isCoverUploading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Upload size={20} className="text-white" />
                            <span className="text-xs font-bold text-white">
                              Change Cover
                            </span>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          disabled={isCoverUploading || isLoading}
                          onChange={handleCoverImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className={labelClass}>Logo File</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className={inputClass}
                        disabled={isLoading}
                      />
                      <div className="mt-2">
                        <label className="mb-1 block text-[10px] font-bold text-gray-400 uppercase">
                          Or paste an image URL
                        </label>
                        <input
                          type="text"
                          value={clubInfo.logo_url || ''}
                          onChange={(e) =>
                            setClubInfo((prev) => ({
                              ...prev,
                              logo_url: e.target.value,
                            }))
                          }
                          placeholder="https://example.com/logo.png"
                          className={inputClass}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="mt-2 flex justify-center">
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-100/60 bg-indigo-50 text-xl font-bold text-[#4F46E5] shadow-inner">
                          {isValidUrl(clubInfo.logo_url) ? (
                            <img
                              src={clubInfo.logo_url}
                              alt="Logo Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : clubInfo.name ? (
                            clubInfo.name.substring(0, 2).toUpperCase()
                          ) : (
                            'CH'
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="max-w-full truncate font-sans text-sm font-bold text-gray-800">
                    {clubInfo.name || 'Your Club Name'}
                  </h3>
                  <p className="mt-1 font-sans text-xs font-medium text-[#4F46E5]">
                    {clubInfo.category || 'No Category Selected'}
                  </p>
                  <div className="mt-4 flex w-full justify-center">
                    <button
                      type="button"
                      onClick={handleSaveClubAssets}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl space-y-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-5 w-5" strokeWidth={2.5} />
              <h2 className="font-display text-base font-bold tracking-tight">
                Danger Zone
              </h2>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <ShieldAlert className="h-4 w-4 text-rose-500" />
                    <span>Transfer Ownership</span>
                  </div>
                  <p className="max-w-xl text-xs leading-relaxed text-slate-400">
                    Assign a new primary administrator for the club. Once
                    completed, your executive status will be revoked.
                  </p>
                </div>
                <button
                  onClick={handleTransferOwnership}
                  className="cursor-pointer rounded-full bg-rose-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-rose-700"
                >
                  Transfer
                </button>
              </div>

              <div className="mt-4 max-w-xs">
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  SELECT MEMBER
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition outline-none focus:border-indigo-500"
                >
                  <option value="">Select a member</option>
                  {dbUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name || 'No Name'} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Archive className="h-4 w-4 text-rose-500" />
                    <span>Archive Club</span>
                  </div>
                  <p className="max-w-xl text-xs leading-relaxed text-slate-400">
                    Temporarily disable all club activity, hide recruitment
                    listings, and pause applications.
                  </p>
                </div>
                <button className="cursor-pointer rounded-full border border-rose-100 bg-rose-50/50 px-5 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100/60">
                  Archive
                </button>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Delete Club & All Associated Data
                </h4>
                <p className="text-xs leading-relaxed text-slate-400">
                  Permanently remove this club, its membership list, pending
                  applications, past news, and events. This action cannot be
                  reversed.
                </p>
              </div>
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-rose-600 py-3.5 text-xs font-bold text-white shadow-md shadow-rose-100 transition duration-200 hover:bg-rose-700">
                <Trash2 className="h-4 w-4" /> Delete Club & All Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
