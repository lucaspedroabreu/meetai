import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedMeetAiTextProps {
  // Text color
  textColor?: "white" | "black" | "gray-900" | "inherit";

  // Dots color (applies to both middle dot and i dot)
  dotsColor?: "red" | "white" | "black" | "gray-400" | "inherit";

  // i dot customization
  showIDot?: boolean;
  iDotAnimated?: boolean;

  // Size variants
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "responsive";

  // Additional styling
  className?: string;
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
}

// Precise positioning map for i dot based on font size
const sizeConfigs = {
  xs: {
    fontSize: "text-xl",
    responsiveSize: "text-xl md:text-2xl",
    dotTop: "top-[0.5rem]",
    dotScale: 0.6,
    coverSize: "w-1 h-1",
    waveOuter: "w-2 h-2",
    waveMiddle: "w-1.5 h-1.5",
    waveInner: "w-1 h-1",
    waveCore: "w-0.5 h-0.5",
  },
  sm: {
    fontSize: "text-2xl",
    responsiveSize: "text-2xl md:text-3xl",
    dotTop: "top-[0.65rem]",
    dotScale: 0.7,
    coverSize: "w-1.5 h-1.5",
    waveOuter: "w-2.5 h-2.5",
    waveMiddle: "w-2 h-2",
    waveInner: "w-1.5 h-1.5",
    waveCore: "w-1 h-1",
  },
  md: {
    fontSize: "text-3xl",
    responsiveSize: "text-3xl md:text-4xl",
    dotTop: "top-[0.85rem]",
    dotScale: 0.8,
    coverSize: "w-2 h-2",
    waveOuter: "w-3.5 h-3.5",
    waveMiddle: "w-3 h-3",
    waveInner: "w-2.5 h-2.5",
    waveCore: "w-2 h-2",
  },
  lg: {
    fontSize: "text-4xl",
    responsiveSize: "text-4xl md:text-5xl",
    dotTop: "top-[1.05rem]",
    dotScale: 0.9,
    coverSize: "w-2.5 h-2.5",
    waveOuter: "w-4 h-4",
    waveMiddle: "w-3.5 h-3.5",
    waveInner: "w-3 h-3",
    waveCore: "w-2.5 h-2.5",
  },
  xl: {
    fontSize: "text-5xl",
    responsiveSize: "text-5xl md:text-6xl",
    dotTop: "top-5",
    dotScale: 1,
    coverSize: "w-3 h-3",
    waveOuter: "w-5 h-5",
    waveMiddle: "w-4 h-4",
    waveInner: "w-3 h-3",
    waveCore: "w-2.5 h-2.5",
  },
  "2xl": {
    fontSize: "text-6xl",
    responsiveSize: "text-6xl md:text-7xl",
    dotTop: "top-6",
    dotScale: 1.2,
    coverSize: "w-4 h-4",
    waveOuter: "w-6 h-6",
    waveMiddle: "w-5 h-5",
    waveInner: "w-4 h-4",
    waveCore: "w-3 h-3",
  },
  "3xl": {
    fontSize: "text-7xl",
    responsiveSize: "text-7xl md:text-8xl",
    dotTop: "top-7",
    dotScale: 1.4,
    coverSize: "w-5 h-5",
    waveOuter: "w-7 h-7",
    waveMiddle: "w-6 h-6",
    waveInner: "w-5 h-5",
    waveCore: "w-4 h-4",
  },
  responsive: {
    fontSize: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
    responsiveSize: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
    dotTop: "top-[0.85rem] sm:top-[1.05rem] md:top-5 lg:top-6 xl:top-7",
    dotScale: 1,
    coverSize:
      "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5",
    waveOuter:
      "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7",
    waveMiddle:
      "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6",
    waveInner:
      "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5",
    waveCore:
      "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4",
  },
};

// Color mappings
const textColors = {
  white: "text-white",
  black: "text-black",
  "gray-900": "text-gray-900",
  inherit: "",
};

const dotColors = {
  red: "text-red-500",
  white: "text-white",
  black: "text-black",
  "gray-400": "text-gray-400",
  inherit: "",
};

const bgColors = {
  red: "bg-red-600",
  white: "bg-white",
  black: "bg-black",
  "gray-400": "bg-gray-400",
  inherit: "bg-current",
};

