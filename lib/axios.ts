import axios from 'axios';

// Configure standard axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
