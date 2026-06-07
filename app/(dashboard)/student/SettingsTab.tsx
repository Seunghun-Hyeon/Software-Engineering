'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
  Save,
  Trash2,
  AlertTriangle,
  X,
  CheckCircle2,
  Loader2,
  User,
  GraduationCap,
} from 'lucide-react';
import { Input } from '@/app/components/Input';

export default function SettingsTab() {
  const router = useRouter();
  const supabase = createClient();
  const { userName, major, userId, clearAuth } = useAuthStore();

  const parts = (userName || '').trim().split(' ');
  const initialFirst = parts[0] || '';
  const initialLast = parts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [majorInput, setMajorInput] = useState(major || '');

  // UI status states
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal toggle state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Save changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!firstName.trim()) {
      setErrorMsg('First Name is required.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMsg('Last Name is required.');
      return;
    }
    if (!majorInput.trim()) {
      setErrorMsg('Declared Major is required.');
      return;
    }

    setIsSaving(true);
    try {
      const combinedName = `${firstName.trim()} ${lastName.trim()}`;
      // Serialize name and major as "Name | Major"
      const serializedName = `${combinedName} | ${majorInput.trim()}`;

      // TODO: Connect to PATCH /api/users/profile when backend adds this endpoint
      if (userId) {
        const { error } = await supabase
          .from('users')
          .update({ name: serializedName })
          .eq('id', userId);

        if (error) throw error;
      }

      // Update local store state
      const currentProfiles = useAuthStore.getState().updatedProfiles || {};
      useAuthStore.setState({
        userName: combinedName,
        major: majorInput.trim(),
        updatedProfiles: {
          ...currentProfiles,
          ...(userId
            ? { [userId]: { userName: combinedName, major: majorInput.trim() } }
            : {}),
        },
      });

      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setErrorMsg('Failed to save profile changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (!userId) return;

    setIsDeleting(true);
    setErrorMsg(null);

    try {
      // TODO: Connect to DELETE /api/users/account when backend adds this endpoint
      const { error } = await supabase.from('users').delete().eq('id', userId);

      if (error) throw error;

      // Log out user & redirect to home page
      clearAuth();
      setIsDeleteModalOpen(false);
      router.push('/');
    } catch (err) {
      console.error('Failed to delete account:', err);
      setErrorMsg('Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900">
          Account Settings
        </h2>
        <p className="mt-1 text-sm font-medium text-gray-400">
          Manage your personal student details and account preferences.
        </p>
      </div>

      {/* Feedback Alert */}
      {errorMsg && (
        <div className="flex items-start gap-3 rounded-[24px] border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-600">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-3 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4 text-xs font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Settings Form Card */}
      <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <form onSubmit={handleSaveProfile} className="space-y-5">
          {/* First and Last Name (Side by Side) */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="settings-first"
              type="text"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              disabled={isSaving}
              icon={<User className="h-3.5 w-3.5" />}
            />
            <Input
              id="settings-last"
              type="text"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              disabled={isSaving}
              icon={<User className="h-3.5 w-3.5" />}
            />
          </div>

          <Input
            id="settings-major"
            type="text"
            label="Declared Major"
            value={majorInput}
            onChange={(e) => setMajorInput(e.target.value)}
            placeholder="e.g. Computer Science"
            disabled={isSaving}
            icon={<GraduationCap className="h-4 w-4" />}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone Card */}
      <div className="rounded-[24px] border border-red-200/50 bg-red-50/20 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="font-display text-base font-bold">Danger Zone</h3>
        </div>

        <p className="mb-6 text-xs font-medium text-gray-500">
          Permanently delete your account. This action is irreversible, and you
          will lose all records of club applications, saved events, and
          memberships.
        </p>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-red-700 active:scale-95"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal (Glassmorphic) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-xs">
          <div className="animate-in fade-in-50 zoom-in-95 relative w-full max-w-md rounded-[24px] border border-white/30 bg-white/95 p-8 shadow-2xl backdrop-blur-xl duration-150">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <h3 className="font-display text-lg font-bold tracking-tight text-gray-900">
              Delete Account
            </h3>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-red-700 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Permanently Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
