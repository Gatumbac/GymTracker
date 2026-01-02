import { exercisesEndpoints } from '@api/endpoints/exercises';
import { Exercise, ExerciseType, MuscleGroup } from '@api/types/entities.types';
import { useEffect, useMemo, useState } from 'react';

export const useExercises = () => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesRes, muscleGroupsRes, exerciseTypesRes] = await Promise.all([
          exercisesEndpoints.listExercises(),
          exercisesEndpoints.listMuscleGroups(),
          exercisesEndpoints.listExerciseTypes(),
        ]);

        setAllExercises(exercisesRes.data);
        setMuscleGroups(muscleGroupsRes.data.filter(mg => mg.active));
        setExerciseTypes(exerciseTypesRes.data.filter(et => et.active));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const exercises = useMemo(() => {
    let filtered = allExercises;

    if (selectedMuscleGroup) {
      filtered = filtered.filter(ex => ex.muscle_group === selectedMuscleGroup);
    }

    if (selectedExerciseType) {
      filtered = filtered.filter(ex => ex.exercise_type === selectedExerciseType);
    }

    return filtered;
  }, [allExercises, selectedMuscleGroup, selectedExerciseType]);

  const clearFilters = () => {
    setSelectedMuscleGroup(null);
    setSelectedExerciseType(null);
  };

  return {
    exercises,
    muscleGroups,
    exerciseTypes,
    selectedMuscleGroup,
    selectedExerciseType,
    isLoading,
    setSelectedMuscleGroup,
    setSelectedExerciseType,
    clearFilters,
    hasActiveFilters: selectedMuscleGroup !== null || selectedExerciseType !== null,
  };
};
