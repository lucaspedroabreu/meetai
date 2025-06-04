"use client";

import { MeetAILogo } from "@/components/features/brand";
import { useDashboardUser } from "@/components/layout/DashboardLayout";

interface AgentsWelcomeSectionProps {
  agentsCount?: number;
}

export default function AgentsWelcomeSection({
  agentsCount = 0,
}: AgentsWelcomeSectionProps) {
  const user = useDashboardUser();

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <MeetAILogo size={80} variant="gradient" animated={true} />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-violet-600 bg-clip-text text-transparent">
          Seus Agentes IA{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Gerencie e configure seus assistentes de IA personalizados
        </p>
        <p className="text-md text-muted-foreground">
          Você possui {agentsCount} agentes ativos
        </p>
      </div>
    </div>
  );
}
