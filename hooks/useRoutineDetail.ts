import { routinesEndpoints } from '@api/endpoints/routines';
import { Routine } from '@api/types/entities.types';
import { useCallback, useState } from 'react';

export const useRoutineDetail = (routineId: number | null) => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutine = useCallback(async () => {
    if (!routineId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await routinesEndpoints.getRoutine(routineId);
      setRoutine(response.data);
    } catch (err) {
      setError('Error al cargar la rutina');
    } finally {
      setIsLoading(false);
    }
  }, [routineId]);

  return {
    routine,
    isLoading,
    error,
    refresh: fetchRoutine,
  };
};
