/**
 * ============================================================================
 * useAuthStore Store (Zustand Global Authentication State)
 * ============================================================================
 *
 * [WHAT IT IS FOR]
 * This is the global state management store for authentication and session status.
 * It manages the logged-in user's JSON Web Token (JWT), their role permission levels
 * (e.g. 'student' or 'executive'), and handles client-side authentication routines.
 *
 * [WHERE IT IS USED]
 * - Login form page (`app/login/page.tsx`) to trigger signs ins and set auth tokens.
 * - Signup form page (`app/signup/page.tsx`) to trigger registrations.
 * - Global layouts and conditional renders that check roles (e.g. showing "Sign In" vs "Dashboard").
 *
 * [STATE CONTRACT]
 * - token: (string | null) The active JWT authorization token string.
 * - role: ('student' | 'executive' | null) Authorization profile levels.
 * - isLoading: (boolean) Loading feedback state indicator during credential verification.
 * - setAuth: (function) Helper action to manually set token and role levels.
 * - clearAuth: (function) Action used during user logout to flush active states.
 * - login: (function) Async handler for verifying credentials and fetching profiles.
 * - register: (function) Async handler for user profile creation.
 */

import { create } from 'zustand';

// Define the role types supported by our application access control list
export type Role = 'student' | 'executive' | null;

// The full shape and interface representing our global Zustand authentication state
interface AuthState {
  token: string | null; // Current session JSON Web Token
  role: Role; // Authenticated user role profile
  isLoading: boolean; // Flag tracking network flight status
  setAuth: (token: string, role: Role) => void; // Directly updates session details
  clearAuth: () => void; // Reset store parameters (logout action)
  login: (email: string, password: string) => Promise<Role>; // Validates user credentials
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<Role>; // Registers a new user account profile
}

export const useAuthStore = create<AuthState>((set) => ({
  // ----------------------------------------------------
  // Initial Store States
  // ----------------------------------------------------
  token: null,
  role: null,
  isLoading: false,

  // ----------------------------------------------------
  // Sync Store Actions
  // ----------------------------------------------------
  setAuth: (token, role) => set({ token, role }),
  clearAuth: () => set({ token: null, role: null }),

  // ----------------------------------------------------
  // Async Authentication API Actions (Simulated)
  // ----------------------------------------------------
  login: async (email, password) => {
    set({ isLoading: true });

    // Validate password parameter to use it in simulated logic
    if (!password) {
      throw new Error('Password is required');
    }

    // TODO: Replace this simulated login delay with an actual POST request to the backend:
    // const response = await axios.post('/api/auth/login', { email, password });
    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive" (mock behavior)
    const role: Role =
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('executive')
        ? 'executive'
        : 'student';

    set({ token: 'mock-jwt-token', role, isLoading: false });
    return role;
  },

  register: async (email, password, firstName, lastName) => {
    set({ isLoading: true });

    // Validate registration fields to use them in simulated logic
    if (!password || !firstName || !lastName) {
      throw new Error('Missing required registration details');
    }

    // TODO: Replace this simulated signup delay with an actual POST request to the backend:
    // const response = await axios.post('/api/auth/signup', { email, password, firstName, lastName });
    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive" (mock behavior)
    const role: Role =
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('executive')
        ? 'executive'
        : 'student';

    set({ token: 'mock-jwt-token', role, isLoading: false });
    return role;
  },
}));
