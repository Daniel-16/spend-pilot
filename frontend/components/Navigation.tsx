"use client";
import { ArrowRight, TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-2 rounded-xl shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SpendPilot
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
          >
            How it Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Reviews
          </a>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 inline" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg w-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
