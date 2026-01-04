import apiClient from "@api/client";
import { Exercise, ExerciseType, MuscleGroup } from '@api/types/entities.types';

export const exercisesEndpoints = {
  listExercises: (filters?: { muscle_group?: number; exercise_type?: number }) =>
    apiClient.get<Exercise[]>('/core/exercises/', { params: filters }),
  retrieveExercise: (id: string | number) => apiClient.get<Exercise>(`/core/exercises/${id}/`),
  listExerciseTypes: () => apiClient.get<ExerciseType[]>('/core/exercise-types/'),
  listMuscleGroups: () => apiClient.get<MuscleGroup[]>('/core/muscle-groups/'),
}