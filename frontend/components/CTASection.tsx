import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
              Financial Future?
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Join thousands of users who have already optimized their spending
            and accelerated their savings with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-12 py-6 rounded-lg text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center">
                Start Your Analysis Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
