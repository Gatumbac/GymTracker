import { Stack } from 'expo-router';

export default function WorkoutsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: 'Entrenamientos',
          headerBackTitle: 'Entrenamientos',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          headerTitle: 'Detalle de Entrenamiento',
          headerBackTitle: 'Entrenamientos',
        }}
      />
    </Stack>
  );
}
