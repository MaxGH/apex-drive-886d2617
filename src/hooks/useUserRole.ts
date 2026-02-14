import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/supabase';

export function useUserRole() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data as UserRole;
    },
    enabled: !!user,
  });
}

export function useIsAdmin() {
  const { data: userRole, isLoading } = useUserRole();

  return {
    isAdmin: userRole?.role === 'admin',
    loading: isLoading,
  };
}
