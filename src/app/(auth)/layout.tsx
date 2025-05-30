import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form with AI gradient */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 relative overflow-hidden">
        {/* AI-inspired background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full blur-2xl" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white rounded-full blur-xl" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white rounded-full blur-2xl" />
        </div>

        {/* Geometric patterns for AI theme */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-1 h-20 bg-white transform rotate-45" />
          <div className="absolute top-10 left-10 w-20 h-1 bg-white transform rotate-45" />
          <div className="absolute bottom-20 right-20 w-1 h-16 bg-white transform -rotate-45" />
          <div className="absolute bottom-20 right-20 w-16 h-1 bg-white transform -rotate-45" />
        </div>

        <div className="w-full max-w-md relative z-10">{children}</div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 bg-white items-center justify-center p-8 relative overflow-hidden border-l border-gray-200">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative text-center space-y-8 max-w-md">
          <div className="flex justify-center items-end gap-4">
            <AnimatedMeetAiText />
          </div>
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-800">
              Conecte-se com a próxima geração de inteligência artificial
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Descubra o poder da IA para transformar sua produtividade e
              comunicação. Tecnologia avançada, segura e inteligente.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Interface intuitiva e moderna</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>IA de última geração integrada</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Análises em tempo real e insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
