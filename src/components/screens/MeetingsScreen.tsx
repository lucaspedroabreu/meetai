"use client";

import { useToast } from "@/hooks/useToast";
import {
  MeetingsWelcomeSection,
  CreateMeetingSection,
  MeetingsHistorySection,
  type Meeting,
} from "@/components/features/meetings";

export default function MeetingsScreen() {
  const toast = useToast();

  // Para uso futuro quando implementar dados assíncronos
  const isLoadingMeetings = false;

  // Mock data para demonstração - substituir por dados reais
  const recentMeetings: Meeting[] = [
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
