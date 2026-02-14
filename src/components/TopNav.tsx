import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { label: "Calendar", path: "/" },
  { label: "Plan", path: "/plan" },
  { label: "Profile", path: "/profile" },
  { label: "Admin", path: "/admin" },
];

export function TopNav({ activePage }: { activePage?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeLabel = activePage || links.find((l) => l.path === location.pathname)?.label || "Calendar";

  return (
    <header className="hidden sm:flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <span className="font-heading text-lg font-extrabold uppercase tracking-wider">
          HYROX<span className="text-primary">PRO</span>
        </span>
      </button>
      <nav className="flex items-center gap-1">
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => navigate(link.path)}
            className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-150 ${
              activeLabel === link.label ? "text-foreground" : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {link.label}
            {activeLabel === link.label && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
              />
            )}
          </button>
        ))}
      </nav>
      <div className="w-20" />
    </header>
  );
}
