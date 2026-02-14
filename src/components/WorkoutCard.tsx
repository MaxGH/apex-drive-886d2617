import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { type Workout, categoryConfig, intensityConfig } from "@/data/workouts";

interface WorkoutCardProps {
  workout: Workout;
  index: number;
  onEdit: (workout: Workout) => void;
}

export function WorkoutCard({ workout, index, onEdit }: WorkoutCardProps) {
  const cat = categoryConfig[workout.category];
  const intensity = intensityConfig[workout.intensity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => onEdit(workout)}
      className="surface-elevated surface-elevated-hover rounded-lg p-4 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cat.bgClass}`}>
            {cat.label}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${intensity.bgClass}`}>
            <Zap className="h-2.5 w-2.5" />
            {intensity.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">{workout.duration} MIN</span>
        </div>
      </div>

      <h3 className="font-heading text-base font-bold uppercase tracking-wide mb-1 group-hover:text-primary transition-colors duration-150">
        {workout.title}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
        {workout.description}
      </p>

      <div className="mt-3 flex items-center gap-1 text-text-muted">
        <span className="text-[10px] font-medium">{workout.exercises.length} exercises</span>
      </div>
    </motion.div>
  );
}
