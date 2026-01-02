import apiClient from '@api/client';
import { UserProfile, UserProfileRequest } from '@api/types/entities.types';

export const profileEndpoints = {
  getUserProfile: () => apiClient.get<UserProfile>('/users/profile/'),

  updateUserProfile: (data: UserProfileRequest) =>
    apiClient.put<UserProfile>('/users/profile/', data),
};