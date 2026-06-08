import { useAuthStore } from '../useAuthStore';
import api from '@/lib/axios';

// Mock the axios api wrapper
jest.mock('@/lib/axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
}));

describe('useAuthStore', () => {
  // Clear the store before each test
  beforeEach(() => {
    useAuthStore.getState().clearAuth();
    jest.clearAllMocks();
  });

  describe('Synchronous Actions', () => {
    it('initializes with default state', () => {
      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.role).toBeNull();
      expect(state.userName).toBeNull();
      expect(state.isExecutive).toBe(false);
      expect(state.favouriteClubIds).toEqual([]);
    });

    it('setAuth updates the store correctly', () => {
      useAuthStore
        .getState()
        .setAuth('dummy-token', 'student', 'John Doe', 'CS', true);

      const state = useAuthStore.getState();
      expect(state.token).toBe('dummy-token');
      expect(state.role).toBe('student');
      expect(state.userName).toBe('John Doe');
      expect(state.major).toBe('CS');
      expect(state.isExecutive).toBe(true);
    });

    it('clearAuth resets the store', () => {
      useAuthStore.getState().setAuth('dummy-token', 'student');
      expect(useAuthStore.getState().token).toBe('dummy-token');

      useAuthStore.getState().clearAuth();
      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.role).toBeNull();
      expect(state.favouriteClubIds).toEqual([]);
    });

    it('setActiveRole updates active role', () => {
      useAuthStore.getState().setActiveRole('executive');
      expect(useAuthStore.getState().activeRole).toBe('executive');
    });

    it('toggleFavouriteClub adds and removes club IDs', () => {
      const { toggleFavouriteClub } = useAuthStore.getState();

      toggleFavouriteClub('club-1');
      expect(useAuthStore.getState().favouriteClubIds).toContain('club-1');

      toggleFavouriteClub('club-1');
      expect(useAuthStore.getState().favouriteClubIds).not.toContain('club-1');
    });

    it('toggleSavedEvent adds and removes event IDs', () => {
      const { toggleSavedEvent } = useAuthStore.getState();

      toggleSavedEvent('event-1');
      expect(useAuthStore.getState().savedEventIds).toContain('event-1');

      toggleSavedEvent('event-1');
      expect(useAuthStore.getState().savedEventIds).not.toContain('event-1');
    });
  });

  describe('Asynchronous Actions (Mocked API)', () => {
    it('login throws error on missing password', async () => {
      await expect(
        useAuthStore.getState().login('test@test.com', '')
      ).rejects.toThrow('Password is required');
    });

    it('login handles successful authentication', async () => {
      // Mock the successful login response
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: {
          session: { access_token: 'mock-token' },
          user: { id: 'user-1' },
        },
      });
      // Mock the successful clubs fetch
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: [],
      });

      const role = await useAuthStore
        .getState()
        .login('test@test.com', 'password123');

      expect(role).toBe('student');
      expect(useAuthStore.getState().token).toBe('mock-token');
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@test.com',
        password: 'password123',
      });
    });

    it('login handles failed authentication (401)', async () => {
      (api.post as jest.Mock).mockRejectedValueOnce({
        response: { status: 401 },
      });

      await expect(
        useAuthStore.getState().login('test@test.com', 'wrong')
      ).rejects.toThrow('Incorrect email or password. Please try again.');
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });
});
