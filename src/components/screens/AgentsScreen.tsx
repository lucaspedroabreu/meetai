"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/server/trpc/client";
import { CACHE_CONFIG } from "@/lib/cache-keys";
import { useToast } from "@/hooks/useToast";
import {
  AgentsWelcomeSection,
  CreateAgentSection,
  AgentsGrid,
  type Agent,
} from "@/components/features/agents";

export default function AgentsScreen() {
  const trpc = useTRPC();
  const toast = useToast();

  // Manter apenas query de agentes (dados que mudam)
  const { data: agentsData, isLoading } = useQuery({
    ...trpc.agents.getMany.queryOptions(),
    ...CACHE_CONFIG.AGENTS,
  });

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
        {/* Welcome Section */}
        <AgentsWelcomeSection agentsCount={agentsData?.length || 0} />

        {/* Create Agent Section */}
        <CreateAgentSection
          onCreateAgent={handleCreateAgent}
          onViewModels={handleViewModels}
        />

        {/* Agents Grid */}
        <AgentsGrid
          agents={agentsData}
          isLoading={isLoading}
          onCreateFirstAgent={handleCreateFirstAgent}
          onConfigureAgent={handleConfigureAgent}
        />
      </div>
    </div>
  );
}
