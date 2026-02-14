export type WorkoutCategory = "run" | "strength" | "engine" | "mixed" | "recovery";
export type IntensityLevel = "low" | "moderate" | "hard" | "max";

export interface WorkoutExercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
  notes?: string;
}

export interface Workout {
  id: string;
  title: string;
  category: WorkoutCategory;
  intensity: IntensityLevel;
  duration: number; // minutes
  description: string;
  exercises: WorkoutExercise[];
}

export const categoryConfig: Record<WorkoutCategory, { label: string; color: string; bgClass: string }> = {
  run: { label: "RUN", color: "text-secondary", bgClass: "bg-secondary/15 text-secondary border-secondary/30" },
  strength: { label: "STRENGTH", color: "text-primary", bgClass: "bg-primary/15 text-primary border-primary/30" },
  engine: { label: "ENGINE", color: "text-engine-violet", bgClass: "bg-engine-violet/15 text-engine-violet border-engine-violet/30" },
  mixed: { label: "MIXED", color: "text-accent", bgClass: "bg-accent/15 text-accent border-accent/30" },
  recovery: { label: "RECOVERY", color: "text-text-muted", bgClass: "bg-muted/30 text-text-secondary border-muted" },
};

export const intensityConfig: Record<IntensityLevel, { label: string; color: string; bgClass: string }> = {
  low: { label: "LOW", color: "text-text-secondary", bgClass: "bg-muted/40 text-text-secondary" },
  moderate: { label: "MOD", color: "text-secondary", bgClass: "bg-secondary/15 text-secondary" },
  hard: { label: "HARD", color: "text-accent", bgClass: "bg-accent/15 text-accent" },
  max: { label: "MAX", color: "text-destructive", bgClass: "bg-destructive/15 text-destructive" },
};

export const SAMPLE_WORKOUTS: Workout[] = [
  {
    id: "w1",
    title: "HYROX RACE SIM",
    category: "mixed",
    intensity: "max",
    duration: 75,
    description: "Full race simulation with all 8 stations. Race pace intensity throughout.",
    exercises: [
      { name: "1km Run", duration: "4:30–5:00" },
      { name: "SkiErg", duration: "1000m" },
      { name: "1km Run", duration: "4:30–5:00" },
      { name: "Sled Push", duration: "50m" },
      { name: "1km Run", duration: "4:30–5:00" },
      { name: "Sled Pull", duration: "50m" },
      { name: "1km Run", duration: "4:30–5:00" },
      { name: "Burpee Broad Jumps", reps: "80m" },
    ],
  },
  {
    id: "w2",
    title: "UPPER BODY POWER",
    category: "strength",
    intensity: "hard",
    duration: 45,
    description: "Heavy upper body compound movements for race-day pushing and pulling strength.",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "6", rest: "2:00" },
      { name: "Weighted Pull-ups", sets: 4, reps: "6", rest: "2:00" },
      { name: "DB Shoulder Press", sets: 3, reps: "8", rest: "90s" },
      { name: "Barbell Row", sets: 3, reps: "8", rest: "90s" },
      { name: "Tricep Dips", sets: 3, reps: "12", rest: "60s" },
    ],
  },
  {
    id: "w3",
    title: "TEMPO RUN 10K",
    category: "run",
    intensity: "moderate",
    duration: 50,
    description: "Sustained tempo pace to build race-specific aerobic endurance.",
    exercises: [
      { name: "Warm-up Jog", duration: "10 min" },
      { name: "Tempo Block", duration: "30 min @ threshold" },
      { name: "Cool-down", duration: "10 min easy" },
    ],
  },
  {
    id: "w4",
    title: "SKI ERG INTERVALS",
    category: "engine",
    intensity: "hard",
    duration: 30,
    description: "High-intensity SkiErg intervals to build anaerobic capacity for station work.",
    exercises: [
      { name: "SkiErg Sprint", duration: "250m", rest: "90s", notes: "Max effort" },
      { name: "SkiErg Sprint", duration: "250m", rest: "90s", notes: "Max effort" },
      { name: "SkiErg Sprint", duration: "250m", rest: "90s", notes: "Max effort" },
      { name: "SkiErg Sprint", duration: "250m", rest: "90s", notes: "Max effort" },
      { name: "SkiErg Sprint", duration: "250m", rest: "90s", notes: "Max effort" },
      { name: "SkiErg Sprint", duration: "250m", rest: "2:00", notes: "Max effort" },
    ],
  },
  {
    id: "w5",
    title: "ACTIVE RECOVERY",
    category: "recovery",
    intensity: "low",
    duration: 25,
    description: "Light movement and mobility work for recovery days between hard sessions.",
    exercises: [
      { name: "Foam Roll Full Body", duration: "10 min" },
      { name: "Hip Mobility Flow", duration: "5 min" },
      { name: "Light Walk or Cycle", duration: "10 min" },
    ],
  },
  {
    id: "w6",
    title: "LOWER BODY STRENGTH",
    category: "strength",
    intensity: "hard",
    duration: 50,
    description: "Heavy lower body work targeting sled push/pull and running power.",
    exercises: [
      { name: "Back Squat", sets: 5, reps: "5", rest: "2:30" },
      { name: "Romanian Deadlift", sets: 4, reps: "8", rest: "2:00" },
      { name: "Walking Lunges", sets: 3, reps: "12 each", rest: "90s" },
      { name: "Leg Press", sets: 3, reps: "10", rest: "90s" },
      { name: "Calf Raises", sets: 3, reps: "15", rest: "60s" },
    ],
  },
];

export const WORKOUT_TEMPLATE: Workout = {
  id: "",
  title: "NEW WORKOUT",
  category: "strength",
  intensity: "moderate",
  duration: 45,
  description: "",
  exercises: [
    { name: "Exercise 1", sets: 3, reps: "10", rest: "60s" },
  ],
};
