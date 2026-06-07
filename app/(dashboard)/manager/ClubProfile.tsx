'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  CheckCircle2,
  X,
  FileText,
  UserCheck,
  Trash2,
  Check,
  AlertTriangle,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

interface FormField {
  id: string;
  type: 'short' | 'long' | 'mcq' | 'file';
  label: string;
  required: boolean;
  options?: string[];
}

interface Application {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userMajor: string;
  answers: Record<string, string>;
  status: string;
  submittedAt: string;
}

interface SupabaseApplication {
  id: string;
  user_id: string;
  answers: Record<string, string>;
  status: string;
  submitted_at: string;
  users: { id: string; name: string; email: string } | null;
}

export default function ApplicationsTab() {
  const supabase = createClient();
  const userId = useAuthStore((state) => state.userId);

  const [clubId, setClubId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'tracking' | 'form'>(
    'tracking'
  );
  const [isRecruiting, setIsRecruiting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<
    'short' | 'long' | 'mcq' | 'file'
  >('short');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [newFieldOptions, setNewFieldOptions] = useState<string[]>([]);
  const [newOptionInput, setNewOptionInput] = useState('');

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClub = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const { data: clubs, error: clubsError } = await supabase
          .from('clubs')
          .select('id, is_recruiting')
          .eq('exec_user_id', userId);

        if (clubsError) throw clubsError;

        if (clubs && clubs.length > 0) {
          setClubId(clubs[0].id);
          setIsRecruiting(clubs[0].is_recruiting ?? false);
        }
      } catch (err) {
        console.error('Failed to load manager club:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClub();
  }, [userId, supabase]);

  const [formFields, setFormFields] = useState<FormField[]>(() => {
    return [];
  });

  useEffect(() => {
    if (clubId) {
      const savedForm = localStorage.getItem(`application_form_${clubId}`);
      const fields = savedForm
        ? (JSON.parse(savedForm) as FormField[])
        : [
            {
              id: 'q1',
              type: 'long' as const,
              label: 'Why do you want to join this club?',
              required: true,
            },
            {
              id: 'q2',
              type: 'short' as const,
              label: 'Previous experience in relevant areas?',
              required: false,
            },
          ];
      Promise.resolve().then(() => setFormFields(fields));
    }
  }, [clubId]);

  const loadApplications = useCallback(async () => {
    if (!clubId) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(
          `
          id,
          user_id,
          answers,
          status,
          submitted_at,
          users (
            id,
            name,
            email
          )
        `
        )
        .eq('club_id', clubId);

      if (error) throw error;

      if (data) {
        const mapped: Application[] = (
          data as unknown as SupabaseApplication[]
        ).map((item) => {
          const dbName = item.users?.name || '';
          let userName = dbName;
          let userMajor = 'Global Leadership School';
          if (dbName.includes('|')) {
            const parts = dbName.split('|');
            userName = parts[0].trim();
            userMajor = parts[1].trim();
          }

          return {
            id: item.id,
            userId: item.user_id,
            userName,
            userEmail: item.users?.email || '',
            userMajor,
            answers: item.answers || {},
            status: item.status || 'Pending',
            submittedAt: item.submitted_at
              ? new Date(item.submitted_at).toLocaleDateString()
              : '',
          };
        });
        setApplications(mapped);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
      setErrorMsg('Failed to load application queue.');
    } finally {
      setIsLoading(false);
    }
  }, [clubId, supabase]);

  useEffect(() => {
    if (clubId && activeSubTab === 'tracking') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadApplications().catch(console.error);
    }
  }, [clubId, activeSubTab, loadApplications]);

  const handleAddMCQOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionInput.trim()) return;
    if (!newFieldOptions.includes(newOptionInput.trim())) {
      setNewFieldOptions([...newFieldOptions, newOptionInput.trim()]);
    }
    setNewOptionInput('');
  };

  const handleRemoveMCQOption = (opt: string) => {
    setNewFieldOptions(newFieldOptions.filter((o) => o !== opt));
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldLabel.trim()) return;

    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: newFieldType,
      label: newFieldLabel.trim(),
      required: newFieldRequired,
      ...(newFieldType === 'mcq' ? { options: [...newFieldOptions] } : {}),
    };

    setFormFields([...formFields, newField]);
    setNewFieldLabel('');
    setNewFieldRequired(false);
    setNewFieldOptions([]);
    setNewOptionInput('');
  };

  const handleRemoveField = (id: string) => {
    setFormFields(formFields.filter((f) => f.id !== id));
  };

  const handlePublishForm = () => {
    if (!clubId) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      localStorage.setItem(
        `application_form_${clubId}`,
        JSON.stringify(formFields)
      );
      setSuccessMsg('Application form layout has been successfully published!');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to publish application form layout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleRecruiting = async (checked: boolean) => {
    if (!clubId) return;
    setIsRecruiting(checked);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase
        .from('clubs')
        .update({ is_recruiting: checked })
        .eq('id', clubId);

      if (error) throw error;

      setSuccessMsg(
        checked
          ? 'Recruitment has been enabled. Students can now submit applications.'
          : 'Recruitment has been disabled. The application form is no longer accessible.'
      );
    } catch (err) {
      console.error('Failed to update recruitment status:', err);
      setErrorMsg('Failed to update recruitment status.');
      setIsRecruiting(!checked);
    }
  };

  const handleAcceptApp = async () => {
    if (!selectedApp || !clubId) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error: patchError } = await supabase
        .from('applications')
        .update({ status: 'Accepted' })
        .eq('id', selectedApp.id);

      if (patchError) throw patchError;

      const { error: memberError } = await supabase
        .from('club_members')
        .insert({
          club_id: clubId,
          user_id: selectedApp.userId,
          role: 'Regular Member',
          joined_at: new Date().toISOString(),
        });

      if (memberError) {
        console.error('Failed to create club membership row:', memberError);
      }

      setSuccessMsg(
        `Successfully accepted ${selectedApp.userName} into the club!`
      );
      setIsAppModalOpen(false);
      setSelectedApp(null);
      loadApplications();
    } catch (err) {
      console.error('Accept applicant failed:', err);
      setErrorMsg('Failed to process application acceptance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectApp = async () => {
    if (!selectedApp) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error: deleteError } = await supabase
        .from('applications')
        .delete()
        .eq('id', selectedApp.id);

      if (deleteError) throw deleteError;

      setSuccessMsg(
        `Successfully rejected application from ${selectedApp.userName}.`
      );
      setIsAppModalOpen(false);
      setSelectedApp(null);
      loadApplications();
    } catch (err) {
      console.error('Reject applicant failed:', err);
      setErrorMsg('Failed to reject application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredApps = applications.filter(
    (app) =>
      app.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.userMajor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingApps = filteredApps.filter((a) => a.status === 'Pending');
  const acceptedApps = filteredApps.filter((a) => a.status === 'Accepted');

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900 antialiased">
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
              Recruitment Center
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Design the custom join form and review incoming student
              applications.
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-6 border-b border-gray-200/60 text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('tracking')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'tracking'
                ? 'font-bold text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Applicant Tracking
            {activeSubTab === 'tracking' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('form')}
            className={cn(
              'relative pb-3.5 transition-colors',
              activeSubTab === 'form'
                ? 'font-bold text-[#4F46E5]'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Application Form Builder
            {activeSubTab === 'form' && (
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#4F46E5]" />
            )}
          </button>
        </div>

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

        {activeSubTab === 'tracking' && (
          <div className="space-y-6">
            <div className="mb-4 flex justify-end">
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search applicants..."
                  className="w-64 rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-xs font-medium shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-white/30 bg-slate-50/50 p-4">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="flex items-center text-[11px] font-bold tracking-wider text-gray-400">
                    <span className="mr-2 h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500" />
                    PENDING INTAKE
                    <span className="ml-2 rounded-full bg-gray-200/60 px-2 py-0.5 text-[10px] font-extrabold text-gray-500">
                      {pendingApps.length}
                    </span>
                  </span>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-8 text-center text-xs font-semibold text-gray-400">
                      <Loader2 className="h-4 w-4 animate-spin text-[#4F46E5]" />
                      <span>Loading queue...</span>
                    </div>
                  ) : pendingApps.length > 0 ? (
                    pendingApps.map((app) => (
                      <div
                        key={app.id}
                        className="group border-gray-150 relative overflow-hidden rounded-[24px] border bg-white p-5 shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md"
                      >
                        <div className="absolute top-0 left-0 h-full w-1.5 bg-amber-500" />
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 transition group-hover:text-indigo-600">
                              {app.userName}
                            </h3>
                            <p className="mt-0.5 text-xs font-medium text-gray-400">
                              {app.userMajor}
                            </p>
                          </div>
                          <span className="text-[10px] font-medium text-gray-400">
                            {app.submittedAt}
                          </span>
                        </div>
                        <div className="flex items-center justify-end border-t border-gray-50 pt-3">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setIsAppModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-indigo-900"
                          >
                            View Application{' '}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 py-12 text-center text-xs font-semibold text-gray-400">
                      No pending applications.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/30 bg-slate-50/50 p-4">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="flex items-center text-[11px] font-bold tracking-wider text-gray-400">
                    <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    ACCEPTED MEMBERS
                    <span className="ml-2 rounded-full bg-gray-200/60 px-2 py-0.5 text-[10px] font-extrabold text-gray-500">
                      {acceptedApps.length}
                    </span>
                  </span>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-8 text-center text-xs font-semibold text-gray-400">
                      <Loader2 className="h-4 w-4 animate-spin text-[#4F46E5]" />
                      <span>Loading queue...</span>
                    </div>
                  ) : acceptedApps.length > 0 ? (
                    acceptedApps.map((app) => (
                      <div
                        key={app.id}
                        className="group border-gray-150 relative overflow-hidden rounded-[24px] border bg-white p-5 opacity-85 shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md"
                      >
                        <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900">
                              {app.userName}
                            </h3>
                            <p className="mt-0.5 text-xs font-medium text-gray-400">
                              {app.userMajor}
                            </p>
                          </div>
                          <span className="text-[10px] font-medium text-gray-400">
                            {app.submittedAt}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-50 pt-3 text-[11px] font-bold">
                          <span className="inline-flex items-center gap-1 text-emerald-600">
                            <Check className="h-3.5 w-3.5" /> Approved
                          </span>
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setIsAppModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 text-[#4F46E5] hover:text-indigo-900"
                          >
                            View Form <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 py-12 text-center text-xs font-semibold text-gray-400">
                      No accepted applications yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'form' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  Accept Applications
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-400">
                  Toggle whether this club is actively accepting applications
                  from students.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    isRecruiting ? 'animate-pulse bg-[#10B981]' : 'bg-gray-300'
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleToggleRecruiting(!isRecruiting)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    isRecruiting ? 'bg-[#4F46E5]' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      isRecruiting ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                  <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-bold text-gray-800">
                      Application Form Layout
                    </h3>
                    <button
                      onClick={handlePublishForm}
                      disabled={isSubmitting}
                      className="rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                    >
                      Publish Form
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formFields.length > 0 ? (
                      formFields.map((field, idx) => (
                        <div
                          key={field.id}
                          className="border-gray-150 group relative space-y-2 rounded-xl border bg-[#FAFAFA]/40 p-4"
                        >
                          <button
                            onClick={() => handleRemoveField(field.id)}
                            className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#4F46E5] uppercase">
                              {field.type === 'short' && 'Short Answer'}
                              {field.type === 'long' && 'Long Answer'}
                              {field.type === 'mcq' && 'Multiple Choice'}
                              {field.type === 'file' && 'File Upload'}
                            </span>
                            {field.required && (
                              <span className="text-[9px] font-bold tracking-wide text-red-500 uppercase">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="pr-10 text-xs font-bold text-slate-800">
                            {idx + 1}. {field.label}
                          </p>
                          {field.type === 'mcq' && field.options && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {field.options.map((opt, oidx) => (
                                <span
                                  key={oidx}
                                  className="rounded border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                                >
                                  {opt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-gray-200 bg-white/20 py-12 text-center text-xs font-semibold text-gray-400">
                        Form is empty. Add a new field below to get started!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/30 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                <h3 className="mb-4 border-b border-gray-100 pb-2 text-sm font-bold text-gray-800">
                  Add Field
                </h3>
                <form onSubmit={handleAddField} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Question Label *
                    </label>
                    <input
                      type="text"
                      value={newFieldLabel}
                      onChange={(e) => setNewFieldLabel(e.target.value)}
                      placeholder="e.g. Do you have coding experience?"
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/50 px-3 py-2 text-xs font-semibold outline-none focus:border-[#4F46E5] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Field Type
                    </label>
                    <select
                      value={newFieldType}
                      onChange={(e) => {
                        setNewFieldType(
                          e.target.value as 'short' | 'long' | 'mcq' | 'file'
                        );
                        setNewFieldOptions([]);
                      }}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/50 px-3 py-2 text-xs font-semibold text-gray-600 outline-none focus:border-[#4F46E5] focus:bg-white"
                    >
                      <option value="short">Short Answer</option>
                      <option value="long">Long Answer</option>
                      <option value="mcq">Multiple Choice</option>
                      <option value="file">File Upload</option>
                    </select>
                  </div>
                  {newFieldType === 'mcq' && (
                    <div className="space-y-2.5 rounded-xl border border-slate-100 bg-[#FAFAFA]/30 p-3">
                      <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                        Multiple Choice Options
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newOptionInput}
                          onChange={(e) => setNewOptionInput(e.target.value)}
                          placeholder="Option label"
                          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddMCQOption}
                          className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {newFieldOptions.map((opt, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                          >
                            {opt}
                            <button
                              type="button"
                              onClick={() => handleRemoveMCQOption(opt)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="required-toggle"
                      checked={newFieldRequired}
                      onChange={(e) => setNewFieldRequired(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <label
                      htmlFor="required-toggle"
                      className="text-xs font-bold text-slate-600 select-none"
                    >
                      Required Question
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-white transition hover:bg-slate-700 active:scale-95"
                  >
                    <Plus className="h-4 w-4" /> Add Field to Form
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {isAppModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-xs">
          <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-white/30 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
            <button
              onClick={() => setIsAppModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="font-display text-lg font-bold tracking-tight text-gray-900">
              Student Application
            </h2>
            <p className="mb-4 text-xs font-medium text-gray-400">
              Submitted on {selectedApp.submittedAt}
            </p>
            <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-1.5 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-xs">
              <div>
                <span className="block text-[10px] font-medium text-gray-400">
                  Name
                </span>
                <span className="font-bold text-gray-800">
                  {selectedApp.userName}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-medium text-gray-400">
                  Major
                </span>
                <span className="font-bold text-gray-800">
                  {selectedApp.userMajor}
                </span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] font-medium text-gray-400">
                  Email
                </span>
                <span className="font-bold text-gray-800">
                  {selectedApp.userEmail}
                </span>
              </div>
            </div>
            <div className="mb-8 space-y-4">
              <h4 className="text-xs font-bold tracking-wide text-gray-400 uppercase">
                Submitted Answers
              </h4>
              {Object.keys(selectedApp.answers).length > 0 ? (
                Object.entries(selectedApp.answers).map(
                  ([question, answer], idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="block text-xs font-bold text-gray-700">
                        Q. {question}
                      </span>
                      <div className="border-gray-150 rounded-xl border bg-[#FAFAFA] p-3 text-xs leading-relaxed font-semibold text-gray-600">
                        {answer || (
                          <span className="text-gray-400 italic">
                            No answer provided
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No application fields answered.
                </p>
              )}
            </div>
            {selectedApp.status === 'Pending' && (
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={handleRejectApp}
                  disabled={isSubmitting}
                  className="border-red-150 rounded-xl border bg-red-50 px-5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 active:scale-95 disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleAcceptApp}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4" /> Accept Applicant
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
