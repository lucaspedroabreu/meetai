/**
 * Shared Constants
 *
 * Constantes compartilhadas por toda a aplicação
 */

// URLs e endpoints
export const URLS = {
  api: {
    base: process.env.NEXT_PUBLIC_API_URL || "/api",
    auth: "/api/auth",
    trpc: "/api/trpc",
  },
  routes: {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
    welcome: "/welcome",
    dashboard: "/",
    meetings: "/meetings",
    agents: "/agents",
    upgrade: "/upgrade",
    terms: "/terms",
    privacy: "/privacy",
    offline: "/offline",
  },
  external: {
    github: "https://github.com",
    support: "mailto:support@meetai.com",
    documentation: "https://docs.meetai.com",
  },
} as const;

// Metadados da aplicação
export const APP_METADATA = {
  name: "MeetAI",
  description: "O futuro das videoconferências com IA",
  version: "0.1.0-alpha",
  author: "MeetAI Team",
  keywords: [
    "videoconferência",
    "IA",
    "inteligência artificial",
    "reuniões",
    "transcrição",
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "https://meetai.com",
  email: "contact@meetai.com",
  social: {
    twitter: "@meetai",
    linkedin: "company/meetai",
    github: "meetai/platform",
  },
} as const;

// Configurações de cache e performance
export const SWR_CONFIG = {
  swr: {
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
  },
  static: {
    maxAge: 3600, // 1 hora
    staleWhileRevalidate: 86400, // 24 horas
  },
} as const;

// Limites e validações globais
export const LIMITS = {
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  },
  text: {
    maxNameLength: 100,
    maxEmailLength: 254,
    maxBioLength: 500,
    maxMessageLength: 2000,
  },
  api: {
    rateLimit: 100, // requests per minute
    timeout: 30000, // 30 seconds
  },
} as const;

// Configurações de notificação
export const NOTIFICATION_CONFIG = {
  position: "top-right" as const,
  duration: {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
  },
  maxNotifications: 5,
} as const;

// Configurações de tema
export const THEME_CONFIG = {
  default: "dark" as const,
  storageKey: "meetai-theme",
  modes: ["light", "dark", "system"] as const,
} as const;

// Configurações de PWA
export const PWA_CONFIG = {
  name: "MeetAI",
  shortName: "MeetAI",
  description: "Videoconferências com Inteligência Artificial",
  themeColor: "#8B5CF6",
  backgroundColor: "#111827",
  display: "standalone" as const,
  orientation: "portrait" as const,
} as const;

// Configurações de Analytics
export const ANALYTICS_CONFIG = {
  gtag: process.env.NEXT_PUBLIC_GA_ID,
  hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID,
  mixpanel: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
} as const;

// Padrões regex úteis
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  phone: /^\+?[\d\s\-()]+$/,
  url: /^https?:\/\/.+/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

// Mensagens de erro genéricas
export const GENERIC_ERRORS = {
  NETWORK: "Erro de conexão. Verifique sua internet",
  TIMEOUT: "Tempo limite excedido. Tente novamente",
  UNAUTHORIZED: "Sessão expirada. Faça login novamente",
  FORBIDDEN: "Você não tem permissão para esta ação",
  NOT_FOUND: "Recurso não encontrado",
  SERVER_ERROR: "Erro interno do servidor",
  UNKNOWN: "Erro inesperado. Tente novamente",
} as const;
