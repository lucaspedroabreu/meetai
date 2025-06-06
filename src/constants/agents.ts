/**
 * Constants for agent management
 */

// Modelos de IA disponíveis
export const AI_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4",
  "gpt-3.5-turbo",
  "claude-3",
] as const;

export type AIModel = (typeof AI_MODELS)[number];

// Status possíveis para agentes
export const AGENT_STATUS = ["active", "inactive"] as const;
export type AgentStatus = (typeof AGENT_STATUS)[number];

// Tipos de avatar
export const AVATAR_TYPES = ["icon", "unsplash"] as const;
export type AvatarType = (typeof AVATAR_TYPES)[number];

// Ícones disponíveis para avatares
export const AGENT_AVATAR_ICONS = [
  "bot",
  "brain",
  "cpu",
  "sparkles",
  "zap",
  "message",
  "lightbulb",
  "cog",
  "wand",
  "shield",
  "rocket",
  "heart",
] as const;

export type AgentAvatarIcon = (typeof AGENT_AVATAR_ICONS)[number];

// Gradientes disponíveis para avatares
export const AVATAR_GRADIENTS = [
  "blue-purple",
  "green-teal",
  "orange-red",
  "pink-purple",
  "indigo-blue",
  "yellow-orange",
  "cyan-blue",
  "purple-pink",
] as const;

export type AvatarGradient = (typeof AVATAR_GRADIENTS)[number];

// Valores padrão
export const DEFAULT_VALUES = {
  model: "gpt-4o" as AIModel,
  status: "active" as AgentStatus,
  avatarType: "icon" as AvatarType,
  avatarIcon: "bot" as AgentAvatarIcon,
  avatarGradient: "blue-purple" as AvatarGradient,
} as const;
