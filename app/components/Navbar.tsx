"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import React from "react";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-transparent">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            Tanmoy's Blog
          </Link>
          <nav className="hidden md:flex gap-4 text-sm text-slate-600">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/category/bike" className="hover:underline">Bike</Link>
            <Link href="/category/travel" className="hover:underline">Travel</Link>
            <Link href="/category/tech" className="hover:underline">Tech</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
