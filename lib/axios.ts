import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Configure standard axios instance
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const baseURL = serverUrl
  ? serverUrl.endsWith('/api')
    ? serverUrl
    : `${serverUrl}/api`
  : '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log(
    'Full Authorization header:',
    `Bearer ${token?.substring(0, 50)}...`
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Avoid duplicate /api prefix when baseURL already includes /api
  if (
    config.url &&
    config.url.startsWith('/api') &&
    config.baseURL &&
    config.baseURL.endsWith('/api')
  ) {
    config.url = config.url.substring(4);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expired or invalid - user needs to sign in again');
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
