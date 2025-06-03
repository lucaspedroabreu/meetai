"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";
import { Video, BarChart3, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function DashboardScreen() {
  const trpc = useTRPC();
  const query = trpc.hello.queryOptions({
    text: "Lucas",
  });
  const { data } = useQuery(query);

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/5">
      <div className="p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <MeetAILogo size={80} variant="gradient" animated={true} />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-violet-600 bg-clip-text text-transparent animate-in fade-in duration-700">
                Bem-vindo de volta! {data?.greeting}
              </h1>
              <p className="text-lg text-muted-foreground animate-in fade-in duration-700 delay-200">
                Gerencie suas reuniões e colaborações com IA
              </p>
            </div>
          </div>

          {/* Quick Actions - Ícones profissionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nova Reunião - ÚNICA ação com cor forte (Primary) */}
            <div className="relative p-6 bg-gradient-to-br from-card via-card to-violet-50/30 dark:to-violet-950/20 border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-violet-500/10 backdrop-blur-sm group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-purple-500/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                  <div className="relative">
                    <Video
                      className="h-6 w-6 text-violet-600 group-hover:text-violet-500 transition-colors duration-200 group-hover:scale-110"
                      strokeWidth={2}
                    />
                    {/* Glow effect no hover */}
                    <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Nova Reunião
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Inicie uma reunião com IA assistente
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-sm">
                  Iniciar Agora
                </Button>
              </div>
            </div>

            {/* Relatórios - Neutro com accent sutil */}
            <div className="relative p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 rounded-2xl shadow-sm hover:shadow-md backdrop-blur-sm group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-muted/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <BarChart3
                    className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200 group-hover:scale-110"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Relatórios
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analise o desempenho das suas reuniões
                  </p>
                </div>
                <Button variant="outline" className="w-full hover:bg-muted/50">
                  Ver Relatórios
                </Button>
              </div>
            </div>

            {/* Configurações - Neutro */}
            <div className="relative p-6 bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 rounded-2xl shadow-sm hover:shadow-md backdrop-blur-sm group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-muted/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Settings
                    className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200 group-hover:scale-110 group-hover:rotate-90"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Configurações
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Personalize sua experiência
                  </p>
                </div>
                <Button variant="outline" className="w-full hover:bg-muted/50">
                  Configurar
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section - Tons harmônicos sem competição */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-card to-muted/10 border border-border/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="text-3xl font-bold text-violet-600 group-hover:scale-105 transition-transform duration-200">
                12
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Reuniões este mês
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-card to-muted/10 border border-border/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="text-3xl font-bold text-violet-500 group-hover:scale-105 transition-transform duration-200">
                4.8
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Avaliação média
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-card to-muted/10 border border-border/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="text-3xl font-bold text-violet-400 group-hover:scale-105 transition-transform duration-200">
                156
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Horas economizadas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
