import { MeetAILogo } from "@/components/custom/Logo";
import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";

export const HeroSection = () => (
  <div className="relative z-10 text-center space-y-6 animate-fade-in">
    {/* Logo with glow effect */}
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/50 to-indigo-500/50 blur-3xl" />
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 shadow-2xl">
        <MeetAILogo
          size={100}
          variant="mono"
          className="text-white drop-shadow-2xl"
        />
      </div>
    </div>

    {/* Animated text */}
    <div className="space-y-3">
      <div className="flex justify-center items-end gap-4">
        <AnimatedMeetAiText
          iDotAnimated
          dotsColor="black"
          showIDot={true}
          size="responsive"
        />
      </div>

      <h2 className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200 max-w-3xl mx-auto leading-relaxed">
        Conecte-se com a próxima geração de inteligência artificial
      </h2>

      <p className="text-lg text-white/60 max-w-2xl mx-auto">
        Transforme suas videoconferências com IA avançada • Powered by OpenAI
      </p>
    </div>
  </div>
);
