"use client";

import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatSection } from "@/components/StatSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] text-white overflow-x-hidden relative font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-blue-400/20 rounded-full blur-[120px] shadow-2xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-[24rem] h-[24rem] bg-fuchsia-500/20 rounded-full blur-[100px] shadow-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[28rem] h-[28rem] bg-indigo-400/20 rounded-full blur-[100px] shadow-xl animate-pulse delay-2000"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/10 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/10 to-transparent z-10" />
      </div>

      <div className="relative z-10">
        {/* <Navigation /> */}
        <HeroSection />
        <StatSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-600 {
          animation-delay: 600ms;
        }

        .delay-800 {
          animation-delay: 800ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
