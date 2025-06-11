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
  onRetry?: () => void;
}

export default function AgentsGrid({
  agents,
  isLoading,
  isError,
  onCreateFirstAgent,
  onRetry,
}: AgentsGridProps) {
  if (isLoading) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto">
        <LoadingState
          title="Carregando seus agentes..."
          description="Aguarde enquanto buscamos seus assistentes IA"
          size="lg"
          className="min-h-[300px]"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto">
        <ErrorMessage
          error="Não foi possível carregar seus agentes. Verifique sua conexão e tente novamente."
          onRetry={onRetry}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  if (!agents || agents.length === 0) {
    return (
      <div className="w-11/12 max-w-7xl mx-auto">
        <AgentsEmptyState onCreateFirstAgent={onCreateFirstAgent} />
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} />
        ))}
      </div>
    </div>
  );
}
