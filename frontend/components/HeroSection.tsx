"use client";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <section
    className="relative px-6 py-10 overflow-hidden bg-white"
    style={{
      transform: `translateY(${scrollY * 0.06}px)`,
    }}
    >
    <Navigation />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
        "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 1px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
          backgroundSize: "120px 120px, 120px 120px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-6 py-8 h-full">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 8 * 6 }).map((_, i) => {
            const isBlue = i % 3 === 0;
            return (
          <div
            key={i}
            className={`rounded-lg w-full pointer-events-none transition-all transform ${
              isBlue
            ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
            : "bg-white/30 border border-slate-100/40"
            }`}
            style={{ height: "120px" }}
          />
            );
          })}
        </div>
          </div>
        </div>

        {/* <div className="absolute left-0 top-0 h-full w-56 bg-gradient-to-r from-blue-500 to-transparent opacity-50" />
        <div className="absolute right-0 top-0 h-full w-56 bg-gradient-to-l from-cyan-50 to-transparent opacity-40" /> */}
      </div>


      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 px-6">
          <div className="inline-flex items-center gap-2 backdrop-blur-sm border-2 border-blue-500/10 rounded-full px-5 py-2 mb-6 shadow-lg">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-blue-500 font-medium">
              AI Financial Insights
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="block text-slate-900">Your Finances</span>
            <span className="block bg-blue-400 bg-clip-text text-transparent">
              Finally Organized.
            </span>
          </h1>

          <p className="text-md md:text-lg text-slate-500 mb-8 max-w-3xl mx-auto">
            Upload your bank statement to instantly calculate your financial
            runway, understand your daily spending patterns, and identify where
            your money goes each month.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload-statement"
              className="group relative bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden"
            >
              Analyze My Spending
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mx-4 rounded-2xl bg-white/95 border border-slate-100 shadow-[0_30px_60px_rgba(2,6,23,0.25)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <div className="ml-4 text-sm text-slate-500 hidden sm:block">
                  http://spendpilot.com/dashboard
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 hidden sm:block">
                  Eugene Doe
                </div>
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>

            <div className="p-8 bg-slate-50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <DollarSign className="h-6 w-6 text-green-500 mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    $2,847
                  </div>
                  <div className="text-sm text-slate-500">Monthly Savings</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <BarChart3 className="h-6 w-6 text-blue-500 mb-3" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    47 Days
                  </div>
                  <div className="text-sm text-slate-500">Financial Runway</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-500 mb-3" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    23%
                  </div>
                  <div className="text-sm text-slate-500">
                    Spending Optimized
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Dashboards
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="px-3 py-1 bg-slate-100 rounded text-sm text-slate-600">
                      1 Jan - 31 Dec 2025
                    </div>
                    <Link
                      href="#"
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm font-semibold"
                    >
                      Add Income
                    </Link>
                  </div>
                </div>

                <div className="h-56 flex items-end gap-2">
                  {[30, 50, 40, 70, 55, 85, 60, 95, 75, 90, 65, 100].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-blue-400 to-blue-300 transition-transform duration-500 hover:scale-y-105"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
