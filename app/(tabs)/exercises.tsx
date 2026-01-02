import ScreenContainer from '@/components/ScreenContainer';
import { commonStyles, theme } from '@/constants/styles';
import { useExercises } from '@/hooks/useExercises';
import ExerciseCard from '@components/ExerciseCard';
import FilterPicker from '@components/FilterPicker';
import LoadingScreen from '@components/LoadingScreen';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const ExercisesScreen = () => {
  const {
    exercises,
    muscleGroups,
    exerciseTypes,
    selectedMuscleGroup,
    selectedExerciseType,
    isLoading,
    setSelectedMuscleGroup,
    setSelectedExerciseType,
    hasActiveFilters,
  } = useExercises();

  if (isLoading) {
    return (
      <LoadingScreen text="Cargando ejercicios..." />
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Ejercicios Disponibles</Text>

      <View style={styles.filterContainer}>
        {muscleGroups.length > 0 && (
          <FilterPicker
            label="Grupo Muscular"
            options={muscleGroups}
            selectedId={selectedMuscleGroup}
            onSelect={setSelectedMuscleGroup}
          />
        )}

        {exerciseTypes.length > 0 && (
          <FilterPicker
            label="Tipo"
            options={exerciseTypes}
            selectedId={selectedExerciseType}
            onSelect={setSelectedExerciseType}
          />
        )}
      </View>

      {exercises.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {hasActiveFilters ? 'No hay ejercicios con estos filtros' : 'No hay ejercicios'}
          </Text>
        </View>
      ) : (
        exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))
      )}
    </ScreenContainer>
  );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
  empty: {
    paddingVertical: theme.spacing.xxl * 2,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
  },
  filterContainer: {
    marginBottom: theme.spacing.lg,
    width: '100%',
  }
});