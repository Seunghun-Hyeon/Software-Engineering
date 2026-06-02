import { create } from 'zustand';

// Define the role types supported by our application access control list
export type Role = 'student' | 'executive' | null;

// The full shape and interface representing our global Zustand authentication state
interface AuthState {
  token: string | null; // Current session JSON Web Token
  role: Role; // Authenticated user role profile
  userName: string | null; // Authenticated user's name
  isExecutive: boolean; // Flag tracking whether user is an executive
  isLoading: boolean; // Flag tracking network flight status
  setAuth: (
    token: string,
    role: Role,
    userName?: string | null,
    isExecutive?: boolean
  ) => void; // Directly updates session details
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
  userName: null,
  isExecutive: false,
  isLoading: false,

  // ----------------------------------------------------
  // Sync Store Actions
  // ----------------------------------------------------
  setAuth: (token, role, userName = null, isExecutive = false) =>
    set({ token, role, userName, isExecutive }),
  clearAuth: () =>
    set({ token: null, role: null, userName: null, isExecutive: false }),

  // ----------------------------------------------------
  // Async Authentication API Actions (Simulated)
  // ----------------------------------------------------
  login: async (email, password) => {
    set({ isLoading: true });

    // Validate password parameter to use it in simulated logic
    if (!password) {
      throw new Error('Password is required');
    }

    // const response = await axios.post('/api/auth/login', { email, password });
    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive" (mock behavior)
    const role: Role =
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('executive')
        ? 'executive'
        : 'student';

    // TODO: isExecutive will come from backend API response after login
    const isExecutive = false;

    // const userName = response.data.firstName + ' ' + response.data.lastName;
    const userName = null;

    set({
      token: 'mock-jwt-token',
      role,
      userName,
      isExecutive,
      isLoading: false,
    });
    return role;
  },

  register: async (email, password, firstName, lastName) => {
    set({ isLoading: true });

    // Validate registration fields to use them in simulated logic
    if (!password || !firstName || !lastName) {
      throw new Error('Missing required registration details');
    }

    // const response = await axios.post('/api/auth/signup', { email, password, firstName, lastName });
    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email containing "admin" or "executive" (mock behavior)
    const role: Role =
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('executive')
        ? 'executive'
        : 'student';

    const userName = `${firstName} ${lastName}`;

    set({
      token: 'mock-jwt-token',
      role,
      userName,
      isExecutive: role === 'executive',
      isLoading: false,
    });
    return role;
  },
}));
