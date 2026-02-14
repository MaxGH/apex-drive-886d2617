import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Target, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import { RaceGoalForm } from '@/components/RaceGoalForm';
import { useCreateRaceGoal } from '@/hooks/useRaceGoal';
import { toast } from 'sonner';

export default function Onboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const createRaceGoal = useCreateRaceGoal();

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await createRaceGoal.mutateAsync(data);
      // TODO: Trigger schedule generation here (Phase 4)
      toast.success('Race goal created! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error creating race goal:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
            <span className="font-heading text-4xl font-extrabold uppercase tracking-wider">
              HYROX<span className="text-primary">PRO</span>
            </span>
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wider mb-2">
            Welcome to Your Training Platform
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Let's set up your first race goal and create a personalized training plan
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="surface-elevated rounded-lg p-4 text-center">
            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Set Your Goal
            </p>
          </div>
          <div className="surface-elevated rounded-lg p-4 text-center">
            <CalendarIcon className="h-6 w-6 text-secondary mx-auto mb-2" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Auto Schedule
            </p>
          </div>
          <div className="surface-elevated rounded-lg p-4 text-center">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Track Progress
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="surface-elevated rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider mb-2">
              Create Your Race Goal
            </h2>
            <p className="text-sm text-text-secondary">
              Tell us about your target race and we'll generate a personalized training plan
            </p>
          </div>

          <RaceGoalForm
            onSubmit={handleSubmit}
            submitLabel="Create Training Plan"
            isLoading={isSubmitting}
          />
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-text-muted mt-6">
          You can update your race goal anytime from the dashboard
        </p>
      </div>
    </div>
  );
}
