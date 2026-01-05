import { workoutSessionsEndpoints } from '@api/endpoints/workout';
import { WorkoutSession } from '@api/types/entities.types';
import { useCallback, useEffect, useState } from 'react';

export const useWorkoutDetail = (id: number) => {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await workoutSessionsEndpoints.retrieveWorkoutSession(id);
      setSession(response.data);
    } catch (err) {
      setError('Error al cargar el entrenamiento');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return {
    session,
    isLoading,
    error,
    refresh: fetchSession,
  };
};
