/**
 * ============================================================================
 * Utility Functions (cn helper)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This file contains simple helper utilities used across the entire application.
 * The `cn` function is a standard helper in the modern frontend stack designed to
 * conditionally combine Tailwind CSS class names while resolving any duplicate or
 * conflicting styling rules.
 *
 * [WHERE IT IS USED]
 * - Used universally throughout components in `app/components/` and routes in `app/`
 *   to handle dynamic styling, active/disabled states, hover effects, and custom className overrides.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple CSS class values into a single space-separated class string.
 * It dynamically evaluates conditional expressions, simplifies arrays/objects,
 * and ensures Tailwind utility overrides function correctly (e.g. padding overlays).
 *
 * @param inputs - List of class lists, conditional objects, or strings to combine.
 * @returns A single string representing the merged and resolved CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
