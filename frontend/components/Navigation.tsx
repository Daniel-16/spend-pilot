"use client";
import { TrendingUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 px-6 py-2 backdrop-blur-sm bg-transparent border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg shadow-sm flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-800">SpendPilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          {/* <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none">
            Product
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none">
            Features
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button> */}

          {/* <button className="flex items-center gap-2 hover:text-slate-800 focus:outline-none">
            How it Works
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button> */}

          {/* <Link href="/pricing" className="hover:text-slate-800">
            Pricing
          </Link> */}
        </div>

        <div className="flex items-center gap-4">
          {/* <Link
            href="/login"
            className="text-sm text-slate-600 hover:text-slate-800 hidden sm:inline"
          >
            Log In
          </Link> */}

          <Link
            href="/upload-statement"
            className="hidden sm:inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:bg-blue-400 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
