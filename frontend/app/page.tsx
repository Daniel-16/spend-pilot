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
    <div className="min-h-screen bg-white text-white relative font-sans">

        {/* <Navigation /> */}
        <HeroSection />
        {/* <StatSection /> */}
        <FeaturesSection />
        <HowItWorksSection />
        {/* <CTASection /> */}
        <Footer />
    </div>
  );
};

export default LandingPage;
