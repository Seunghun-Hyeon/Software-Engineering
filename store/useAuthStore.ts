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
export type Role = 'student' | 'club_executive' | null;

// The full shape and interface representing our global Zustand authentication state
interface AuthState {
  token: string | null; // Current session JSON Web Token
  role: Role; // Authenticated user role profile
  userName: string | null; // Authenticated user's name
  major: string | null; // Authenticated user's major
  isExecutive: boolean; // Flag tracking whether user is an executive
  isLoading: boolean; // Flag tracking network flight status
  activeRole: 'student' | 'club_executive' | null; // Currently active user role profile view
  favouriteClubIds: string[]; // Favourited club IDs
  savedEventIds: string[]; // Saved event IDs
  userId: string | null; // Authenticated user ID
  updatedProfiles: Record<string, { userName: string; major: string }>; // Persistent profiles override
  setAuth: (
    token: string,
    role: Role,
    userName?: string | null,
    major?: string | null,
    isExecutive?: boolean,
    userId?: string | null
  ) => void; // Directly updates session details
  clearAuth: () => void; // Reset store parameters (logout action)
  setActiveRole: (role: 'student' | 'club_executive') => void; // Set currently active role
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
      major: null,
      isExecutive: false,
      isLoading: false,
      activeRole: null,
      favouriteClubIds: [],
      savedEventIds: [],
      userId: null,
      updatedProfiles: {},

      // ----------------------------------------------------
      // Sync Store Actions
      // ----------------------------------------------------
      setAuth: (
        token,
        role,
        userName = null,
        major = null,
        isExecutive = false,
        userId = null
      ) => set({ token, role, userName, major, isExecutive, userId }),
      clearAuth: () =>
        set({
          token: null,
          role: null,
          userName: null,
          major: null,
          isExecutive: false,
          activeRole: null,
          favouriteClubIds: [],
          savedEventIds: [],
          userId: null,
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
          const response = await api.post('/auth/login', {
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

          // Check executive status by matching userId against exec_user_id in clubs
          let isExec = false;
          try {
            const clubsResponse = await api.get('/clubs/');
            const clubs = clubsResponse.data;
            isExec = clubs.some(
              (club: { exec_user_id: string }) => club.exec_user_id === userId
            );
          } catch {
            isExec = false;
          }

          const userRole: Role = isExec ? 'club_executive' : 'student';

          set({
            token,
            role: userRole,
            userName,
            major,
            isExecutive: isExec,
            isLoading: false,
            activeRole: isExec ? null : 'student',
            userId,
          });

          return userRole;
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
          const response = await api.post('/auth/signup', {
            email,
            password,
            name: serializedName,
            role: 'student',
          });

          const role: Role = 'student';
          const isExecutive = false;

          const userName = fullName;

          const userId = response.data.user?.id || null;
          set({
            token: response.data.token || null,
            role,
            userName,
            major: major || null,
            isExecutive,
            isLoading: false,
            activeRole: 'student',
            userId,
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
                (axiosErr.response.data as { error?: string })?.error ||
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
        major: state.major,
        isExecutive: state.isExecutive,
        activeRole: state.activeRole,
        favouriteClubIds: state.favouriteClubIds,
        savedEventIds: state.savedEventIds,
        userId: state.userId,
        updatedProfiles: state.updatedProfiles,
      }),
    }
  )
);

// Add axios interceptor to automatically send Bearer token
// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     if (!config.headers) {
//       config.headers = {} as typeof config.headers;
//     }
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
