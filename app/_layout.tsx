import { AuthProvider } from '@context/AuthContext';
import { ProfileProvider } from '@context/ProfileContext';
import { useAuth } from "@hooks/useAuth";
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Componente interno que maneja la navegación según el estado
function InitialLayout() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(drawer)/(tabs)');
    }
  }, [session, isLoading, segments]);

  return <Slot />;
}

// Layout principal que envuelve todo con el Provider
export default function RootLayout() {
  return (
    <ProfileProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <InitialLayout />
        </AuthProvider>
      </SafeAreaProvider>
    </ProfileProvider>
  );
}