"use client";

import { useToast } from "@/hooks/useToast";
import {
  AgentsWelcomeSection,
  AgentsGrid,
  AgentsTable,
  type Agent,
} from "@/components/features/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Plus, Grid3X3, Table2 } from "lucide-react";
import { useState, useMemo } from "react";
import NewAgentsDialog from "@/components/features/agents/NewAgentsDialog";
import { useMyAgents } from "@/hooks/useAgentsData";
import { prepareAgents, PAGE_SIZE } from "@/lib/agentsPagination";
import { LoadingState } from "@/components/custom/LoadingState";
import { ErrorMessage } from "@/components/custom-ui/error-message";

type ViewMode = "grid" | "table";

export default function AgentsScreen() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const toast = useToast();

  const { data: agentsData, isLoading, isError } = useMyAgents();

  const { total, totalPages, slice } = useMemo(() => {
    return prepareAgents((agentsData as Agent[]) ?? [], search, page);
  }, [agentsData, search, page]);

  // ajusta page se totalPages diminuir
  if (page > totalPages) setPage(totalPages);

  const handleAgentCreated = (agentData: Partial<Agent>) => {
    toast.agents.createAgent();
    console.log("Agente criado:", agentData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <AgentsWelcomeSection />

        {/* Toggle + filtro + Create */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            {/* View toggle */}
            <div className="hidden md:flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8"
              >
                <Table2 className="w-4 h-4 mr-2" />
                Tabela
              </Button>
            </div>
          </div>

          {/* Create Agent Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Agente
          </Button>
        </div>

        {/* Header */}
        <div className="w-11/12 max-w-7xl mx-auto mt-6 mb-4">
          <h2 className="text-2xl font-semibold mb-1">Seus Agentes</h2>
          <p className="text-muted-foreground mb-4">
            {total} agente{total !== 1 ? "s" : ""} configurado
            {total !== 1 ? "s" : ""}
          </p>
          {/* Search input */}
          <Input
            placeholder="Filtrar por nome do agente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingState
            title="Carregando seus agentes..."
            description="Aguarde enquanto buscamos seus assistentes IA"
            size="lg"
            className="min-h-[300px]"
          />
        ) : isError ? (
          <ErrorMessage error="Erro ao carregar agentes" />
        ) : (
          <>
            {viewMode === "grid" ? (
              <AgentsGrid agents={slice} />
            ) : (
              <div className="w-11/12 max-w-7xl mx-auto">
                <AgentsTable agents={slice} />
              </div>
            )}

            {/* Pagination */}
            {totalPages >= 1 && (
              <div className="w-full flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Create Agent Dialog */}
        <NewAgentsDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onAgentCreated={handleAgentCreated}
        />
      </div>
    </div>
  );
}
