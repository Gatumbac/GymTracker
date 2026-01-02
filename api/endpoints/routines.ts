import apiClient from "@api/client";
import {
  PatchedRoutineRequest,
  PatchedRoutineScheduleRequest,
  Routine,
  RoutineRequest,
  RoutineSchedule,
  RoutineScheduleRequest
} from '@api/types/entities.types';

export const routinesEndpoints = {
  createRoutine: (data: RoutineRequest) =>
    apiClient.post<Routine>('/core/routines/', data),

  listRoutines: () =>
    apiClient.get<Routine[]>('/core/routines/'),

  getRoutine: (id: number) =>
    apiClient.get<Routine>(`/core/routines/${id}/`),

  updateRoutine: (id: number, data: RoutineRequest) =>
    apiClient.put<Routine>(`/core/routines/${id}/`, data),

  patchRoutine: (id: number, data: PatchedRoutineRequest) =>
    apiClient.patch<Routine>(`/core/routines/${id}/`, data),

  deleteRoutine: (id: number) =>
    apiClient.delete<void>(`/core/routines/${id}/`),

  createRoutineSchedule: (data: RoutineScheduleRequest) =>
    apiClient.post<RoutineSchedule>('/core/routine-schedules/', data),

  listRoutineSchedules: () =>
    apiClient.get<RoutineSchedule[]>('/core/routine-schedules/'),

  getRoutineSchedule: (id: number) =>
    apiClient.get<RoutineSchedule>(`/core/routine-schedules/${id}/`),

  getWeeklySchedule: () =>
    apiClient.get<RoutineSchedule[]>('/core/routine-schedules/weekly/'),

  updateRoutineSchedule: (id: number, data: RoutineScheduleRequest) =>
    apiClient.put<RoutineSchedule>(`/core/routine-schedules/${id}/`, data),

  patchRoutineSchedule: (id: number, data: PatchedRoutineScheduleRequest) =>
    apiClient.patch<RoutineSchedule>(`/core/routine-schedules/${id}/`, data),

  deleteRoutineSchedule: (id: number) =>
    apiClient.delete<void>(`/core/routine-schedules/${id}/`),
}
