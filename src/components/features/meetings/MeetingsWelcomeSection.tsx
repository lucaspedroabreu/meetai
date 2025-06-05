"use client";

import { ResponsiveDialog } from "@/components/custom/ResponsiveDialog";
import { MeetAILogo } from "@/components/features/brand";
import { useDashboardUser } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const MeetingsWelcomeSection = () => {
  const user = useDashboardUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <MeetAILogo size={80} variant="gradient" animated={true} />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-violet-600 bg-clip-text text-transparent">
          Bem-vindo às suas Reuniões{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Gerencie suas reuniões e colaborações com IA de forma inteligente
        </p>
      </div>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Info className="w-4 h-4 mr-2" />
        Saiba mais
      </Button>
      <ResponsiveDialog
        title="Reuniões"
        description="Gerencie suas reuniões e colaborações com IA de forma inteligente"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <div>
          <p>Bem-vindo às suas Reuniões{user?.name ? `, ${user.name}` : ""}!</p>
        </div>
      </ResponsiveDialog>
    </div>
  );
};
