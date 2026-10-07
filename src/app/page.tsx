"use client";

import React from "react";
import { Topbar } from "@/components/layout/Topbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { MobileNav } from "@/components/layout/MobileNav";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 pb-20 relative selection:bg-primary/20">
      {/* Top Floating Navigation over the Sky Hero */}
      <div className="absolute top-0 left-0 right-0 z-40 pointer-events-auto">
        <Topbar />
      </div>

      {/* Full-Viewport Living Animated Sky Hero (99% Reference Visual Fidelity + Animation) */}
      <HeroSection />

      {/* Complete Landing Content Sections (Clean, Stationery-Crafted, High-Contrast) */}
      <div className="relative z-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80 shadow-2xl">
        {/* 6 Key Features */}
        <FeaturesSection />

        {/* Sticky Note Testimonials */}
        <TestimonialSection />

        {/* Call to Action Footer */}
        <CTASection />
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />
    </main>
  );
}
