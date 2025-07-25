import { Upload, BarChart3, TrendingUp } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section
            id="how-it-works"
            className="px-6 py-20 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
                  How It Works
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeInUp delay-200">
                  Get comprehensive financial insights in three simple steps. No
                  complex setup required.
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
    
                {[
                  {
                    step: "01",
                    title: "Upload Statement",
                    description:
                      "Simply drag and drop your PDF bank statement. We support all major banks and financial institutions.",
                    icon: Upload,
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    description:
                      "Our advanced algorithms process your transactions and identify patterns, trends, and optimization opportunities.",
                    icon: BarChart3,
                  },
                  {
                    step: "03",
                    title: "Get Insights",
                    description:
                      "Receive personalized recommendations, runway calculations, and actionable steps to improve your financial health.",
                    icon: TrendingUp,
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="text-center animate-fadeInUp"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative mb-8">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
}
