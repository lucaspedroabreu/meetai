import { ResponsiveDialog } from "@/components/custom/ResponsiveDialog";
import EditAgentsForm, { type AgentFormRef } from "./EditAgentsForm";
import type { Agent } from "./types";
import type { InsertAgentSchema } from "@/server/trpc/modules/agents/schema";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save, Trash2 } from "lucide-react";
import { useUpdateAgent, useDeleteAgent } from "@/hooks/useAgentsData";
import { toast } from "sonner";

interface EditAgentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  onAgentUpdated?: (agent: Partial<Agent>) => void;
  onAgentDeleted?: () => void;
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

export default function EditAgentsDialog({
  isOpen,
  onOpenChange,
  agent,
  onAgentUpdated,
  onAgentDeleted,
}: EditAgentsDialogProps) {
  const agentFormRef = useRef<AgentFormRef>(null);
  const updateAgentMutation = useUpdateAgent();
  const deleteAgentMutation = useDeleteAgent();
  const [isFormValid, setIsFormValid] = useState(true); // Inicia como válido para edição
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Função para mapear dados do frontend para o schema do backend
  const mapToUpdateSchema = (
    agentData: Partial<Agent>
  ): Partial<InsertAgentSchema> => {
    return {
      instructions: agentData.instructions,
      description:
        agentData.description !== null && agentData.description !== undefined
          ? agentData.description
          : undefined,
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
      // Mapear os dados do formulário para o formato esperado pela API
      const updateData = mapToUpdateSchema(agentData);

      // Executar a mutation para atualizar o agente
      const result = await updateAgentMutation.mutateAsync({
        id: String(agent.id),
        ...updateData,
      });

      toast.success("Agente atualizado com sucesso!");
      onAgentUpdated?.(result as Partial<Agent>);
      onOpenChange(false);
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
      onAgentDeleted?.();
      setShowDeleteConfirm(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao excluir agente:", error);
      toast.error("Erro ao excluir agente. Tente novamente.");
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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  if (!agent) return null;

  return (
    <>
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={onOpenChange}
        title="Editar Agente"
        description="Modifique as configurações do seu assistente IA"
        maxWidth="3xl"
        footerContent={
          <div className="flex gap-3 pt-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 min-w-0">
                    <Button
                      type="button"
                      onClick={handleSaveClick}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 h-10"
                      disabled={updateAgentMutation.isPending || !isFormValid}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateAgentMutation.isPending
                        ? "Salvando..."
                        : "Salvar Alterações"}
                    </Button>
                  </div>
                </TooltipTrigger>
                {!isFormValid && !updateAgentMutation.isPending && (
                  <TooltipContent>
                    <p>Preencha os campos obrigatórios para salvar</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6 h-10 transition-colors hover:bg-muted shrink-0"
              disabled={updateAgentMutation.isPending}
            >
              Cancelar
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <EditAgentsForm
            ref={agentFormRef}
            agent={agent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={updateAgentMutation.isPending}
            onValidationChange={handleValidationChange}
          />

          {/* Zona de Perigo - Design Compacto e Responsivo */}
          <div className="relative overflow-hidden rounded-lg border border-red-200/60 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/20 dark:to-red-900/10 dark:border-red-800/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>

            {/* Content */}
            <div className="relative p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 ring-1 ring-red-200/60 dark:ring-red-800/40">
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Zona de Perigo
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Excluir este agente permanentemente. Esta ação não pode ser
                    desfeita.
                  </p>

                  {/* Action Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteClick}
                    disabled={
                      updateAgentMutation.isPending ||
                      deleteAgentMutation.isPending
                    }
                    className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    <Trash2 className="w-3 h-3 mr-1.5" />
                    Deletar Agente
                  </Button>
                </div>
              </div>

              {/* Subtle border accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </ResponsiveDialog>

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        agentName={agent.name}
        onConfirm={handleDelete}
        isDeleting={deleteAgentMutation.isPending}
      />
    </>
  );
}
