import ExerciseConfigItem from '@/components/ExerciseConfigItem';
import { commonStyles, theme } from '@/constants/styles';
import { Exercise } from '@api/types/entities.types';
import { StyleSheet, Text, View } from 'react-native';

interface ExerciseConfig {
  target_sets?: number;
  target_reps?: number;
  rest_time_seconds?: number;
}

interface Step3ConfigureExercisesProps {
  selectedExercises: Exercise[];
  exerciseConfigs: Map<number, ExerciseConfig>;
  configErrors: Map<number, string>;
  onConfigChange: (id: number, config: ExerciseConfig) => void;
  onRemove: (id: number) => void;
}

export default function Step3ConfigureExercises({
  selectedExercises,
  exerciseConfigs,
  configErrors,
  onConfigChange,
  onRemove,
}: Step3ConfigureExercisesProps) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Configurar Ejercicios</Text>
      <Text style={commonStyles.subtitle}>
        Define sets, reps y tiempo de descanso (opcional)
      </Text>

      {selectedExercises.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No has seleccionado ningún ejercicio.
          </Text>
          <Text style={styles.emptySubText}>
            Vuelve al paso anterior para añadir ejercicios a tu rutina.
          </Text>
        </View>
      ) : (
        selectedExercises.map((exercise) => (
          <ExerciseConfigItem
            key={exercise.id}
            exercise={exercise}
            config={exerciseConfigs.get(exercise.id) || {}}
            error={configErrors.get(exercise.id)}
            onConfigChange={(config) => onConfigChange(exercise.id, config)}
            onRemove={() => onRemove(exercise.id)}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
