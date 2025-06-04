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
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-200 hover:border-blue-200/50">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-1">
            {agent.name || `Agente #${index + 1}`}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {agent.description || "Assistente IA personalizado"}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                agent.status === "inactive"
                  ? "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              }`}
            >
              {agent.status === "inactive" ? "Inativo" : "Ativo"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onConfigure?.(agent)}
              disabled={isConfiguring}
            >
              {isConfiguring ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Settings className="w-4 h-4 mr-1" />
              )}
              Configurar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
