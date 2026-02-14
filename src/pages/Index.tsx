import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { RaceCountdown } from "@/components/RaceCountdown";
import { StatsGrid } from "@/components/StatsGrid";
import { TrainingCalendar } from "@/components/TrainingCalendar";
import { WeeklyLoad } from "@/components/WeeklyLoad";
import { Zap } from "lucide-react";

const Index = () => {
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
