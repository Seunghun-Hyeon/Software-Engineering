import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-4 lg:px-8">
        <Link
          href="/"
          className="font-display text-primary text-xl font-bold tracking-tight"
        >
          Handong ClubHub
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/clubs"
            className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
          >
            Clubs
          </Link>
          <Link
            href="/events"
            className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hover:text-primary text-sm font-semibold text-gray-700 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
