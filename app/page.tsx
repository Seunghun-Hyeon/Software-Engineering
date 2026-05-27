/**
 * ============================================================================
 * Root Page Entrypoint File
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the primary root entrypoint for the Handong ClubHub web application.
 * Because the application landing page is located at `/homepage`, this file is
 * responsible for instantly redirecting incoming requests from `/` to the actual homepage.
 *
 * [ROUTE MAP]
 * - Path: `/`
 * - Redirects directly to: `/homepage` (using Next.js server-side redirect)
 */

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Perform an immediate, server-side redirect to the primary homepage route
  redirect('/homepage');
}
