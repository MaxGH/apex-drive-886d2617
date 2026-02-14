import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight } from "lucide-react";

export function RaceCountdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="surface-elevated rounded-lg p-5 sm:p-6 relative overflow-hidden"
    >
      {/* Subtle glow accent */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4 text-primary" />
          <span className="label-upper text-primary">Next Race</span>
        </div>
        <h2 className="font-heading text-xl sm:text-2xl font-extrabold uppercase tracking-tight mb-1">
          HYROX COLOGNE 2025
        </h2>
        <p className="text-sm text-text-secondary mb-4">March 22, 2025 · Pro Singles</p>

        <div className="flex items-end gap-6 mb-5">
          <div>
            <span className="stat-number text-5xl sm:text-6xl text-primary">5</span>
            <p className="label-upper text-text-muted mt-1">Weeks Out</p>
          </div>
          <div>
            <span className="stat-number text-3xl sm:text-4xl text-foreground">36</span>
            <p className="label-upper text-text-muted mt-1">Days</p>
          </div>
          <div>
            <span className="stat-number text-3xl sm:text-4xl text-text-secondary">12</span>
            <p className="label-upper text-text-muted mt-1">Sessions Left</p>
          </div>
        </div>

        <Button size="sm">
          View Race Plan <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
