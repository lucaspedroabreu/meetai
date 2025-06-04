"use client";

import { Suspense } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useAllAgents } from "./hooks/useAgentsData";

const AgentsCountContent = () => {
  const { data: agentsData } = useAllAgents();
  const count = agentsData?.length || 0;

  return (
    <span>
      Você possui <span className="font-medium text-foreground">{count}</span>{" "}
      agente{count !== 1 ? "s" : ""} ativo{count !== 1 ? "s" : ""}
    </span>
  );
};

const AgentsCountLoading = () => (
  <div className="flex items-center justify-center gap-2">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>Carregando contagem...</span>
  </div>
);

const AgentsCountError = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => (
  <div className="flex items-center justify-center gap-2 text-destructive">
    <AlertCircle className="w-4 h-4" />
    <span>Erro ao carregar contagem</span>
    <button
      onClick={resetErrorBoundary}
      className="text-xs underline hover:no-underline ml-1"
    >
      tentar novamente
    </button>
  </div>
);

export const AgentsCount = () => {
  return (
    <ErrorBoundary
      FallbackComponent={AgentsCountError}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<AgentsCountLoading />}>
        <AgentsCountContent />
      </Suspense>
    </ErrorBoundary>
  );
};
