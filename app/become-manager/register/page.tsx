'use client';

import React, { useState, useEffect } from 'react';
import { BentoCard } from '@/app/components/BentoCard';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { CheckCircle2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';

export default function ManagerRegistrationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubCategory, setClubCategory] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubDocument, setClubDocument] = useState<File | null>(null);

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const token = useAuthStore((state) => state.token);
  const userName = useAuthStore((state) => state.userName);

  useEffect(() => {
    // Prefill Name
    if (userName && !firstName && !lastName) {
      const parts = userName.split(' ');
      if (parts.length >= 2) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFirstName(parts[0]);
        setLastName(parts.slice(1).join(' '));
      } else {
        setFirstName(userName);
      }
    }

    // Prefill Email from JWT
    if (token && !email) {
      try {
        const payloadBase64 = token.split('.')[1];
        if (payloadBase64) {
          const payloadString = atob(
            payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
          );
          const payload = JSON.parse(payloadString);
          if (payload.email) {
            setEmail(payload.email);
          }
        }
      } catch (err) {
        console.error('Failed to parse token for email prefill', err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userName]);

  useEffect(() => {
    api
      .get('/categories')
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to load categories', err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('studentId', studentId);
      formData.append('clubName', clubName);
      formData.append('clubCategory', clubCategory);
      formData.append('clubDescription', clubDescription);
      if (clubDocument) {
        formData.append('clubDocument', clubDocument);
      }

      await api.post('/clubs/register', formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      // Update global store
      const store = useAuthStore.getState();
      if (store.token) {
        store.setAuth(
          store.token,
          'club_executive',
          store.userName,
          store.major,
          true,
          store.userId
        );
        store.setActiveRole('club_executive');
      }

      setIsSuccess(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      console.error('Registration failed:', err);
      setErrorMsg(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isSuccess) {
    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-12 md:px-10">
        <BentoCard className="flex w-full max-w-md flex-col items-center border-0 p-10 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold tracking-tight text-gray-900">
            Registration Submitted
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">
            Your application is being reviewed by the Student Life office. You
            will receive an email confirmation shortly.
          </p>
          <Link href="/" className="w-full">
            <Button className="w-full py-4 text-lg">Return Home</Button>
          </Link>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="via-background flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-100 to-indigo-50 px-6 py-16 md:px-10">
      <main className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mt-16 mb-10 text-center">
          <h1 className="font-display mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Manager Registration
          </h1>
          <p className="text-lg text-gray-600">
            Step into leadership. Set up your club profile.
          </p>
        </div>

        {/* Registration Form Card */}
        <BentoCard className="relative overflow-hidden p-8 md:p-12">
          {/* Progress Indicator */}
          <div className="relative mb-12 flex justify-between px-4">
            <div className="absolute top-5 right-8 left-8 -z-10 h-1 -translate-y-1/2 rounded-full bg-gray-200"></div>
            <div
              className="absolute top-5 left-8 -z-10 h-1 -translate-y-1/2 rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `calc(${(step - 1) * 50}% + 2rem)` }}
            ></div>

            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md transition-colors duration-300 ${step >= 1 ? 'bg-indigo-600 text-white' : 'border-2 border-gray-200 bg-white text-gray-400'}`}
              >
                1
              </div>
              <span
                className={`mt-3 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                Personal
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md transition-colors duration-300 ${step >= 2 ? 'bg-indigo-600 text-white' : 'border-2 border-gray-200 bg-white text-gray-400'}`}
              >
                2
              </div>
              <span
                className={`mt-3 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                Club
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md transition-colors duration-300 ${step >= 3 ? 'bg-indigo-600 text-white' : 'border-2 border-gray-200 bg-white text-gray-400'}`}
              >
                3
              </div>
              <span
                className={`mt-3 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                Verify
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-[300px] flex-col space-y-10"
          >
            <div className="flex-grow">
              {/* Section 1: Personal Information */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
                  <h2 className="font-display border-b-2 border-gray-100 pb-3 text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Jane"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      University Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane.doe@university.edu"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="studentId"
                    >
                      Student ID
                    </label>
                    <Input
                      id="studentId"
                      placeholder="22000000"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Section 2: Club Details */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
                  <h2 className="font-display border-b-2 border-gray-100 pb-3 text-2xl font-bold text-gray-900">
                    Club Details
                  </h2>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="clubName"
                    >
                      Club Name
                    </label>
                    <Input
                      id="clubName"
                      placeholder="e.g., Debate Society"
                      required
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="clubCategory"
                    >
                      Category
                    </label>
                    <select
                      id="clubCategory"
                      required
                      value={clubCategory}
                      onChange={(e) => setClubCategory(e.target.value)}
                      className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="clubDescription"
                    >
                      Brief Description
                    </label>
                    <textarea
                      id="clubDescription"
                      placeholder="What is the mission of your club?"
                      rows={4}
                      required
                      value={clubDescription}
                      onChange={(e) => setClubDescription(e.target.value)}
                      className="w-full resize-none rounded-2xl border-transparent bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Section 3: Verification Documents */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
                  <h2 className="font-display border-b-2 border-gray-100 pb-3 text-2xl font-bold text-gray-900">
                    Verification Documents{' '}
                    <span className="text-sm font-normal text-gray-500">
                      (Optional)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    Please upload your official faculty advisor approval letter.
                  </p>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-10 transition-colors hover:border-indigo-400 hover:bg-indigo-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
                      <p className="mb-2 px-4 text-center text-sm text-gray-500">
                        {clubDocument ? (
                          <span className="font-semibold text-[#4F46E5]">
                            {clubDocument.name}
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOCX up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setClubDocument(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 bg-white/50 px-8 py-4 text-lg text-gray-700 shadow-none backdrop-blur-md transition-all hover:bg-white/70"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className={`py-4 text-lg font-bold ${step > 1 ? 'w-2/3' : 'w-full'}`}
                disabled={isSubmitting}
              >
                {step < 3
                  ? 'Next Step'
                  : isSubmitting
                    ? 'Submitting...'
                    : 'Submit Registration'}
              </Button>
            </div>
            {errorMsg && (
              <p className="mt-4 text-center text-sm font-semibold text-red-500">
                {errorMsg}
              </p>
            )}
          </form>
        </BentoCard>
      </main>
    </div>
  );
}
