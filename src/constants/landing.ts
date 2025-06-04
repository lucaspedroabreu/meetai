import type { LucideIcon } from "lucide-react";
import { Brain, Shield, Zap } from "lucide-react";

/**
 * Landing Page Constants
 *
 * Constantes relacionadas à página de landing/inicial
 */

export interface LandingFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

// Features principais da landing page
export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: "ai-advanced",
    icon: Brain,
    title: "IA Avançada",
    description:
      "Processamento de linguagem natural em tempo real com modelos de última geração",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "security",
    icon: Shield,
    title: "Segurança Total",
    description:
      "Seus dados protegidos com criptografia de ponta e conformidade empresarial",
    gradient: "from-green-500/20 to-green-600/20",
  },
  {
    id: "intelligence",
    icon: Zap,
    title: "Super Inteligente",
    description:
      "Insights automáticos, análises preditivas e resumos instantâneos",
    gradient: "from-purple-500/20 to-purple-600/20",
  },
];

// Textos da landing page
export const LANDING_TEXTS = {
  HERO: {
    title: "O Futuro das Videoconferências com IA",
    subtitle: "Transforme suas reuniões com inteligência artificial avançada",
    description:
      "Transcrições em tempo real, resumos automáticos e insights inteligentes para maximizar a produtividade da sua equipe.",
    ctaPrimary: "Começar Gratuitamente",
    ctaSecondary: "Ver Demonstração",
  },
  CTA: {
    title: "Pronto para Revolucionar suas Reuniões?",
    description:
      "Junte-se a milhares de profissionais que já descobriram o poder da IA em videoconferências.",
    buttonText: "Criar Conta Gratuita",
    buttonSubtext: "Sem cartão de crédito • Configuração em 2 minutos",
  },
  FOOTER: {
    copyright: "© 2024 MeetAI. Todos os direitos reservados.",
    description:
      "Revolucionando videoconferências com inteligência artificial.",
    links: {
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      contact: "Contato",
      about: "Sobre",
    },
  },
} as const;

// Configurações da landing page
export const LANDING_CONFIG = {
  ANIMATION_DELAYS: {
    feature1: 0,
    feature2: 50,
    feature3: 100,
  },
  HERO_ANIMATION_DURATION: 500,
  CTA_ANIMATION_DURATION: 300,
} as const;
