"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? (resolvedTheme || theme || "light") : undefined;

  return (
    <div className="inline-flex items-center">
      <button
        aria-label="Toggle theme"
        className="px-3 py-1 rounded-md border bg-transparent text-sm"
        onClick={() => setTheme((current as string) === "dark" ? "light" : "dark")}
      >
        {mounted ? (current === "dark" ? "🌙" : "☀️") : ""}
      </button>
    </div>
  );
}
