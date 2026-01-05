import { workoutSessionsEndpoints, workoutSetsEndpoints } from '@api/endpoints/workout';
import { WorkoutSession, WorkoutSessionRequest, WorkoutSetRequest } from '@api/types/entities.types';
import { useState } from 'react';

export const useWorkoutSession = () => {
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkActiveSession = async () => {
    setIsLoading(true);
    try {
      const response = await workoutSessionsEndpoints.getActiveWorkoutSession();
      setActiveSession(response.data);
    } catch (err) {
      setActiveSession(null);
    } finally {
      setIsLoading(false);
    }
  };

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

  const finishSession = async (sessionId?: number) => {
    const targetSessionId = sessionId ?? activeSession?.id;
    if (!targetSessionId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data: WorkoutSessionRequest = {
        routine: activeSession?.routine ?? null
      };
      await workoutSessionsEndpoints.completeWorkoutSession(targetSessionId, data);
      setActiveSession(null);
    } catch (err) {
      setError('Error al finalizar la sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSession = async () => {
    if (!activeSession) return;
    setIsLoading(true);
    setError(null);
    try {
      await workoutSessionsEndpoints.deleteWorkoutSession(activeSession.id);
      setActiveSession(null);
    } catch (err) {
      setError('Error al cancelar la sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addSet = async (exerciseId: number, setNumber: number, weight: string, reps: number, sessionId?: number) => {
    const targetSessionId = sessionId ?? activeSession?.id;
    if (!targetSessionId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data: WorkoutSetRequest = {
        session: targetSessionId,
        exercise: exerciseId,
        set_number: setNumber,
        weight: weight,
        reps: reps
      };
      await workoutSetsEndpoints.createWorkoutSet(data);
      if (activeSession) {
        await checkActiveSession();
      }
    } catch (err) {
      setError('Error al registrar el set');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSet = async (setId: number) => {
    if (!activeSession) return;
    setIsLoading(true);
    setError(null);
    try {
      await workoutSetsEndpoints.deleteWorkoutSet(setId);
      await checkActiveSession();
    } catch (err) {
      setError('Error al eliminar el set');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeSession,
    isLoading,
    error,
    startSession,
    checkActiveSession,
    finishSession,
    cancelSession,
    addSet,
    deleteSet
  };
};
