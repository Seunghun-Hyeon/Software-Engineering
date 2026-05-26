import { create } from 'zustand';

export type Role = 'student' | 'executive' | null;

interface AuthState {
  token: string | null;
  role: Role;
  isLoading: boolean;
  setAuth: (token: string, role: Role) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<Role>;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<Role>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  isLoading: false,
  setAuth: (token, role) => set({ token, role }),
  clearAuth: () => set({ token: null, role: null }),
  login: async (email, password) => {
    set({ isLoading: true });

    // Validate password parameter to use it in simulated logic
    if (!password) {
      throw new Error('Password is required');
    }

    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive"
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

    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive"
    const role: Role =
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('executive')
        ? 'executive'
        : 'student';

    set({ token: 'mock-jwt-token', role, isLoading: false });
    return role;
  },
}));
