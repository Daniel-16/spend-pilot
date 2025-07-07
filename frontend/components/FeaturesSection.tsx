import {
  Upload,
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Instant Upload & Analysis",
    description:
      "Simply upload your PDF bank statement and get instant AI-powered analysis of your spending patterns.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Financial Runway Calculator",
    description:
      "Know exactly how long your money will last based on your current spending habits and income.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Smart Spending Insights",
    description:
      "Get personalized recommendations to optimize your spending and increase your savings rate.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your financial data is processed securely and never stored on our servers for maximum privacy.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Real-Time Alerts",
    description:
      "Get notified when your spending patterns change or when your runway drops below safe levels.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: CheckCircle,
    title: "Actionable Reports",
    description:
      "Receive detailed reports with specific actions you can take to improve your financial health.",
    gradient: "from-red-500 to-pink-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-20 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Smart Money Management
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI analyzes your spending patterns and provides actionable
            insights to help you make better financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-xl w-fit mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
