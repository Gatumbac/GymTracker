import { Stack } from 'expo-router';

export default function RoutinesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: 'Rutinas',
          headerBackTitle: 'Rutinas',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          headerTitle: 'Detalle de Rutina',
          headerBackTitle: 'Rutinas',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShown: false,
          headerTitle: 'Crear Rutina',
          headerBackTitle: 'Rutinas',
        }}
      />
    </Stack>
  );
}
