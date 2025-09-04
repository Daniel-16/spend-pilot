import { Upload, BarChart3, TrendingUp } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative px-6 py-24 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">
            How It{" "}
            <span className="bg-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-md text-slate-600 max-w-3xl mx-auto">
            Get comprehensive financial insights in three simple steps. No
            complex setup required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <style>{`
                  .features-grid .group {
                    background: linear-gradient(to bottom, #dbeafe 0%, #ffffff 60%) !important;
                  }
                `}</style>
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
              className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <style>{`
					.group {
						background: linear-gradient(to top, #dbeafe 0%, #ffffff 60%) !important;
					}
				`}</style>
              <div className="relative mb-5">
                <div
                  className={`bg-blue-500 p-3 rounded-xl w-fit text-white shadow-sm`}
                >
                  <step.icon className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
