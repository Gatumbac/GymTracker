import { routinesEndpoints } from '@api/endpoints/routines';
import { Routine, RoutineRequest } from '@api/types/entities.types';
import { useEffect, useState } from 'react';

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await routinesEndpoints.listRoutines();
        setRoutines(response.data);
      } catch (error) {
        setError('Error al cargar las rutinas');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  const createRoutine = async (data: RoutineRequest) => {
    setError(null);
    setIsProcessing(true);
    try {
      const response = await routinesEndpoints.createRoutine(data);
      setRoutines(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      setError('Error al crear la rutina');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteRoutine = async (id: number) => {
    setError(null);
    setIsProcessing(true);
    try {
      await routinesEndpoints.deleteRoutine(id);
      setRoutines(prev => prev.filter(routine => routine.id !== id));
    } catch (error) {
      setError('Error al eliminar la rutina');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    routines,
    isLoading,
    isProcessing,
    error,
    createRoutine,
    deleteRoutine,
  };
};
