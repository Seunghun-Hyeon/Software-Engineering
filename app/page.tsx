'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { login, register, isLoading } = useAuthStore();

  // Tab State: 'signin' | 'register'
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register specific fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email format validation
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  // Handle Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

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
      const role = await login(email, password);
      setSuccessMessage('Successfully signed in! Redirecting...');

      // Redirect based on role
      setTimeout(() => {
        if (role === 'executive') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
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
      const role = await register(email, password, firstName, lastName);
      setSuccessMessage('Registration successful! Redirecting...');

      // Redirect based on role
      setTimeout(() => {
        if (role === 'executive') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
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
      <div className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-[90px]" />

      {/* Main Glassmorphic Container */}
      <main className="relative z-10 w-full max-w-[480px]">
        {/* Header (HGU logo & Title) */}
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

        {/* Auth Bento Card */}
        <div className="w-full rounded-[24px] border border-white/40 bg-white/70 p-7 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md sm:p-9">
          {/* Tab Switcher - Pill Shaped */}
          <div className="relative mb-8 flex rounded-full bg-[#F3F4F6] p-1">
            <button
              onClick={() => {
                setActiveTab('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              disabled={isLoading}
              className={`relative z-10 flex-1 rounded-full py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
                activeTab === 'signin'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {activeTab === 'signin' && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-[#4F46E5] shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">Sign In</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              disabled={isLoading}
              className={`relative z-10 flex-1 rounded-full py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
                activeTab === 'register'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {activeTab === 'register' && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-[#4F46E5] shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">Register</span>
            </button>
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
          <AnimatePresence mode="wait">
            {activeTab === 'signin' ? (
              // SIGN IN FORM
              <motion.form
                key="signin-form"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="signin-email"
                    className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  >
                    University Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@handong.ac.kr"
                      disabled={isLoading}
                      className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3.5 pr-4 pl-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <label
                      htmlFor="signin-password"
                      className="block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-medium text-[#4F46E5] hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3.5 pr-11 pl-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4F46E5] py-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                      className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                    />
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </motion.form>
            ) : (
              // REGISTER FORM
              <motion.form
                key="register-form"
                onSubmit={handleRegisterSubmit}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* First and Last Name (Side by Side) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="reg-first"
                      className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <User className="h-3.5 w-3.5" />
                      </span>
                      <input
                        id="reg-first"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        disabled={isLoading}
                        className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3 pr-3 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="reg-last"
                      className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <User className="h-3.5 w-3.5" />
                      </span>
                      <input
                        id="reg-last"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        disabled={isLoading}
                        className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3 pr-3 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-email"
                    className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  >
                    University Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. user@handong.ac.kr"
                      disabled={isLoading}
                      className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3 pr-4 pl-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-password"
                    className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      disabled={isLoading}
                      className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3 pr-11 pl-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="reg-confirm"
                    className="ml-1 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      id="reg-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      className="w-full rounded-2xl border border-transparent bg-[#F3F4F6] py-3 pr-11 pl-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4F46E5] py-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                      }}
                      className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                    />
                  ) : (
                    <span>Register</span>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info (Handong ClubHub v1.0) */}
        <div className="mt-8 text-center font-sans text-xs font-medium tracking-wide text-gray-400">
          Handong ClubHub v1.0
        </div>
      </main>
    </div>
  );
}
