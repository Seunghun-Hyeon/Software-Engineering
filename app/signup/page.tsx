'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';

// Semantic styling tokens and responsive class name groups
const styles = {
  // Page container & backgrounds
  pageContainer:
    'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20',
  bgBlob: 'pointer-events-none absolute rounded-full blur-[120px]',
  bgBlob1: 'top-[-10%] left-[-10%] h-[500px] w-[500px] bg-indigo-200/40',
  bgBlob2: 'right-[-10%] bottom-[-10%] h-[500px] w-[500px] bg-emerald-100/40',
  bgBlob3: 'top-[30%] right-[20%] h-[300px] w-[300px] bg-violet-100/50',

  // Core containers
  mainContainer: 'relative z-10 w-full max-w-[480px]',
  headerContainer: 'mb-8 flex flex-col items-center text-center',
  logoContainer:
    'relative mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/80 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.03)] backdrop-blur-sm',
  logoText:
    'font-sans text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase',
  titleText:
    'font-display mt-1 text-4xl font-extrabold tracking-tight text-[#4F46E5]',
  subtitleText: 'mt-2 max-w-xs font-sans text-sm text-gray-500',

  // Bento Card Layout
  cardHeader: 'mb-6 text-center',
  cardTitle: 'font-display text-xl font-bold text-gray-800',
  cardSubtitle: 'mt-1 text-xs text-gray-500',

  // Feedback Banners
  feedbackContainer:
    'mb-5 flex items-start gap-3 rounded-2xl border p-4 text-xs font-medium',
  errorBanner: 'border-red-100 bg-red-50 text-red-600',
  successBanner: 'border-emerald-100 bg-emerald-50 text-emerald-600',
  feedbackIcon: 'h-4 w-4 shrink-0',
  successIcon: 'animate-pulse text-emerald-500',
  errorIcon: 'text-red-500',

  // Footer Links
  footerText:
    'mt-8 text-center font-sans text-xs font-medium tracking-wide text-gray-400',
  linkText: 'mt-6 text-center text-sm text-gray-500',
  linkAction: 'font-semibold text-[#4F46E5] hover:underline',
};

export default function SignupPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email format validation
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  // Handle Register Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!firstName || !lastName) {
      setErrorMessage('Please enter your first and last name.');
      return;
    }
    if (!email) {
      setErrorMessage('Please enter your university email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please create a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await register(email, password, firstName, lastName);
      setSuccessMessage('Registration successful! Redirecting...');

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Premium background decorative shapes */}
      <div className={cn(styles.bgBlob, styles.bgBlob1)} />
      <div className={cn(styles.bgBlob, styles.bgBlob2)} />
      <div className={cn(styles.bgBlob, styles.bgBlob3)} />

      {/* Main Glassmorphic Container */}
      <main className={styles.mainContainer}>
        {/* Header (HGU logo & Title) */}
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <Image
              src="/handongunilogo.png"
              alt="HGU Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
          <div className={styles.logoText}>Handong Global University</div>
          <h1 className={styles.titleText}>CLUBHUB</h1>
          <p className={styles.subtitleText}>
            Connect, discover, and lead in university student life
          </p>
        </div>

        {/* Auth Bento Card */}
        <Card>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Register</h2>
            <p className={styles.cardSubtitle}>
              Create an account to join the community
            </p>
          </div>

          {/* Feedback Messages */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(styles.feedbackContainer, styles.errorBanner)}
              >
                <AlertCircle
                  className={cn(styles.feedbackIcon, styles.errorIcon)}
                />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(styles.feedbackContainer, styles.successBanner)}
              >
                <Sparkles
                  className={cn(styles.feedbackIcon, styles.successIcon)}
                />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Area */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* First and Last Name (Side by Side) */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="reg-first"
                type="text"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                disabled={isLoading}
                icon={<User className="h-3.5 w-3.5" />}
              />
              <Input
                id="reg-last"
                type="text"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                disabled={isLoading}
                icon={<User className="h-3.5 w-3.5" />}
              />
            </div>

            {/* Email Field */}
            <Input
              id="reg-email"
              type="email"
              label="University Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@handong.ac.kr"
              disabled={isLoading}
              icon={<Mail className="h-4 w-4" />}
            />

            {/* Password Field */}
            <Input
              id="reg-password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              disabled={isLoading}
              icon={<Lock className="h-4 w-4" />}
            />

            {/* Confirm Password Field */}
            <Input
              id="reg-confirm"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              disabled={isLoading}
              icon={<Lock className="h-4 w-4" />}
            />

            {/* Submit Button */}
            <Button isLoading={isLoading} className="mt-2">
              Register
            </Button>
          </form>

          {/* Redirect to Sign In */}
          <div className={styles.linkText}>
            Already have an account?{' '}
            <Link href="/login" className={styles.linkAction}>
              Sign In
            </Link>
          </div>
        </Card>

        {/* Footer info */}
        <div className={styles.footerText}>Handong ClubHub v1.0</div>
      </main>
    </div>
  );
}
