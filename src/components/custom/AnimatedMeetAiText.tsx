import type React from "react";

interface AnimatedMeetAiTextProps {
  animated?: boolean;
  showDot?: boolean;
  className?: string;
}

const AnimatedMeetAiText: React.FC<AnimatedMeetAiTextProps> = ({
  animated = true,
  showDot = true,
  className = "text-gray-900 text-5xl font-bold",
}) => {
  return (
    <span className={`relative ${className}`}>
      Meet<span className="text-red-500">.</span>A
      <span className="relative">
        i
        {showDot && (
          <>
            {/* Círculo opaco para cobrir o ponto preto original - sempre presente */}
            <span className="absolute top-5 left-1/2 transform -translate-x-1/2">
              <span className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
            </span>
            {animated ? (
              // Versão animada - efeito completo de ondas
              <span className="absolute top-5 left-1/2 transform -translate-x-1/2">
                {/* Onda externa */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 rounded-full animate-text-wave-outer" />
                {/* Onda média */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full animate-text-wave-middle" />
                {/* Onda interna */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full animate-text-wave-inner" />
                {/* Núcleo */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full animate-text-glow" />
              </span>
            ) : (
              // Versão estática - simples e contida
              <span className="absolute top-5 left-1/2 transform -translate-x-1/2">
                {/* Onda muito sutil */}
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"
                  style={{ opacity: 0.15 }}
                />
                {/* Núcleo vermelho fixo */}
                <span className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full" />
              </span>
            )}
          </>
        )}
      </span>
    </span>
  );
};

export default AnimatedMeetAiText;
