import { Calendar, Target, User, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { id: "calendar", label: "Calendar", icon: Calendar, path: "/" },
  { id: "plan", label: "Plan", icon: Target, path: "/plan" },
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
  { id: "admin", label: "Admin", icon: Settings, path: "/admin" },
];

interface BottomNavProps {
  active?: string;
}

export function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentId = active || navItems.find((n) => n.path === location.pathname)?.id || "calendar";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = currentId === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
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
