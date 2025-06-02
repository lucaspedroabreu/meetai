import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export const LandingFooter = () => (
  <footer className="relative z-10 pt-6 animate-fade-in animation-delay-200">
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/60">
        <Link
          href="/terms"
          className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
        >
          Termos de Serviço
        </Link>

        <span className="text-white/20">•</span>

        <Link
          href="/privacy"
          className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
        >
          Política de Privacidade
        </Link>

        <span className="text-white/20">•</span>

        <Link
          href="https://github.com/lucaspedroabreu/meetai"
          className="hover:text-white transition-colors duration-200 hover:underline underline-offset-4 flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  </footer>
);
