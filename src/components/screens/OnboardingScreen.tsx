"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MeetAILogo } from "@/components/features/brand";
import { SuccessIcon } from "@/components/custom/icons";
import { useRouter } from "next/navigation";

interface OnboardingScreenProps {
  userEmail: string;
  userName?: string;
}

export default function OnboardingScreen({
  userEmail,
  userName,
}: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const steps = [
    {
      title: "Bem-vindo ao MeetAI! 🎉",
      subtitle: `Olá${
        userName ? `, ${userName}` : ""
      }! Sua conta foi criada com sucesso.`,
      content: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 success-message rounded-full flex items-center justify-center">
              <SuccessIcon size={40} />
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              Você agora faz parte da próxima geração de videoconferências com
              IA.
            </p>
            <div className="glass-card rounded-lg p-4">
              <p className="text-sm font-medium text-brand-primary">
                ✨ Conta criada: {userEmail}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Recursos Poderosos ⚡",
      subtitle: "Descubra o que você pode fazer com o MeetAI",
      content: (
        <div className="grid gap-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
              🤖
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">IA em Tempo Real</h4>
              <p className="text-sm text-blue-700">
                Transcrições instantâneas e resumos automáticos das suas
                reuniões
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 success-message rounded-lg border">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
              🔒
            </div>
            <div>
              <h4 className="font-semibold text-green-900">
                Privacidade Total
              </h4>
              <p className="text-sm text-green-700">
                Seus dados são criptografados e nunca compartilhados
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 glass-card rounded-lg border border-purple-200">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
              📊
            </div>
            <div>
              <h4 className="font-semibold text-purple-900">
                Insights Inteligentes
              </h4>
              <p className="text-sm text-purple-700">
                Análises automáticas e sugestões baseadas em IA
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tudo Pronto! 🚀",
      subtitle: "Sua jornada com IA começa agora",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Você está pronto para começar a usar o MeetAI!
              </p>
              <div className="glass-card rounded-lg p-4 border border-purple-200">
                <p className="text-sm font-medium">
                  💡 <strong>Dica:</strong> Explore o dashboard para descobrir
                  todas as funcionalidades disponíveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    // Aqui você pode fazer uma chamada para marcar o onboarding como completo
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleSkip = async () => {
    setIsCompleting(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="shadow-auth glass-card border border-white/20">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <MeetAILogo animated size={60} variant="gradient" />
            </div>
            <CardTitle className="text-xl font-bold text-white">
              {steps[currentStep].title}
            </CardTitle>
            <p className="text-sm text-white/80">
              {steps[currentStep].subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-brand-primary scale-110"
                      : "bg-white/30 scale-90"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="min-h-[300px] flex items-center">
              {steps[currentStep].content}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isCompleting}
                  className="flex-1 bg-white/10 border-white/20 text-white hover-purple"
                >
                  Voltar
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={isCompleting}
                className={`flex-1 ${
                  currentStep === steps.length - 1
                    ? "bg-brand-gradient hover:bg-brand-gradient-hover"
                    : "bg-brand-gradient hover:bg-brand-gradient-hover"
                }`}
              >
                {isCompleting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    Finalizando...
                  </div>
                ) : currentStep === steps.length - 1 ? (
                  "🚀 Começar a usar"
                ) : (
                  "Próximo"
                )}
              </Button>
            </div>

            {/* Skip option */}
            {currentStep < steps.length - 1 && (
              <div className="text-center">
                <button
                  onClick={handleSkip}
                  disabled={isCompleting}
                  className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4"
                >
                  Pular tutorial
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
