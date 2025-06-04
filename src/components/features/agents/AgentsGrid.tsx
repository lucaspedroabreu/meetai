"use client";

import AgentCard from "./AgentCard";
import AgentsEmptyState from "./AgentsEmptyState";
import { ErrorMessage } from "@/components/custom-ui/error-message";
import { LoadingState } from "@/components/custom/LoadingState";
import type { Agent } from "./types";

interface AgentsGridProps {
  agents?: Agent[];
  isLoading?: boolean;
  isError?: boolean;
  onCreateFirstAgent?: () => void;
  onConfigureAgent?: (agent: Agent) => void;
  onRetry?: () => void;
}

export default function AgentsGrid({
  agents,
  isLoading,
  isError,
  onCreateFirstAgent,
  onConfigureAgent,
  onRetry,
}: AgentsGridProps) {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Seus Agentes</h3>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os seus assistentes IA
          </p>
        </div>

        <LoadingState
          title="Carregando Agentes"
          description="Estamos buscando seus assistentes IA personalizados..."
          size="lg"
          className="min-h-[400px]"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Seus Agentes</h3>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os seus assistentes IA
          </p>
        </div>

        <ErrorMessage
          error="Erro ao carregar agentes. Verifique sua conexão e tente novamente."
          onRetry={onRetry}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Seus Agentes</h3>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os seus assistentes IA
        </p>
      </div>

      {!agents || agents.length === 0 ? (
        <AgentsEmptyState onCreateFirstAgent={onCreateFirstAgent} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              onConfigure={onConfigureAgent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
