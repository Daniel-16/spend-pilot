"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatSection } from "@/components/StatSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);
      setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-white relative font-sans">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.06}px)`,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
          backgroundSize: "120px 120px, 120px 120px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-6 py-8 h-full">
            <div className="grid grid-cols-8 gap-4 h-full">
              {Array.from({ length: 8 * 6 }).map((_, i) => {
                const isBlue = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-lg w-full pointer-events-none transition-all transform ${
                      isBlue
                        ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                        : "bg-white/30 border border-slate-100/40"
                    }`}
                    style={{ height: "140px", width: "100px" }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
