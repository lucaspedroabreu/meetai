"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface DashboardScreenProps {
  userEmail: string;
}

// Componente client interno para funcionalidade de logout
function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh(); // Refresh da página para atualizar o server component
          },
        },
      });
    } catch (err) {
      console.error("Erro inesperado no logout:", err);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="lg"
      className="h-12 px-7 bg-background/50 backdrop-blur-sm hover:bg-background/80"
    >
      Fazer Logout
    </Button>
  );
}

export default function DashboardScreen({ userEmail }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center justify-center p-6 lg:p-10 min-h-screen">
        <div className="text-center space-y-10 max-w-4xl">
          {/* Hero Section */}
          <div className="space-y-7">
            <div className="flex justify-center relative">
              <MeetAILogo size={130} variant="gradient" />
            </div>
          </div>

          {/* Logged in state */}
          <div className="space-y-6">
            <div className="relative p-7 bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-2xl shadow-lg backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
              <div className="relative space-y-5">
                <div className="space-y-2">
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Bem-vindo de volta! 👋
                  </h2>
                  <p className="text-muted-foreground">
                    Logado como:{" "}
                    <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {userEmail}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <LogoutButton />
                  <Button
                    size="lg"
                    className="h-12 px-7 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
                  >
                    🚀 Explorar IA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
