"use client";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 px-4 py-3 backdrop-blur-sm bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-1.5 rounded-lg shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SpendPilot
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/upload-statement"
            className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hidden sm:block"
          >
            Upload Statement
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hidden sm:block"
          >
            Dashboard
          </Link>
          {/* <Link
            href="/upload-statement"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
