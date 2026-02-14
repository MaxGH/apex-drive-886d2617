import { motion } from "framer-motion";

const stats = [
  { label: "Weeks to Race", value: "5", accent: "neon" },
  { label: "Weekly Load", value: "847", unit: "TSS", accent: "blue" },
  { label: "Sessions This Week", value: "4/6", accent: "neon" },
  { label: "Avg Intensity", value: "7.2", unit: "/10", accent: "orange" },
];

const accentColors: Record<string, string> = {
  neon: "text-primary",
  blue: "text-secondary",
  orange: "text-accent",
};

const barColors: Record<string, string> = {
  neon: "bg-primary",
  blue: "bg-secondary",
  orange: "bg-accent",
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="surface-elevated surface-elevated-hover rounded-lg p-4"
        >
          <p className="label-upper text-text-muted mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <span className={`stat-number text-3xl sm:text-4xl ${accentColors[stat.accent]}`}>
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-sm font-medium text-text-secondary">{stat.unit}</span>
            )}
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${barColors[stat.accent]}`}
              style={{ width: `${40 + i * 15}%` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
