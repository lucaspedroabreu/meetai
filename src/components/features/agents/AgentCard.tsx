"use client";

import { Button } from "@/components/ui/button";
import {
  Bot,
  Settings,
  Loader2,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  MessageSquare,
  Lightbulb,
  Cog,
  Wand2,
  Shield,
  Rocket,
  Heart,
} from "lucide-react";
import Image from "next/image";
import type { Agent } from "./types";

// Mapeamento dos ícones
const ICON_COMPONENTS = {
  bot: Bot,
  brain: Brain,
  cpu: Cpu,
  sparkles: Sparkles,
  zap: Zap,
  message: MessageSquare,
  lightbulb: Lightbulb,
  cog: Cog,
  wand: Wand2,
  shield: Shield,
  rocket: Rocket,
  heart: Heart,
} as const;

// Mapeamento dos gradientes
const GRADIENT_CLASSES = {
  "blue-purple": "from-blue-500 to-purple-500",
  "green-teal": "from-green-500 to-teal-500",
  "orange-red": "from-orange-500 to-red-500",
  "pink-purple": "from-pink-500 to-purple-500",
  "indigo-blue": "from-indigo-500 to-blue-500",
  "yellow-orange": "from-yellow-500 to-orange-500",
  "cyan-blue": "from-cyan-500 to-blue-500",
  "purple-pink": "from-purple-500 to-pink-500",
} as const;

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
            {/* Avatar dinâmico baseado nos dados do agente */}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${
                agent.avatarType === "icon" && agent.avatarGradient
                  ? GRADIENT_CLASSES[
                      agent.avatarGradient as keyof typeof GRADIENT_CLASSES
                    ] || "from-blue-500 to-purple-500"
                  : "from-blue-500 to-purple-500"
              } rounded-lg flex items-center justify-center shadow-sm overflow-hidden`}
            >
              {agent.avatarType === "unsplash" && agent.avatarImageUrl ? (
                <Image
                  src={agent.avatarImageUrl}
                  alt={agent.name || "Agent"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                (() => {
                  const IconComponent = agent.avatarIcon
                    ? ICON_COMPONENTS[
                        agent.avatarIcon as keyof typeof ICON_COMPONENTS
                      ]
                    : Bot;
                  return IconComponent ? (
                    <IconComponent className="w-6 h-6 text-white" />
                  ) : (
                    <Bot className="w-6 h-6 text-white" />
                  );
                })()
              )}
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
