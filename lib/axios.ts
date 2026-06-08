import axios from 'axios';

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

export default api;
