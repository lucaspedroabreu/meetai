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
      <div className="max-w-6xl mx-auto">
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
      <div className="max-w-4xl mx-auto">
        <AgentsEmptyState onCreateFirstAgent={onCreateFirstAgent} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Seus Agentes</h2>
        <p className="text-muted-foreground">
          {agents.length} agente{agents.length !== 1 ? "s" : ""} configurado
          {agents.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            index={index}
            onConfigure={onConfigureAgent}
          />
        ))}
      </div>
    </div>
  );
}
