import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-primary text-xl font-bold tracking-tight"
            >
              Handong ClubHub
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              The central hub for exploring, joining, and managing all student
              organizations at Handong Global University.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {/* Instagram Logo */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-pink-100 hover:text-pink-600"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* KakaoTalk Channel Logo */}
              <a
                href="https://pf.kakao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eee] text-[#000] shadow-sm transition-colors hover:bg-[#FEE500]/90"
                aria-label="KakaoTalk Channel"
              >
                <MessageCircle size={20} className="fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display mb-4 text-sm font-semibold text-gray-900">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/clubs"
                  className="hover:text-primary transition-colors"
                >
                  Find clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display mb-4 text-sm font-semibold text-gray-900">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/support"
                  className="hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display mb-4 text-sm font-semibold text-gray-900">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Handong ClubHub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
