"use client";

import { Brain, Shield, Zap } from "lucide-react";
import { BackgroundEffects } from "@/components/shared/BackgroundEffects";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

const features = [
  {
    icon: Brain,
    title: "IA Avançada",
    description:
      "Processamento de linguagem natural em tempo real com modelos de última geração",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description:
      "Seus dados protegidos com criptografia de ponta e conformidade empresarial",
    gradient: "from-green-500/20 to-green-600/20",
  },
  {
    icon: Zap,
    title: "Super Inteligente",
    description:
      "Insights automáticos, análises preditivas e resumos instantâneos",
    gradient: "from-purple-500/20 to-purple-600/20",
  },
];

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
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 50}
              />
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
