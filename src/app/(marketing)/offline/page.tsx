"use client";

import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/features/brand";
import { Card, CardContent } from "@/components/ui/card";

export default function OfflinePage() {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-center">
            <MeetAILogo size={64} animated />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Você está offline
            </h1>
            <p className="text-gray-600">
              Verifique sua conexão com a internet e tente novamente.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Verifique sua conexão Wi-Fi</p>
              <p>• Aguarde alguns segundos e recarregue</p>
              <p>• Entre em contato se o problema persistir</p>
            </div>

            <Button onClick={handleRefresh} className="w-full" size="lg">
              Tentar Novamente
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">Sem conexão com a internet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
