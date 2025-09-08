"use client";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 px-3 sm:px-4 md:px-6 py-3 sm:py-2.5 md:py-3 backdrop-blur-md bg-white/20 border border-gradient-to-r from-white/30 to-white/10 rounded-full shadow-inner shadow-black/5 w-[95%] sm:w-11/12 max-w-5xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-r from-blue-400 to-indigo-500 p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-sm flex items-center justify-center">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
          </div>
          <span className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
            <span className="hidden xs:inline">SpendPilot</span>
            <span className="xs:hidden">SpendPilot</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/upload-statement"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl hover:from-blue-400 hover:to-indigo-400 transition-all duration-200 backdrop-blur-sm"
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Get Started</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}