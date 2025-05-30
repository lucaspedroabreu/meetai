"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAState {
  isSupported: boolean;
  isInstalled: boolean;
  isStandalone: boolean;
  canInstall: boolean;
  isOnline: boolean;
}

interface PWAActions {
  installApp: () => Promise<boolean>;
  clearCache: () => Promise<boolean>;
}

export function usePWA(): PWAState & PWAActions {
  const [pwaState, setPwaState] = useState<PWAState>({
    isSupported: false,
    isInstalled: false,
    isStandalone: false,
    canInstall: false,
    isOnline: true,
  });

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Verificar suporte a PWA
    const isSupported = "serviceWorker" in navigator && "PushManager" in window;

    // Verificar se está rodando como PWA instalada
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorWithStandalone).standalone === true;

    // Status de rede
    const isOnline = navigator.onLine;

    setPwaState((prev) => ({
      ...prev,
      isSupported,
      isStandalone,
      isOnline,
    }));

    // Registrar Service Worker
    if (isSupported) {
      registerServiceWorker();
    }

    // Escutar evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setPwaState((prev) => ({ ...prev, canInstall: true }));
    };

    // Escutar mudanças de conectividade
    const handleOnline = () =>
      setPwaState((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () =>
      setPwaState((prev) => ({ ...prev, isOnline: false }));

    // Escutar instalação da PWA
    const handleAppInstalled = () => {
      setPwaState((prev) => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
      }));
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registrado:", registration);

      // Verificar se há atualizações
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Nova versão disponível
              console.log("🔄 Nova versão da PWA disponível");
            }
          });
        }
      });
    } catch (error) {
      console.error("❌ Erro ao registrar Service Worker:", error);
    }
  };

  const installApp = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setPwaState((prev) => ({
          ...prev,
          isInstalled: true,
          canInstall: false,
        }));
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Erro ao instalar PWA:", error);
      return false;
    }
  };

  const clearCache = async (): Promise<boolean> => {
    if (!pwaState.isSupported) return false;

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      console.log("🗑️ Cache limpo com sucesso");
      return true;
    } catch (error) {
      console.error("❌ Erro ao limpar cache:", error);
      return false;
    }
  };

  return {
    ...pwaState,
    installApp,
    clearCache,
  };
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}
