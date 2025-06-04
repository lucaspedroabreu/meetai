"use client";

import AgentCard from "./AgentCard";
import AgentsEmptyState from "./AgentsEmptyState";
import type { Agent } from "./types";

interface AgentsGridProps {
  agents?: Agent[];
  isLoading?: boolean;
  onCreateFirstAgent?: () => void;
  onConfigureAgent?: (agent: Agent) => void;
}

export default function AgentsGrid({
  agents,
  isLoading,
  onCreateFirstAgent,
  onConfigureAgent,
}: AgentsGridProps) {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Seus Agentes</h3>
          <p className="text-muted-foreground">
            Carregando seus assistentes IA...
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted/20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-muted/20 rounded w-3/4" />
                  <div className="h-4 bg-muted/20 rounded w-full" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted/20 rounded w-16" />
                    <div className="h-6 bg-muted/20 rounded w-20" />
                  </div>
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
