"use client";

import { useToast } from "@/hooks/useToast";
import {
  AgentsWelcomeSection,
  AgentsGridWithSuspense,
  type Agent,
} from "@/components/features/agents";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewAgentsDialog from "@/components/features/agents/NewAgentsDialog";

export default function AgentsScreen() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const toast = useToast();

  const handleAgentCreated = (agentData: Partial<Agent>) => {
    // TODO: Implementar integração real com API
    toast.agents.createAgent();
    console.log("Agente criado:", agentData);
  };

  const handleConfigureAgent = (agent: Agent) => {
    // TODO: Implementar modal/página de configuração de agente
    toast.agents.configureAgent(agent.name || "Agente");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <AgentsWelcomeSection />

        {/* Quick Action - Create Agent */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Agente
          </Button>
        </div>

        {/* Agents Grid */}
        <AgentsGridWithSuspense
          onCreateFirstAgent={() => setIsCreateDialogOpen(true)}
          onConfigureAgent={handleConfigureAgent}
        />

        {/* Create Agent Dialog */}
        <NewAgentsDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onAgentCreated={handleAgentCreated}
        />
      </div>
    </div>
  );
}
