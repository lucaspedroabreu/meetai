"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";
import Link from "next/link";
import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Vinheta para mobile - gradiente diagonal */}
      {/* <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-tl from-teal-400/10 via-cyan-500/10 to-blue-600/10"></div> */}

      {/* Vinheta para desktop - gradiente radial */}
      {/* <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(
            ellipse at center,
            rgba(45, 212, 191, 0.03) 40%,
            rgba(34, 211, 238, 0.10) 55%,
            rgba(37, 99, 235, 0.20) 70%,
            rgba(29, 78, 216, 0.35) 85%,
            rgba(20, 184, 166, 0.55) 100%
          )`,
        }}
      ></div> */}

      {/* Background decoration original mantido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center justify-center p-6 lg:p-10 min-h-screen">
        <div className="text-center space-y-10 max-w-4xl">
          {/* Hero Section */}
          <div className="space-y-7">
            <div className="flex justify-center relative">
              <span className="border-gray-600 bg-gray-200 border-2 rounded-lg p-2">
                <MeetAILogo size={130} variant="gradient" />
              </span>
            </div>

            <div className="space-y-4">
              <AnimatedMeetAiText />
              <div className="space-y-3">
                <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                  Conecte-se com a próxima geração de inteligência artificial
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Transforme suas videoconferências com IA avançada • Powered by
                  OpenAI
                </p>
              </div>
            </div>
          </div>

          {/* Not logged in state */}
          <div className="grid gap-9 grid-rows-[auto_auto_auto_auto] md:grid-rows-[auto_auto_auto]">
            {/* CTA Section - Primeiro no mobile (row 1), segundo no desktop (row 2) */}
            <div className="row-start-1 md:row-start-2 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Transforme suas reuniões
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubra o poder da IA integrada em videoconferência.
                  Transcrições inteligentes, resumos automáticos e insights em
                  tempo real.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg transform hover:scale-105 transition-all duration-200 touch-manipulation"
                >
                  <Link href="/sign-up">✨ Começar Gratuitamente</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-medium bg-background/50 backdrop-blur-sm hover:bg-background/80 border-2 border-border hover:border-primary/20 transition-all duration-200 touch-manipulation"
                >
                  <Link href="/sign-in">Fazer Login</Link>
                </Button>
              </div>
            </div>

            {/* Divisor visual - Apenas no mobile (row 2) */}
            <div className="row-start-2 md:hidden">
              <div className="flex items-center justify-center py-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                <div className="px-4">
                  <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </div>
            </div>

            {/* Features Grid - Terceiro no mobile (row 3), primeiro no desktop (row 1) */}
            <div className="row-start-3 md:row-start-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-500/10">
                  🤖
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-foreground">
                    IA Avançada
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                    Processamento de linguagem natural em tempo real com modelos
                    de última geração
                  </p>
                </div>
              </div>

              <div className="group flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-500/10">
                  🔒
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-foreground">
                    Segurança Total
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                    Seus dados protegidos com criptografia de ponta e
                    conformidade empresarial
                  </p>
                </div>
              </div>

              <div className="group flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-500/10">
                  ⚡
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-foreground">
                    Super Inteligente
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                    Insights automáticos, análises preditivas e resumos
                    instantâneos
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="row-start-4 md:row-start-3 pt-5 border-t border-border/30">
              <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Termos de Serviço
                </Link>
                <span className="text-muted-foreground/50">•</span>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  Política de Privacidade
                </Link>
                <span className="text-muted-foreground/50">•</span>
                <Link
                  href="https://github.com/lucaspedroabreu/meetai"
                  className="hover:text-foreground transition-colors hover:underline underline-offset-4 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
