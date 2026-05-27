'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Semantic styling tokens and simplified class groups
const styles = {
  container:
    'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F9FAFB] px-4 py-12 font-sans selection:bg-[#4F46E5]/20',
  bgBlob: 'pointer-events-none absolute rounded-full blur-[120px]',
  bgBlob1: 'top-[-10%] left-[-10%] h-[400px] w-[400px] bg-indigo-200/30',
  bgBlob2: 'right-[-10%] bottom-[-10%] h-[400px] w-[400px] bg-emerald-100/30',
  card: 'relative z-10 w-full max-w-sm rounded-[24px] border border-white/40 bg-white/70 p-8 text-center shadow-[0px_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md',
  logoContainer:
    'relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/80 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.02)] backdrop-blur-sm',
  logoText:
    'font-sans text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase',
  titleText:
    'font-display mt-1 text-3xl font-extrabold tracking-tight text-[#4F46E5]',
  placeholderText: 'mt-6 text-lg font-bold text-gray-700',
  linkButton:
    'mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#4F46E5] py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)] transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)]',
  footerText: 'mt-8 text-xs font-medium tracking-wide text-gray-400',
};

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Premium background decorative shapes */}
      <div className={`${styles.bgBlob} ${styles.bgBlob1}`} />
      <div className={`${styles.bgBlob} ${styles.bgBlob2}`} />

      {/* Main Glassmorphic Container */}
      <main className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/handongunilogo.png"
            alt="HGU Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </div>
        <div className={styles.logoText}>Handong Global University</div>
        <h1 className={styles.titleText}>CLUBHUB</h1>

        <div className={styles.placeholderText}>Homepage coming soon</div>

        <Link href="/login" className={styles.linkButton}>
          Go to Sign In
        </Link>
      </main>

      <div className={styles.footerText}>Handong ClubHub v1.0</div>
    </div>
  );
}
