"use client";

import { Button } from "@/components/ui/button";
import { Bot, Settings, Loader2 } from "lucide-react";
import type { Agent } from "./types";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onConfigure?: (agent: Agent) => void;
  isConfiguring?: boolean;
}

export default function AgentCard({
  agent,
  index,
  onConfigure,
  isConfiguring = false,
}: AgentCardProps) {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200/50 dark:hover:border-blue-800/50">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg leading-tight">
                {agent.name || `Agente #${index + 1}`}
              </h4>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  agent.status === "inactive"
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {agent.status === "inactive" ? "Inativo" : "Ativo"}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {agent.description ||
            "Assistente IA personalizado para automatizar tarefas e aumentar produtividade"}
        </p>

        {/* Model Info */}
        {agent.model && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-md px-2 py-1 inline-block">
            Modelo: {agent.model.toUpperCase()}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConfigure?.(agent)}
            disabled={isConfiguring}
            className="w-full group-hover:border-blue-300 dark:group-hover:border-blue-700"
          >
            {isConfiguring ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Settings className="w-4 h-4 mr-2" />
            )}
            {isConfiguring ? "Configurando..." : "Configurar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
