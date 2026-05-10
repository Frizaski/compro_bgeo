"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12 h-12" />; // placeholder to prevent layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={24} className="text-yellow-400" />
      ) : (
        <Moon size={24} className="text-slate-700" />
      )}
    </button>
  );
}
