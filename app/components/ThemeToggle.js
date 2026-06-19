"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white/90 dark:bg-stone-800/90 shadow-lg border border-stone-200 dark:border-stone-700 backdrop-blur hover:scale-105 active:scale-95 transition-all"
    >
      <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}