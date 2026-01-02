import ExerciseCheckbox from '@/components/ExerciseCheckbox';
import FilterPicker from '@/components/FilterPicker';
import { theme } from '@/constants/styles';
import { Exercise, ExerciseType, MuscleGroup } from '@api/types/entities.types';
import { StyleSheet, Text, View } from 'react-native';

interface Step2SelectExercisesProps {
  exercises: Exercise[];
  muscleGroups: MuscleGroup[];
  exerciseTypes: ExerciseType[];
  selectedExerciseIds: number[];
  selectedMuscleGroup: number | null;
  selectedExerciseType: number | null;
  onToggleExercise: (id: number) => void;
  onSelectMuscleGroup: (id: number | null) => void;
  onSelectExerciseType: (id: number | null) => void;
}

export default function Step2SelectExercises({
  exercises,
  muscleGroups,
  exerciseTypes,
  selectedExerciseIds,
  selectedMuscleGroup,
  selectedExerciseType,
  onToggleExercise,
  onSelectMuscleGroup,
  onSelectExerciseType,
}: Step2SelectExercisesProps) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.sectionTitle}>Seleccionar Ejercicios</Text>
      <Text style={styles.selectedCount}>
        {selectedExerciseIds.length} ejercicio{selectedExerciseIds.length !== 1 ? 's' : ''} seleccionado{selectedExerciseIds.length !== 1 ? 's' : ''}
      </Text>

      <View style={styles.filterContainer}>
        {muscleGroups.length > 0 && (
          <FilterPicker
            label="Grupo Muscular"
            options={muscleGroups}
            selectedId={selectedMuscleGroup}
            onSelect={onSelectMuscleGroup}
          />
        )}
        {exerciseTypes.length > 0 && (
          <FilterPicker
            label="Tipo"
            options={exerciseTypes}
            selectedId={selectedExerciseType}
            onSelect={onSelectExerciseType}
          />
        )}
      </View>

      {exercises.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No se encontraron ejercicios con los filtros seleccionados
          </Text>
        </View>
      ) : (
        exercises.map((exercise) => (
          <ExerciseCheckbox
            key={exercise.id}
            exercise={exercise}
            isSelected={selectedExerciseIds.includes(exercise.id)}
            onToggle={onToggleExercise}
          />
        ))
      )}
    </ View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  selectedCount: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    fontWeight: theme.typography.weights.medium,
  },
  filterContainer: {
    marginBottom: theme.spacing.md,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
