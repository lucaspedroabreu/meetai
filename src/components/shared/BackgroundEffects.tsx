import React, { useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  variant?: "landing" | "dashboard";
  className?: string;
}

export const BackgroundEffects = memo(
  ({ variant = "landing", className }: BackgroundEffectsProps) => {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <PremiumGradients variant={variant} />
        <AmbientOrbs variant={variant} />
        <FloatingParticles />
        {variant === "dashboard" && <DashboardParticles />}
      </div>
    );
  }
);

BackgroundEffects.displayName = "BackgroundEffects";

const PremiumGradients = memo(
  ({ variant }: { variant: "landing" | "dashboard" }) => (
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
  )
);

PremiumGradients.displayName = "PremiumGradients";

const AmbientOrbs = memo(
  ({ variant }: { variant: "landing" | "dashboard" }) => (
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
  )
);

AmbientOrbs.displayName = "AmbientOrbs";

// Tipo para as partículas MÁGICAS ✨
interface MagicalParticle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: string;
  opacity: string;
  color: string;
  blur: string;
  drift: string;
}

// Função para gerar partículas MÁGICAS aleatórias ✨
const generateMagicalParticles = (count: number = 35): MagicalParticle[] => {
  // PALETA MONOCROMÁTICA VIOLETA/ROXO 💜
  const colors = [
    "bg-violet-200",
    "bg-violet-300",
    "bg-purple-200",
    "bg-purple-300",
    "bg-indigo-200",
    "bg-indigo-300",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${8 + Math.random() * 25}s`,
    // TAMANHOS MENORES E MAIS SUTIS PARA PARTÍCULAS
    size:
      Math.random() > 0.8
        ? "w-1 h-1"
        : Math.random() > 0.5
        ? "w-0.5 h-0.5"
        : "w-px h-px",
    opacity:
      Math.random() > 0.6
        ? "opacity-60"
        : Math.random() > 0.3
        ? "opacity-40"
        : "opacity-20",
    color: colors[Math.floor(Math.random() * colors.length)],
    blur: Math.random() > 0.7 ? "blur-sm" : "",
    drift: `${(Math.random() - 0.5) * 40}px`, // Movimento horizontal suave
  }));
};

const FloatingParticles = memo(() => {
  const [state, setState] = useState<{
    isMounted: boolean;
    particles: MagicalParticle[];
  }>({
    isMounted: false,
    particles: [],
  });

  useEffect(() => {
    // Gerar partículas aleatórias diretamente no cliente
    const newParticles = generateMagicalParticles();

    // Atualizar estado de uma só vez
    setState({
      isMounted: true,
      particles: newParticles,
    });
  }, []);

  // Não renderizar no servidor ou antes do componente estar montado
  if (!state.isMounted || state.particles.length === 0) return null;

  return (
    <div className="contents" suppressHydrationWarning={true}>
      {state.particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full animate-magical-float",
            particle.size,
            particle.opacity,
            particle.color,
            particle.blur
          )}
          style={
            {
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              "--drift-distance": particle.drift,
            } as React.CSSProperties & { "--drift-distance": string }
          }
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

// NOVO: Componente de partículas estáticas específicas para o dashboard
// Estas partículas são fixas e não causam problemas de hidratação

const MAGICAL_DASHBOARD_PARTICLES = [
  {
    id: 1,
    left: "10%",
    top: "20%",
    delay: "0s",
    duration: "15s",
    size: "w-1 h-1",
    color: "bg-violet-300",
    glow: true,
  },
  {
    id: 2,
    left: "80%",
    top: "10%",
    delay: "2s",
    duration: "18s",
    size: "w-0.5 h-0.5",
    color: "bg-purple-200",
    glow: false,
  },
  {
    id: 3,
    left: "20%",
    top: "70%",
    delay: "4s",
    duration: "12s",
    size: "w-1 h-1",
    color: "bg-indigo-300",
    glow: true,
  },
  {
    id: 4,
    left: "70%",
    top: "60%",
    delay: "1s",
    duration: "20s",
    size: "w-px h-px",
    color: "bg-violet-200",
    glow: false,
  },
  {
    id: 5,
    left: "40%",
    top: "30%",
    delay: "3s",
    duration: "16s",
    size: "w-0.5 h-0.5",
    color: "bg-purple-300",
    glow: true,
  },
  {
    id: 6,
    left: "90%",
    top: "80%",
    delay: "5s",
    duration: "14s",
    size: "w-px h-px",
    color: "bg-indigo-200",
    glow: false,
  },
  {
    id: 7,
    left: "15%",
    top: "90%",
    delay: "2.5s",
    duration: "17s",
    size: "w-1 h-1",
    color: "bg-violet-300",
    glow: true,
  },
  {
    id: 8,
    left: "60%",
    top: "25%",
    delay: "4.5s",
    duration: "13s",
    size: "w-0.5 h-0.5",
    color: "bg-purple-200",
    glow: false,
  },
  {
    id: 9,
    left: "30%",
    top: "85%",
    delay: "1.5s",
    duration: "19s",
    size: "w-0.5 h-0.5",
    color: "bg-indigo-300",
    glow: true,
  },
  {
    id: 10,
    left: "85%",
    top: "40%",
    delay: "3.5s",
    duration: "15s",
    size: "w-px h-px",
    color: "bg-violet-200",
    glow: false,
  },
  {
    id: 11,
    left: "5%",
    top: "50%",
    delay: "6s",
    duration: "22s",
    size: "w-1 h-1",
    color: "bg-purple-300",
    glow: true,
  },
  {
    id: 12,
    left: "95%",
    top: "30%",
    delay: "1.8s",
    duration: "16s",
    size: "w-px h-px",
    color: "bg-indigo-200",
    glow: false,
  },
  {
    id: 13,
    left: "45%",
    top: "15%",
    delay: "3.2s",
    duration: "14s",
    size: "w-0.5 h-0.5",
    color: "bg-violet-300",
    glow: true,
  },
  {
    id: 14,
    left: "25%",
    top: "45%",
    delay: "5.5s",
    duration: "18s",
    size: "w-px h-px",
    color: "bg-purple-200",
    glow: false,
  },
  {
    id: 15,
    left: "75%",
    top: "85%",
    delay: "2.8s",
    duration: "21s",
    size: "w-0.5 h-0.5",
    color: "bg-indigo-300",
    glow: true,
  },
];

const DashboardParticles = memo(() => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {MAGICAL_DASHBOARD_PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full animate-magical-float",
            particle.size,
            particle.color,
            "opacity-50",
            particle.glow && "shadow-lg filter blur-[0.5px]"
          )}
          style={
            {
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              "--drift-distance": isClient
                ? `${(Math.random() - 0.5) * 25}px`
                : "0px",
              ...(particle.glow && {
                filter: "brightness(1.2) blur(0.5px)",
                boxShadow:
                  "0 0 8px rgba(167, 139, 250, 0.4), 0 0 16px rgba(139, 92, 246, 0.2)",
              }),
            } as React.CSSProperties & { "--drift-distance": string }
          }
          suppressHydrationWarning
        />
      ))}
    </>
  );
});

DashboardParticles.displayName = "DashboardParticles";
