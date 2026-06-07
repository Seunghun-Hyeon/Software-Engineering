import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins, Inter } from 'next/font/google';
import './globals.css';
import { LayoutWrapper } from './components/LayoutWrapper';

// Initialize core fonts according to brand design rules: Poppins for headings, Inter for body
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Configure standard SEO metadata for search engines and social shares
export const metadata: Metadata = {
  title: 'Handong ClubHub',
  description: 'The central hub for all Handong Global University clubs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      {/* Root body element with min-height and flex column configuration */}
      <body className="flex min-h-full flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
