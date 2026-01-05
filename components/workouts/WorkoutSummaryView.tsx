import Button from '@/components/Button';
import SetList from '@/components/workouts/SetList';
import { theme } from '@/constants/styles';
import { WorkoutSession } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

interface WorkoutSummaryViewProps {
  session: WorkoutSession;
}

export default function WorkoutSummaryView({ session }: WorkoutSummaryViewProps) {
  const router = useRouter();
  const startDate = new Date(session.start_time);
  const endDate = session.end_time ? new Date(session.end_time) : null;

  const formattedDate = startDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const formattedStartTime = startDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedEndTime = endDate?.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const totalVolume = session.sets.reduce((acc, set) => {
    return acc + (parseFloat(set.weight) * set.reps);
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time" size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>
            {formattedStartTime} - {formattedEndTime || 'En progreso'}
          </Text>
        </View>
        {session.duration !== null && (
          <View style={styles.infoRow}>
            <Ionicons name="stopwatch" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>{session.duration} minutos</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={32} color={theme.colors.primary} />
          <Text style={styles.statValue}>{session.sets.length}</Text>
          <Text style={styles.statLabel}>Sets</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="fitness" size={32} color={theme.colors.primary} />
          <Text style={styles.statValue}>{totalVolume.toFixed(0)}</Text>
          <Text style={styles.statLabel}>kg total</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ejercicios realizados</Text>

      {session.sets.length > 0 ? (
        <SetList sets={session.sets} />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="information-circle-outline" size={48} color={theme.colors.text.secondary} />
          <Text style={styles.emptyText}>No se registraron sets en este entrenamiento</Text>
        </View>
      )}

      <Button
        title="Volver"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
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
  emptyState: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
    textAlign: 'center',
  },
});
