"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  BarChart3,
  Upload,
  Shield,
  CheckCircle,
  Star,
  Target,
  Brain,
  Rocket,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatSection } from "@/components/StatSection";

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your spending patterns and provide personalized insights.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0ms",
    },
    {
      icon: Target,
      title: "Financial Runway",
      description:
        "Calculate exactly how long your money will last based on current spending habits and income.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "100ms",
    },
    {
      icon: Rocket,
      title: "Smart Recommendations",
      description:
        "Get actionable insights to optimize spending and accelerate your savings growth.",
      gradient: "from-purple-500 to-pink-500",
      delay: "200ms",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your data is encrypted and processed securely. We never store your financial information.",
      gradient: "from-green-500 to-emerald-500",
      delay: "300ms",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description:
        "Upload your statement and get comprehensive analysis in seconds, not hours.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "400ms",
    },
    {
      icon: CheckCircle,
      title: "Actionable Reports",
      description:
        "Detailed reports with specific steps you can take to improve your financial health.",
      gradient: "from-red-500 to-pink-500",
      delay: "500ms",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "SpendPilot helped me identify $500/month in unnecessary expenses. I've saved over $6,000 this year!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "The AI insights are incredibly accurate. It's like having a personal financial advisor in your pocket.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      content:
        "The financial runway feature is a game-changer. I now have complete visibility into my financial future.",
      rating: 5,
      avatar: "ER",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <HeroSection />
      {/* Stats Section */}
      <StatSection />

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
                Smart Money Management
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeInUp delay-200">
              Our AI analyzes your spending patterns and provides actionable
              insights to help you make better financial decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30"></div>

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
                  <div className="absolute -top-2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center animate-pulse">
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

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeInUp delay-200">
              Join thousands of satisfied users who have transformed their
              financial lives with SpendPilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
                Financial Future?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already optimized their spending
              and accelerated their savings with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-12 py-6 rounded-lg text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse">
                <span className="flex items-center justify-center">
                  Start Your Analysis Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-2 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                SpendPilot
              </span>
            </div>
            <div className="flex items-center gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 SpendPilot. All rights reserved. Built with AI-powered
              financial intelligence.
            </p>
          </div>
        </div>
      </footer>

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
          animation: fadeInUp 0.8s ease-out both;
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
