"use client";

import { toast } from "sonner";

/**
 * Hook customizado para toasts da aplicação
 *
 * IMPORTANTE: Os toasts de funcionalidades em desenvolvimento são TEMPORÁRIOS
 * e devem ser removidos quando as funcionalidades forem implementadas.
 *
 * Manter apenas os toasts genéricos (success, error, info, warning) na versão final.
 */
export function useToast() {
  return {
    // TEMPORÁRIO: Toasts para funcionalidades de agentes em desenvolvimento
    // TODO: Remover toda esta seção quando as funcionalidades forem implementadas
    agents: {
      createAgent: () => {
        toast.info("🚀 Criar Agente", {
          description:
            "Funcionalidade em desenvolvimento. Em breve você poderá criar seus agentes IA personalizados!",
          duration: 4000,
        });
      },

      viewModels: () => {
        toast.info("🤖 Modelos Disponíveis", {
          description:
            "Funcionalidade em desenvolvimento. Em breve você verá todos os modelos de IA disponíveis!",
          duration: 4000,
        });
      },

      createFirstAgent: () => {
        toast.info("✨ Criar Primeiro Agente", {
          description:
            "Funcionalidade em desenvolvimento. Um onboarding especial está sendo preparado para você!",
          duration: 4000,
        });
      },

      configureAgent: (agentName?: string) => {
        toast.info("⚙️ Configurar Agente", {
          description: `Funcionalidade em desenvolvimento. Em breve você poderá configurar ${
            agentName ? `"${agentName}"` : "seus agentes"
          } com mais opções!`,
          duration: 4000,
        });
      },

      deleteAgent: (agentName?: string) => {
        toast.warning("🗑️ Excluir Agente", {
          description: `Funcionalidade em desenvolvimento. A exclusão de ${
            agentName ? `"${agentName}"` : "agentes"
          } será implementada em breve!`,
          duration: 4000,
        });
      },

      toggleStatus: (agentName?: string, newStatus?: string) => {
        toast.info(
          `${newStatus === "active" ? "✅" : "⏸️"} ${
            newStatus === "active" ? "Ativar" : "Desativar"
          } Agente`,
          {
            description: `Funcionalidade em desenvolvimento. Em breve você poderá ${
              newStatus === "active" ? "ativar" : "desativar"
            } ${agentName ? `"${agentName}"` : "seus agentes"}!`,
            duration: 4000,
          }
        );
      },
    },

    // TEMPORÁRIO: Toasts para funcionalidades de reuniões em desenvolvimento
    // TODO: Remover toda esta seção quando as funcionalidades forem implementadas
    meetings: {
      createInstantMeeting: () => {
        toast.info("📹 Reunião Instantânea", {
          description:
            "Funcionalidade em desenvolvimento. Em breve você poderá criar reuniões instantâneas com IA integrada!",
          duration: 4000,
        });
      },

      scheduleMeeting: () => {
        toast.info("📅 Agendar Reunião", {
          description:
            "Funcionalidade em desenvolvimento. Sistema de agendamento inteligente será implementado em breve!",
          duration: 4000,
        });
      },

      viewAllMeetings: () => {
        toast.info("📋 Todas as Reuniões", {
          description:
            "Funcionalidade em desenvolvimento. Em breve você terá acesso ao histórico completo de reuniões!",
          duration: 4000,
        });
      },

      viewMeetingDetails: (meetingTitle?: string) => {
        toast.info("📊 Detalhes da Reunião", {
          description: `Funcionalidade em desenvolvimento. Detalhes de ${
            meetingTitle ? `"${meetingTitle}"` : "reuniões"
          } serão exibidos em breve!`,
          duration: 4000,
        });
      },
    },

    // PERMANENTE: Toasts genéricos para a aplicação
    success: (message: string, description?: string) => {
      toast.success(message, { description, duration: 3000 });
    },

    error: (message: string, description?: string) => {
      toast.error(message, { description, duration: 5000 });
    },

    info: (message: string, description?: string) => {
      toast.info(message, { description, duration: 3000 });
    },

    warning: (message: string, description?: string) => {
      toast.warning(message, { description, duration: 4000 });
    },
  };
}
