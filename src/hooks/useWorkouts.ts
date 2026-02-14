import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Workout, WorkoutExercise } from '@/data/workouts';
import { toast } from 'sonner';

// Convert DB row to app Workout format
function dbToWorkout(row: any): Workout {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    intensity: row.intensity,
    duration: row.duration,
    description: row.description ?? '',
    exercises: (row.exercises ?? []) as WorkoutExercise[],
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

      return (data ?? []).map(dbToWorkout);
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
        .insert({
          title: workout.title,
          category: workout.category,
          intensity: workout.intensity,
          duration: workout.duration,
          description: workout.description,
          exercises: workout.exercises as any,
          created_by: user.id,
          is_template: true,
        })
        .select()
        .single();

      if (error) throw error;
      return dbToWorkout(data);
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
        .update({
          title: workout.title,
          category: workout.category,
          intensity: workout.intensity,
          duration: workout.duration,
          description: workout.description,
          exercises: workout.exercises as any,
          created_by: user.id,
          is_template: true,
        })
        .eq('id', workout.id)
        .select()
        .single();

      if (error) throw error;
      return dbToWorkout(data);
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
