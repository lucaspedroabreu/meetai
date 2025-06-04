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

// Tipo para as partículas
interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

// Função para gerar partículas aleatórias
const generateRandomParticles = (count: number = 20): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 20}s`,
  }));
};

// Função para obter partículas da sessão (ou gerar novas)
const getSessionParticles = (): Particle[] => {
  // Verificar se estamos no cliente
  if (typeof window === "undefined") {
    return generateRandomParticles(); // SSR fallback
  }

  try {
    const stored = sessionStorage.getItem("floating-particles");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validar se os dados estão no formato correto
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed[0].id !== undefined
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Erro ao carregar partículas da sessão:", error);
  }

  // Gerar novas partículas e salvar na sessão
  const newParticles = generateRandomParticles();
  try {
    sessionStorage.setItem("floating-particles", JSON.stringify(newParticles));
  } catch (error) {
    console.warn("Erro ao salvar partículas na sessão:", error);
  }

  return newParticles;
};

// Função utilitária para regenerar partículas (útil para debug ou preferências do usuário)
export const regenerateParticles = (): Particle[] => {
  if (typeof window === "undefined") return [];

  const newParticles = generateRandomParticles();
  try {
    sessionStorage.setItem("floating-particles", JSON.stringify(newParticles));
    // Disparar evento customizado para notificar componentes que as partículas mudaram
    window.dispatchEvent(
      new CustomEvent("particles-regenerated", { detail: newParticles })
    );
  } catch (error) {
    console.warn("Erro ao regenerar partículas:", error);
  }
  return newParticles;
};

const FloatingParticles = memo(() => {
  const [state, setState] = useState<{
    isMounted: boolean;
    particles: Particle[];
  }>({
    isMounted: false,
    particles: [],
  });

  useEffect(() => {
    // Carregar partículas em uma única atualização de estado
    let loadedParticles: Particle[] = [];

    // Tentar carregar do sessionStorage ou gerar novas
    try {
      const stored = sessionStorage.getItem("floating-particles");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed[0].id !== undefined
        ) {
          loadedParticles = parsed;
        }
      }
    } catch (error) {
      console.warn("Erro ao carregar partículas da sessão:", error);
    }

    // Se não carregou partículas válidas, gerar novas
    if (loadedParticles.length === 0) {
      loadedParticles = generateRandomParticles();
      try {
        sessionStorage.setItem(
          "floating-particles",
          JSON.stringify(loadedParticles)
        );
      } catch (error) {
        console.warn("Erro ao salvar partículas na sessão:", error);
      }
    }

    // Atualizar estado de uma só vez
    setState({
      isMounted: true,
      particles: loadedParticles,
    });

    // Listener para regeneração de partículas
    const handleParticlesRegenerated = (event: CustomEvent) => {
      setState((prevState) => ({
        ...prevState,
        particles: event.detail,
      }));
    };

    window.addEventListener(
      "particles-regenerated",
      handleParticlesRegenerated as EventListener
    );

    return () => {
      window.removeEventListener(
        "particles-regenerated",
        handleParticlesRegenerated as EventListener
      );
    };
  }, []);

  // Não renderizar no servidor ou antes do componente estar montado
  if (!state.isMounted || state.particles.length === 0) return null;

  return (
    <>
      {state.particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </>
  );
});

FloatingParticles.displayName = "FloatingParticles";

// NOVO: Componente de partículas estáticas específicas para o dashboard
// Estas partículas são fixas e não causam problemas de hidratação

const STATIC_PARTICLES = [
  { id: 1, left: "10%", top: "20%", delay: "0s", duration: "15s" },
  { id: 2, left: "80%", top: "10%", delay: "2s", duration: "18s" },
  { id: 3, left: "20%", top: "70%", delay: "4s", duration: "12s" },
  { id: 4, left: "70%", top: "60%", delay: "1s", duration: "20s" },
  { id: 5, left: "40%", top: "30%", delay: "3s", duration: "16s" },
  { id: 6, left: "90%", top: "80%", delay: "5s", duration: "14s" },
  { id: 7, left: "15%", top: "90%", delay: "2.5s", duration: "17s" },
  { id: 8, left: "60%", top: "25%", delay: "4.5s", duration: "13s" },
  { id: 9, left: "30%", top: "85%", delay: "1.5s", duration: "19s" },
  { id: 10, left: "85%", top: "40%", delay: "3.5s", duration: "15s" },
];

const DashboardParticles = memo(() => {
  return (
    <>
      {STATIC_PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-40 animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </>
  );
});

DashboardParticles.displayName = "DashboardParticles";
