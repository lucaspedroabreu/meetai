"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Trash2,
  Bot,
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
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import {
  useMyAgents,
  useUpdateAgent,
  useDeleteAgent,
} from "@/hooks/useAgentsData";
import EditAgentsForm, {
  type AgentFormRef,
} from "@/components/features/agents/EditAgentsForm";
import type { Agent } from "@/components/features/agents/types";
import type { InsertAgentSchema } from "@/server/trpc/modules/agents/schema";
import { toast } from "sonner";
import { LoadingState } from "@/components/custom/LoadingState";

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

interface AgentDetailsScreenProps {
  agentId: string;
}

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  agentName,
  onConfirm,
  isDeleting,
}: DeleteConfirmDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const requiredText = "Desejo excluir permanentemente";
  const isConfirmValid = confirmText === requiredText;

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmText(""); // Reset do texto quando fechar
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o agente &quot;{agentName}&quot;?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-text" className="text-sm font-medium">
              Para confirmar, digite:{" "}
              <span className="font-mono text-destructive">
                &quot;{requiredText}&quot;
              </span>
            </Label>
            <Input
              id="confirm-text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={requiredText}
              disabled={isDeleting}
              className={`font-mono transition-colors ${
                confirmText.length > 0
                  ? isConfirmValid
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                    : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              }`}
              autoComplete="off"
            />
            {confirmText.length > 0 && (
              <p
                className={`text-xs ${
                  isConfirmValid ? "text-green-600" : "text-red-600"
                }`}
              >
                {isConfirmValid ? "✓ Texto confirmado" : "✗ Texto não confere"}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting || !isConfirmValid}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Excluindo..." : "Excluir Permanentemente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function AgentDetailsScreen({
  agentId,
}: AgentDetailsScreenProps) {
  const router = useRouter();
  const agentFormRef = useRef<AgentFormRef>(null);
  const updateAgentMutation = useUpdateAgent();
  const deleteAgentMutation = useDeleteAgent();
  const [isFormValid, setIsFormValid] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Buscar dados dos agentes
  const { data: agentsData, isLoading, error } = useMyAgents();

  // Extrai a lista de agentes do response
  const agents = agentsData?.agents ?? [];

  // Encontrar o agente específico (pode ser por ID ou índice)
  const agent = agents.find(
    (a) => String(a.id) === agentId || agents.indexOf(a).toString() === agentId
  );

  // Dados de pagamento de exemplo para este agente - Memoizados para performance
  const examplePayment = useMemo(() => {
    if (!agent)
      return { amount: 100, status: "pending" as keyof typeof PAYMENT_STATUS };

    // Usando o ID do agente como seed para valores consistentes
    const seed = agent.id ? String(agent.id).length : parseInt(agentId) || 0;
    const amountSeed = ((seed * 127) % 500) + 50; // Determinístico baseado no agente
    const statusSeed = (seed * 31) % 4; // Determinístico baseado no agente

    return {
      amount: amountSeed,
      status: ["pending", "processing", "success", "failed"][
        statusSeed
      ] as keyof typeof PAYMENT_STATUS,
    };
  }, [agentId, agent]); // include agent

  // Função para mapear dados do frontend para o schema do backend
  const mapToUpdateSchema = (
    agentData: Partial<Agent>
  ): Partial<InsertAgentSchema> => {
    return {
      instructions: agentData.instructions,
      description: agentData.description ? agentData.description : undefined,
      model: agentData.model as InsertAgentSchema["model"],
      status: agentData.status as InsertAgentSchema["status"],
      avatarType: agentData.avatarType as InsertAgentSchema["avatarType"],
      avatarIcon: agentData.avatarIcon as InsertAgentSchema["avatarIcon"],
      avatarGradient:
        agentData.avatarGradient as InsertAgentSchema["avatarGradient"],
      avatarImageUrl: agentData.avatarImageUrl,
    };
  };

  const handleSubmit = async (agentData: Partial<Agent>) => {
    if (!agent) return;

    try {
      const updateData = mapToUpdateSchema(agentData);
      await updateAgentMutation.mutateAsync({
        id: String(agent.id),
        ...updateData,
      });

      toast.success("Agente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar agente:", error);
      toast.error("Erro ao atualizar agente. Tente novamente.");
    }
  };

  const handleDelete = async () => {
    if (!agent) return;

    try {
      await deleteAgentMutation.mutateAsync({ id: String(agent.id) });
      toast.success("Agente excluído com sucesso!");
      setShowDeleteConfirm(false);
      router.push("/agents");
    } catch (error) {
      console.error("Erro ao excluir agente:", error);
      toast.error("Erro ao excluir agente. Tente novamente.");
    }
  };

  const handleSaveClick = () => {
    agentFormRef.current?.handleSubmit();
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const PaymentStatus = PAYMENT_STATUS[examplePayment.status];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <div className="container mx-auto px-6 py-8">
          <LoadingState
            title="Carregando Agente"
            description="Buscando informações do agente..."
            size="lg"
            className="min-h-[400px]"
          />
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Agente não encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              O agente solicitado não foi encontrado ou você não tem permissão
              para visualizá-lo.
            </p>
            <Button onClick={() => router.push("/agents")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Agentes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <div className="container mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/agents")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  {agent.name || `Agente #${agentId}`}
                </h1>
                <p className="text-muted-foreground">
                  Configure e gerencie seu assistente IA
                </p>
              </div>
            </div>

            <Button
              onClick={handleSaveClick}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
              disabled={updateAgentMutation.isPending || !isFormValid}
            >
              <Save className="w-4 h-4 mr-2" />
              {updateAgentMutation.isPending
                ? "Salvando..."
                : "Salvar Alterações"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resumo do Agente */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card Principal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${
                        agent.avatarType === "icon" && agent.avatarGradient
                          ? GRADIENT_CLASSES[
                              agent.avatarGradient as keyof typeof GRADIENT_CLASSES
                            ] || "from-blue-500 to-purple-500"
                          : "from-blue-500 to-purple-500"
                      } rounded-xl flex items-center justify-center shadow-lg overflow-hidden`}
                    >
                      {agent.avatarType === "unsplash" &&
                      agent.avatarImageUrl ? (
                        <Image
                          src={agent.avatarImageUrl}
                          alt={agent.name || "Agent"}
                          width={64}
                          height={64}
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
                            <IconComponent className="w-8 h-8 text-white" />
                          ) : (
                            <Bot className="w-8 h-8 text-white" />
                          );
                        })()
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {agent.name || `Agente #${agentId}`}
                      </h3>
                      <Badge
                        variant={
                          agent.status === "inactive" ? "secondary" : "default"
                        }
                        className={
                          agent.status === "inactive"
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }
                      >
                        {agent.status === "inactive" ? "Inativo" : "Ativo"}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Descrição
                    </h4>
                    <p className="text-sm">
                      {agent.description ||
                        "Assistente IA personalizado para automatizar tarefas e aumentar produtividade"}
                    </p>
                  </div>

                  {agent.model && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">
                        Modelo
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {agent.model.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Card Financeiro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Resumo Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-green-600">
                        R$
                      </span>
                      <span className="text-lg font-semibold">
                        {examplePayment.amount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${PaymentStatus.color}`}
                    >
                      <PaymentStatus.icon
                        className={`w-3 h-3 ${
                          examplePayment.status === "processing"
                            ? "animate-spin"
                            : ""
                        }`}
                      />
                      <span>{PaymentStatus.label}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Último pagamento processado
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Edição */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Agente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EditAgentsForm
                    ref={agentFormRef}
                    agent={agent as Agent}
                    onSubmit={handleSubmit}
                    onCancel={() => router.push("/agents")}
                    isLoading={updateAgentMutation.isPending}
                    onValidationChange={handleValidationChange}
                  />

                  {/* Zona de Perigo */}
                  <div className="relative overflow-hidden rounded-lg border border-red-200/60 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/20 dark:to-red-900/10 dark:border-red-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>
                    <div className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 ring-1 ring-red-200/60 dark:ring-red-800/40">
                            <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Zona de Perigo
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            Excluir este agente permanentemente. Esta ação não
                            pode ser desfeita e todos os dados associados serão
                            perdidos.
                          </p>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteClick}
                            disabled={
                              updateAgentMutation.isPending ||
                              deleteAgentMutation.isPending
                            }
                            className="shadow-sm hover:shadow-md"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Deletar Agente
                          </Button>
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/60 to-transparent"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        agentName={agent.name || `Agente #${agentId}`}
        onConfirm={handleDelete}
        isDeleting={deleteAgentMutation.isPending}
      />
    </>
  );
}
