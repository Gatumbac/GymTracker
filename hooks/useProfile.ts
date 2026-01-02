import { profileEndpoints } from '@/api/endpoints/profile';
import { UserProfile, UserProfileRequest } from '@/api/types/entities.types';
import { useCallback, useEffect, useState } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await profileEndpoints.getUserProfile();
      setProfile(response.data);
    } catch (error) {
      setError('Error al cargar el perfil');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: UserProfileRequest) => {
    setError(null);
    try {
      const response = await profileEndpoints.updateUserProfile(data);
      setProfile(response.data);
      return response.data;
    } catch (error) {
      setError('Error al actualizar el perfil');
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};