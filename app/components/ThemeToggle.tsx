"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const current = mounted ? (resolvedTheme || theme || "light") : undefined;

  return (
    <div className="inline-flex items-center">
      <button
        aria-label="Toggle theme"
        title="Toggle theme"
        className="inline-flex h-9 w-11 items-center justify-center rounded-lg border bg-card text-slate-700 shadow-md transition-colors hover:bg-slate-100"
        onClick={() => setTheme((current as string) === "dark" ? "light" : "dark")}
      >
        {mounted ? (
          current === "dark" ? (
            <Moon aria-hidden size={17} strokeWidth={2.2} />
          ) : (
            <Sun aria-hidden size={17} strokeWidth={2.2} />
          )
        ) : null}
      </button>
    </div>
  );
}
