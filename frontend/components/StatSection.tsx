import { DollarSign, Star, Target, Zap } from "lucide-react";

export function StatSection() {
  const stats = [
    { value: "$2.4M+", label: "Money Saved", icon: DollarSign },
    { value: "15K+", label: "Happy Users", icon: Star },
    { value: "98%", label: "Accuracy Rate", icon: Target },
    { value: "2.3s", label: "Average Analysis", icon: Zap },
  ];
  return (
    <section className="px-6 py-16 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <stat.icon className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
