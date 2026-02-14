import type { WorkoutCategory, IntensityLevel, WorkoutExercise } from '@/data/workouts';

// Database table types matching Supabase schema
export interface RaceGoal {
  id: string;
  user_id: string;
  race_name: string;
  race_date: string; // ISO date string
  training_start_date: string; // ISO date string
  race_category: string | null;
  sessions_per_week: number;
  created_at: string;
  is_active: boolean;
}

export interface WorkoutDB {
  id: string;
  title: string;
  category: WorkoutCategory;
  intensity: IntensityLevel;
  duration: number; // minutes
  description: string;
  exercises: WorkoutExercise[]; // JSONB
  created_by: string | null;
  is_template: boolean;
  created_at: string;
}

export interface ScheduledWorkout {
  id: string;
  user_id: string;
  workout_id: string | null;
  race_goal_id: string;
  scheduled_date: string; // ISO date string
  week_number: number | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  // Joined data (not in DB, added by query)
  workout?: WorkoutDB | null;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'user' | 'admin';
  created_at: string;
}

// Supabase Database type (for typed client)
export interface Database {
  public: {
    Tables: {
      race_goals: {
        Row: RaceGoal;
        Insert: Omit<RaceGoal, 'id' | 'created_at'>;
        Update: Partial<Omit<RaceGoal, 'id' | 'created_at'>>;
      };
      workouts: {
        Row: WorkoutDB;
        Insert: Omit<WorkoutDB, 'id' | 'created_at'>;
        Update: Partial<Omit<WorkoutDB, 'id' | 'created_at'>>;
      };
      scheduled_workouts: {
        Row: Omit<ScheduledWorkout, 'workout'>;
        Insert: Omit<ScheduledWorkout, 'id' | 'created_at' | 'workout'>;
        Update: Partial<Omit<ScheduledWorkout, 'id' | 'created_at' | 'workout'>>;
      };
      user_roles: {
        Row: UserRole;
        Insert: Omit<UserRole, 'id' | 'created_at'>;
        Update: Partial<Omit<UserRole, 'id' | 'created_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
