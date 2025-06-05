"use client";

import React, { useState, memo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Search as SearchIcon, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { DashboardCommandPalette } from "./DashboardCommandPalette";

// Função para obter o título baseado na rota
const getRouteTitle = (pathname: string): string => {
  const routeMap: Record<string, string> = {
    "/dashboard": "Visão Geral",
    "/dashboard/chat": "Chat com IA",
    "/dashboard/conversations": "Conversas",
    "/dashboard/documents": "Documentos",
    "/dashboard/analytics": "Análises",
    "/dashboard/settings": "Configurações",
    "/dashboard/upgrade": "Plano Premium",
  };

  return routeMap[pathname] || "Dashboard";
};

// Componente mobile sidebar trigger customizado com ícone de menu hambúrguer
const MobileSidebarTrigger = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { toggleSidebar } = useSidebar();

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

// Memoizando o DashboardHeader para evitar re-renderizações desnecessárias
const DashboardHeader = memo(function DashboardHeader() {
  const {
    open,
    setOpen: setCommandPaletteOpen,
    osKeyIcon,
    isDetected,
    isGloballyHydrated,
  } = useCommandPalette();
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <>
      <header
        className={`
        sticky top-0 z-40 flex shrink-0 items-center w-full
        border-b border-border/30 bg-background/85 backdrop-blur-xl 
        supports-[backdrop-filter]:bg-background/70 
        transition-all duration-300
        ${
          isMobile
            ? "h-14 px-3 pt-safe-top justify-between" // Mobile: space-between para separar os lados
            : "h-16 px-4 justify-between" // Desktop: justify-between para usar todo espaço
        }
      `}
      >
        {/* Desktop: Layout tradicional */}
        {!isMobile && (
          <>
            {/* Lado esquerdo: Sidebar trigger + Search */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-violet-500/15 transition-colors cursor-pointer" />

              {/* Botão de pesquisa completo */}
              <Button
                className="cursor-pointer justify-start font-normal text-muted-foreground hover:text-foreground hover:bg-violet-500/15 border-border/20 transition-all duration-200 h-9 w-[240px] gap-2"
                variant="ghost"
                size="icon"
                onClick={() => setCommandPaletteOpen(true)}
              >
                <SearchIcon className="h-4 w-4 flex-shrink-0" />
                <span>Pesquisar</span>
                {/* Container com largura fixa para evitar layout shift */}
                <div className="ml-auto w-[52px] flex justify-end bg-transparent">
                  <kbd
                    className={`pointer-events-none inline-flex h-5 select-none 
                    items-center gap-1 rounded border border-border/40 bg-muted/50 px-1.5 font-mono text-[10px] 
                    font-medium text-muted-foreground/70 shadow-sm
                    ${
                      isDetected || isGloballyHydrated
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
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

                  {/* Elemento fantasma que ocupa o espaço durante a hidratação */}
                  {!(isDetected || isGloballyHydrated) && (
                    <div
                      className="pointer-events-none inline-flex h-5 select-none 
                      items-center gap-1 rounded border border-transparent bg-transparent px-1.5 font-mono text-[10px] 
                      font-medium opacity-0"
                      aria-hidden="true"
                    >
                      <span className="text-xs">Ctrl</span>
                      <span className="text-xs">+</span>
                      <span className="text-xs">K</span>
                    </div>
                  )}
                </div>
              </Button>
            </div>

            {/* Centro/Direita: Título */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground/90">
                {getRouteTitle(pathname)}
              </span>
            </div>
          </>
        )}

        {/* Mobile: Layout simplificado */}
        {isMobile && (
          <>
            {/* Lado esquerdo: Logo ou título (opcional) */}
            <div className="flex items-center">
              <span className="font-semibold text-foreground/90 text-lg">
                {getRouteTitle(pathname)}
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
});

export default DashboardHeader;
