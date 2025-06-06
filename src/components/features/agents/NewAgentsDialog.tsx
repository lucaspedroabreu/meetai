import { ResponsiveDialog } from "@/components/custom/ResponsiveDialog";
import NewAgentsForm, { type AgentFormRef } from "./NewAgentsForm";
import type { Agent } from "./types";
import type { InsertAgentSchema } from "@/server/trpc/modules/agents/schema";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Save } from "lucide-react";
import { useCreateAgent } from "@/hooks/useAgentsData";
import { toast } from "sonner";

interface NewAgentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAgentCreated?: (agent: Partial<Agent>) => void;
}

export default function NewAgentsDialog({
  isOpen,
  onOpenChange,
  onAgentCreated,
}: NewAgentsDialogProps) {
  const agentFormRef = useRef<AgentFormRef>(null);
  const createAgentMutation = useCreateAgent();
  const [isFormValid, setIsFormValid] = useState(false);

  // Função para mapear dados do frontend para o schema do backend
  const mapToInsertSchema = (agentData: Partial<Agent>): InsertAgentSchema => {
    return {
      name: agentData.name || "",
      instructions: agentData.instructions || "",
      description: agentData.description,
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
    try {
      // Mapear os dados do formulário para o formato esperado pela API
      const createData = mapToInsertSchema(agentData);

      // Executar a mutation para criar o agente
      const result = await createAgentMutation.mutateAsync(createData);

      toast.success("Agente criado com sucesso!");
      onAgentCreated?.(result as Partial<Agent>);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar agente:", error);
      toast.error("Erro ao criar agente. Tente novamente.");
    }
  };

  const handleSaveClick = () => {
    agentFormRef.current?.handleSubmit();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Criar Novo Agente"
      description="Configure seu assistente IA personalizado"
      maxWidth="3xl"
      hideHeader={true}
      hideCloseButton={true}
      footerContent={
        <div className="flex gap-3 pt-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <Button
                    type="button"
                    onClick={handleSaveClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 h-10"
                    disabled={createAgentMutation.isPending || !isFormValid}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {createAgentMutation.isPending
                      ? "Salvando..."
                      : "Criar Agente"}
                  </Button>
                </div>
              </TooltipTrigger>
              {!isFormValid && !createAgentMutation.isPending && (
                <TooltipContent>
                  <p>Preencha os campos obrigatórios para criar o agente</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6 h-10 transition-colors hover:bg-muted"
            disabled={createAgentMutation.isPending}
          >
            Cancelar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <NewAgentsForm
          ref={agentFormRef}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={createAgentMutation.isPending}
          onValidationChange={handleValidationChange}
        />
      </div>
    </ResponsiveDialog>
  );
}
