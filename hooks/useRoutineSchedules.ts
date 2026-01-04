import { routinesEndpoints } from '@api/endpoints/routines';
import { DayOfWeek, RoutineSchedule } from '@api/types/entities.types';
import { useCallback, useEffect, useState } from 'react';

export const useRoutineSchedules = () => {
  const [routineSchedules, setRoutineSchedules] = useState<RoutineSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await routinesEndpoints.listRoutineSchedules();
      setRoutineSchedules(response.data);
    } catch (error) {
      setError('Error al cargar los horarios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const createSchedules = async (routineId: number, days: DayOfWeek[]) => {
    try {
      const schedulePromises = days.map(day =>
        routinesEndpoints.createRoutineSchedule({
          routine: routineId,
          day_of_week: day,
        })
      );
      await Promise.all(schedulePromises);
    } catch (error) {
      setError('Error al crear los horarios');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    error,
    isProcessing,
    isLoading,
    routineSchedules,
    createSchedules,
    refetch: fetchSchedules,
  };
};
