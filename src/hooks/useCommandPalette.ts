"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

// Estado global para controlar se a hidratação já foi completada uma vez
const globalState = {
  hydrationComplete: false,
  detectedOS: null as string | null,
  isInitialized: false,
};

// Função para detectar o OS e retornar o ícone correto
function getOSKeyIcon() {
  if (typeof window === "undefined") return "⌘"; // SSR fallback

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  return isMac ? "⌘" : "Ctrl";
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  // IMPORTANTE: Sempre iniciar com "⌘" para ser idêntico ao SSR
  const [osKeyIcon, setOsKeyIcon] = useState<string>("⌘");
  const [isDetected, setIsDetected] = useState(false);

  // Callback memoizado para toggle
  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Detectar OS apenas no cliente, após hidratação
  useEffect(() => {
    if (!globalState.isInitialized) {
      const detected = getOSKeyIcon();
      globalState.detectedOS = detected;
      globalState.isInitialized = true;
      globalState.hydrationComplete = true;

      // Só atualizar se realmente diferente do padrão
      if (detected !== "⌘") {
        setOsKeyIcon(detected);
      }
      setIsDetected(true);
    }
  }, []); // Array vazio - executa apenas uma vez

  // Atalho de teclado Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleOpen]);

  // Memoização dos valores retornados para estabilidade
  const returnValues = useMemo(
    () => ({
      open,
      setOpen,
      osKeyIcon,
      isDetected,
      isGloballyHydrated: globalState.hydrationComplete,
    }),
    [open, osKeyIcon, isDetected]
  );

  return returnValues;
}
