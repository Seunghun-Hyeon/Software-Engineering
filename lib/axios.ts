import axios from 'axios';

// Configure standard axios instance
// TODO: Replace NEXT_PUBLIC_API_URL in .env when connecting to real backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
