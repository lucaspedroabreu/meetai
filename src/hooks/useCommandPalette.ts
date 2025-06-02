"use client";

import { useState, useEffect } from "react";

// Função para detectar o OS e retornar o ícone correto
function getOSKeyIcon() {
  if (typeof window === "undefined") return "⌘"; // SSR fallback

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  return isMac ? "⌘" : "Ctrl";
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [osKeyIcon, setOsKeyIcon] = useState("⌘");

  // Detecta o OS após o mount
  useEffect(() => {
    setOsKeyIcon(getOSKeyIcon());
  }, []);

  // Atalho de teclado Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    open,
    setOpen,
    osKeyIcon,
  };
}
