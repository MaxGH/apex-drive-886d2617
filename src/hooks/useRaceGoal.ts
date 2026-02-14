import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { RaceGoal } from '@/types/supabase';
import { toast } from 'sonner';

export function useRaceGoal() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['race-goal', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('race_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // No active race goal is not an error
        if (error.code === 'PGRST116') return null;
        console.error('Error fetching race goal:', error);
        return null;
      }

      return data as RaceGoal;
    },
    enabled: !!user,
  });
}

export function useCreateRaceGoal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (raceGoal: Omit<RaceGoal, 'id' | 'user_id' | 'created_at'>) => {
      if (!user) throw new Error('User must be authenticated');

      // Deactivate any existing active race goals
      await supabase
        .from('race_goals')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      // Create new race goal
      const { data, error } = await supabase
        .from('race_goals')
        .insert({
          user_id: user.id,
          ...raceGoal,
        })
        .select()
        .single();

      if (error) throw error;
      return data as RaceGoal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['race-goal'] });
      toast.success('Race goal created successfully!');
    },
    onError: (error) => {
      console.error('Error creating race goal:', error);
      toast.error('Failed to create race goal');
    },
  });
}

export function useUpdateRaceGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<RaceGoal> }) => {
      const { data, error } = await supabase
        .from('race_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as RaceGoal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['race-goal'] });
      toast.success('Race goal updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating race goal:', error);
      toast.error('Failed to update race goal');
    },
  });
}
