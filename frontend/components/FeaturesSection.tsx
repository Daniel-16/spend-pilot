import { Target, Rocket, Brain, Shield, Zap, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze your spending patterns and provide personalized insights.",
    delay: "0ms",
  },
  {
    icon: Target,
    title: "Financial Runway",
    description:
      "Calculate exactly how long your money will last based on current spending habits and income.",
    delay: "100ms",
  },
  {
    icon: Rocket,
    title: "Smart Recommendations",
    description:
      "Get actionable insights to optimize spending and accelerate your savings growth.",
    delay: "200ms",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your data is encrypted and processed securely. We never store your financial information.",
    delay: "300ms",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Upload your statement and get comprehensive analysis in seconds, not hours.",
    delay: "400ms",
  },
  {
    icon: CheckCircle,
    title: "Actionable Reports",
    description:
      "Detailed reports with specific steps you can take to improve your financial health.",
    delay: "500ms",
  },
];

export function FeaturesSection() {

  return (
    <section
      id="features"
      className="relative px-6 py-14 overflow-hidden bg-transparent mb-10"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent block">
              Smart Money Management
            </span>
          </h2>
          <p className="text-md text-slate-700 max-w-3xl mx-auto">
            Our AI analyzes your spending patterns and provides actionable
            insights to help you make better financial decisions.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 features-grid">
            <style>{`
					.features-grid .group {
						background: linear-gradient(to bottom, #dbeafe 0%, #ffffff 60%) !important;
					}
				`}</style>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`bg-blue-500 p-3 rounded-xl w-fit mb-5 text-white shadow-sm`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
