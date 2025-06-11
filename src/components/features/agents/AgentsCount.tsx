"use client";

import { Suspense } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { useMyAgents } from "../../../hooks/useAgentsData";

const AgentsCountContent = () => {
  const { data: agentsData } = useMyAgents();
  const count = agentsData?.filter((a) => a.status !== "inactive").length || 0;

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
  const queryClient = useQueryClient();

  const handleErrorReset = async () => {
    // Invalida e refaz todas as queries relacionadas aos agents
    await queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey.some(
          (key) => typeof key === "string" && key.includes("agents")
        ),
    });
  };

  return (
    <ErrorBoundary
      FallbackComponent={AgentsCountError}
      onReset={handleErrorReset}
    >
      <Suspense fallback={<AgentsCountLoading />}>
        <AgentsCountContent />
      </Suspense>
    </ErrorBoundary>
  );
};
