"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/features/brand";
import { Video, Calendar, Clock, Users, Plus } from "lucide-react";
import { useDashboardUser } from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/useToast";

// Tipo para as reuniões
interface Meeting {
  id: number;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: string;
}

// Componente Hero separado para consistência com AgentsScreen
const MeetingsWelcomeSection = () => {
  const user = useDashboardUser();

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <MeetAILogo size={80} variant="gradient" animated={true} />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-violet-600 bg-clip-text text-transparent">
          Bem-vindo às suas Reuniões{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Gerencie suas reuniões e colaborações com IA de forma inteligente
        </p>
      </div>
    </div>
  );
};

// Componente da seção "Criar Reunião" (equivalente ao CreateAgentSection)
const CreateMeetingSection = ({
  onCreateInstantMeeting,
  onScheduleMeeting,
}: {
  onCreateInstantMeeting: () => void;
  onScheduleMeeting: () => void;
}) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl border border-violet-200/20 p-8">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Video className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Iniciar Nova Reunião</h2>
          <p className="text-muted-foreground mb-6">
            Crie uma reunião instantânea ou agende para depois
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
            onClick={onCreateInstantMeeting}
          >
            <Plus className="w-5 h-5 mr-2" />
            Reunião Instantânea
          </Button>
          <Button size="lg" variant="outline" onClick={onScheduleMeeting}>
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Reunião
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Componente da lista de reuniões (equivalente ao AgentsGrid)
const MeetingsHistorySection = ({
  meetings,
  isLoading,
  onViewMeetingDetails,
  onViewAllMeetings,
}: {
  meetings: Meeting[];
  isLoading?: boolean;
  onViewMeetingDetails: (title: string) => void;
  onViewAllMeetings: () => void;
}) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Reuniões Recentes</h3>
          <p className="text-muted-foreground">Carregando suas reuniões...</p>
        </div>

        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-muted/20 rounded w-3/4" />
                    <div className="flex space-x-4">
                      <div className="h-4 bg-muted/20 rounded w-20" />
                      <div className="h-4 bg-muted/20 rounded w-16" />
                      <div className="h-4 bg-muted/20 rounded w-24" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 bg-muted/20 rounded w-16" />
                  <div className="h-8 bg-muted/20 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Reuniões Recentes</h3>
        <p className="text-muted-foreground">
          Acompanhe suas últimas reuniões e atividades
        </p>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-200 hover:border-violet-200/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">
                    {meeting.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {meeting.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {meeting.participants} participantes
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meeting.status === "Concluída"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  }`}
                >
                  {meeting.status}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewMeetingDetails(meeting.title)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State or Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" size="lg" onClick={onViewAllMeetings}>
          Ver Todas as Reuniões
        </Button>
      </div>
    </div>
  );
};

export default function MeetingsScreen() {
  const toast = useToast();

  // Para uso futuro quando implementar dados assíncronos
  const isLoadingMeetings = false;

  // Mock data para demonstração - substituir por dados reais
  const recentMeetings = [
    {
      id: 1,
      title: "Reunião com Equipe de Produto",
      date: "Hoje, 14:30",
      duration: "45 min",
      participants: 5,
      status: "Concluída",
    },
    {
      id: 2,
      title: "Sprint Planning",
      date: "Ontem, 10:00",
      duration: "1h 30min",
      participants: 8,
      status: "Concluída",
    },
    {
      id: 3,
      title: "Review de Projeto",
      date: "15 Dez, 16:00",
      duration: "1h",
      participants: 6,
      status: "Agendada",
    },
  ];

  // Handlers para as ações
  const handleCreateInstantMeeting = () => {
    // TODO: Toast temporário - remover quando implementar criação de reunião instantânea
    toast.meetings.createInstantMeeting();
    // TODO: Implementar criação de reunião instantânea com IA integrada
  };

  const handleScheduleMeeting = () => {
    // TODO: Toast temporário - remover quando implementar agendamento
    toast.meetings.scheduleMeeting();
    // TODO: Implementar sistema de agendamento inteligente
  };

  const handleViewMeetingDetails = (meetingTitle: string) => {
    // TODO: Toast temporário - remover quando implementar detalhes da reunião
    toast.meetings.viewMeetingDetails(meetingTitle);
    // TODO: Implementar modal/página de detalhes da reunião com transcrições e resumos
  };

  const handleViewAllMeetings = () => {
    // TODO: Toast temporário - remover quando implementar histórico completo
    toast.meetings.viewAllMeetings();
    // TODO: Implementar página de histórico completo de reuniões com filtros e busca
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-background via-background to-muted/5">
      <div className="w-full space-y-8 p-6">
        {/* Welcome Section */}
        <MeetingsWelcomeSection />

        {/* New Meeting Section */}
        <CreateMeetingSection
          onCreateInstantMeeting={handleCreateInstantMeeting}
          onScheduleMeeting={handleScheduleMeeting}
        />

        {/* Recent Meetings History */}
        <MeetingsHistorySection
          meetings={recentMeetings}
          isLoading={isLoadingMeetings}
          onViewMeetingDetails={handleViewMeetingDetails}
          onViewAllMeetings={handleViewAllMeetings}
        />
      </div>
    </div>
  );
}
