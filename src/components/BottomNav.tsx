import { Calendar, Target, User, Settings } from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "plan", label: "Plan", icon: Target },
  { id: "profile", label: "Profile", icon: User },
  { id: "admin", label: "Admin", icon: Settings },
];

interface BottomNavProps {
  active?: string;
  onNavigate?: (id: string) => void;
}

export function BottomNav({ active = "calendar", onNavigate }: BottomNavProps) {
  const [current, setCurrent] = useState(active);

  const handleTap = (id: string) => {
    setCurrent(id);
    onNavigate?.(id);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = current === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleTap(item.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors duration-150 ${
                isActive ? "text-primary" : "text-text-muted"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_6px_hsl(160,100%,50%)]" : ""}`} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
