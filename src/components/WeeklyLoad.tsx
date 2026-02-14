import { motion } from "framer-motion";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const loads = [72, 85, 30, 95, 60, 80, 0];
const maxLoad = 100;

export function WeeklyLoad() {
  return (
    <div className="surface-elevated rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider">Weekly Training Load</h3>
        <span className="text-sm font-semibold text-primary">847 TSS</span>
      </div>
      <div className="flex items-end justify-between gap-2 h-24">
        {loads.map((load, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(load / maxLoad) * 100}%` }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`w-full max-w-[24px] rounded-sm ${
                load >= 90 ? "bg-accent" : load > 0 ? "bg-primary/80" : "bg-muted"
              }`}
            />
            <span className={`text-[10px] font-semibold ${i === 3 ? "text-primary" : "text-text-muted"}`}>
              {days[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
