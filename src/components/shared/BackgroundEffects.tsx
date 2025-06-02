import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  variant?: "landing" | "dashboard";
  className?: string;
}

export const BackgroundEffects = ({
  variant = "landing",
  className,
}: BackgroundEffectsProps) => (
  <div className={cn("absolute inset-0 overflow-hidden", className)}>
    <PremiumGradients variant={variant} />
    <AmbientOrbs variant={variant} />
    <FloatingParticles />
    {variant === "dashboard" && <DashboardParticles />}
  </div>
);

const PremiumGradients = ({
  variant,
}: {
  variant: "landing" | "dashboard";
}) => (
  <>
    {/* Primary gradient - matching dashboard */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

    {/* Secondary depth layer */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-indigo-900/30" />

    {/* Ambient light effects - AJUSTADOS */}
    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-violet-500/10 to-transparent" />

    {/* ELEMENTO PROBLEMÁTICO - AGORA MAIS SUTIL */}
    <div className="absolute bottom-10 right-10 w-1/3 h-1/3 bg-gradient-to-tl from-indigo-500/5 to-transparent blur-lg rounded-[100px]" />

    {/* Radial glow for landing page */}
    {variant === "landing" && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-[100px] blur-3xl" />
    )}
  </>
);

const AmbientOrbs = ({ variant }: { variant: "landing" | "dashboard" }) => (
  <>
    <div
      className={cn(
        "absolute w-96 h-96 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl",
        variant === "landing"
          ? "top-20 right-10 animate-pulse"
          : "top-20 right-10"
      )}
    />
    <div
      className={cn(
        "absolute w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-3xl",
        variant === "landing"
          ? "bottom-20 left-10 animate-pulse"
          : "bottom-20 left-10"
      )}
    />
  </>
);

const FloatingParticles = React.memo(() => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  // Gera partículas apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${10 + Math.random() * 20}s`,
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
});

// Partículas específicas do dashboard (menores e mais sutis)
const DashboardParticles = React.memo(() => {
  const dashboardParticles = [
    { top: "3rem", left: "2rem", size: "w-1 h-1", opacity: "bg-white/40" },
    { top: "8rem", right: "3rem", size: "w-1 h-1", opacity: "bg-white/30" },
    { top: "12rem", left: "4rem", size: "w-0.5 h-0.5", opacity: "bg-white/50" },
    { bottom: "8rem", right: "2rem", size: "w-1 h-1", opacity: "bg-white/20" },
    {
      bottom: "12rem",
      left: "3rem",
      size: "w-0.5 h-0.5",
      opacity: "bg-white/40",
    },
  ];

  return (
    <div className="absolute inset-0 opacity-30">
      {dashboardParticles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size} ${p.opacity} rounded-full`}
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";
DashboardParticles.displayName = "DashboardParticles";
