import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
      {/* Purple background decoration similar to WelcomeScreen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 via-violet-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 via-purple-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl" />

        {/* Starfield effect */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-white/40 rounded-full" />
        <div className="absolute top-32 right-32 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-40 left-40 w-1 h-1 bg-white/50 rounded-full" />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/20 rounded-full" />
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 rounded-xl p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative z-10">
        {/* Subtle background pattern for right side */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/15 rounded-full blur-lg" />
        </div>

        <div className="relative text-center space-y-8 max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20">
          <div className="flex justify-center items-end gap-4">
            <AnimatedMeetAiText />
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium text-white">
              Conecte-se com a próxima geração de inteligência artificial
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              Descubra o poder da IA para transformar sua produtividade e
              comunicação. Tecnologia avançada, segura e inteligente.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div className="text-left">
                <span className="text-sm font-medium text-white">
                  Interface intuitiva e moderna
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
              <div className="text-left">
                <span className="text-sm font-medium text-white">
                  IA de última geração integrada
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
              <div className="text-left">
                <span className="text-sm font-medium text-white">
                  Análises em tempo real e insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
