import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import RoutineExerciseItem from "@/components/RoutineExerciseItem";
import ScreenContainer from "@/components/ScreenContainer";
import { DAYS_OF_WEEK } from "@/constants/days";
import { commonStyles, theme } from "@/constants/styles";
import { useRoutineSchedules } from "@/hooks/useRoutineSchedules";
import { useWorkoutSession } from "@/hooks/useWorkoutSession";
import { routinesEndpoints } from "@api/endpoints/routines";
import { Routine } from "@api/types/entities.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function RoutineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { routineSchedules, isLoading: isLoadingSchedules } = useRoutineSchedules();
  const { startSession, isLoading: isStartingSession } = useWorkoutSession();

  const routineSchedule = routineSchedules.filter(schedule => schedule.routine === Number(id));

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

  const handleStartWorkout = async () => {
    if (!routine) return;
    try {
      const newSession = await startSession(routine.id);
      router.push(`/workouts/${newSession.id}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar la sesión. Intenta nuevamente.");
    }
  };

  if (isLoading || isLoadingSchedules) {
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

      <View style={styles.daysContainer}>
        {routineSchedule.map((schedule) => (
          <Text key={schedule.id} style={styles.dayOfWeek}>{DAYS_OF_WEEK[schedule.day_of_week].name}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Ejercicios ({routine.items.length})</Text>

      {routine.items
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <RoutineExerciseItem key={item.id} item={item} />
        ))}

      <Button
        title="Iniciar Entrenamiento"
        onPress={handleStartWorkout}
        isLoading={isStartingSession}
        style={styles.startButton}
      />

      <Button
        title="Volver"
        onPress={() => router.back()}
        variant="secondary"
      />

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
    marginTop: 0,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.md,
  },
  daysContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
    marginBottom: theme.spacing.xl,
    flexWrap: 'wrap'
  },
  dayOfWeek: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.background,
  },
  startButton: {
    marginBottom: theme.spacing.md,
  },
});
