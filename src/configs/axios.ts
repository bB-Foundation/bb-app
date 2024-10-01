import axios from 'axios';

import {
  getJwtAccessToken,
  getJwtRefreshToken,
  storeJwtAccessToken,
  storeJwtRefreshToken,
} from '../shared/utils/secure-storage';
import {refreshAuthToken} from '../shared/hooks/sign-in/sign-in.api';

const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

api.interceptors.request.use(async config => {
  try {
    const accessToken = await getJwtAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    Promise.reject(error);
  } finally {
    return config;
  }
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getJwtRefreshToken();
        if (!refreshToken) {
          return;
        }

        const response = await refreshAuthToken(refreshToken);

        await Promise.all([
          storeJwtAccessToken(response.accessToken),
          storeJwtRefreshToken(response.refreshToken),
        ]);

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
