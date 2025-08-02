"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BottomTabBar } from "@/components/BottomTabBar";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated glassy blue-red background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 animate-bg-move"
      >
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-red-400/20 blur-3xl opacity-80 animate-pulse-slow dark:from-blue-900/30 dark:to-red-900/20" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-red-500/20 via-blue-400/10 to-blue-500/20 blur-2xl opacity-70 animate-pulse-slower dark:from-red-900/20 dark:to-blue-900/20" />
          <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-red-400/20 to-blue-500/10 blur-3xl opacity-60 animate-pulse-slow dark:from-blue-900/20 dark:to-red-900/20" />
        </div>
      </div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 animate-fade-in-up">
        <Hero />
      </section>

      {/* Stats Section */}
      <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <Stats />
      </section>

      {/* Features Section */}
      <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <Features />
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <CTA />
      </section>

      {/* Footer */}
      <Footer />

      <BottomTabBar />
      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes bg-move {
          0%, 100% { filter: blur(0px); }
          50% { filter: blur(8px); }
        }
        .animate-bg-move {
          animation: bg-move 12s ease-in-out infinite alternate;
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse 14s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1);}
          50% { opacity: 1; transform: scale(1.08);}
        }
      `}</style>
    </div>
  );
}
