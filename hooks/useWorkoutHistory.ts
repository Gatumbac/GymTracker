import { workoutSessionsEndpoints } from '@api/endpoints/workout';
import { WorkoutSession } from '@api/types/entities.types';
import { useCallback, useEffect, useState } from 'react';

export const useWorkoutHistory = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchSessions = useCallback(async () => {
    setError(null);
    try {
      const response = await workoutSessionsEndpoints.listWorkoutSessions();
      setSessions(response.data);
    } catch (err) {
      setError('Error al cargar el historial de entrenamientos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const deleteSession = async (id: number) => {
    try {
      await workoutSessionsEndpoints.deleteWorkoutSession(id);
      setSessions(prev => prev.filter(session => session.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    sessions,
    isLoading,
    error,
    refresh: fetchSessions,
    deleteSession
  };
};
