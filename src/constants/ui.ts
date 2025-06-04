/**
 * UI Constants
 *
 * Constantes relacionadas à interface do usuário
 */

// Breakpoints responsivos
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Durações de animação padrão
export const ANIMATION_DURATIONS = {
  fast: 150, // ms
  normal: 200, // ms
  slow: 300, // ms
  slower: 500, // ms
  slowest: 1000, // ms
} as const;

// Configurações de glassmorphism
export const GLASS_EFFECTS = {
  light: "backdrop-blur-sm bg-white/10",
  medium: "backdrop-blur-md bg-white/20",
  heavy: "backdrop-blur-lg bg-white/30",
  card: "backdrop-blur-xl bg-white/5 border border-white/10",
  cardDark: "backdrop-blur-xl bg-black/20 border border-white/10",
} as const;

// Gradientes do tema
export const BRAND_GRADIENTS = {
  primary: "bg-gradient-to-r from-purple-600 to-violet-600",
  secondary: "bg-gradient-to-r from-blue-600 to-indigo-600",
  success: "bg-gradient-to-r from-green-500 to-emerald-500",
  warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
  error: "bg-gradient-to-r from-red-500 to-rose-500",
  auth: "bg-auth-gradient",
  landing: "bg-landing-gradient",
  dashboard: "bg-dashboard-gradient",
} as const;

// Cores do tema
export const THEME_COLORS = {
  brand: {
    primary: "#8B5CF6", // purple-500
    secondary: "#6366F1", // indigo-500
    accent: "#EC4899", // pink-500
  },
  feedback: {
    success: "#10B981", // emerald-500
    warning: "#F59E0B", // amber-500
    error: "#EF4444", // red-500
    info: "#3B82F6", // blue-500
  },
  neutral: {
    900: "#111827", // gray-900
    800: "#1F2937", // gray-800
    700: "#374151", // gray-700
    600: "#4B5563", // gray-600
    500: "#6B7280", // gray-500
    400: "#9CA3AF", // gray-400
    300: "#D1D5DB", // gray-300
    200: "#E5E7EB", // gray-200
    100: "#F3F4F6", // gray-100
    50: "#F9FAFB", // gray-50
  },
} as const;

// Sombras padrão
export const SHADOWS = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  brand: "0 8px 32px rgb(139 92 246 / 0.3)",
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  auth: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
} as const;

// Tamanhos de componentes
export const COMPONENT_SIZES = {
  button: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-8 text-base",
    xl: "h-12 px-10 text-lg",
  },
  input: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-11 px-4 text-base",
  },
  avatar: {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  },
  logo: {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 80,
  },
} as const;

// Estados de hover e focus
export const INTERACTION_STATES = {
  hover: {
    scale: "hover:scale-105",
    opacity: "hover:opacity-80",
    brightness: "hover:brightness-110",
    purple: "hover-purple",
    violet: "hover-violet",
  },
  focus: {
    ring: "focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
    outline: "focus:outline-none focus:ring-2 focus:ring-purple-500",
  },
  active: {
    scale: "active:scale-95",
    opacity: "active:opacity-70",
  },
} as const;

// Configurações de transição
export const TRANSITIONS = {
  all: "transition-all duration-200 ease-in-out",
  colors: "transition-colors duration-200 ease-in-out",
  transform: "transition-transform duration-200 ease-in-out",
  opacity: "transition-opacity duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
} as const;
