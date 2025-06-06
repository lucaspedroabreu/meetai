import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  Pencil,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  MessageSquare,
  Lightbulb,
  Cog,
  Wand2,
  Shield,
  Rocket,
  Heart,
  Settings,
  FileText,
  User,
} from "lucide-react";
import AvatarPicker from "./AvatarPicker";
import type { Agent } from "./types";
import { AI_MODELS, DEFAULT_VALUES } from "@/constants/agents";

interface EditAgentFormProps {
  agent: Agent; // Obrigatório para edição
  onSubmit: (agentData: Partial<Agent>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  onDelete?: () => void;
}

interface AgentFormRef {
  handleSubmit: () => void;
}

// Character limits from schema
const CHAR_LIMITS = {
  name: { soft: 100, hard: 150 }, // 1.5x do limite original
  instructions: { soft: 500, hard: 750 }, // 1.5x do limite original
  description: { soft: 200, hard: 300 }, // 1.5x do limite original
} as const;

// Character Counter Component
interface CharCounterProps {
  current: number;
  softLimit: number;
  hardLimit: number;
  className?: string;
}

const CharCounter = ({
  current,
  softLimit,
  hardLimit: _hardLimit,
  className = "",
}: CharCounterProps) => {
  const percentage = (current / softLimit) * 100;

  const getCounterStyles = () => {
    if (percentage >= 100) {
      return "text-red-600 dark:text-red-400 font-semibold";
    } else if (percentage >= 90) {
      return "text-orange-600 dark:text-orange-400 font-medium";
    } else if (percentage >= 80) {
      return "text-yellow-600 dark:text-yellow-500";
    } else {
      return "text-muted-foreground";
    }
  };

  const getProgressStyles = () => {
    if (percentage >= 100) {
      return "bg-red-500";
    } else if (percentage >= 90) {
      return "bg-orange-500";
    } else if (percentage >= 80) {
      return "bg-yellow-500";
    } else {
      return "bg-blue-500";
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Aviso na esquerda */}
      <div className="flex-1">
        {percentage >= 90 && (
          <span className="text-xs text-muted-foreground">
            {percentage >= 100 ? "Limite excedido" : "Próximo do limite"}
          </span>
        )}
      </div>

      {/* Contador na direita */}
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getProgressStyles()}`}
            style={{ width: `${Math.min(percentage, 150)}%` }}
          />
        </div>
        <span className={`text-xs transition-colors ${getCounterStyles()}`}>
          {current > softLimit ? (
            <span>
              {current}/{softLimit}{" "}
              <span className="text-red-500">(+{current - softLimit})</span>
            </span>
          ) : (
            <span>
              {current}/{softLimit}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

// Simple warning component for name field
interface LimitWarningProps {
  current: number;
  softLimit: number;
  className?: string;
}

const _LimitWarning = ({
  current,
  softLimit,
  className = "",
}: LimitWarningProps) => {
  if (current < softLimit) return null;

  return (
    <div className={`${className}`}>
      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
        Limite de {softLimit} caracteres excedido
      </span>
    </div>
  );
};

// Available icons mapping using constants
const AGENT_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  bot: Bot,
  brain: Brain,
  cpu: Cpu,
  sparkles: Sparkles,
  zap: Zap,
  message: MessageSquare,
  lightbulb: Lightbulb,
  cog: Cog,
  wand: Wand2,
  shield: Shield,
  rocket: Rocket,
  heart: Heart,
};

// Gradient colors mapping using constants
const GRADIENT_COLORS: Record<string, { from: string; to: string }> = {
  "blue-purple": { from: "from-blue-500", to: "to-purple-500" },
  "green-teal": { from: "from-green-500", to: "to-teal-500" },
  "orange-red": { from: "from-orange-500", to: "to-red-500" },
  "pink-purple": { from: "from-pink-500", to: "to-purple-500" },
  "indigo-blue": { from: "from-indigo-500", to: "to-blue-500" },
  "yellow-orange": { from: "from-yellow-500", to: "to-orange-500" },
  "cyan-blue": { from: "from-cyan-500", to: "to-blue-500" },
  "purple-pink": { from: "from-purple-500", to: "to-pink-500" },
};

const EditAgentsForm = forwardRef<AgentFormRef, EditAgentFormProps>(
  (
    {
      agent,
      onSubmit,
      onCancel: _onCancel,
      isLoading: _isLoading,
      onValidationChange,
      onDelete: _onDelete,
    },
    ref
  ) => {
    const [formData, setFormData] = useState({
      name: agent.name || "",
      description: agent.description || "",
      instructions: agent.instructions || "",
      model: agent.model || DEFAULT_VALUES.model,
      status: agent.status || DEFAULT_VALUES.status,
      avatarType: agent.avatarType || DEFAULT_VALUES.avatarType,
      avatarIcon: agent.avatarIcon || DEFAULT_VALUES.avatarIcon,
      avatarGradient: agent.avatarGradient || DEFAULT_VALUES.avatarGradient,
      avatarImageUrl: agent.avatarImageUrl || "",
    });

    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    // Helper function to get input styles based on character count
    const getInputStyles = (
      current: number,
      softLimit: number,
      hardLimit: number,
      baseColor: string
    ) => {
      const percentage = (current / softLimit) * 100;
      const base = `transition-all duration-200 focus:ring-2`;

      if (percentage >= 100) {
        return `${base} border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-400`;
      } else if (percentage >= 90) {
        return `${base} border-orange-500 focus:border-orange-500 focus:ring-orange-500/20 text-orange-900 dark:text-orange-100`;
      } else if (percentage >= 80) {
        return `${base} border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20 text-yellow-900 dark:text-yellow-100`;
      } else {
        return `${base} focus:ring-${baseColor}-500/20`;
      }
    };

    // Helper function to handle input change with hard limit
    const handleInputChange = (
      value: string,
      hardLimit: number,
      onChange: (value: string) => void
    ) => {
      if (value.length <= hardLimit) {
        onChange(value);
      }
    };

    // Validation function to check if form is valid
    const isFormValid = useCallback(() => {
      // Check required fields (name não é editável)
      const hasInstructions = formData.instructions.trim().length > 0;

      // Check avatar image URL requirement for unsplash type
      let hasValidAvatar = true;
      if (formData.avatarType === "unsplash") {
        hasValidAvatar = Boolean(formData.avatarImageUrl?.trim());
      }

      return hasInstructions && hasValidAvatar;
    }, [formData.instructions, formData.avatarType, formData.avatarImageUrl]);

    // Effect to notify parent about validation changes
    useEffect(() => {
      onValidationChange?.(isFormValid());
    }, [
      formData.instructions,
      formData.avatarType,
      formData.avatarImageUrl,
      onValidationChange,
      isFormValid,
    ]);

    const handleSubmit = () => {
      onSubmit(formData);
    };

    // Expose handleSubmit via ref
    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    const handleAvatarSelect = (avatar: {
      type: string;
      icon: string;
      gradient: string;
      imageUrl: string;
    }) => {
      setFormData((prev) => ({
        ...prev,
        avatarType: avatar.type as "icon" | "unsplash",
        avatarIcon: avatar.icon,
        avatarGradient: avatar.gradient,
        avatarImageUrl: avatar.imageUrl,
      }));
    };

    const _isEditing = Boolean(agent);

    // Get selected icon component
    const SelectedIcon = AGENT_ICONS[formData.avatarIcon] || Bot;
    const selectedGradient =
      GRADIENT_COLORS[formData.avatarGradient] ||
      GRADIENT_COLORS["blue-purple"];

    return (
      <>
        <div className="space-y-4">
          {/* Header específico para edição - Mostra nome fixo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl" />
            <Card className="relative border border-green-200/50 dark:border-green-800/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${selectedGradient.from} ${selectedGradient.to} rounded-lg flex items-center justify-center overflow-hidden shadow-md transition-transform group-hover:scale-105`}
                      >
                        {formData.avatarType === "icon" ? (
                          <SelectedIcon className="w-7 h-7 text-white" />
                        ) : formData.avatarImageUrl ? (
                          <Image
                            src={formData.avatarImageUrl}
                            alt="Agent"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <Bot className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAvatarPicker(true)}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                      >
                        <Pencil className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {formData.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Agente IA • Editando configurações
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAvatarPicker(true)}
                    className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-950/50"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Alterar Avatar
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {/* Descrição Section - Standalone */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-green-500" />
                  Descrição do Agente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descrição (Opcional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o propósito e funcionamento do seu agente..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        CHAR_LIMITS.description.hard,
                        (value) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: value,
                          }))
                      )
                    }
                    rows={2}
                    className={`resize-none ${getInputStyles(
                      formData.description.length,
                      CHAR_LIMITS.description.soft,
                      CHAR_LIMITS.description.hard,
                      "green"
                    )}`}
                  />
                  <CharCounter
                    current={formData.description.length}
                    softLimit={CHAR_LIMITS.description.soft}
                    hardLimit={CHAR_LIMITS.description.hard}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Instructions Section */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Instruções do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-sm font-medium">
                    Comportamento e Personalidade *
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Defina como o agente deve se comportar e responder..."
                    value={formData.instructions}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        CHAR_LIMITS.instructions.hard,
                        (value) =>
                          setFormData((prev) => ({
                            ...prev,
                            instructions: value,
                          }))
                      )
                    }
                    rows={3}
                    required
                    className={`resize-none ${getInputStyles(
                      formData.instructions.length,
                      CHAR_LIMITS.instructions.soft,
                      CHAR_LIMITS.instructions.hard,
                      "blue"
                    )}`}
                  />
                  <div className="space-y-2">
                    <CharCounter
                      current={formData.instructions.length}
                      softLimit={CHAR_LIMITS.instructions.soft}
                      hardLimit={CHAR_LIMITS.instructions.hard}
                    />
                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                      💡 Estas instruções definem a personalidade e
                      comportamento do agente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Section - Vertical Layout */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-500" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium">
                      Modelo IA
                    </Label>
                    <Select
                      value={formData.model}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, model: value }))
                      }
                    >
                      <SelectTrigger className="w-full transition-colors focus:ring-2 focus:ring-green-500/20">
                        <SelectValue placeholder="Selecionar modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {AI_MODELS.map((model) => (
                          <SelectItem key={model} value={model}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  model.includes("gpt-4o")
                                    ? "bg-green-500"
                                    : model.includes("gpt-4")
                                    ? "bg-blue-500"
                                    : model.includes("gpt-3.5")
                                    ? "bg-cyan-500"
                                    : "bg-purple-500"
                                }`}
                              />
                              {model.toUpperCase().replace("-", " ")}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status do Agente
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger className="w-full transition-colors focus:ring-2 focus:ring-green-500/20">
                        <SelectValue placeholder="Selecionar status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Ativo
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                            Inativo
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AvatarPicker
          open={showAvatarPicker}
          onClose={() => setShowAvatarPicker(false)}
          currentAvatar={{
            type: formData.avatarType,
            icon: formData.avatarIcon,
            gradient: formData.avatarGradient,
            imageUrl: formData.avatarImageUrl,
          }}
          onSelect={handleAvatarSelect}
        />
      </>
    );
  }
);

EditAgentsForm.displayName = "EditAgentsForm";

export default EditAgentsForm;
export type { EditAgentFormProps, AgentFormRef };
