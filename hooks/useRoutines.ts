import { routinesEndpoints } from '@api/endpoints/routines';
import { Routine, RoutineRequest } from '@api/types/entities.types';
import { useCallback, useEffect, useState } from 'react';

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutines = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await routinesEndpoints.listRoutines();
      setRoutines(response.data);
    } catch (error) {
      setError('Error al cargar las rutinas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRoutine = useCallback(async (data: RoutineRequest) => {
    setError(null);
    try {
      const response = await routinesEndpoints.createRoutine(data);
      setRoutines(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      setError('Error al crear la rutina');
      throw error;
    }
  }, []);

  const deleteRoutine = useCallback(async (id: number) => {
    setError(null);
    try {
      await routinesEndpoints.deleteRoutine(id);
      setRoutines(prev => prev.filter(routine => routine.id !== id));
    } catch (error) {
      setError('Error al eliminar la rutina');
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  return {
    routines,
    isLoading,
    error,
    createRoutine,
    deleteRoutine,
    refetch: fetchRoutines,
  };
};
