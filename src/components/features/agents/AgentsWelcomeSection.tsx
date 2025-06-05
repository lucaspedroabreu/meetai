"use client";

import { useDashboardUser } from "@/components/layout/DashboardLayout";
import { AgentsCount } from "./AgentsCount";
import { Bot } from "lucide-react";

export default function AgentsWelcomeSection() {
  const user = useDashboardUser();

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Bot className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Seus Agentes IA{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Gerencie e configure seus assistentes de IA personalizados para
          automatizar tarefas e melhorar sua produtividade
        </p>
        <div className="text-sm text-muted-foreground">
          <AgentsCount />
        </div>
      </div>
    </div>
  );
}
