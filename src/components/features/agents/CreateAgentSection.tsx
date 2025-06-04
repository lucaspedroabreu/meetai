"use client";

import { Button } from "@/components/ui/button";
import { Bot, Plus, Settings } from "lucide-react";

interface CreateAgentSectionProps {
  onCreateAgent?: () => void;
  onViewModels?: () => void;
}

export default function CreateAgentSection({
  onCreateAgent,
  onViewModels,
}: CreateAgentSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200/20 p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Criar Novo Agente</h2>
            <p className="text-muted-foreground mb-6">
              Configure um assistente IA personalizado para suas necessidades
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={onCreateAgent}
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Agente
            </Button>
            <Button size="lg" variant="outline" onClick={onViewModels}>
              <Settings className="w-5 h-5 mr-2" />
              Modelos Disponíveis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
