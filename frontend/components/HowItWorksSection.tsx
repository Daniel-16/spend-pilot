import { Upload, BarChart3, TrendingUp } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Upload Statement",
    description: "Drag and drop your PDF bank statement or click to browse. We support all major banks and formats.",
    icon: Upload
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI processes your transactions and identifies spending patterns, trends, and opportunities.",
    icon: BarChart3
  },
  {
    step: "03",
    title: "Get Insights",
    description: "Receive personalized insights, runway calculations, and actionable recommendations to improve your finances.",
    icon: TrendingUp
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get financial insights in three simple steps. No complex setup, no lengthy forms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {step.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
