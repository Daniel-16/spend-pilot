import {
  Target,
  Rocket,
  Brain,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your spending patterns and provide personalized insights.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0ms",
    },
    {
      icon: Target,
      title: "Financial Runway",
      description:
        "Calculate exactly how long your money will last based on current spending habits and income.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "100ms",
    },
    {
      icon: Rocket,
      title: "Smart Recommendations",
      description:
        "Get actionable insights to optimize spending and accelerate your savings growth.",
      gradient: "from-purple-500 to-pink-500",
      delay: "200ms",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your data is encrypted and processed securely. We never store your financial information.",
      gradient: "from-green-500 to-emerald-500",
      delay: "300ms",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description:
        "Upload your statement and get comprehensive analysis in seconds, not hours.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "400ms",
    },
    {
      icon: CheckCircle,
      title: "Actionable Reports",
      description:
        "Detailed reports with specific steps you can take to improve your financial health.",
      gradient: "from-red-500 to-pink-500",
      delay: "500ms",
    },
  ];

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
                Smart Money Management
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeInUp delay-200">
              Our AI analyzes your spending patterns and provides actionable
              insights to help you make better financial decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
