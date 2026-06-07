'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import {
  FileText,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface FormField {
  id: string;
  type: 'short' | 'long' | 'mcq' | 'file';
  label: string;
  required: boolean;
  options?: string[];
}

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const clubId = Array.isArray(params.id) ? params.id[0] : params.id || '';

  const [clubName, setClubName] = useState('Club');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Authenticate student session
  useEffect(() => {
    if (!token) {
      alert('Please sign in to apply for this club.');
      router.push('/login');
    }
  }, [token]);

  // Load club name and form schema
  useEffect(() => {
    const loadForm = async () => {
      if (!clubId) return;
      setIsLoading(true);
      setErrorMsg(null);
      try {
        // Fetch club details
        const { data: club, error: clubError } = await supabase
          .from('clubs')
          .select('name, is_recruiting')
          .eq('id', clubId)
          .maybeSingle();

        if (clubError) throw clubError;
        if (club) {
          setClubName(club.name);
          if (club.is_recruiting === false) {
            setErrorMsg('This club is not accepting applications right now');
            setIsLoading(false);
            return;
          }
        }

        // Fetch custom form schema from localStorage
        const savedForm = localStorage.getItem(`application_form_${clubId}`);
        if (savedForm) {
          setFormFields(JSON.parse(savedForm));
        } else {
          // Default fallback schema
          setFormFields([
            {
              id: 'q1',
              type: 'long',
              label: 'Why do you want to join this club?',
              required: true,
            },
            {
              id: 'q2',
              type: 'short',
              label: 'Previous experience in relevant areas?',
              required: false,
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to load application form:', err);
        setErrorMsg('Failed to load application form layout.');
      } finally {
        setIsLoading(false);
      }
    };

    loadForm();
  }, [clubId]);

  // Initialize empty answers state
  useEffect(() => {
    if (formFields.length > 0) {
      const initial: Record<string, string> = {};
      formFields.forEach((field) => {
        initial[field.label] = '';
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(initial);
    }
  }, [formFields]);

  // Handle Input Changes
  const handleInputChange = (label: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // Submit Application
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!userId) {
      setErrorMsg('User session expired. Please sign in again.');
      return;
    }

    // Client-side validations
    for (const field of formFields) {
      const ans = answers[field.label];
      if (field.required && (!ans || !ans.trim())) {
        setErrorMsg(`"${field.label}" is required.`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // TODO: Connected to POST /api/applications/
      const response = await api.post('/applications/', {
        club_id: clubId,
        answers: answers,
      });

      setSuccessMsg(
        'Application submitted successfully! The club manager will review it.'
      );
      setTimeout(() => {
        router.push('/clubs');
      }, 1500);
    } catch (err) {
      console.error('Failed to submit application:', err);
      setErrorMsg('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin text-[#4F46E5]" />
          <span>Loading application form...</span>
        </div>
      </div>
    );
  }

  if (errorMsg === 'This club is not accepting applications right now') {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F9FAFB] px-4 py-32 font-sans">
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
        <main className="relative z-10 w-full max-w-2xl text-center">
          <div className="rounded-[24px] border border-white/30 bg-white/70 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 animate-bounce text-red-500" />
            <h2 className="font-display mb-2 text-xl font-bold tracking-tight text-gray-900">
              Applications Closed
            </h2>
            <p className="mb-6 text-sm font-medium text-gray-500">
              This club is not accepting applications right now.
            </p>
            <Link
              href={`/clubs/${clubId}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Club Profile
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F9FAFB] px-4 py-32 font-sans">
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />

      <main className="relative z-10 w-full max-w-2xl">
        {/* Back navigation */}
        <Link
          href={`/clubs/${clubId}`}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Club Profile
        </Link>

        {/* Feedback alerts */}
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

        {/* Application Form Container */}
        <div className="rounded-[24px] border border-white/30 bg-white/70 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-gray-900">
                Join {clubName}
              </h2>
              <p className="text-xs font-medium text-gray-400">
                Please complete the questions below to submit your membership
                application.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-6">
            {formFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-xs leading-relaxed font-bold tracking-tight text-slate-700">
                  {field.label}{' '}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {/* Short Answer */}
                {field.type === 'short' && (
                  <input
                    type="text"
                    required={field.required}
                    value={answers[field.label] || ''}
                    onChange={(e) =>
                      handleInputChange(field.label, e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA]/50 px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#4F46E5] focus:bg-white"
                    placeholder="Your answer"
                    disabled={isSubmitting}
                  />
                )}

                {/* Long Answer */}
                {field.type === 'long' && (
                  <textarea
                    rows={5}
                    required={field.required}
                    value={answers[field.label] || ''}
                    onChange={(e) =>
                      handleInputChange(field.label, e.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA]/50 px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#4F46E5] focus:bg-white"
                    placeholder="Write detailed answers here..."
                    disabled={isSubmitting}
                  />
                )}

                {/* Multiple Choice (MCQ) */}
                {field.type === 'mcq' && (
                  <div className="space-y-2">
                    {field.options &&
                      field.options.map((opt, oidx) => (
                        <label
                          key={oidx}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-xs font-bold transition select-none',
                            answers[field.label] === opt
                              ? 'border-[#4F46E5] bg-indigo-50/20 text-[#4F46E5]'
                              : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300'
                          )}
                        >
                          <input
                            type="radio"
                            name={field.id}
                            value={opt}
                            checked={answers[field.label] === opt}
                            onChange={() => handleInputChange(field.label, opt)}
                            className="h-4 w-4 border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                            disabled={isSubmitting}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                  </div>
                )}

                {/* File Upload */}
                {field.type === 'file' && (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-[#FAFAFA]/50 p-6 text-center">
                    <input
                      type="file"
                      id={field.id}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleInputChange(field.label, file ? file.name : '');
                      }}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={field.id}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95"
                    >
                      Choose File
                    </label>
                    <span className="mt-2 block text-[10px] font-semibold text-gray-400">
                      {answers[field.label]
                        ? `Selected: ${answers[field.label]}`
                        : 'No file chosen (PDF, DOCX, JPG)'}
                    </span>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end border-t border-gray-100 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
