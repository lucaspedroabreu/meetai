/* MeetAI.tsx ------------------------------------------------------------- */
import type React from "react";
import { useId } from "react";

type Variant =
  | "default"
  | "mono"
  | "gradient"
  | "black"
  | "white"
  | "black-red"
  | "white-red";

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

/* ---------- HELPER FUNCTIONS ------------------------------------------ */
const getMainFill = (variant: Variant, gradientId: string): string => {
  switch (variant) {
    case "gradient":
      return `url(#${gradientId})`;
    case "black":
    case "black-red":
      return "#000000";
    case "white":
    case "white-red":
      return "#ffffff";
    case "mono":
    case "default":
    default:
      return "currentColor";
  }
};

const getDotFill = (variant: Variant): string => {
  switch (variant) {
    case "black":
      return "#000000";
    case "white":
      return "#ffffff";
    case "black-red":
    case "white-red":
    case "default":
      return "#dc2626"; // red-600
    case "mono":
      return "currentColor";
    case "gradient":
      return "#dc2626"; // red-600
    default:
      return "#dc2626";
  }
};

/* ---------- COMPONENTES ------------------------------------------------ */
export const MeetAILogo: React.FC<LogoProps> = ({
  size = 32,
  variant = "default",
  className = "",
  animated = false,
}) => {
  const gradientId = useId(); // evita collisions em múltiplas instâncias

  const mainFill = getMainFill(variant, gradientId);
  const dotFill = getDotFill(variant);

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
      <path d={MAIN_PATH} fill={mainFill} fillRule="evenodd" />

      {/* ponto do "i" - efeito de ondas concêntricas */}
      {animated ? (
        // Versão animada - efeito completo de ondas
        <>
          {/* Círculo externo (onda mais externa) */}
          <circle
            cx={9}
            cy={3}
            r={2.5}
            fill={dotFill}
            className="animate-wave-outer"
          />
          {/* Círculo médio (onda intermediária) */}
          <circle
            cx={9}
            cy={3}
            r={2.0}
            fill={dotFill}
            className="animate-wave-middle"
          />
          {/* Círculo interno (onda próxima) */}
          <circle
            cx={9}
            cy={3}
            r={1.5}
            fill={dotFill}
            className="animate-wave-inner"
          />
          {/* Círculo núcleo (centro sólido) */}
          <circle
            cx={9}
            cy={3}
            r={1.0}
            fill={dotFill}
            className="animate-logo-glow"
          />
        </>
      ) : (
        // Versão estática - simples e contida
        <>
          {/* Onda muito sutil */}
          <circle cx={9} cy={3} r={1.3} fill={dotFill} opacity={0.15} />
          {/* Núcleo fixo */}
          <circle cx={9} cy={3} r={1.0} fill={dotFill} />
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
}) => {
  const mainFill = getMainFill(variant, "");
  const dotFill = getDotFill(variant);

  return (
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
        fill={mainFill}
        fillRule="evenodd"
      />
      <circle
        cx={6}
        cy={2}
        r={1}
        fill={dotFill}
        className={animated ? "animate-logo-glow" : ""}
      />
    </svg>
  );
};

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
        fill={
          variant === "white" || variant === "white-red"
            ? "#ffffff"
            : variant === "black" || variant === "black-red"
            ? "#000000"
            : "currentColor"
        }
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
          {/* All Variants Display */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Todas as Variantes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Default */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="default" />
                </div>
                <p className="text-xs text-muted-foreground">Default</p>
                <p className="text-xs text-slate-500">currentColor + red dot</p>
              </div>

              {/* Black */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="black" />
                </div>
                <p className="text-xs text-muted-foreground">Black</p>
                <p className="text-xs text-slate-500">Totalmente preta</p>
              </div>

              {/* White */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="white" />
                </div>
                <p className="text-xs text-muted-foreground">White</p>
                <p className="text-xs text-slate-500">Totalmente branca</p>
              </div>

              {/* Black with Red Dot */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="black-red" />
                </div>
                <p className="text-xs text-muted-foreground">Black + Red</p>
                <p className="text-xs text-slate-500">
                  Preta com ponto vermelho
                </p>
              </div>

              {/* White with Red Dot */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="white-red" />
                </div>
                <p className="text-xs text-muted-foreground">White + Red</p>
                <p className="text-xs text-slate-500">
                  Branca com ponto vermelho
                </p>
              </div>

              {/* Gradient */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="gradient" />
                </div>
                <p className="text-xs text-muted-foreground">Gradient</p>
                <p className="text-xs text-slate-500">Gradiente + red dot</p>
              </div>

              {/* Mono */}
              <div className="text-center space-y-3">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="mono" className="text-white" />
                </div>
                <p className="text-xs text-muted-foreground">Mono</p>
                <p className="text-xs text-slate-500">
                  currentColor (flexível)
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Casos de Uso
            </h3>
            <div className="space-y-4">
              {/* Dark Sidebar */}
              <div className="p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MeetAILogo size={28} variant="white-red" />
                  <span className="text-white font-medium">Dashboard</span>
                </div>
                <p className="text-xs text-slate-400">
                  Sidebar escura - variant=&quot;white-red&quot;
                </p>
              </div>

              {/* Light Header */}
              <div className="p-4 bg-white border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MeetAILogo size={28} variant="black-red" />
                  <span className="text-black font-medium">MeetAI</span>
                </div>
                <p className="text-xs text-slate-600">
                  Header claro - variant=&quot;black-red&quot;
                </p>
              </div>

              {/* Monochrome Print */}
              <div className="p-4 bg-gray-100 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MeetAILogo size={28} variant="black" />
                  <span className="text-black font-medium">Documento</span>
                </div>
                <p className="text-xs text-slate-600">
                  Impressão monocromática - variant=&quot;black&quot;
                </p>
              </div>

              {/* Brand Colorful */}
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MeetAILogo size={28} variant="white" />
                  <span className="text-white font-medium">Landing Page</span>
                </div>
                <p className="text-xs text-purple-100">
                  Fundo colorido - variant=&quot;white&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Animated Versions */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Versões Animadas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="default" animated={true} />
                </div>
                <p className="text-xs text-muted-foreground">Default Animada</p>
              </div>

              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="white-red" animated={true} />
                </div>
                <p className="text-xs text-muted-foreground">
                  White-Red Animada
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <MeetAILogo size={64} variant="black-red" animated={true} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Black-Red Animada
                </p>
              </div>
            </div>
          </div>

          {/* Scale Test */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Teste de Escala
            </h3>
            <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <MeetAIIcon size={16} variant="black-red" />
              <MeetAILogo size={20} variant="black-red" />
              <MeetAILogo size={24} variant="black-red" />
              <MeetAILogo size={32} variant="black-red" />
              <MeetAILogo size={48} variant="black-red" />
              <MeetAILogo size={64} variant="black-red" />
            </div>
          </div>

          {/* Wordmark */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Wordmark
            </h3>
            <div className="space-y-3">
              <div className="p-6 bg-white dark:bg-slate-900 border rounded-lg">
                <MeetAIWordmark height={32} variant="black-red" />
              </div>
              <div className="p-6 bg-slate-900 rounded-lg">
                <MeetAIWordmark
                  height={28}
                  variant="white-red"
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Design Guidelines */}
          <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-medium mb-3">Guia de Uso das Variantes</h3>
            <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>default:</strong> Herda cor do parent + ponto
                    vermelho
                  </p>
                  <p>
                    <strong>mono:</strong> Completamente flexível (currentColor)
                  </p>
                  <p>
                    <strong>gradient:</strong> Gradiente próprio + ponto
                    vermelho
                  </p>
                </div>
                <div>
                  <p>
                    <strong>black/white:</strong> Monocromáticas totais
                  </p>
                  <p>
                    <strong>black-red/white-red:</strong> Com destaque no ponto
                  </p>
                  <p>
                    <strong>animated:</strong> Adiciona efeito pulsante no ponto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetAILogo;