const fontWeights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const AnimatedMeetAiText: React.FC<AnimatedMeetAiTextProps> = ({
  textColor = "inherit",
  dotsColor = "red",
  showIDot = true,
  iDotAnimated = true,
  size = "xl",
  fontWeight = "bold",
  className,
}) => {
  const config = sizeConfigs[size];
  const baseTextColor = textColors[textColor];
  const baseDotColor = dotColors[dotsColor];
  const dotBgColor = bgColors[dotsColor];
  const baseFontWeight = fontWeights[fontWeight];

  // Determine cover background based on text color
  const coverBg = textColor === "white" ? "bg-gray-900" : "bg-white";

  return (
    <span
      className={cn(
        "relative inline-block",
        config.fontSize,
        baseTextColor,
        baseFontWeight,
        className
      )}
    >
      Meet
      <span className={baseDotColor}>.</span>A
      <span className="relative">
        i
        {showIDot && (
          <>
            {/* Cover for original i dot - always present when showIDot is true */}
            <span
              className={cn(
                "absolute left-1/2 transform -translate-x-1/2",
                config.dotTop
              )}
            >
              <span
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                  config.coverSize,
                  coverBg
                )}
              />
            </span>

            {iDotAnimated ? (
              // Animated version with wave effects
              <span
                className={cn(
                  "absolute left-1/2 transform -translate-x-1/2",
                  config.dotTop
                )}
              >
                {/* Outer wave */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-text-wave-outer",
                    config.waveOuter,
                    dotBgColor
                  )}
                />
                {/* Middle wave */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-text-wave-middle",
                    config.waveMiddle,
                    dotBgColor
                  )}
                />
                {/* Inner wave */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-text-wave-inner",
                    config.waveInner,
                    dotBgColor
                  )}
                />
                {/* Core dot */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-text-glow",
                    config.waveCore,
                    dotBgColor
                  )}
                />
              </span>
            ) : (
              // Static version
              <span
                className={cn(
                  "absolute left-1/2 transform -translate-x-1/2",
                  config.dotTop
                )}
              >
                {/* Subtle outer glow */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                    config.waveInner,
                    dotBgColor
                  )}
                  style={{ opacity: 0.15 }}
                />
                {/* Core dot */}
                <span
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                    config.waveCore,
                    dotBgColor
                  )}
                />
              </span>
            )}
          </>
        )}
      </span>
    </span>
  );
};

// CSS animations (add to your global CSS or Tailwind config)
const animationStyles = `
@keyframes text-wave-outer {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes text-wave-middle {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes text-wave-inner {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
  50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes text-glow {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

.animate-text-wave-outer {
  animation: text-wave-outer 3s ease-in-out infinite;
}

.animate-text-wave-middle {
  animation: text-wave-middle 3s ease-in-out infinite;
  animation-delay: 0.1s;
}

.animate-text-wave-inner {
  animation: text-wave-inner 3s ease-in-out infinite;
  animation-delay: 0.2s;
}

.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
  animation-delay: 0.3s;
}
`;

// Example usage showcase
const _ExampleShowcase = () => {
  return (
    <div className="space-y-8 p-8 bg-gray-100">
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Variants:</h3>
        <div className="space-y-2">
          <div>
            <AnimatedMeetAiText size="xs" />
          </div>
          <div>
            <AnimatedMeetAiText size="sm" />
          </div>
          <div>
            <AnimatedMeetAiText size="md" />
          </div>
          <div>
            <AnimatedMeetAiText size="lg" />
          </div>
          <div>
            <AnimatedMeetAiText size="xl" />
          </div>
          <div>
            <AnimatedMeetAiText size="2xl" />
          </div>
          <div>
            <AnimatedMeetAiText size="3xl" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Combinations:</h3>
        <div className="space-y-2 bg-slate-800 p-4 rounded">
          <div>
            <AnimatedMeetAiText textColor="white" dotsColor="red" size="lg" />
            <span className="ml-4 text-white/60 text-sm">
              White text, red dots
            </span>
          </div>
          <div>
            <AnimatedMeetAiText textColor="white" dotsColor="white" size="lg" />
            <span className="ml-4 text-white/60 text-sm">All white</span>
          </div>
          <div>
            <AnimatedMeetAiText
              textColor="white"
              dotsColor="gray-400"
              size="lg"
            />
            <span className="ml-4 text-white/60 text-sm">
              White text, gray dots
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">i Dot Control:</h3>
        <div className="space-y-2">
          <div>
            <AnimatedMeetAiText showIDot={true} iDotAnimated={true} size="lg" />
            <span className="ml-4 text-sm text-gray-600">
              With animated i dot
            </span>
          </div>
          <div>
            <AnimatedMeetAiText
              showIDot={true}
              iDotAnimated={false}
              size="lg"
            />
            <span className="ml-4 text-sm text-gray-600">
              With static i dot
            </span>
          </div>
          <div>
            <AnimatedMeetAiText showIDot={false} size="lg" />
            <span className="ml-4 text-sm text-gray-600">Without i dot</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-gray-900 p-4 rounded">
        <h3 className="text-lg font-semibold text-white">Real Use Cases:</h3>
        <div className="space-y-4">
          <div>
            <AnimatedMeetAiText
              size="sm"
              textColor="white"
              dotsColor="gray-400"
              showIDot={false}
              className="tracking-tight"
            />
            <span className="ml-4 text-white/40 text-xs">Dashboard header</span>
          </div>
          <div>
            <AnimatedMeetAiText
              size="responsive"
              textColor="white"
              dotsColor="red"
              className="drop-shadow-2xl"
            />
            <span className="ml-4 text-white/40 text-xs">Landing hero</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMeetAiText;
