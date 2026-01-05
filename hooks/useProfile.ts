import { ProfileContext } from '@/context/ProfileContext';
import { useContext } from 'react';

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile debe usarse dentro de un ProfileProvider');
  }

  return context;
};