"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { MeetAIIcon } from "./Logo";

export function PWAInstallBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { canInstall, isStandalone, installApp } = usePWA();

  // Não mostrar se não pode instalar ou já está instalado
  if (!canInstall || isStandalone || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Safely store dismissal preference
    try {
      sessionStorage.setItem("pwa-banner-dismissed", "true");
    } catch (error) {
      console.warn("Could not save banner dismissal state:", error);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4">
        <div className="flex items-start gap-3">
          {/* Ícone */}
          <div className="flex-shrink-0">
            <MeetAIIcon size={40} animated />
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Instalar MeetAI
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Acesse rapidamente e use offline. Instale nossa app em seu
              dispositivo!
            </p>

            {/* Botões */}
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="h-8 px-3 text-xs"
              >
                Instalar
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs text-gray-500"
              >
                Agora não
              </Button>
            </div>
          </div>

          {/* Botão fechar */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <title>Fechar</title>
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
