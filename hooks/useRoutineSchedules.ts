import { routinesEndpoints } from '@api/endpoints/routines';
import { DayOfWeek } from '@api/types/entities.types';
import { useCallback, useState } from 'react';

export const useRoutineSchedules = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSchedules = useCallback(async (routineId: number, days: DayOfWeek[]) => {
    setIsCreating(true);
    setError(null);
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
      setIsCreating(false);
    }
  }, []);

  return {
    isCreating,
    error,
    createSchedules,
  };
};
