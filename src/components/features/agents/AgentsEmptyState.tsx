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
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Bot className="w-10 h-10 text-muted-foreground" />
      </div>
      <h4 className="text-xl font-semibold mb-2">Nenhum agente criado ainda</h4>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Comece criando seu primeiro agente IA personalizado para automatizar
        tarefas e melhorar sua produtividade.
      </p>
      <Button
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        onClick={onCreateFirstAgent}
      >
        <Plus className="w-4 h-4 mr-2" />
        Criar Primeiro Agente
      </Button>
    </div>
  );
}
