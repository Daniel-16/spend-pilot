import Link from "next/link";
import {
  ArrowRight,
  Zap,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              AI-Powered Financial Analysis
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Take Control of Your
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent block">
              Financial Future
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
            Upload your bank statement and get instant AI-powered insights into
            your spending habits, financial runway, and personalized
            recommendations to optimize your money.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Link href="/upload-statement">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 px-8 py-4 text-lg"
              >
                Analyze My Spending
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-4xl mx-auto animate-float">
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/20">
                <DollarSign className="h-8 w-8 text-green-400 mb-3" />
                <div className="text-2xl font-bold text-green-400">$2,847</div>
                <div className="text-sm text-gray-400">Monthly Savings</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/20">
                <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold text-blue-400">47 Days</div>
                <div className="text-sm text-gray-400">Financial Runway</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/20">
                <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
                <div className="text-2xl font-bold text-purple-400">23%</div>
                <div className="text-sm text-gray-400">Spending Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
    </section>
  );
}
