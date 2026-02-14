import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { WorkoutDB } from '@/types/supabase';
import type { Workout } from '@/data/workouts';
import { toast } from 'sonner';

// Convert DB workout to app Workout format
function dbToWorkout(dbWorkout: WorkoutDB): Workout {
  return {
    id: dbWorkout.id,
    title: dbWorkout.title,
    category: dbWorkout.category,
    intensity: dbWorkout.intensity,
    duration: dbWorkout.duration,
    description: dbWorkout.description,
    exercises: dbWorkout.exercises,
  };
}

// Convert app Workout to DB format
function workoutToDB(workout: Partial<Workout>, userId: string): Partial<WorkoutDB> {
  return {
    title: workout.title,
    category: workout.category,
    intensity: workout.intensity,
    duration: workout.duration,
    description: workout.description,
    exercises: workout.exercises,
    created_by: userId,
    is_template: true,
  };
}

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('is_template', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching workouts:', error);
        throw error;
      }

      return (data as WorkoutDB[]).map(dbToWorkout);
    },
  });
}

export function useCreateWorkout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workout: Omit<Workout, 'id'>) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('workouts')
        .insert(workoutToDB(workout, user.id))
        .select()
        .single();

      if (error) throw error;
      return dbToWorkout(data as WorkoutDB);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Workout created successfully!');
    },
    onError: (error) => {
      console.error('Error creating workout:', error);
      toast.error('Failed to create workout');
    },
  });
}

export function useUpdateWorkout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workout: Workout) => {
      if (!user) throw new Error('User must be authenticated');

      const { data, error } = await supabase
        .from('workouts')
        .update(workoutToDB(workout, user.id))
        .eq('id', workout.id)
        .select()
        .single();

      if (error) throw error;
      return dbToWorkout(data as WorkoutDB);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Workout updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating workout:', error);
      toast.error('Failed to update workout');
    },
  });
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Workout deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting workout:', error);
      toast.error('Failed to delete workout');
    },
  });
}
