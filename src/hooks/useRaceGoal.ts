import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
        if (error.code === 'PGRST116') return null;
        console.error('Error fetching race goal:', error);
        return null;
      }

      return data;
    },
    enabled: !!user,
  });
}

export function useCreateRaceGoal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (raceGoal: {
      race_name: string;
      race_date: string;
      training_start_date: string;
      race_category?: string | null;
      sessions_per_week?: number;
      is_active?: boolean;
    }) => {
      if (!user) throw new Error('User must be authenticated');

      // Deactivate existing active race goals
      await supabase
        .from('race_goals')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      const { data, error } = await supabase
        .from('race_goals')
        .insert({
          user_id: user.id,
          race_name: raceGoal.race_name,
          race_date: raceGoal.race_date,
          training_start_date: raceGoal.training_start_date,
          race_category: raceGoal.race_category ?? null,
          sessions_per_week: raceGoal.sessions_per_week ?? 5,
          is_active: raceGoal.is_active ?? true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
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
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { data, error } = await supabase
        .from('race_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
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
