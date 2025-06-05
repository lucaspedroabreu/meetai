"use client";

import React from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, HomeIcon, UsersIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardCommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Componente de input customizado com design glassmorphism
function CustomCommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="group relative flex h-14 items-center gap-4 border-b border-white/10 px-6"
    >
      <SearchIcon className="size-5 shrink-0 text-violet-300/70" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-violet-200/50 flex h-full w-full bg-transparent text-white text-base outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus:outline-none focus:ring-0",
          className
        )}
        {...props}
      />
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-t-xl opacity-0 group-focus-within:opacity-100 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-indigo-500/5 blur-xl transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

// Comandos disponíveis (expandir no futuro)
const commands = [
  {
    id: "dashboard",
    title: "Ir para Dashboard",
    icon: HomeIcon,
    action: () => (window.location.href = "/dashboard"),
  },
  {
    id: "meetings",
    title: "Ver Reuniões",
    icon: UsersIcon,
    action: () => (window.location.href = "/meetings"),
  },
  {
    id: "ai-agents",
    title: "Agentes IA",
    icon: SearchIcon,
    action: () => (window.location.href = "/ai-agents"),
  },
  {
    id: "settings",
    title: "Configurações",
    icon: SettingsIcon,
    action: () => (window.location.href = "/settings"),
  },
];

// Componente de conteúdo do Command Palette reutilizável
function CommandPaletteContent({
  runCommand,
}: {
  runCommand: (command: () => void) => void;
}) {
  return (
    <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-transparent text-white">
      {/* Input com background gradiente sutil */}
      <div className="bg-gradient-to-r from-violet-500/5 to-purple-500/5">
        <CustomCommandInput
          placeholder="Digite um comando ou pesquise..."
          autoFocus
        />
      </div>

      <CommandList className="max-h-[400px] overflow-y-auto py-2">
        <CommandEmpty className="py-8 text-center text-violet-200/70 text-sm">
          <div className="flex flex-col items-center gap-2">
            <SearchIcon className="size-8 text-violet-300/50" />
            <span>Nenhum resultado encontrado.</span>
          </div>
        </CommandEmpty>
        <CommandGroup>
          <div className="px-4 py-2 text-xs font-medium text-violet-300/70 uppercase tracking-wider">
            Navegação
          </div>
          <div className="space-y-1 px-2">
            {commands.map((command) => (
              <CommandItem
                key={command.id}
                value={command.title}
                onSelect={() => runCommand(command.action)}
                className={cn(
                  "relative cursor-pointer rounded-lg px-4 py-3 text-white/90 transition-all duration-200",
                  "hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-purple-500/20 hover:text-white",
                  "data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-violet-500/30 data-[selected=true]:to-purple-500/30 data-[selected=true]:text-white",
                  "data-[selected=true]:shadow-lg data-[selected=true]:shadow-violet-500/25",
                  "group cursor-pointer"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <command.icon className="size-5 text-violet-300 group-hover:text-violet-200 group-data-[selected=true]:text-violet-100 transition-colors" />
                    <div className="absolute inset-0 blur-sm bg-violet-400/0 group-hover:bg-violet-400/20 group-data-[selected=true]:bg-violet-400/30 rounded-full transition-all duration-200" />
                  </div>
                  <span className="font-medium">{command.title}</span>
                </div>
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 group-data-[selected=true]:from-violet-500/15 group-data-[selected=true]:to-purple-500/15 transition-all duration-200" />
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </CommandPrimitive>
  );
}

export function DashboardCommandPalette({
  open,
  setOpen,
}: DashboardCommandPaletteProps) {
  const isMobile = useIsMobile();
  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  // Estilos compartilhados para background
  const backgroundStyles = (
    <>
      {/* Background layer com gradiente sólido para evitar flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/95 to-violet-900/95 rounded-xl" />

      {/* Blur layer separado que não interfere na transição */}
      <div className="absolute inset-0 backdrop-blur-xl rounded-xl opacity-60" />
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Palette de Comandos</DrawerTitle>
          <DrawerDescription>
            Digite um comando ou pesquise...
          </DrawerDescription>
        </DrawerHeader>
        <DrawerContent className="overflow-hidden border-t border-white/10 shadow-2xl bg-slate-900/98 h-[80vh]">
          {backgroundStyles}

          {/* Content layer */}
          <div className="relative z-10 h-full">
            <CommandPaletteContent runCommand={runCommand} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader className="sr-only">
        <DialogTitle>Palette de Comandos</DialogTitle>
        <DialogDescription>Digite um comando ou pesquise...</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0 border border-white/10 shadow-2xl max-w-2xl bg-slate-900/98">
        {backgroundStyles}

        {/* Content layer */}
        <div className="relative z-10">
          <CommandPaletteContent runCommand={runCommand} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
