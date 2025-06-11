"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingState } from "@/components/custom/LoadingState";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import AgentsTable from "./AgentsTable";
import EditAgentsDialog from "./EditAgentsDialog";
import { useMyAgents } from "../../../hooks/useAgentsData";
import type { Agent } from "./types";

interface AgentsTableContentProps {
  _onRetry: () => void;
}

const AgentsTableContent = ({ _onRetry }: AgentsTableContentProps) => {
  const { data: agentsData } = useMyAgents();

  // Se não há dados, não precisa renderizar AgentsTable
  if (!agentsData) {
    return null;
  }

  return <AgentsTable agents={agentsData as Agent[]} />;
};

const AgentsTableLoading = () => (
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

interface AgentsTableErrorProps {
  resetErrorBoundary: () => void;
}

const AgentsTableError = ({ resetErrorBoundary }: AgentsTableErrorProps) => (
  <div className="max-w-6xl mx-auto">
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2">Seus Agentes</h3>
      <p className="text-muted-foreground">
        Visualize e gerencie todos os seus assistentes IA
      </p>
    </div>
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h4 className="text-xl font-semibold mb-2">Erro ao Carregar Agentes</h4>
      <p className="text-muted-foreground mb-6">
        Não foi possível carregar a lista de agentes. Tente novamente.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline">
        <RefreshCw className="w-4 h-4 mr-2" />
        Tentar Novamente
      </Button>
    </div>
  </div>
);

export const AgentsTableWithSuspense = () => {
  const queryClient = useQueryClient();
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleRefetch = async () => {
    // Invalida e refaz todas as queries relacionadas aos agents
    await queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey.some(
          (key) => typeof key === "string" && key.includes("agents")
        ),
    });
  };

  const _handleConfigureAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setEditingAgent(null);
  };

  const handleAgentUpdated = () => {
    // Cache será invalidado automaticamente pelo hook useUpdateAgent
    handleRefetch();
  };

  const handleAgentDeleted = () => {
    // Cache será invalidado automaticamente pelo hook useDeleteAgent
    handleRefetch();
  };

  return (
    <>
      <ErrorBoundary
        FallbackComponent={AgentsTableError}
        onReset={handleRefetch}
      >
        <Suspense fallback={<AgentsTableLoading />}>
          <AgentsTableContent _onRetry={handleRefetch} />
        </Suspense>
      </ErrorBoundary>

      <EditAgentsDialog
        isOpen={showEditDialog}
        onOpenChange={handleCloseEditDialog}
        agent={editingAgent}
        onAgentUpdated={handleAgentUpdated}
        onAgentDeleted={handleAgentDeleted}
      />
    </>
  );
};
