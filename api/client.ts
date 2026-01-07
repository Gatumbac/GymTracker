import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let cachedToken: string | null = null;

const apiClient = axios.create({
  baseURL: 'https://web-production-4572f.up.railway.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar el JWT en cada request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      if (!cachedToken) {
        cachedToken = await AsyncStorage.getItem('authToken');
      }

      if (cachedToken && config.headers) {
        config.headers.Authorization = `Bearer ${cachedToken}`;
      }
    } catch (error) {
      console.error('Error obteniendo token:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de response - Manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // token expirado 
      // cerrar sesion con el AuthContext
      if (onUnauthorized) {
        onUnauthorized();
      }
    }

    if (error.response?.status === 403) {
      console.error('Acceso prohibido');
    }

    if (!error.response) {
      console.error('Error de conexión');
    }

    return Promise.reject(error);
  }
);

export const updateCachedToken = (token: string | null) => {
  cachedToken = token;
};

export const clearCachedToken = () => {
  cachedToken = null;
};

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

export default apiClient;
