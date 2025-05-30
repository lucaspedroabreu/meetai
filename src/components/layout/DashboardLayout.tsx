"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MeetAILogo } from "@/components/custom/Logo";
import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";
import { Video, Bot, Star, ChevronDown, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

const mainMenuItems = [
  {
    title: "Meetings",
    icon: Video,
    url: "/meetings",
  },
  {
    title: "Agents",
    icon: Bot,
    url: "/agents",
  },
];

const upgradeMenuItems = [
  {
    title: "Upgrade",
    icon: Star,
    url: "/upgrade",
  },
];

function UserFooter({ userEmail }: { userEmail?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error("Erro inesperado no logout:", err);
    }
  };

  if (!userEmail) return null;

  // Extrair iniciais do nome do email
  const emailParts = userEmail.split("@")[0];
  const initials =
    emailParts
      .split(".")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2) || emailParts.slice(0, 2).toUpperCase();
  const displayName = emailParts
    .replace(".", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        // onClick={handleLogout}
        className="h-14 hover:bg-white/5 group p-3 px-2 transition-all duration-300 rounded-xl"
      >
        <div className="flex items-center gap-3 w-full">
          {/* Avatar com gradiente premium */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
              {initials}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/30 to-indigo-600/30 rounded-xl blur-md -z-10"></div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-sm font-semibold text-white/95 truncate">
              {displayName}
            </span>
            <span className="text-xs text-white/60 truncate font-medium">
              {userEmail}
            </span>
          </div>

          {/* Dropdown indicator com animação */}
          <ChevronDown className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-all duration-300 group-hover:scale-110" />
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function DashboardLayout({
  children,
  userEmail,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="sidebar" className="border-r-0">
          {/* Container principal com altura total garantida */}
          <div className="h-screen relative overflow-hidden flex flex-col">
            {/* Gradiente de fundo principal - dark elegante */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>

            {/* Layer de gradiente secundário para profundidade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-indigo-900/30"></div>

            {/* Efeitos de luz ambient */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-violet-500/10 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-indigo-500/10 to-transparent"></div>

            {/* Particles/dots pattern para textura */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-12 left-8 w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="absolute top-32 right-12 w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="absolute top-48 left-16 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
              <div className="absolute bottom-32 right-8 w-1 h-1 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-48 left-12 w-0.5 h-0.5 bg-white/40 rounded-full"></div>
            </div>

            {/* Header com glassmorphism elegante - SIZING CORRIGIDO */}
            <SidebarHeader className="px-6 py-6 relative z-10 shrink-0">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <MeetAILogo
                      size={28}
                      variant="mono"
                      className="text-white drop-shadow-lg"
                    />
                    <div className="absolute inset-0 blur-md opacity-50">
                      <MeetAILogo
                        size={28}
                        variant="mono"
                        className="text-violet-400"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <AnimatedMeetAiText
                      animated={false}
                      showDot={false}
                      className="text-white text-lg font-bold tracking-tight drop-shadow-lg"
                    />
                    <div className="h-0.5 w-12 bg-gradient-to-r from-violet-400 to-indigo-500 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </SidebarHeader>

            {/* Content com espaçamento refinado - FLEX GROW */}
            <SidebarContent className="px-6 py-6 flex-1 relative z-10 overflow-y-auto">
              {/* Grupo principal de menu */}
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-3">
                    {mainMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          size="lg"
                          className="h-12 justify-start hover:bg-white/8 rounded-xl transition-all duration-300 text-white/90 hover:text-white group border border-transparent hover:border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10"
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4"
                          >
                            <div className="relative">
                              <item.icon className="h-5 w-5 relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-indigo-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                            </div>
                            <span className="font-medium tracking-wide">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Separador elegante com gradiente */}
              <div className="py-6 flex justify-center">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>

              {/* Grupo do Upgrade com destaque especial */}
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-3">
                    {upgradeMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          size="lg"
                          className="h-12 justify-start rounded-xl transition-all duration-300 text-white group relative overflow-hidden bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 hover:border-violet-400/50 hover:from-violet-600/30 hover:to-indigo-600/30"
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4 relative z-10"
                          >
                            <div className="relative">
                              <item.icon className="h-5 w-5 text-violet-300 group-hover:text-violet-200 transition-colors duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/30 to-indigo-500/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                            </div>
                            <span className="font-medium tracking-wide text-violet-100 group-hover:text-white transition-colors duration-300">
                              {item.title}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* Footer com glassmorphism premium - SEMPRE NO FINAL */}
            <SidebarFooter className="p-2 relative z-10 shrink-0">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl">
                <SidebarMenu>
                  <UserFooter userEmail={userEmail} />
                </SidebarMenu>
              </div>
            </SidebarFooter>
          </div>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border mx-2" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Dashboard</span>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
