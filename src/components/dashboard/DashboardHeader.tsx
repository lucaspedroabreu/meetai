"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { DashboardCommandPalette } from "./DashboardCommandPalette";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  title?: string;
}

// Componente customizado do menu mobile com micro-animações
const MobileSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden h-11 w-11 text-muted-foreground hover:text-foreground hover:bg-violet-500/10 transition-all duration-200 active:scale-95"
      onClick={toggleSidebar}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <Menu
        className={`h-5 w-5 transition-transform duration-200 ${
          isPressed ? "scale-90" : "scale-100"
        }`}
      />
      <span className="sr-only">Abrir menu</span>
    </Button>
  );
};

// Componente search button mobile (apenas ícone)
const MobileSearchButton = ({ onClick }: { onClick: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden h-11 w-11 text-muted-foreground hover:text-foreground hover:bg-violet-500/10 transition-all duration-200 active:scale-95"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <SearchIcon
        className={`h-5 w-5 transition-transform duration-200 ${
          isPressed ? "scale-90" : "scale-100"
        }`}
      />
      <span className="sr-only">Pesquisar</span>
    </Button>
  );
};

export default function DashboardHeader({
  title = "Dashboard",
}: DashboardHeaderProps) {
  const {
    open,
    setOpen: setCommandPaletteOpen,
    osKeyIcon,
  } = useCommandPalette();
  const isMobile = useIsMobile();

  return (
    <>
      <header
        className={`
        sticky top-0 z-40 flex shrink-0 items-center 
        border-b border-border/30 bg-background/85 backdrop-blur-xl 
        supports-[backdrop-filter]:bg-background/70 
        transition-all duration-300
        ${
          isMobile
            ? "h-14 px-3 pt-safe-top justify-between" // Mobile: space-between para separar os lados
            : "h-16 px-4 gap-2" // Desktop: gap normal
        }
      `}
      >
        {/* Desktop: Layout tradicional */}
        {!isMobile && (
          <>
            {/* Sidebar trigger à esquerda */}
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-violet-500/10 transition-colors" />

            {/* Botão de pesquisa completo */}
            <Button
              className="justify-start font-normal text-muted-foreground hover:text-foreground hover:bg-violet-500/5 border-border/20 transition-all duration-200 h-9 w-[240px] gap-2"
              variant="ghost"
              size="icon"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <SearchIcon className="h-4 w-4 flex-shrink-0" />
              <span>Pesquisar</span>
              <kbd
                className="ml-auto pointer-events-none inline-flex h-5 select-none 
            items-center gap-1 rounded border border-border/40 bg-muted/50 px-1.5 font-mono text-[10px] 
            font-medium text-muted-foreground/70 shadow-sm"
              >
                {osKeyIcon === "⌘" ? (
                  <>
                    <span className="text-xs">⌘</span>K
                  </>
                ) : (
                  <>
                    <span className="text-xs">Ctrl</span>
                    <span className="text-xs">+</span>
                    <span className="text-xs">K</span>
                  </>
                )}
              </kbd>
            </Button>

            {/* Separador e título */}
            <div className="h-4 w-px bg-border/40 mx-2" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground/90">{title}</span>
            </div>
          </>
        )}

        {/* Mobile: Layout simplificado */}
        {isMobile && (
          <>
            {/* Lado esquerdo: Logo ou título (opcional) */}
            <div className="flex items-center">
              <span className="font-semibold text-foreground/90 text-lg">
                Dashboard
              </span>
            </div>

            {/* Lado direito: Search + Menu */}
            <div className="flex items-center gap-1">
              <MobileSearchButton onClick={() => setCommandPaletteOpen(true)} />
              <MobileSidebarTrigger />
            </div>
          </>
        )}

        {/* Linha de accent com gradiente melhorado */}
        <div
          className={`
          absolute bottom-0 left-0 right-0 h-px 
          bg-gradient-to-r from-transparent via-violet-500/20 to-transparent
          ${isMobile ? "opacity-60" : "opacity-100"}
        `}
        />
      </header>

      <DashboardCommandPalette open={open} setOpen={setCommandPaletteOpen} />
    </>
  );
}
