"use client";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
// import { StatSection } from "@/components/StatSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
// import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setScrollY(window.scrollY);
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getGridConfig = () => {
    if (windowWidth < 640) return { cols: 4, rows: 6, gap: 2 };
    if (windowWidth < 768) return { cols: 6, rows: 6, gap: 3 };
    return { cols: 8, rows: 6, gap: 4 };
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white text-white relative font-sans">
        <div className="relative z-10">
          <Navigation />
          <main>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const { cols, rows, gap } = getGridConfig();
  const totalItems = cols * rows;

  return (
    <div className="min-h-screen bg-white text-white relative font-sans overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.03}px, 0)`,
          willChange: 'transform'
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
            backgroundSize: "120px 120px",
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 py-8">
            <div
              className="grid w-full h-screen max-h-[800px]"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: `${gap * 4}px`,
              }}
            >
              {Array.from({ length: totalItems }).map((_, i) => {
                const isBlue = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-md sm:rounded-lg w-full pointer-events-none transition-opacity duration-300 ${
                      isBlue
                        ? "bg-gradient-to-br from-blue-400/20 to-cyan-200/8 border border-blue-200/25 shadow-sm"
                        : "bg-white/25 border border-slate-100/30"
                    }`}
                    style={{
                      height: windowWidth < 640 ? "60px" : windowWidth < 768 ? "80px" : "100px",
                      aspectRatio: "1",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;