import Button from '@/components/Button';
import { theme } from '@/constants/styles';
import { useRoutineDetail } from '@/hooks/useRoutineDetail';
import { useWorkoutSession } from '@/hooks/useWorkoutSession';
import { WorkoutSession } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import ExerciseTrackingCard from './ExerciseTrackingCard';


interface ActiveWorkoutViewProps {
  session: WorkoutSession;
  onFinish: () => void;
  onSessionUpdate: () => void;
}

export default function ActiveWorkoutView({ session, onFinish, onSessionUpdate }: ActiveWorkoutViewProps) {
  const router = useRouter();
  const { routine, refresh, isLoading } = useRoutineDetail(session.routine);
  const { addSet } = useWorkoutSession();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAddSet = async (exerciseId: number, setNumber: number, weight: string, reps: number) => {
    try {
      await addSet(exerciseId, setNumber, weight, reps, session.id);
      onSessionUpdate();
    } catch (error) {
      throw error;
    }
  };

  const handleFinish = () => {
    Alert.alert(
      'Finalizar entrenamiento',
      '¿Deseas finalizar este entrenamiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          onPress: () => {
            onFinish();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusCard}>
        <Ionicons name="accessibility" size={48} color={theme.colors.primary} />
        <Text style={styles.statusTitle}>Entrenamiento en progreso</Text>
        <Text style={styles.statusSubtitle}>Registra tus sets a medida que avanzas</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={24} color={theme.colors.primary} />
          <Text style={styles.statValue}>{session.sets.length}</Text>
          <Text style={styles.statLabel}>Sets completados</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="fitness" size={24} color={theme.colors.primary} />
          <Text style={styles.statValue}>{routine?.items.length || 0}</Text>
          <Text style={styles.statLabel}>Ejercicios</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ejercicios de la rutina</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        routine?.items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <ExerciseTrackingCard
              key={item.id}
              item={item}
              session={session}
              onAddSet={handleAddSet}
            />
          ))
      )}

      <View style={styles.actions}>
        <Button
          title="Finalizar"
          onPress={handleFinish}
          variant="primary"
        />
        <Button
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statusCard: {
    backgroundColor: theme.colors.primaryLight + '20',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  statusTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  statusSubtitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statValue: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
  },
  statLabel: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.md,
  },
  actions: {
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
});

