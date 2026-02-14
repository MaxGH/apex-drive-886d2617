import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { RaceCountdown } from "@/components/RaceCountdown";
import { StatsGrid } from "@/components/StatsGrid";
import { TrainingCalendar } from "@/components/TrainingCalendar";
import { WeeklyLoad } from "@/components/WeeklyLoad";
import { Zap } from "lucide-react";
import { useRaceGoal } from "@/hooks/useRaceGoal";

const Index = () => {
  const navigate = useNavigate();
  const { data: raceGoal, isLoading } = useRaceGoal();

  useEffect(() => {
    // Redirect to onboarding if no active race goal
    if (!isLoading && !raceGoal) {
      navigate('/onboarding');
    }
  }, [raceGoal, isLoading, navigate]);

  // Show loading while checking for race goal
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-sm text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no race goal (will redirect)
  if (!raceGoal) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg font-extrabold uppercase tracking-wider">
            HYROX<span className="text-primary">PRO</span>
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 pb-24 sm:pb-6 space-y-5 sm:space-y-6">
        <RaceCountdown />
        <StatsGrid />
        <WeeklyLoad />
        <TrainingCalendar />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
