// Types for the agents feature
export interface Agent {
  id: string | number;
  name?: string;
  description?: string;
  status?: "active" | "inactive";
  model?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface AgentActions {
  onCreateAgent?: () => void;
  onViewModels?: () => void;
  onCreateFirstAgent?: () => void;
  onConfigureAgent?: (agent: Agent) => void;
  onDeleteAgent?: (agent: Agent) => void;
  onToggleStatus?: (agent: Agent) => void;
}

export interface AgentsState {
  agents?: Agent[];
  isLoading?: boolean;
  error?: string | null;
}
