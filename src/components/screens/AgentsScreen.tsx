"use client";

import { useToast } from "@/hooks/useToast";
import {
  AgentsWelcomeSection,
  CreateAgentSection,
  AgentsGridWithSuspense,
  type Agent,
} from "@/components/features/agents";

export default function AgentsScreen() {
  const toast = useToast();

  // Handlers para as ações
  const handleCreateAgent = () => {
    // TODO: Toast temporário - remover quando implementar modal/página de criação de agente
    toast.agents.createAgent();
    // TODO: Implementar modal/página de criação de agente
  };

  const handleViewModels = () => {
    // TODO: Toast temporário - remover quando implementar modal/página de modelos
    toast.agents.viewModels();
    // TODO: Implementar modal/página de modelos disponíveis
  };

  const handleCreateFirstAgent = () => {
    // TODO: Toast temporário - remover quando implementar onboarding
    toast.agents.createFirstAgent();
    // TODO: Implementar onboarding de primeiro agente
  };

  const handleConfigureAgent = (agent: Agent) => {
    // TODO: Toast temporário - remover quando implementar configuração
    toast.agents.configureAgent(agent.name);
    // TODO: Implementar modal/página de configuração de agente
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-background via-background to-muted/5">
      <div className="w-full space-y-8 p-6">
        {/* Welcome Section - sempre visível */}
        <AgentsWelcomeSection />

        {/* Create Agent Section - sempre visível */}
        <CreateAgentSection
          onCreateAgent={handleCreateAgent}
          onViewModels={handleViewModels}
        />

        {/* Agents Grid - com Suspense interno */}
        <AgentsGridWithSuspense
          onCreateFirstAgent={handleCreateFirstAgent}
          onConfigureAgent={handleConfigureAgent}
        />
      </div>
    </div>
  );
}
