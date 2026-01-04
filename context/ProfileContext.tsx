import { profileEndpoints } from '@/api/endpoints/profile';
import { UserProfile, UserProfileRequest } from '@/api/types/entities.types';
import React, { createContext, useEffect, useState } from 'react';

interface ProfileContextProps {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: UserProfileRequest) => Promise<UserProfile>;
  refreshProfile: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextProps>(undefined!);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await profileEndpoints.getUserProfile();
      setProfile(response.data);
    } catch (err) {
      setError('Error al cargar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data: UserProfileRequest) => {
    try {
      const response = await profileEndpoints.updateUserProfile(data);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      setError('Error al actualizar');
      throw err;
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      isLoading,
      error,
      updateProfile,
      refreshProfile: fetchProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
