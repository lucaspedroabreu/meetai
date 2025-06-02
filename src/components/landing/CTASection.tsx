import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => (
  <div className="relative z-10 space-y-6 mb-2 animate-fade-in-up animation-delay-100">
    <div className="text-center space-y-2">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Transforme suas reuniões
      </h2>
      <p className="text-lg text-white/70 max-w-2xl mx-auto">
        Descubra o poder da IA integrada em videoconferência. Transcrições
        inteligentes, resumos automáticos e insights em tempo real.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Primary CTA */}
      <Link href="/sign-up" className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg group-hover:blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
        <Button
          size="lg"
          className="relative h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-2xl group-hover:scale-105 transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Começar Gratuitamente
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>

      {/* Secondary CTA */}
      <Link href="/sign-in">
        <Button
          variant="outline"
          size="lg"
          className="h-12 px-8 bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-white/30 text-white hover:scale-105 transition-all duration-300"
        >
          Fazer Login
        </Button>
      </Link>
    </div>
  </div>
);
