import LoadingScreen from "@/components/LoadingScreen";
import RoutineExerciseItem from "@/components/RoutineExerciseItem";
import ScreenContainer from "@/components/ScreenContainer";
import { commonStyles, theme } from "@/constants/styles";
import { routinesEndpoints } from "@api/endpoints/routines";
import { Routine } from "@api/types/entities.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RoutineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoutine = async () => {
      if (!id) {
        setError('ID de rutina inválido');
        setIsLoading(false);
        return;
      }
      try {
        const response = await routinesEndpoints.getRoutine(Number(id));
        setRoutine(response.data);
      } catch (err) {
        console.error('Error al cargar rutina:', err);
        setError('No se pudo cargar la rutina');
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutine();
  }, [id]);

  if (isLoading) {
    return <LoadingScreen text="Cargando rutina..." />;
  }

  if (error || !routine) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'No se pudo cargar la información de la rutina.'}
          </Text>
          <Text style={styles.backLink} onPress={() => router.back()}>
            Volver
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>{routine.name}</Text>
      {routine.description && (
        <Text style={styles.description}>{routine.description}</Text>
      )}

      <Text style={styles.sectionTitle}>Ejercicios ({routine.items.length})</Text>

      {routine.items
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <RoutineExerciseItem key={item.id} item={item} />
        ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
    marginBottom: theme.spacing.md,
  },
  backLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  description: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.md,
  },
});
