import { motion } from "framer-motion";
import { Calendar, Dumbbell, Flame, TrendingUp } from "lucide-react";

interface Session {
  id: string;
  title: string;
  type: "run" | "strength" | "engine" | "mixed" | "recovery";
  duration: string;
  intensity: "low" | "moderate" | "hard";
}

interface DayData {
  day: string;
  shortDay: string;
  date: number;
  isToday?: boolean;
  sessions: Session[];
}

const typeColors: Record<string, string> = {
  run: "bg-secondary",
  strength: "bg-primary",
  engine: "bg-engine-violet",
  mixed: "bg-accent",
  recovery: "bg-muted",
};

const typeIcons: Record<string, React.ReactNode> = {
  run: <TrendingUp className="h-3 w-3" />,
  strength: <Dumbbell className="h-3 w-3" />,
  engine: <Flame className="h-3 w-3" />,
  mixed: <Flame className="h-3 w-3" />,
  recovery: <Calendar className="h-3 w-3" />,
};

const intensityBorder: Record<string, string> = {
  low: "border-l-2 border-l-muted-foreground/30",
  moderate: "border-l-2 border-l-secondary",
  hard: "border-l-2 border-l-accent",
};

const weekData: DayData[] = [
  {
    day: "Monday", shortDay: "MON", date: 10,
    sessions: [
      { id: "1", title: "TEMPO RUN", type: "run", duration: "50 MIN", intensity: "moderate" },
      { id: "2", title: "UPPER STRENGTH", type: "strength", duration: "40 MIN", intensity: "hard" },
    ],
  },
  {
    day: "Tuesday", shortDay: "TUE", date: 11,
    sessions: [
      { id: "3", title: "SKI ERG INTERVALS", type: "engine", duration: "30 MIN", intensity: "hard" },
    ],
  },
  {
    day: "Wednesday", shortDay: "WED", date: 12,
    sessions: [
      { id: "4", title: "RECOVERY MOBILITY", type: "recovery", duration: "25 MIN", intensity: "low" },
    ],
  },
  {
    day: "Thursday", shortDay: "THU", date: 13, isToday: true,
    sessions: [
      { id: "5", title: "HYROX SIMULATION", type: "mixed", duration: "75 MIN", intensity: "hard" },
    ],
  },
  {
    day: "Friday", shortDay: "FRI", date: 14,
    sessions: [
      { id: "6", title: "LOWER STRENGTH", type: "strength", duration: "45 MIN", intensity: "moderate" },
      { id: "7", title: "ZONE 2 RUN", type: "run", duration: "40 MIN", intensity: "low" },
    ],
  },
  {
    day: "Saturday", shortDay: "SAT", date: 15,
    sessions: [
      { id: "8", title: "LONG RUN", type: "run", duration: "90 MIN", intensity: "moderate" },
    ],
  },
  {
    day: "Sunday", shortDay: "SUN", date: 16,
    sessions: [],
  },
];

export function TrainingCalendar() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider">
            Week 7 <span className="text-text-secondary font-normal normal-case text-sm ml-2">Feb 10 – 16</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-secondary hover:bg-card transition-colors">
            ‹
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-secondary hover:bg-card transition-colors">
            ›
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-7 gap-2">
        {weekData.map((day, i) => (
          <motion.div
            key={day.shortDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className={`surface-elevated rounded-lg p-3 min-h-[160px] ${
              day.isToday ? "ring-1 ring-primary/40" : ""
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="label-upper text-text-muted">{day.shortDay}</span>
              <span className={`font-heading text-sm font-bold ${day.isToday ? "text-primary" : "text-text-secondary"}`}>
                {day.date}
              </span>
            </div>
            <div className="space-y-2">
              {day.sessions.map((session) => (
                <div
                  key={session.id}
                  className={`rounded-md p-2 ${typeColors[session.type]}/15 ${intensityBorder[session.intensity]} hover:scale-[1.02] transition-transform duration-150 cursor-pointer`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className={`${typeColors[session.type].replace("bg-", "text-")}`}>
                      {typeIcons[session.type]}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold leading-tight">{session.title}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{session.duration}</p>
                </div>
              ))}
              {day.sessions.length === 0 && (
                <div className="flex h-16 items-center justify-center">
                  <span className="text-xs text-text-muted">REST</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Stack */}
      <div className="sm:hidden space-y-2">
        {weekData.map((day, i) => (
          <motion.div
            key={day.shortDay}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className={`surface-elevated rounded-lg p-4 ${
              day.isToday ? "ring-1 ring-primary/40" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`font-heading text-2xl font-extrabold ${day.isToday ? "text-primary" : "text-foreground"}`}>
                {day.date}
              </span>
              <div>
                <span className="label-upper text-text-muted">{day.shortDay}</span>
                {day.isToday && <span className="ml-2 text-[10px] font-bold text-primary uppercase">Today</span>}
              </div>
            </div>
            <div className="space-y-2">
              {day.sessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center justify-between rounded-md p-3 ${typeColors[session.type]}/15 ${intensityBorder[session.intensity]} hover:scale-[1.01] transition-transform duration-150 cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`${typeColors[session.type].replace("bg-", "text-")}`}>
                      {typeIcons[session.type]}
                    </span>
                    <span className="text-sm font-bold">{session.title}</span>
                  </div>
                  <span className="text-xs text-text-muted font-medium">{session.duration}</span>
                </div>
              ))}
              {day.sessions.length === 0 && (
                <p className="text-sm text-text-muted py-1">Rest day</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
