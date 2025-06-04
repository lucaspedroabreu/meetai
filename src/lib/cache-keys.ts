// Configurações de cache para diferentes tipos de dados
export const CACHE_CONFIG = {
  // Dados de sessão - raramente mudam
  SESSION: {
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },

  // Dados de agentes - configuração equilibrada
  AGENTS: {
    staleTime: 2 * 60 * 1000, // 2 minutos - equilibrado
    gcTime: 10 * 60 * 1000, // 10 minutos - razoável
    refetchOnMount: false,
    refetchOnWindowFocus: false, // Manter desabilitado para UX
  },

  // Dados de reuniões - podem mudar frequentemente
  MEETINGS: {
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },

  // Dados estáticos/configurações
  STATIC: {
    staleTime: 60 * 60 * 1000, // 1 hora
    gcTime: 24 * 60 * 60 * 1000, // 24 horas
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
} as const;
