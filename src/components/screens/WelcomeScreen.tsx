"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MeetAILogo } from "@/components/custom/Logo";
import { SuccessIcon } from "@/components/custom/icons";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface WelcomeScreenProps {
  userEmail: string;
  userName?: string;
}

export default function WelcomeScreen({
  userEmail,
  userName,
}: WelcomeScreenProps) {
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <SuccessIcon size={40} />
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              Você agora faz parte da próxima geração de videoconferências com
              IA.
            </p>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <p className="text-sm font-medium text-primary">
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

          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
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

          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Você está pronto para começar a usar o MeetAI!
              </p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/5 via-secondary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="shadow-2xl border border-gray-200 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <MeetAILogo animated size={60} variant="gradient" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              {steps[currentStep].title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
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
                      ? "bg-primary scale-110"
                      : "bg-muted scale-90"
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
                  className="flex-1"
                >
                  Voltar
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={isCompleting}
                className={`flex-1 ${
                  currentStep === steps.length - 1
                    ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
                    : ""
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
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
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
