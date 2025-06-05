"use client";

import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";

interface AgentsEmptyStateProps {
  onCreateFirstAgent?: () => void;
}

export default function AgentsEmptyState({
  onCreateFirstAgent,
}: AgentsEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Bot className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-2xl font-semibold mb-3">Ainda não há agentes</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        Crie seu primeiro agente IA para começar a automatizar tarefas e
        aumentar sua produtividade.
      </p>
      <Button
        size="lg"
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
        onClick={onCreateFirstAgent}
      >
        <Plus className="w-5 h-5 mr-2" />
        Criar Primeiro Agente
      </Button>
    </div>
  );
}
