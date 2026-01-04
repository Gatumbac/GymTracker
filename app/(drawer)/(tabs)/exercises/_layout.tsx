import { Stack } from 'expo-router';

export default function ExercisesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: 'Ejercicios',
          headerBackTitle: 'Ejercicios',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          headerTitle: 'Detalle de Ejercicio',
          headerBackTitle: 'Ejercicios',
        }}
      />
    </Stack>
  );
}
