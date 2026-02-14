import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Workout, type WorkoutCategory, type IntensityLevel, categoryConfig, intensityConfig } from "@/data/workouts";

interface WorkoutEditorProps {
  workout: Workout | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: Workout) => void;
  onDelete?: (id: string) => void;
}

export function WorkoutEditor({ workout, isOpen, onClose, onSave, onDelete }: WorkoutEditorProps) {
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonValue, setJsonValue] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Workout | null>(null);

  useEffect(() => {
    if (workout) {
      setFormData({ ...workout });
      setJsonValue(JSON.stringify(workout, null, 2));
      setJsonError(null);
    }
  }, [workout]);

  const handleJsonChange = useCallback((val: string) => {
    setJsonValue(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch {
      setJsonError("Invalid JSON");
    }
  }, []);

  const handleSave = () => {
    if (mode === "json") {
      try {
        const parsed = JSON.parse(jsonValue) as Workout;
        onSave(parsed);
      } catch {
        setJsonError("Cannot save — invalid JSON");
        return;
      }
    } else if (formData) {
      onSave(formData);
    }
    onClose();
  };

  const isNew = workout?.id === "";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-2xl border-t border-border bg-card sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4 sm:max-w-lg sm:rounded-2xl sm:border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wider">
                {isNew ? "Create Workout" : "Edit Workout"}
              </h2>
              <button onClick={onClose} className="text-text-muted hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setMode("form")}
                className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  mode === "form" ? "text-primary border-b-2 border-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <FileText className="h-3.5 w-3.5" /> Form
              </button>
              <button
                onClick={() => {
                  if (formData) setJsonValue(JSON.stringify(formData, null, 2));
                  setMode("json");
                }}
                className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  mode === "json" ? "text-primary border-b-2 border-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <Code className="h-3.5 w-3.5" /> JSON
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-5 py-4 max-h-[60vh]">
              {mode === "form" && formData ? (
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="label-upper text-text-muted mb-1.5 block">Title</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-foreground placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                      placeholder="WORKOUT TITLE"
                    />
                  </div>

                  {/* Category & Intensity */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-upper text-text-muted mb-1.5 block">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as WorkoutCategory })}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors appearance-none"
                      >
                        {Object.entries(categoryConfig).map(([key, cfg]) => (
                          <option key={key} value={key}>{cfg.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-upper text-text-muted mb-1.5 block">Intensity</label>
                      <select
                        value={formData.intensity}
                        onChange={(e) => setFormData({ ...formData, intensity: e.target.value as IntensityLevel })}
                        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors appearance-none"
                      >
                        {Object.entries(intensityConfig).map(([key, cfg]) => (
                          <option key={key} value={key}>{cfg.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="label-upper text-text-muted mb-1.5 block">Duration (min)</label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="label-upper text-text-muted mb-1.5 block">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                      placeholder="Brief workout description..."
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    value={jsonValue}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    rows={18}
                    spellCheck={false}
                    className={`w-full rounded-lg border bg-background px-4 py-3 font-mono text-xs leading-relaxed text-foreground focus:outline-none focus:ring-1 transition-colors resize-none ${
                      jsonError
                        ? "border-destructive/60 focus:ring-destructive/40"
                        : "border-border focus:border-primary/50 focus:ring-primary/30"
                    }`}
                  />
                  {jsonError && (
                    <p className="mt-1.5 text-xs font-semibold text-destructive">{jsonError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 border-t border-border px-5 py-4">
              {!isNew && onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => { onDelete(workout!.id); onClose(); }}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              )}
              <div className="flex-1" />
              <Button variant="secondary" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
