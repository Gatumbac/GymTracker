
export enum DayOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export interface Exercise {
  id: number;
  name: string;
  description?: string | null;
  image_url?: string | null;
  muscle_group_name: string;
  exercise_type_name: string;
}

export interface ExerciseType {
  id: number;
  name: string;
  active: boolean;
}

export interface MuscleGroup {
  id: number;
  name: string;
  description?: string | null;
  active: boolean;
  image_url?: string | null;
}

export interface RoutineItemRequest {
  exercise: number;
  order: number;
  target_sets?: number;
  target_reps?: number;
  rest_time_seconds?: number;
}

export interface PatchedRoutineRequest {
  name?: string;
  description?: string | null;
  items?: RoutineItemRequest[];
}

export interface PatchedRoutineScheduleRequest {
  routine?: number;
  day_of_week?: DayOfWeek;
}

export interface PatchedWorkoutSessionRequest {
  routine?: number | null;
}

export interface User {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface RoutineItem {
  id: number;
  exercise: number;
  exercise_name: string;
  exercise_image?: string | null;
  order: number;
  target_sets?: number;
  target_reps?: number;
  rest_time_seconds?: number;
}

export interface Routine {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
  items: RoutineItem[];
}

export interface RoutineRequest {
  name: string;
  description?: string | null;
  items: RoutineItemRequest[];
}

export interface RoutineSchedule {
  id: number;
  user: number;
  routine: number;
  routine_name: string;
  day_of_week: DayOfWeek;
  day_name: string;
}

export interface RoutineScheduleRequest {
  routine: number;
  day_of_week: DayOfWeek;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenRefresh {
  access: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface WorkoutSet {
  id: number;
  session: number;
  exercise: number;
  exercise_name: string;
  exercise_image?: string | null;
  set_number: number;
  weight: string;
  reps: number;
  completed_at: string;
}

export interface WorkoutSession {
  id: number;
  routine?: number | null;
  routine_name: string;
  start_time: string;
  end_time?: string | null;
  is_active: boolean;
  duration?: number | null;
  sets: WorkoutSet[];
}

export interface WorkoutSessionRequest {
  routine?: number | null;
}

export interface WorkoutSetRequest {
  session: number;
  exercise: number;
  set_number: number;
  weight: string;
  reps: number;
}
