/**
 * ============================================================================
 * Login Page (`/login` route page)
 * ============================================================================
 *
 * [ROUTE MAP]
 * - Path: `/login`
 * - Links to: `/signup` (Registration form)
 * - Redirects to: `/manager/dashboard` (for Club Executives) or `/student/dashboard` (for Students) on successful auth.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { BentoCard as Card } from '@/app/components/BentoCard';
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';

export default function LoginPage() {
  const router = useRouter();
  // Fetch authentication state and actions from the global Zustand store
  const { login, isLoading, isExecutive, setActiveRole } = useAuthStore();

  // Form State parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Show role selection UI if executive signs in
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  // UI status feedback messages (errors & successes)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email format validation helper (checks for presence of local character values and domain tags)
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  // Handles verification and submission when the Form triggers standard postback actions
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Frontend sanity checks
    if (!email) {
      setErrorMessage('Please enter your university email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      // Execute the API handler simulation from the auth store
      await login(email, password);
      setSuccessMessage('Successfully signed in! Redirecting...');

      // Redirect user profiles to respective route levels: if isExecutive is false, redirect to /student/dashboard. If true, show role selection screen.
      setTimeout(() => {
        const isExec = useAuthStore.getState().isExecutive;
        if (isExec) {
          // Show the role selection screen
          setShowRoleSelection(true);
        } else {
          // If user is not executive, automatically set activeRole to 'student' after login
          setActiveRole('student');
          // Redirect directly to student dashboard
          router.push('/student/dashboard');
        }
      }, 1000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to sign in. Please try again.';
      setErrorMessage(message);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20">
        {/* Premium background decorative blur shapes */}
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />
        <div className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-[120px]" />

        <main className="relative z-10 w-full max-w-[800px] px-4 pt-12">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/80 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.03)] backdrop-blur-sm">
              <Image
                src="/handongunilogo.png"
                alt="HGU Logo"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="font-display mt-2 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Which account would you like to access?
            </h1>
            <p className="mt-3 max-w-md text-sm text-gray-500">
              Choose the interface you want to work with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Student Account Card */}
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)]">
              <div className="flex min-h-[220px] flex-1 flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100/50 bg-indigo-50 text-xl">
                    🎓
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Student Account
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Browse clubs, save events, track applications
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveRole('student');
                      router.push('/student/dashboard');
                    }}
                  >
                    Continue to Student
                  </Button>
                </div>
              </div>
            </Card>

            {/* Executive Account Card */}
            <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
              <div className="flex min-h-[220px] flex-1 flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100/50 bg-emerald-50 text-emerald-600">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Executive Account
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Manage your club, review applications
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveRole('executive');
                      router.push('/manager/dashboard');
                    }}
                    className="bg-emerald-600 shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:bg-emerald-700 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)]"
                  >
                    Continue to Executive
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center font-sans text-xs font-medium tracking-wide text-gray-400">
            Handong ClubHub v1.0
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20">
      {/* Premium background decorative blur shapes */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-[120px]" />

      {/* Main Glassmorphic layout container wrapper */}
      <main className="relative z-10 w-full max-w-[480px] pt-12">
        {/* Header containing Official Handong Global University Branding */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/80 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.03)] backdrop-blur-sm">
            <Image
              src="/handongunilogo.png"
              alt="HGU Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
          <div className="font-sans text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Handong Global University
          </div>
          <h1 className="font-display mt-1 text-4xl font-extrabold tracking-tight text-[#4F46E5]">
            CLUBHUB
          </h1>
          <p className="mt-2 max-w-xs font-sans text-sm text-gray-500">
            Connect, discover, and lead in university student life
          </p>
        </div>

        {/* Primary Glassmorphic Auth Form Bento Card */}
        <Card>
          <div className="mb-6 text-center">
            <h2 className="font-display text-xl font-bold text-gray-800">
              Sign In
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* AnimatePresence for smooth showing/hiding of validation warnings */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-600"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-medium text-emerald-600"
              >
                <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-emerald-500" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form Fields */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Field with validation bounds */}
            <Input
              id="signin-email"
              type="email"
              label="University Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@handong.ac.kr"
              disabled={isLoading}
              icon={<Mail className="h-4 w-4" />}
            />

            {/* Password input section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label
                  htmlFor="signin-password"
                  className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-[#4F46E5] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                icon={<Lock className="h-4 w-4" />}
              />
            </div>

            {/* Pill-shaped submit button displaying Framer Motion indicator during requests */}
            <Button isLoading={isLoading}>Sign In</Button>
          </form>

          {/* Redirect to Register link text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Register
            </Link>
          </div>
        </Card>

        {/* Client side version telemetry badge */}
        <div className="mt-8 text-center font-sans text-xs font-medium tracking-wide text-gray-400">
          Handong ClubHub v1.0
        </div>
      </main>
    </div>
  );
}
