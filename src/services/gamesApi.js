import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'https://api-best-browser-games.vercel.app',
});

gamesApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const getToken = async () => {
  try {
    const response = await gamesApi.post('https://api-best-browser-games.vercel.app/games', {

    });
    return response.data.token;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    throw error;
  }
};

export default gamesApi;
