"use client";
import { TrendingUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 backdrop-blur-md bg-white/20 border border-white/20 rounded-full shadow-lg shadow-black/5 w-11/12 max-w-5xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg shadow-sm flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-800">SpendPilot</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          {/* <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none transition-colors">
            Product
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
          <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none transition-colors">
            Features
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button> */}
          {/* <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none transition-colors">
            How it Works
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button> */}
          {/* <Link href="/pricing" className="hover:text-slate-800 transition-colors">
            Pricing
          </Link> */}
        </div>
        
        <div className="flex items-center gap-4">
          {/* <Link
            href="/login"
            className="text-sm text-slate-600 hover:text-slate-800 hidden sm:inline transition-colors"
          >
            Log In
          </Link> */}
          <Link
            href="/upload-statement"
            className="hidden sm:inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:from-blue-400 hover:to-indigo-400 transition-all duration-200 backdrop-blur-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}