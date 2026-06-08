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
  };
  core_values?: string[] | string;
}

interface Category {
  id: string;
  name: string;
}

interface Article {
  id: string;
  date: string;
  title: string;
  type: 'external' | 'write';
  url?: string;
  content?: string;
  summary?: string;
}

interface GalleryItem {
  type: 'photo' | 'video';
  url: string;
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

  // News states
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 'article-1',
      date: 'OCT 24, 2023',
      title: 'Fall Hackathon Registration Now Open',
      type: 'external',
      url: 'https://hackathon.example.com',
      summary: 'Registration is now open for our fall coding marathon.',
    },
    {
      id: 'article-2',
      date: 'OCT 20, 2023',
      title: 'New Partnership: TechGiant Cloud',
      type: 'write',
      content:
        'We are thrilled to announce a new partnership. All active members will now receive $500 in cloud credits for their personal projects and research deployments.',
      summary:
        'We are thrilled to announce a new partnership with TechGiant Cloud.',
    },
  ]);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    date: '',
    type: 'external' as 'external' | 'write',
    url: '',
    content: '',
  });

  // Gallery states
  const [gallery, setGallery] = useState<GalleryItem[]>([
    { type: 'photo', url: '/concert1.jpg' },
    { type: 'photo', url: '/concert2.jpg' },
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

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
                // Extract unique users, filter out current owner
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
                  );
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
                kakao: myClub.social_links?.kakao || '',
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

              setExecutives(
                Array.isArray(myClub.executives)
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
        const item: { name: string; role: string; avatar?: string } = {
          name: ex.name?.trim() || '',
          role: ex.role?.trim() || '',
        };
        if (
          ex.avatar &&
          (ex.avatar.startsWith('http://') || ex.avatar.startsWith('https://'))
        ) {
          item.avatar = ex.avatar.trim();
        }
        return item;
      });

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        executives: executivesToSend,
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
      const socialLinksObj: {
        instagram?: string;
        kakao?: string;
        youtube?: string;
        website?: string;
      } = {};
      if (clubInfo.instagram?.trim()) {
        socialLinksObj.instagram = clubInfo.instagram.trim();
      }
      if (
        clubInfo.kakao &&
        (clubInfo.kakao.startsWith('http://') ||
          clubInfo.kakao.startsWith('https://'))
      ) {
        socialLinksObj.kakao = clubInfo.kakao.trim();
      }
      if (
        clubInfo.youtube &&
        (clubInfo.youtube.startsWith('http://') ||
          clubInfo.youtube.startsWith('https://'))
      ) {
        socialLinksObj.youtube = clubInfo.youtube.trim();
      }
      if (
        clubInfo.website &&
        (clubInfo.website.startsWith('http://') ||
          clubInfo.website.startsWith('https://'))
      ) {
        socialLinksObj.website = clubInfo.website.trim();
      }

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        social_links: socialLinksObj,
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
      if (
        clubInfo.cover_image_url &&
        (clubInfo.cover_image_url.startsWith('http://') ||
          clubInfo.cover_image_url.startsWith('https://'))
      ) {
        payload.cover_image_url = clubInfo.cover_image_url.trim();
      }
      if (
        clubInfo.logo_url &&
        (clubInfo.logo_url.startsWith('http://') ||
          clubInfo.logo_url.startsWith('https://'))
      ) {
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

  const handleSaveClubNews = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const articlesToSend = articles.map((art) => {
        const item: {
          id: string;
          date: string;
          title: string;
          type: string;
          content: string;
          summary: string;
          url?: string;
        } = {
          id: art.id || '',
          date: art.date?.trim() || '',
          title: art.title?.trim() || '',
          type: art.type || '',
          content: art.content?.trim() || '',
          summary: art.summary?.trim() || '',
        };
        if (
          art.url &&
          (art.url.startsWith('http://') || art.url.startsWith('https://'))
        ) {
          item.url = art.url.trim();
        }
        return item;
      });

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        articles: articlesToSend,
      });
      setSuccessMsg('Club News saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save club news:', err);
      setErrorMsg(`Failed to save Club News: ${getFriendlyErrorMessage(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveGallery = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!clubId) {
      setErrorMsg('No club is associated with this administrator account.');
      return;
    }
    console.log('Token being sent:', useAuthStore.getState().token);
    setIsLoading(true);
    try {
      const galleryToSend = gallery.map((item) => {
        const res: { type: string; url?: string } = {
          type: item.type || '',
        };
        if (
          item.url &&
          (item.url.startsWith('http://') || item.url.startsWith('https://'))
        ) {
          res.url = item.url.trim();
        }
        return res;
      });

      // TODO: Connected to PATCH /api/clubs/:id - update when backend confirms request body format
      await api.patch(`/api/clubs/${clubId}`, {
        gallery: galleryToSend,
      });
      setSuccessMsg('Gallery Showcase saved successfully');
    } catch (err: unknown) {
      console.error('Failed to save gallery showcase:', err);
      setErrorMsg(
        `Failed to save Gallery Showcase: ${getFriendlyErrorMessage(err)}`
      );
    } finally {
      setIsLoading(false);
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
        role: stillExecutive ? 'executive' : 'student',
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

  // Article Action Triggers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.date) return;

    if (editingArticleId) {
      setArticles((prev) =>
        prev.map((art) =>
          art.id === editingArticleId
            ? {
                ...art,
                title: newArticle.title,
                date: newArticle.date,
                type: newArticle.type,
                url: newArticle.url,
                content: newArticle.content,
                summary:
                  newArticle.type === 'write'
                    ? newArticle.content?.substring(0, 80) + '...'
                    : '',
              }
            : art
        )
      );
      setEditingArticleId(null);
    } else {
      const added: Article = {
        id: `article-${Date.now()}`,
        title: newArticle.title,
        date: newArticle.date,
        type: newArticle.type,
        url: newArticle.url,
        content: newArticle.content,
        summary:
          newArticle.type === 'write'
            ? newArticle.content?.substring(0, 80) + '...'
            : '',
      };
      setArticles((prev) => [added, ...prev]);
      // TODO: Connect to POST /api/clubs/:id/news when backend adds this endpoint
    }

    setNewArticle({
      title: '',
      date: '',
      type: 'external',
      url: '',
      content: '',
    });
    setIsAddingArticle(false);
  };

  const handleEditArticle = (art: Article) => {
    setNewArticle({
      title: art.title,
      date: art.date,
      type: art.type,
      url: art.url || '',
      content: art.content || '',
    });
    setEditingArticleId(art.id);
    setIsAddingArticle(true);
  };

  const handleDeleteArticle = (artId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== artId));
  };

  // Gallery Photo/Video loaders
  const handleAddPhotoUrl = () => {
    if (newPhotoUrl.trim()) {
      setGallery((prev) => [
        ...prev,
        { type: 'photo', url: newPhotoUrl.trim() },
      ]);
      setNewPhotoUrl('');
      // TODO: Connect to POST /api/clubs/:id/gallery when backend adds this endpoint
    }
  };

  const handleAddVideoUrl = () => {
    if (newVideoUrl.trim()) {
      setGallery((prev) => [
        ...prev,
        { type: 'video', url: newVideoUrl.trim() },
      ]);
      setNewVideoUrl('');
      // TODO: Connect to POST /api/clubs/:id/gallery when backend adds this endpoint
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setGallery((prev) => [
            ...prev,
            { type: 'photo', url: reader.result as string },
          ]);
          // TODO: Connect to POST /api/clubs/:id/gallery when backend adds this endpoint
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setGallery((prev) => [
            ...prev,
            { type: 'video', url: reader.result as string },
          ]);
          // TODO: Connect to POST /api/clubs/:id/gallery when backend adds this endpoint
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteGalleryItem = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
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
    setIsAddingMember(false);
  };

  const handleEditMember = (idx: number) => {
    setNewMember(executives[idx]);
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
                          <label className={labelClass}>Member Name</label>
                          <input
                            type="text"
                            value={newMember.name}
                            onChange={(e) =>
                              setNewMember({
                                ...newMember,
                                name: e.target.value,
                              })
                            }
                            placeholder="e.g. Alex Kim"
                            className={inputClass}
                            required
                          />
                        </div>

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
                      </div>

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

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsAddingMember(false)}
                          className={secondaryBtnClass}
                        >
                          Cancel
                        </button>
                        <button type="submit" className={primaryBtnClass}>
                          Save Member
                        </button>
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

                  {/* Cover Preview */}
                  <div className="relative mb-4 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200/50 bg-slate-100 text-gray-300">
                    {isValidUrl(clubInfo.cover_image_url) ? (
                      <img
                        src={clubInfo.cover_image_url}
                        alt="Cover Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-sans text-xs font-semibold">
                        No cover image
                      </span>
                    )}
                  </div>

                  {/* Logo Preview */}
                  <div className="relative mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-100/60 bg-indigo-50 text-xl font-bold text-[#4F46E5] shadow-inner">
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

                  {/* URL Text Inputs */}
                  <div className="mb-4 w-full space-y-3 text-left">
                    <div>
                      <label className={labelClass}>Cover Image URL</label>
                      <input
                        type="text"
                        value={clubInfo.cover_image_url}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            cover_image_url: e.target.value,
                          })
                        }
                        placeholder="https://example.com/cover.jpg"
                        className={inputClass}
                        disabled={isLoading}
                      />
                    </div>
                    {/* TODO: Add file upload support when backend adds image storage endpoint */}

                    <div>
                      <label className={labelClass}>Logo URL</label>
                      <input
                        type="text"
                        value={clubInfo.logo_url}
                        onChange={(e) =>
                          setClubInfo({
                            ...clubInfo,
                            logo_url: e.target.value,
                          })
                        }
                        placeholder="https://example.com/logo.jpg"
                        className={inputClass}
                        disabled={isLoading}
                      />
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

                {/* News Articles Panel */}
                <div className={bentoCardClass}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-base font-bold text-gray-900">
                      Club News
                    </h2>
                    <button
                      onClick={() => {
                        setEditingArticleId(null);
                        setNewArticle({
                          title: '',
                          date: '',
                          type: 'external',
                          url: '',
                          content: '',
                        });
                        setIsAddingArticle(!isAddingArticle);
                      }}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#4F46E5] text-white transition duration-200 hover:bg-[#4338CA]"
                      title="Add News Article"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {isAddingArticle && (
                    <form
                      onSubmit={handleSaveArticle}
                      className="animate-in fade-in mb-4 space-y-3 border-b border-gray-100 pb-4"
                    >
                      <h3 className="text-xs font-bold text-gray-700">
                        {editingArticleId ? 'Edit Article' : 'Add New Article'}
                      </h3>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">
                          Article Title
                        </label>
                        <input
                          type="text"
                          value={newArticle.title}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g. Workshop Starting Soon"
                          className={inputClass}
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">
                          Date
                        </label>
                        <input
                          type="text"
                          value={newArticle.date}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              date: e.target.value,
                            })
                          }
                          placeholder="e.g. OCT 24, 2023"
                          className={inputClass}
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-gray-400 uppercase">
                          Article Type
                        </label>
                        <div className="flex gap-4">
                          <label className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-gray-700">
                            <input
                              type="radio"
                              name="articleType"
                              checked={newArticle.type === 'external'}
                              onChange={() =>
                                setNewArticle({
                                  ...newArticle,
                                  type: 'external',
                                })
                              }
                              className="accent-[#4F46E5]"
                            />
                            External Link
                          </label>
                          <label className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-gray-700">
                            <input
                              type="radio"
                              name="articleType"
                              checked={newArticle.type === 'write'}
                              onChange={() =>
                                setNewArticle({ ...newArticle, type: 'write' })
                              }
                              className="accent-[#4F46E5]"
                            />
                            Write Directly
                          </label>
                        </div>
                      </div>

                      {newArticle.type === 'external' ? (
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase">
                            External URL
                          </label>
                          <input
                            type="url"
                            value={newArticle.url}
                            onChange={(e) =>
                              setNewArticle({
                                ...newArticle,
                                url: e.target.value,
                              })
                            }
                            placeholder="e.g. https://linkedin.com/posts/..."
                            className={inputClass}
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase">
                            Article Content
                          </label>
                          <textarea
                            rows={3}
                            value={newArticle.content}
                            onChange={(e) =>
                              setNewArticle({
                                ...newArticle,
                                content: e.target.value,
                              })
                            }
                            placeholder="Write the full content of the article here..."
                            className={cn(inputClass, 'resize-none')}
                          />
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsAddingArticle(false)}
                          className={secondaryBtnClass}
                        >
                          Cancel
                        </button>
                        <button type="submit" className={primaryBtnClass}>
                          Save
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of articles */}
                  <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="flex items-start justify-between gap-2 rounded-xl border border-gray-100 bg-white/50 p-3"
                      >
                        <div className="min-w-0">
                          <span className="mb-0.5 block text-[9px] font-bold text-gray-400">
                            {art.date}
                          </span>
                          <h4 className="truncate text-xs font-bold text-gray-800">
                            {art.title}
                          </h4>
                          <span className="mt-0.5 block text-[9px] font-semibold tracking-wider text-[#4F46E5] uppercase">
                            {art.type}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            onClick={() => handleEditArticle(art)}
                            className="p-1 text-gray-400 transition hover:text-gray-600"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1 text-red-400 transition hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {articles.length === 0 && (
                      <p className="py-2 text-center text-xs font-medium text-gray-400">
                        No articles added yet.
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveClubNews}
                      disabled={isLoading}
                      className={primaryBtnClass}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className={bentoCardClass}>
                  <h2 className="font-display mb-4 text-base font-bold text-gray-900">
                    Gallery Showcase
                  </h2>

                  <div className="mb-4 space-y-4 border-b border-gray-100 pb-4">
                    {/* Photo upload inputs */}
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-gray-400 uppercase">
                        Add Photo
                      </label>
                      <div className="mb-2 flex gap-2">
                        <input
                          type="text"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="Paste photo image URL..."
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={handleAddPhotoUrl}
                          className={primaryBtnClass}
                        >
                          Add
                        </button>
                      </div>

                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/20 p-2.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-50">
                        <ImageIcon size={14} />
                        Choose Local Photo File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Video upload inputs */}
                    <div>
                      <label className="mb-1 block text-[10px] font-bold text-gray-400 uppercase">
                        Add Video
                      </label>
                      <div className="mb-2 flex gap-2">
                        <input
                          type="text"
                          value={newVideoUrl}
                          onChange={(e) => setNewVideoUrl(e.target.value)}
                          placeholder="Paste video URL..."
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={handleAddVideoUrl}
                          className={primaryBtnClass}
                        >
                          Add
                        </button>
                      </div>

                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/20 p-2.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-50">
                        <Video size={14} />
                        Choose Local Video File
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Grid of gallery items */}
                  <div className="grid max-h-60 grid-cols-2 gap-3 overflow-y-auto pr-1">
                    {gallery.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-video overflow-hidden rounded-xl border border-gray-100"
                      >
                        {item.type === 'photo' ? (
                          <img
                            src={item.url}
                            alt={`Gallery item ${idx}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-[10px] font-bold text-white">
                            <Video size={16} className="mr-1 text-gray-400" />{' '}
                            VIDEO
                          </div>
                        )}

                        {/* Delete Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryItem(idx)}
                            className="rounded-full bg-red-600 p-1.5 text-white transition hover:bg-red-700 active:scale-90"
                            title="Delete photo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {gallery.length === 0 && (
                      <p className="col-span-2 py-2 text-center text-xs font-medium text-gray-400">
                        No gallery items added.
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveGallery}
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
