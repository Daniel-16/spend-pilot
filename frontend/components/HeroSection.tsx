import {
  ArrowRight,
  Sparkles,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative px-6 py-20"
      style={{ transform: `translateY(${scrollY * 0.1}px)` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3 mb-8 animate-fadeInUp">
            <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-blue-300 font-medium">
              AI-Powered Financial Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp delay-200">
            Transform Your
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent block animate-gradient">
              Financial Future
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fadeInUp delay-400">
            Upload your bank statement and unlock AI-powered insights that
            reveal hidden spending patterns, calculate your financial runway,
            and provide personalized strategies to optimize your money.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-600">
            <button className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center">
                Analyze My Spending
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="border-2 border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/30 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto animate-fadeInUp delay-800">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-green-400 mb-3" />
                <div className="text-3xl font-bold text-green-400 mb-1">
                  $2,847
                </div>
                <div className="text-sm text-gray-400">Monthly Savings</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  47 Days
                </div>
                <div className="text-sm text-gray-400">Financial Runway</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  23%
                </div>
                <div className="text-sm text-gray-400">Spending Optimized</div>
              </div>
            </div>

            {/* Mock Chart */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Spending Trends
                </h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-end gap-2 h-20">
                {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85, 70, 95].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-blue-500/50 to-blue-400/80 rounded-t flex-1 transition-all duration-500 hover:from-blue-400/70 hover:to-blue-300/90"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    ></div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
