"use client";

import { BackgroundEffects } from "@/components/shared/BackgroundEffects";
import {
  HeroSection,
  FeatureCard,
  CTASection,
  LandingFooter,
} from "@/components/features/landing";
import { LANDING_FEATURES } from "@/constants/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative bg-slate-900 text-white overflow-hidden">
      {/* Premium background effects */}
      <BackgroundEffects variant="landing" />

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center p-6 lg:p-6 min-h-screen">
        <div className="max-w-5xl w-full space-y-12">
          {/* Hero Section */}
          <HeroSection />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-100">
            {LANDING_FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} {...feature} delay={index * 50} />
            ))}
          </div>

          {/* CTA Section */}
          <CTASection />

          {/* Footer */}
          <LandingFooter />
        </div>
      </div>
    </div>
  );
}
