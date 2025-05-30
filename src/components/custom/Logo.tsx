/* MeetAI.tsx ------------------------------------------------------------- */
import type React from "react";
import { useId } from "react";

type Variant = "default" | "mono" | "gradient";

interface LogoProps {
  size?: number; // lado do quadrado (px)
  variant?: Variant;
  className?: string;
  animated?: boolean; // só afeta o ponto
}

/* ---------- CONSTANTES GEOMÉTRICAS ------------------------------------ */
/* desenho original: 22 × 22  (guard-box) → transf. para viewBox 0-22     */
const MAIN_PATH =
  // M (esq.)
  "M2 21 V6 H5 L8 12  L11 6 H14      " +
  // haste M/A
  "L20 21 H17.5 L16 17 H11 V21 H8 V12 L5 16 V21 Z " +
  // triângulo vazado do A
  "M12.5 14 H14.5 L13.5 11.5 Z";

/* ---------- COMPONENTES ------------------------------------------------ */
export const MeetAILogo: React.FC<LogoProps> = ({
  size = 32,
  variant = "default",
  className = "",
  animated = false,
}) => {
  const gradientId = useId(); // evita collisions em múltiplas instâncias

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MeetAI Logo"
    >
      <title>MeetAI Logo</title>
      {/* gradiente opcional */}
      {variant === "gradient" && (
        <defs>
          {/* preto 15 % → preto 55 % (cinza) */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.15 0 0)" />
            <stop offset="100%" stopColor="oklch(0.55 0 0)" />
          </linearGradient>
        </defs>
      )}

      {/* M + A (com buraco) */}
      <path
        d={MAIN_PATH}
        fill={variant === "gradient" ? `url(#${gradientId})` : "currentColor"}
        fillRule="evenodd"
      />

      {/* ponto do "i" - efeito de ondas concêntricas */}
      {animated ? (
        // Versão animada - efeito completo de ondas
        <>
          {/* Círculo externo (onda mais externa) */}
          <circle
            cx={9}
            cy={3}
            r={2.5}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
            className="animate-wave-outer"
          />
          {/* Círculo médio (onda intermediária) */}
          <circle
            cx={9}
            cy={3}
            r={2.0}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
            className="animate-wave-middle"
          />
          {/* Círculo interno (onda próxima) */}
          <circle
            cx={9}
            cy={3}
            r={1.5}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
            className="animate-wave-inner"
          />
          {/* Círculo núcleo (centro sólido) */}
          <circle
            cx={9}
            cy={3}
            r={1.0}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
            className="animate-logo-glow"
          />
        </>
      ) : (
        // Versão estática - simples e contida
        <>
          {/* Onda muito sutil */}
          <circle
            cx={9}
            cy={3}
            r={1.3}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
            opacity={0.15}
          />
          {/* Núcleo vermelho fixo */}
          <circle
            cx={9}
            cy={3}
            r={1.0}
            fill={variant === "mono" ? "currentColor" : "#dc2626"}
          />
        </>
      )}
    </svg>
  );
};

/* Pequeno – viewBox de 16 × 16, simplificado                           */
export const MeetAIIcon: React.FC<LogoProps> = ({
  size = 16,
  variant = "default",
  className = "",
  animated = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MeetAI Icon"
  >
    <title>MeetAI Icon</title>
    <path
      d="
        M1.5 14 V4 H3.8 L6 8  8.2 4 H10.5
        L14 14 H11.5 L10.5 11 H7.5 V14 H5.5
        V8 L3.8 11 V14 Z
        M8.5 9 H9.5 L9 7.5 Z
      "
      fill="currentColor"
      fillRule="evenodd"
    />
    <circle
      cx={6}
      cy={2}
      r={1}
      fill={variant === "mono" ? "currentColor" : "#dc2626"}
      className={animated ? "animate-logo-glow" : ""}
    />
  </svg>
);

/* ------------------ ANIMAÇÃO CSS ------------------------------------

Para ativar a animação, use a prop `animated={true}` nos componentes.
A animação usa a classe padrão `animate-pulse` do Tailwind CSS.

------------------------------------------------------------------------- */

// Wordmark Version
export const MeetAIWordmark: React.FC<{
  className?: string;
  height?: number;
  variant?: Variant;
}> = ({ className = "", height = 32, variant = "default" }) => {
  const width = height * 3;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MeetAI"
    >
      <title>MeetAI</title>
      {/* Logo Mark */}
      <g transform="translate(0, 4)">
        <MeetAILogo size={24} variant={variant} />
      </g>

      {/* Text */}
      <text
        x="32"
        y="21"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill="currentColor"
      >
        MeetAi
      </text>
    </svg>
  );
};

// Logo Showcase
export const LogoShowcase = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">MeetAI Logo</h2>
        <p className="text-muted-foreground mb-8">M + AI integrated design</p>

        <div className="space-y-8">
          {/* Primary Display */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Primary Logo
            </h3>
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={80} />
                </div>
                <p className="text-xs text-muted-foreground">Default</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={80} variant="gradient" />
                </div>
                <p className="text-xs text-muted-foreground">Gradient</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={80} variant="mono" className="text-white" />
                </div>
                <p className="text-xs text-muted-foreground">Mono</p>
              </div>
            </div>
          </div>

          {/* Scale Test */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Scale Test
            </h3>
            <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <MeetAIIcon size={16} />
              <MeetAILogo size={20} />
              <MeetAILogo size={24} />
              <MeetAILogo size={32} />
              <MeetAILogo size={48} />
              <MeetAILogo size={64} />
            </div>
          </div>

          {/* Animated Version */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Com Animação
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={80} animated={true} />
                </div>
                <p className="text-xs text-muted-foreground">Logo Animada</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MeetAILogo
                    size={80}
                    animated={true}
                    variant="mono"
                    className="text-white"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Mono Animada</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>CSS necessário:</strong> Adicione as regras de
                animação no seu CSS global para ver o efeito do ponto pulsante.
              </p>
            </div>
          </div>

          {/* Wordmark */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Wordmark
            </h3>
            <div className="space-y-3">
              <div className="p-6 bg-white dark:bg-slate-900 border rounded-lg">
                <MeetAIWordmark height={32} />
              </div>
              <div className="p-6 bg-slate-900 rounded-lg">
                <MeetAIWordmark height={28} className="text-white" />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              In Use
            </h3>
            <div className="space-y-4">
              {/* Favicon */}
              <div className="flex items-center gap-3">
                <div className="p-2 border rounded">
                  <MeetAIIcon size={16} />
                </div>
                <span className="text-sm text-muted-foreground">
                  Favicon 16×16
                </span>
              </div>

              {/* Animated Favicon */}
              <div className="flex items-center gap-3">
                <div className="p-2 border rounded">
                  <MeetAIIcon size={16} animated={true} />
                </div>
                <span className="text-sm text-muted-foreground">
                  Favicon Animado 16×16
                </span>
              </div>

              {/* App Header */}
              <div className="p-4 bg-white dark:bg-slate-900 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MeetAILogo size={32} />
                  <div className="h-8 w-px bg-border" />
                  <span className="font-medium">Dashboard</span>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm bg-black text-white rounded-md"
                >
                  New Meeting
                </button>
              </div>
            </div>
          </div>

          {/* Design Notes */}
          <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="font-medium mb-3">Design System</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Baseado em grid 22×22 para máxima legibilidade</p>
              <p>• Ponto laranja distintivo para o &quot;i&quot;</p>
              <p>• Três variantes: default, gradient e mono</p>
              <p>• Escalável de 16px a 128px+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetAILogo;
