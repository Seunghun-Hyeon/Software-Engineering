'use client';

import React, { useState } from 'react';
import { BentoCard } from '@/app/components/BentoCard';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { CheckCircle2, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function ManagerRegistrationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
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
                      placeholder="12345678"
                      required
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
                      defaultValue=""
                      className="w-full rounded-2xl border-transparent bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="academic">Academic</option>
                      <option value="cultural">Cultural</option>
                      <option value="recreational">Recreational</option>
                      <option value="professional">Professional</option>
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
                      className="w-full resize-none rounded-2xl border-transparent bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Section 3: Verification Documents */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
                  <h2 className="font-display border-b-2 border-gray-100 pb-3 text-2xl font-bold text-gray-900">
                    Verification Documents
                  </h2>
                  <p className="text-sm text-gray-600">
                    Please upload your official faculty advisor approval letter.
                  </p>

                  <div className="group flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-10 transition-colors hover:border-indigo-400 hover:bg-indigo-50">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                      <UploadCloud className="h-8 w-8 text-indigo-600" />
                    </div>
                    <span className="mb-1 text-sm font-bold text-indigo-700">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500">
                      PDF, JPG, or PNG (max. 10MB)
                    </span>
                  </div>
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
          </form>
        </BentoCard>
      </main>
    </div>
  );
}
