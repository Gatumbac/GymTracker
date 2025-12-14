import { AuthProvider } from '@context/AuthContext';
import { useAuth } from "@hooks/useAuth";
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Componente interno que maneja la navegación según el estado
function InitialLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // Si no hay sesión y no estamos en login, mandar a login
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Si hay sesión y estamos en login, mandar al home
      router.replace('/');
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

// Layout principal que envuelve todo con el Provider
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}