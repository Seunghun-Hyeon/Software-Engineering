import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';

interface AxiosErrorLike {
  response?: {
    status: number;
    data?: unknown;
  };
  request?: unknown;
  message?: string;
}

// Define the role types supported by our application access control list
export type Role = 'student' | 'executive' | null;

// The full shape and interface representing our global Zustand authentication state
interface AuthState {
  token: string | null; // Current session JSON Web Token
  role: Role; // Authenticated user role profile
  userName: string | null; // Authenticated user's name
  isExecutive: boolean; // Flag tracking whether user is an executive
  isLoading: boolean; // Flag tracking network flight status
  activeRole: 'student' | 'executive' | null; // Currently active user role profile view
  favouriteClubIds: string[]; // Favourited club IDs
  savedEventIds: string[]; // Saved event IDs
  userId: string | null; // Authenticated user ID
  major: string | null; // Authenticated user's major
  updatedProfiles: Record<string, { userName: string; major: string }>; // Persistent profiles override
  setAuth: (
    token: string,
    role: Role,
    userName?: string | null,
    isExecutive?: boolean,
    userId?: string | null,
    major?: string | null
  ) => void; // Directly updates session details
  clearAuth: () => void; // Reset store parameters (logout action)
  setActiveRole: (role: 'student' | 'executive') => void; // Set currently active role
  login: (email: string, password: string) => Promise<Role>; // Validates user credentials
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    major?: string
  ) => Promise<Role>; // Registers a new user account profile
  toggleFavouriteClub: (clubId: string) => void; // Toggles favourite status of a club
  toggleSavedEvent: (eventId: string) => void; // Toggles saved status of an event
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ----------------------------------------------------
      // Initial Store States
      // ----------------------------------------------------
      token: null,
      role: null,
      userName: null,
      isExecutive: false,
      isLoading: false,
      activeRole: null,
      favouriteClubIds: [],
      savedEventIds: [],
      userId: null,
      major: null,
      updatedProfiles: {},

      // ----------------------------------------------------
      // Sync Store Actions
      // ----------------------------------------------------
      setAuth: (
        token,
        role,
        userName = null,
        isExecutive = false,
        userId = null,
        major = null
      ) => set({ token, role, userName, isExecutive, userId, major }),
      clearAuth: () =>
        set({
          token: null,
          role: null,
          userName: null,
          isExecutive: false,
          activeRole: null,
          favouriteClubIds: [],
          savedEventIds: [],
          userId: null,
          major: null,
        }),
      setActiveRole: (role) => set({ activeRole: role }),
      toggleFavouriteClub: (clubId) =>
        set((state) => ({
          favouriteClubIds: state.favouriteClubIds.includes(clubId)
            ? state.favouriteClubIds.filter((id) => id !== clubId)
            : [...state.favouriteClubIds, clubId],
        })),
      toggleSavedEvent: (eventId) =>
        set((state) => ({
          savedEventIds: state.savedEventIds.includes(eventId)
            ? state.savedEventIds.filter((id) => id !== eventId)
            : [...state.savedEventIds, eventId],
        })),

      // ----------------------------------------------------
      // Async Authentication API Actions (Connected to Backend)
      // ----------------------------------------------------
      login: async (email, password) => {
        set({ isLoading: true });

        // Validate password parameter to use it in simulated logic
        if (!password) {
          set({ isLoading: false });
          throw new Error('Password is required');
        }

        try {
          const response = await api.post('/api/auth/login', {
            email,
            password,
          });

          const token = response.data.session?.access_token || null;
          const userId = response.data.user?.id || null;

          const dbName = response.data.user?.name || '';
          let userName = dbName;
          let major = null;
          if (dbName.includes('|')) {
            const parts = dbName.split('|');
            userName = parts[0].trim();
            major = parts[1].trim();
          }

          // Override with locally persisted updated name/major if present
          const persistedProfiles =
            useAuthStore.getState().updatedProfiles || {};
          if (userId && persistedProfiles[userId]) {
            userName = persistedProfiles[userId].userName;
            major = persistedProfiles[userId].major;
          }

          // Fetch all clubs from GET /api/clubs/ using api
          let isExecutive = false;
          try {
            const clubsResponse = await api.get('/api/clubs/', {
              headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            const clubs = clubsResponse.data;
            if (Array.isArray(clubs)) {
              isExecutive = clubs.some(
                (club: { exec_user_id: string }) => club.exec_user_id === userId
              );
            }
          } catch (clubErr) {
            const axiosErr = clubErr as AxiosErrorLike;
            console.error(
              'Failed to check executive status:',
              axiosErr.message || axiosErr
            );
          }

          set({
            token,
            role: 'student',
            userName,
            major,
            userId,
            isExecutive,
            isLoading: false,
            activeRole: 'student',
          });
          return 'student';
        } catch (err) {
          const axiosErr = err as AxiosErrorLike;
          set({ isLoading: false });

          let friendlyMessage = 'Failed to sign in. Please try again.';
          if (axiosErr.response) {
            const status = axiosErr.response.status;
            if (status === 400) {
              friendlyMessage =
                'Invalid request. Please check your email and password.';
            } else if (status === 401) {
              friendlyMessage =
                'Incorrect email or password. Please try again.';
            } else if (status === 500) {
              friendlyMessage = 'Server error. Please try again later.';
            }
          } else if (axiosErr.request) {
            friendlyMessage =
              'Connection error. Please check your network connection.';
          } else if (axiosErr.message) {
            friendlyMessage = axiosErr.message;
          }

          throw new Error(friendlyMessage);
        }
      },

      register: async (email, password, firstName, lastName, major) => {
        set({ isLoading: true });

        // Validate registration fields to use them in simulated logic
        if (!password || !firstName || !lastName) {
          set({ isLoading: false });
          throw new Error('Missing required registration details');
        }

        try {
          const fullName = `${firstName} ${lastName}`;
          const serializedName = major ? `${fullName} | ${major}` : fullName;
          const response = await api.post('/api/auth/signup', {
            email,
            password,
            name: serializedName,
            role: 'student',
          });

          const role: Role = 'student';
          const isExecutive = false;

          const userName = fullName;

          set({
            token: response.data.token || null,
            role,
            userName,
            major: major || null,
            userId: response.data.user?.id || null,
            isExecutive,
            isLoading: false,
            activeRole: 'student',
          });
          return role;
        } catch (err) {
          const axiosErr = err as AxiosErrorLike;
          set({ isLoading: false });

          let friendlyMessage = 'Registration failed. Please try again.';
          if (axiosErr.response) {
            const status = axiosErr.response.status;
            if (status === 400) {
              friendlyMessage =
                'Invalid registration details. Please check the form data.';
            } else if (status === 401) {
              friendlyMessage =
                'Unauthorized registration. Please check your credentials.';
            } else if (status === 500) {
              friendlyMessage =
                'Server error during registration. Please try again later.';
            }
          } else if (axiosErr.request) {
            friendlyMessage =
              'Connection error. Please check your network connection.';
          } else if (axiosErr.message) {
            friendlyMessage = axiosErr.message;
          }

          throw new Error(friendlyMessage);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        userName: state.userName,
        isExecutive: state.isExecutive,
        activeRole: state.activeRole,
        favouriteClubIds: state.favouriteClubIds,
        savedEventIds: state.savedEventIds,
        userId: state.userId,
        major: state.major,
        updatedProfiles: state.updatedProfiles,
      }),
    }
  )
);

// Add axios interceptor to automatically send Bearer token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    if (!config.headers) {
      config.headers = {} as typeof config.headers;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
