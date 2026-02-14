import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { WorkoutCard } from "@/components/WorkoutCard";
import { WorkoutEditor } from "@/components/WorkoutEditor";
import {
  type Workout,
  type WorkoutCategory,
  SAMPLE_WORKOUTS,
  WORKOUT_TEMPLATE,
  categoryConfig,
} from "@/data/workouts";

const AdminWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(SAMPLE_WORKOUTS);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<WorkoutCategory | "all">("all");

  const filteredWorkouts = workouts.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || w.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = () => {
    setEditingWorkout({ ...WORKOUT_TEMPLATE, id: `w${Date.now()}` });
    setIsEditorOpen(true);
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsEditorOpen(true);
  };

  const handleSave = (workout: Workout) => {
    setWorkouts((prev) => {
      const exists = prev.find((w) => w.id === workout.id);
      if (exists) return prev.map((w) => (w.id === workout.id ? workout : w));
      return [...prev, workout];
    });
  };

  const handleDelete = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const filters: { key: WorkoutCategory | "all"; label: string }[] = [
    { key: "all", label: "ALL" },
    ...Object.entries(categoryConfig).map(([key, cfg]) => ({
      key: key as WorkoutCategory,
      label: cfg.label,
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNav activePage="Admin" />

      {/* Mobile Header */}
      <div className="sm:hidden px-4 pt-4 pb-2">
        <h1 className="font-heading text-xl font-extrabold uppercase tracking-wider">
          Workout Library
        </h1>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 pb-24 sm:pb-6 space-y-4">
        {/* Header Row */}
        <div className="hidden sm:flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold uppercase tracking-wider">
              Workout Library
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              {workouts.length} workouts · Admin mode
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4" /> Create Workout
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workouts..."
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="h-3.5 w-3.5 text-text-muted shrink-0 mr-1" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all duration-150 ${
                  activeFilter === f.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-transparent text-text-muted hover:text-text-secondary hover:border-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredWorkouts.map((workout, i) => (
            <WorkoutCard key={workout.id} workout={workout} index={i} onEdit={handleEdit} />
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-text-muted"
          >
            <p className="text-sm font-medium">No workouts found</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
          </motion.div>
        )}

        {/* Mobile FAB */}
        <button
          onClick={handleCreate}
          className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg glow-neon active:scale-95 transition-transform sm:hidden"
        >
          <Plus className="h-6 w-6" />
        </button>
      </main>

      <BottomNav active="admin" />

      <WorkoutEditor
        workout={editingWorkout}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminWorkouts;
