import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://api-best-browser-games.vercel.app',
});

gamesApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default gamesApi;
