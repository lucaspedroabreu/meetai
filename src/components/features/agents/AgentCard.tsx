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
  CheckCircle,
  Clock,
  XCircle,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
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

// Status de pagamento de exemplo
const PAYMENT_STATUS = {
  pending: {
    label: "Pendente",
    icon: Clock,
    color:
      "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  processing: {
    label: "Processando",
    icon: Loader2,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  },
  success: {
    label: "Pago",
    icon: CheckCircle,
    color:
      "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  },
  failed: {
    label: "Falhou",
    icon: XCircle,
    color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  },
} as const;

interface AgentCardProps {
  agent: Agent;
  index: number;
  isConfiguring?: boolean;
}

export default function AgentCard({
  agent,
  index,
  isConfiguring = false,
}: AgentCardProps) {
  const router = useRouter();
  const isInactive = agent.status === "inactive";

  // Dados de pagamento de exemplo - Memoizados com base no ID do agente para consistência
  const examplePayment = useMemo(() => {
    // Usando o ID do agente como seed para valores consistentes
    const seed = agent.id ? String(agent.id).length : index;
    const amountSeed = ((seed * 127) % 500) + 50; // Determinístico baseado no agente
    const statusSeed = (seed * 31) % 4; // Determinístico baseado no agente

    return {
      amount: amountSeed,
      status: ["pending", "processing", "success", "failed"][
        statusSeed
      ] as keyof typeof PAYMENT_STATUS,
    };
  }, [agent.id, index]); // Só recalcula se o agente mudar

  // Contagem de reuniões – será obtida de tabela meetings no futuro.
  // Aqui geramos um número determinístico apenas para exibição.
  const meetingsCount = useMemo(() => {
    const seed = agent.id ? String(agent.id).charCodeAt(0) : index;
    return (seed * 13) % 25; // 0-24 reuniões
  }, [agent.id, index]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Não navegar se o clique foi no botão de configurar
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/agents/${agent.id || index}`);
  };

  const handleConfigureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/agents/${agent.id || index}`);
  };

  const PaymentStatus = PAYMENT_STATUS[examplePayment.status];

  return (
    <div
      className={`group bg-card border border-border/70 rounded-2xl p-6 cursor-pointer
                 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-lg/10
                 ring-1 ring-border/20 hover:ring-blue-400/30 dark:hover:ring-blue-400/40
                 hover:-translate-y-1 hover:scale-[1.015] transition-transform duration-300 ease-out
                 hover:bg-gradient-to-br hover:from-card hover:to-muted/40 dark:hover:to-muted/10
                 ${isInactive ? "opacity-60 saturate-0" : ""}`}
      onClick={handleCardClick}
    >
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
              } rounded-lg flex items-center justify-center shadow-sm overflow-hidden
              group-hover:shadow-md group-hover:scale-110 transition-all duration-300 ease-out
              group-hover:rotate-2`}
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
              <h4 className="font-semibold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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

          {/* Botão Configurar movido para o canto superior direito */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleConfigureClick}
            disabled={isConfiguring}
            className="hover:border-blue-400 dark:hover:border-blue-600 flex-shrink-0
                     hover:bg-blue-50 dark:hover:bg-blue-950/50
                     hover:text-blue-700 dark:hover:text-blue-300
                     hover:shadow-md hover:scale-105
                     transition-all duration-200 ease-out
                     opacity-70 group-hover:opacity-100"
          >
            {isConfiguring ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Settings className="w-4 h-4 mr-2" />
            )}
            {isConfiguring ? "Configurando..." : "Configurar"}
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {agent.description ||
            "Assistente IA personalizado para automatizar tarefas e aumentar produtividade"}
        </p>

        {/* Model Info */}
        {agent.model && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-md px-2 py-1 inline-block">
            Modelo: {agent.model.toUpperCase()}
          </div>
        )}

        {/* Meetings prominent row */}
        <div className="flex items-center justify-between bg-muted/70 dark:bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 group-hover:bg-muted/90 dark:group-hover:bg-muted/50">
          {/* Ícone sozinho à esquerda */}
          <Video className="w-4 h-4 text-primary/80" />

          {/* Número + texto à direita */}
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-foreground">
              {meetingsCount}
            </span>
            <span className="tracking-tight text-foreground/80">
              reunião{meetingsCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Payment Info */}
        {!isInactive && (
          <div className="pt-2 border-t border-border/50 group-hover:border-blue-200/50 dark:group-hover:border-blue-700/50 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-green-600 group-hover:text-green-500 transition-colors duration-300">
                  R$
                </span>
                <span className="text-sm font-medium group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300">
                  {examplePayment.amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${PaymentStatus.color} 
                           group-hover:scale-105 group-hover:shadow-sm transition-all duration-300`}
              >
                <PaymentStatus.icon
                  className={`w-3 h-3 ${
                    examplePayment.status === "processing" ? "animate-spin" : ""
                  }`}
                />
                <span>{PaymentStatus.label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
