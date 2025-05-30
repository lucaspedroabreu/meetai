"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MeetAILogo } from "@/components/custom/Logo";

export default function OfflinePage() {
  const handleRefresh = () => {
    try {
      window.location.reload();
    } catch (error) {
      // Fallback: navigate to home page
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <MeetAILogo size={64} animated />
        </div>

        {/* Ícone de offline */}
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Offline</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728m0 0L12 12m-6.364 6.364L12 12m6.364-6.364L12 12"
            />
          </svg>
        </div>

        {/* Conteúdo */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Você está offline
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Parece que você perdeu a conexão com a internet. Verifique sua conexão
          e tente novamente.
        </p>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button onClick={handleRefresh} className="w-full" size="lg">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Recarregar</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Tentar novamente
          </Button>

          <Link href="/" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Voltar ao início
            </Button>
          </Link>
        </div>

        {/* Dicas */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Dicas para resolver:
          </h3>
          <ul className="text-xs text-blue-800 space-y-1 text-left">
            <li>• Verifique sua conexão Wi-Fi</li>
            <li>• Tente usar dados móveis</li>
            <li>• Reinicie seu roteador</li>
            <li>• Aguarde alguns minutos</li>
          </ul>
        </div>

        {/* Status da conexão */}
        <div className="mt-6 text-xs text-gray-500">
          <span id="connection-status">🔴 Desconectado</span>
        </div>
      </div>
    </div>
  );
}
