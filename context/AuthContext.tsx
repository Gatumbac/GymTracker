import { clearCachedToken, setUnauthorizedHandler, updateCachedToken } from '@api/client';
import { authEndpoints } from '@api/endpoints/auth';
import { LoginRequest, RegisterRequest } from '@api/types/entities.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  signIn: (credentials: LoginRequest) => Promise<void>;
  signUp: (data: RegisterRequest) => Promise<void>;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => { },
  signUp: async () => { },
  signOut: () => { },
  session: null,
  isLoading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    try {
      setSession(null);
      clearCachedToken();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Error al hacer logout', error);
    }
  };

  useEffect(() => {
    // handler para el api client
    setUnauthorizedHandler(signOut);

    const loadStorageData = async () => {
      try {
        const authData = await AsyncStorage.getItem('authToken');
        if (authData) {
          updateCachedToken(authData);
          setSession(authData);
        }
      } catch (e) {
        console.error('Error al obtener el token desde el AsyncStorage', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authEndpoints.login(credentials);
      const { access, refresh } = response.data;
      console.log('Access token:', access);
      console.log('Refresh token:', refresh);
      await AsyncStorage.setItem('authToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      updateCachedToken(access);
      setSession(access);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authEndpoints.register(data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}