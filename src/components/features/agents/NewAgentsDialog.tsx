import { ResponsiveDialog } from "@/components/custom/ResponsiveDialog";
import AgentForm, { type AgentFormRef } from "./AgentForm";
import type { Agent } from "./types";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const agentFormRef = useRef<AgentFormRef>(null);

  const handleSubmit = async (agentData: Partial<Agent>) => {
    setIsLoading(true);
    try {
      // TODO: Implementar criação do agente aqui
      console.log("Criando agente:", agentData);
      onAgentCreated?.(agentData);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = () => {
    agentFormRef.current?.handleSubmit();
  };

  const handleCancel = () => {
    onOpenChange(false);
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
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={handleSaveClick}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-11"
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Salvando..." : "Criar Agente"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6 h-11 transition-colors hover:bg-muted"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      }
    >
      <AgentForm
        ref={agentFormRef}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </ResponsiveDialog>
  );
}
