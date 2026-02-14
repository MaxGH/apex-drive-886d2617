import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { RaceGoal } from '@/types/supabase';

const raceGoalSchema = z.object({
  race_name: z.string().min(3, 'Race name must be at least 3 characters'),
  race_date: z.string().refine((date) => {
    const raceDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return raceDate > today;
  }, 'Race date must be in the future'),
  training_start_date: z.string(),
  race_category: z.string().optional(),
  sessions_per_week: z.coerce.number().min(4).max(6),
}).refine((data) => {
  const startDate = new Date(data.training_start_date);
  const raceDate = new Date(data.race_date);
  return startDate < raceDate;
}, {
  message: 'Training start date must be before race date',
  path: ['training_start_date'],
});

type RaceGoalFormData = z.infer<typeof raceGoalSchema>;

interface RaceGoalFormProps {
  initialData?: RaceGoal;
  onSubmit: (data: Omit<RaceGoal, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function RaceGoalForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save Goal',
  isLoading = false,
}: RaceGoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RaceGoalFormData>({
    resolver: zodResolver(raceGoalSchema),
    defaultValues: initialData
      ? {
          race_name: initialData.race_name,
          race_date: initialData.race_date,
          training_start_date: initialData.training_start_date,
          race_category: initialData.race_category || '',
          sessions_per_week: initialData.sessions_per_week,
        }
      : {
          sessions_per_week: 5,
        },
  });

  const onSubmitForm = async (data: RaceGoalFormData) => {
    await onSubmit({
      race_name: data.race_name,
      race_date: data.race_date,
      training_start_date: data.training_start_date,
      race_category: data.race_category || null,
      sessions_per_week: data.sessions_per_week,
      is_active: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Race Name */}
      <div>
        <Label htmlFor="race_name" className="label-upper text-text-muted mb-1.5 block">
          Race Name
        </Label>
        <Input
          id="race_name"
          type="text"
          placeholder="HYROX COLOGNE 2025"
          {...register('race_name')}
          className={`font-bold uppercase tracking-wide ${errors.race_name ? 'border-destructive' : ''}`}
        />
        {errors.race_name && (
          <p className="text-xs text-destructive mt-1">{errors.race_name.message}</p>
        )}
      </div>

      {/* Race Category */}
      <div>
        <Label htmlFor="race_category" className="label-upper text-text-muted mb-1.5 block">
          Race Category (Optional)
        </Label>
        <Input
          id="race_category"
          type="text"
          placeholder="Pro Singles, Pro Doubles, Open..."
          {...register('race_category')}
        />
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="training_start_date" className="label-upper text-text-muted mb-1.5 block">
            Start Training
          </Label>
          <Input
            id="training_start_date"
            type="date"
            {...register('training_start_date')}
            className={errors.training_start_date ? 'border-destructive' : ''}
          />
          {errors.training_start_date && (
            <p className="text-xs text-destructive mt-1">{errors.training_start_date.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="race_date" className="label-upper text-text-muted mb-1.5 block">
            Race Day
          </Label>
          <Input
            id="race_date"
            type="date"
            {...register('race_date')}
            className={errors.race_date ? 'border-destructive' : ''}
          />
          {errors.race_date && (
            <p className="text-xs text-destructive mt-1">{errors.race_date.message}</p>
          )}
        </div>
      </div>

      {/* Sessions Per Week */}
      <div>
        <Label htmlFor="sessions_per_week" className="label-upper text-text-muted mb-1.5 block">
          Sessions Per Week
        </Label>
        <select
          id="sessions_per_week"
          {...register('sessions_per_week')}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors appearance-none"
        >
          <option value="4">4 Sessions/Week (Moderate)</option>
          <option value="5">5 Sessions/Week (Balanced)</option>
          <option value="6">6 Sessions/Week (Intensive)</option>
        </select>
        <p className="text-xs text-text-muted mt-1.5">
          Choose how many training sessions per week fit your schedule
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
