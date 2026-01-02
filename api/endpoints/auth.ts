import apiClient from '@api/client';
import { LoginRequest, RegisterRequest, TokenResponse, User } from '@api/types/entities.types';

export const authEndpoints = {
  login: (credentials: LoginRequest) =>
    apiClient.post<TokenResponse>('/users/login/', credentials),

  register: (data: RegisterRequest) =>
    apiClient.post<User>('/users/register/', data),

  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/users/token/refresh/', { refresh: refreshToken }),
};