"use client";

import { AlertTriangle, Wifi, Shield, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  error,
  onRetry,
  className = "",
}: ErrorMessageProps) {
  // Categoriza o erro para escolher o ícone e ações apropriadas
  const getErrorInfo = (errorText: string) => {
    const lowerError = errorText.toLowerCase();

    // Erros de domínio/CORS
    if (
      lowerError.includes("domínio") ||
      lowerError.includes("origem") ||
      lowerError.includes("cors")
    ) {
      return {
        icon: <Shield className="h-4 w-4" />,
        category: "domain",
        actionText: "Verificar URL",
        showRetry: false,
      };
    }

    // Erros de rede/conectividade
    if (
      lowerError.includes("conexão") ||
      lowerError.includes("rede") ||
      lowerError.includes("timeout")
    ) {
      return {
        icon: <Wifi className="h-4 w-4" />,
        category: "network",
        actionText: "Tentar novamente",
        showRetry: true,
      };
    }

    // Erros de configuração
    if (
      lowerError.includes("configuração") ||
      lowerError.includes("provedor")
    ) {
      return {
        icon: <Settings className="h-4 w-4" />,
        category: "config",
        actionText: "Contatar suporte",
        showRetry: false,
      };
    }

    // Erros de autenticação gerais
    if (
      lowerError.includes("credenciais") ||
      lowerError.includes("senha") ||
      lowerError.includes("email")
    ) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        category: "auth",
        actionText: "Tentar novamente",
        showRetry: true,
      };
    }

    // Erro padrão
    return {
      icon: <AlertTriangle className="h-4 w-4" />,
      category: "general",
      actionText: "Tentar novamente",
      showRetry: true,
    };
  };

  const errorInfo = getErrorInfo(error);

  const handleAction = () => {
    if (errorInfo.category === "domain") {
      // Para erros de domínio, mostra informações sobre URLs corretas
      window.open("https://www.meetai.com.br", "_blank");
    } else if (errorInfo.category === "config") {
      // Para erros de configuração, poderia abrir um sistema de suporte
      console.log("Contatar suporte para erro de configuração");
    } else if (onRetry) {
      onRetry();
    }
  };

  return (
    <div
      className={`border rounded-md p-3 bg-red-50 border-red-200 ${className}`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5 text-red-600">
          {errorInfo.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-900">{error}</p>

          {/* Dicas específicas baseadas no tipo de erro */}
          {errorInfo.category === "domain" && (
            <div className="mt-2 text-xs text-red-700">
              <p>
                <strong>Dica:</strong> Acesse sempre pelo endereço oficial:{" "}
                <span className="font-mono bg-red-100 px-1 rounded">
                  www.meetai.com.br
                </span>
              </p>
            </div>
          )}

          {errorInfo.category === "network" && (
            <div className="mt-2 text-xs text-red-700">
              <p>
                <strong>Dica:</strong> Verifique sua conexão com a internet e
                tente novamente.
              </p>
            </div>
          )}

          {(errorInfo.showRetry || errorInfo.category === "domain") && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAction}
                className="h-7 text-xs bg-white border-red-300 text-red-700 hover:bg-red-50"
              >
                {errorInfo.category === "network" && (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                {errorInfo.actionText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
