// Types for the agents feature
export interface Agent {
  id: string | number;
  name: string;
  instructions: string;
  description?: string | null;
  status?: string;
  model?: string;

  // Avatar fields
  avatarType?: "icon" | "unsplash";
  avatarIcon?: string; // ID of the selected icon (e.g., 'bot', 'brain', etc.)
  avatarGradient?: string; // ID of the gradient (e.g., 'blue-purple')
  avatarImageUrl?: string; // URL for custom or Unsplash images

  // Timestamps
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

export type AgentsCountState =
  | { status: "loading" }
  | { status: "error"; message?: string }
  | { status: "success"; count: number };
