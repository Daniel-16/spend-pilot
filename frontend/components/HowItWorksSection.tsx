import { Upload, BarChart3, TrendingUp } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-blue-500">
            How It{" "}
            <span className="bg-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-sm sm:text-md text-slate-600 max-w-3xl mx-auto px-2">
            Get comprehensive financial insights in three simple steps. No
            complex setup required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10">
          <style>{`
            .how-it-works-grid .group {
              background: linear-gradient(to top, #dbeafe 0%, #ffffff 60%) !important;
            }
          `}</style>
          
          <div className="how-it-works-grid contents">
            {[
              {
                step: "01",
                title: "Upload Statement",
                description:
                  "Simply drag and drop your PDF bank statement. We support all major banks and financial institutions.",
                icon: Upload,
                gradient: "from-blue-400 to-cyan-300",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our advanced algorithms process your transactions and identify patterns, trends, and optimization opportunities.",
                icon: BarChart3,
                gradient: "from-indigo-400 to-purple-400",
              },
              {
                step: "03",
                title: "Get Insights",
                description:
                  "Receive personalized recommendations, runway calculations, and actionable steps to improve your financial health.",
                icon: TrendingUp,
                gradient: "from-purple-400 to-pink-300",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`group bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300 ${
                  index === 1 ? 'sm:col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="relative mb-4 sm:mb-5">
                  <div
                    className={`bg-blue-500 p-2.5 sm:p-3 rounded-lg sm:rounded-xl w-fit text-white shadow-sm`}
                  >
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-500 text-white text-xs sm:text-sm font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}