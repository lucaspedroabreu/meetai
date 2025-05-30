"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface DashboardScreenProps {
  userEmail: string;
}

export default function DashboardScreen({ userEmail }: DashboardScreenProps) {
  return (
    <DashboardLayout userEmail={userEmail}>
      <div className="p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <MeetAILogo size={80} variant="gradient" animated />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Bem-vindo de volta! 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                Gerencie suas reuniões e colaborações com IA
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative p-6 bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 rounded-2xl" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Nova Reunião</h3>
                  <p className="text-sm text-muted-foreground">
                    Inicie uma reunião com IA assistente
                  </p>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Iniciar Agora
                </Button>
              </div>
            </div>

            <div className="relative p-6 bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/5 rounded-2xl" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Relatórios</h3>
                  <p className="text-sm text-muted-foreground">
                    Analise o desempenho das suas reuniões
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Ver Relatórios
                </Button>
              </div>
            </div>

            <div className="relative p-6 bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 rounded-2xl" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Configurações</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalize sua experiência
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Configurar
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-background via-background to-muted/10 border rounded-xl">
              <div className="text-3xl font-bold text-blue-500">12</div>
              <div className="text-sm text-muted-foreground">
                Reuniões este mês
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-background via-background to-muted/10 border rounded-xl">
              <div className="text-3xl font-bold text-green-500">4.8</div>
              <div className="text-sm text-muted-foreground">
                Avaliação média
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-background via-background to-muted/10 border rounded-xl">
              <div className="text-3xl font-bold text-purple-500">156</div>
              <div className="text-sm text-muted-foreground">
                Horas economizadas
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
