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

      router.push('/');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to sign in. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20">
      {/* Premium background decorative blur shapes */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-[120px]" />

      {/* Main Glassmorphic layout container wrapper */}
      <main className="relative z-10 w-full max-w-[480px] pt-12">
        {/* Primary Glassmorphic Auth Form Bento Card */}
        <Card>
          <div className="mb-6 text-center">
            <h2 className="font-display text-xl font-bold text-gray-800">
              Sign In
            </h2>
            <p className="mt-1 mb-8 text-xs text-gray-500">
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
