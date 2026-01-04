import { workoutSessionsEndpoints } from '@api/endpoints/workout';
import { WorkoutSession, WorkoutSessionRequest } from '@api/types/entities.types';
import { useState } from 'react';

export const useWorkoutSession = () => {
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = async (routineId?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data: WorkoutSessionRequest = {
        routine: routineId ?? null
      }
      const response = await workoutSessionsEndpoints.createWorkoutSession(data);
      setActiveSession(response.data);
      return response.data;
    } catch (err) {
      setError('Error al iniciar la sesión de entrenamiento');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const checkActiveSession = async () => {
    setIsLoading(true);
    try {
      const response = await workoutSessionsEndpoints.getActiveWorkoutSession();
      setActiveSession(response.data);
    } catch (err) {
      // It's possible there is no active session, so we don't necessarily want to set a global error
      // or maybe we do, depending on API behavior. Assuming 404 if not found?
      // For now, let's just clear the active session if it fails
      setActiveSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeSession,
    isLoading,
    error,
    startSession,
    checkActiveSession
  };
};
