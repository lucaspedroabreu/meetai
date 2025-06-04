"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

interface AgentsErrorBoundaryProps {
  children: React.ReactNode;
}

const AgentsErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-background via-background to-muted/5">
      <div className="w-full p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              Erro ao Carregar Agentes
            </h2>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Não foi possível carregar seus agentes IA. Verifique sua conexão
              com a internet e tente novamente.
            </p>

            <details className="text-left bg-muted/20 rounded-lg p-4 mb-6 text-sm">
              <summary className="cursor-pointer font-medium mb-2">
                Detalhes técnicos
              </summary>
              <code className="text-destructive">{error.message}</code>
            </details>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetErrorBoundary}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/meetings")}
              >
                Voltar para a página inicial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentsErrorBoundary = ({ children }: AgentsErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("AgentsErrorBoundary caught an error:", error, errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={AgentsErrorFallback}
      onError={handleError}
      onReset={() => {}}
    >
      {children}
    </ErrorBoundary>
  );
};
