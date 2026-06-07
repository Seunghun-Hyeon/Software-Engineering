'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';
import { BentoCard } from '@/app/components/BentoCard';
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';

export default function SignupPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [major, setMajor] = useState('');

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
    if (!email.endsWith('@handong.ac.kr')) {
      setErrorMessage('Only Handong University email addresses are allowed.');
      return;
    }
    if (!major) {
      setErrorMessage('Please enter your declared major.');
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
      await register(email, password, firstName, lastName, major);
      setSuccessMessage('Registration successful! Redirecting...');

      // After successful signup, redirect to / (the root landing page)
      setTimeout(() => {
        router.push('/');
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20">
      {/* Premium background decorative shapes */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-[120px]" />

      {/* Main Glassmorphic Container */}
      <main className="relative z-10 w-full max-w-[480px] pt-12">
        {/* Auth Bento Card */}
        <BentoCard>
          <div className="mb-6 text-center">
            <h2 className="font-display text-xl font-bold text-gray-800">
              Register
            </h2>
            <p className="mt-1 mb-8 text-xs text-gray-500">
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

            {/* Major Field */}
            <Input
              id="reg-major"
              type="text"
              label="Declared Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Computer Science"
              disabled={isLoading}
              icon={<Sparkles className="h-4 w-4" />}
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
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </BentoCard>

        {/* Footer info */}
        <div className="mt-8 text-center font-sans text-xs font-medium tracking-wide text-gray-400">
          Handong ClubHub v1.0
        </div>
      </main>
    </div>
  );
}
