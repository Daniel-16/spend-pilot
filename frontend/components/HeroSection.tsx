import {
  ArrowRight,
  Sparkles,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <section
        className="relative px-4 py-20 sm:py-32 md:py-40 overflow-hidden bg-transparent"
      >        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-6">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm border-2 border-blue-500/10 rounded-full px-3 sm:px-5 py-2 mb-4 sm:mb-6 shadow-lg">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="text-xs sm:text-sm text-blue-500 font-medium">
                AI Financial Insights
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 px-2">
              <span className="block text-slate-900">Your Finances</span>
              <span className="block bg-blue-400 bg-clip-text text-transparent">
                Finally Organized.
              </span>
            </h1>

            <p className="text-sm sm:text-md md:text-lg text-slate-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Upload your bank statement to instantly calculate your financial
              runway, understand your daily spending patterns, and identify
              where your money goes each month.
            </p>

            <Link
              href="/upload-statement"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-2 text-sm sm:text-base font-semibold rounded-full bg-blue-500 text-white shadow-sm hover:shadow-md hover:bg-blue-400 transition"
            >
              <span>Analyze My Spending</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="mx-2 sm:mx-4 rounded-xl sm:rounded-2xl bg-white/95 border border-slate-100 shadow-[0_20px_40px_rgba(2,6,23,0.15)] sm:shadow-[0_30px_60px_rgba(2,6,23,0.25)] overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></span>
                  <div className="ml-2 sm:ml-4 text-xs sm:text-sm text-slate-500 hidden sm:block">
                    http://spendpilot.com/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                    Eugene Doe
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-200 rounded-full"></div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-100">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                      $2,847
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">
                      Monthly Savings
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                      47 Days
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">
                      Financial Runway
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-100">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 mb-2 sm:mb-3" />
                    <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                      23%
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">
                      Spending Optimized
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                      Dashboards
                    </h3>
                    <div className="flex gap-1 sm:gap-2 items-center">
                      <div className="px-2 sm:px-3 py-1 bg-slate-100 rounded text-xs sm:text-sm text-slate-600">
                        <span className="hidden sm:inline">1 Jan - 31 Dec 2025</span>
                        <span className="sm:hidden">2025</span>
                      </div>
                      <Link
                        href="#"
                        className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs sm:text-sm font-semibold"
                      >
                        <span className="hidden sm:inline">Add Income</span>
                        <span className="sm:hidden">Add</span>
                      </Link>
                    </div>
                  </div>

                  <div className="h-32 sm:h-40 md:h-56 flex items-end gap-1 sm:gap-2">
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