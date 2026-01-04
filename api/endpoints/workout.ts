import client from "@api/client";
import { WorkoutSession, WorkoutSessionRequest } from "@api/types/entities.types";

const WORKOUT_SESSIONS_URL = '/core/workout-sessions/';

export const workoutSessionsEndpoints = {
  listWorkoutSessions: () =>
    client.get<WorkoutSession[]>(WORKOUT_SESSIONS_URL),

  createWorkoutSession: (data: WorkoutSessionRequest) =>
    client.post<WorkoutSession>(WORKOUT_SESSIONS_URL, data),

  retrieveWorkoutSession: (id: number) =>
    client.get<WorkoutSession>(`${WORKOUT_SESSIONS_URL}${id}/`),

  updateWorkoutSession: (id: number, data: WorkoutSessionRequest) =>
    client.put<WorkoutSession>(`${WORKOUT_SESSIONS_URL}${id}/`, data),

  partialUpdateWorkoutSession: (id: number, data: Partial<WorkoutSessionRequest>) =>
    client.patch<WorkoutSession>(`${WORKOUT_SESSIONS_URL}${id}/`, data),

  deleteWorkoutSession: (id: number) =>
    client.delete(`${WORKOUT_SESSIONS_URL}${id}/`),

  completeWorkoutSession: (id: number, data: WorkoutSessionRequest) =>
    client.post<WorkoutSession>(`${WORKOUT_SESSIONS_URL}${id}/complete/`, data),

  getActiveWorkoutSession: () =>
    client.get<WorkoutSession>(`${WORKOUT_SESSIONS_URL}active/`),
};
