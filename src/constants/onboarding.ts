/**
 * Onboarding Constants
 *
 * Constantes relacionadas ao fluxo de onboarding/boas-vindas
 */

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: (userName?: string, userEmail?: string) => string;
  contentType: "welcome" | "features" | "completion";
}

export interface OnboardingFeature {
  id: string;
  emoji: string;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  textColor: string;
}

// Steps do onboarding
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao MeetAI! 🎉",
    subtitle: (userName?: string, _userEmail?: string) =>
      `Olá${
        userName ? `, ${userName}` : ""
      }! Sua conta foi criada com sucesso.`,
    contentType: "welcome",
  },
  {
    id: "features",
    title: "Recursos Poderosos ⚡",
    subtitle: () => "Descubra o que você pode fazer com o MeetAI",
    contentType: "features",
  },
  {
    id: "completion",
    title: "Tudo Pronto! 🚀",
    subtitle: () => "Sua jornada com IA começa agora",
    contentType: "completion",
  },
];

// Features mostradas no onboarding
export const ONBOARDING_FEATURES: OnboardingFeature[] = [
  {
    id: "ai-realtime",
    emoji: "🤖",
    title: "IA em Tempo Real",
    description:
      "Transcrições instantâneas e resumos automáticos das suas reuniões",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconBgColor: "bg-blue-100",
    textColor: "text-blue-900",
  },
  {
    id: "privacy",
    emoji: "🔒",
    title: "Privacidade Total",
    description: "Seus dados são criptografados e nunca compartilhados",
    bgColor: "success-message",
    borderColor: "border",
    iconBgColor: "bg-green-100",
    textColor: "text-green-900",
  },
  {
    id: "insights",
    emoji: "📊",
    title: "Insights Inteligentes",
    description: "Análises automáticas e sugestões baseadas em IA",
    bgColor: "glass-card",
    borderColor: "border-purple-200",
    iconBgColor: "bg-purple-100",
    textColor: "text-purple-900",
  },
];

// Textos do onboarding
export const ONBOARDING_TEXTS = {
  WELCOME: {
    description:
      "Você agora faz parte da próxima geração de videoconferências com IA.",
    accountCreated: "✨ Conta criada:",
  },
  COMPLETION: {
    description: "Você está pronto para começar a usar o MeetAI!",
    tip: "💡 Dica: Explore o dashboard para descobrir todas as funcionalidades disponíveis.",
    tipLabel: "Dica:",
  },
  BUTTONS: {
    next: "Próximo",
    back: "Voltar",
    finish: "🚀 Começar a usar",
    skip: "Pular tutorial",
    continue: "Continuar para Welcome",
    completing: "Finalizando...",
  },
  SUCCESS: {
    title: "Conta criada com sucesso!",
    description:
      "Bem-vindo ao MeetAI! Fazendo login automaticamente e preparando sua experiência...",
    preparing: "Preparando sua conta...",
  },
} as const;

// Configurações do onboarding
export const ONBOARDING_CONFIG = {
  COMPLETION_DELAY: 1000, // ms para redirecionar após completar
  ANIMATION_DURATION: 300, // ms para animações
  PROGRESS_ANIMATION_DURATION: 300, // ms para animação do progresso
} as const;
