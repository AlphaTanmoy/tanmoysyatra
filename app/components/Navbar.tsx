"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/category/bike", label: "Bike" },
  { href: "/category/travel", label: "Travel" },
  { href: "/category/tech", label: "Tech" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex w-full sm:w-auto items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Tanmoy&apos;s Blog
          </Link>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "rounded-full px-3 py-1.5 font-medium transition-colors",
                    isActive
                      ? "bg-slate-100 text-slate-700"
                      : "hover:bg-slate-100 hover:text-slate-700",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
