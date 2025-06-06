import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
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

interface AgentFormProps {
  agent?: Agent;
  onSubmit: (agentData: Partial<Agent>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  onValidationChange?: (isValid: boolean) => void;
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

const LimitWarning = ({
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

const NewAgentsForm = forwardRef<AgentFormRef, AgentFormProps>(
  (
    {
      agent,
      onSubmit,
      onCancel: _onCancel,
      isLoading: _isLoading,
      onValidationChange,
    },
    ref
  ) => {
    const [formData, setFormData] = useState({
      name: agent?.name || "",
      description: agent?.description || "",
      instructions: agent?.instructions || "",
      model: agent?.model || DEFAULT_VALUES.model,
      status: agent?.status || DEFAULT_VALUES.status,
      avatarType: agent?.avatarType || DEFAULT_VALUES.avatarType,
      avatarIcon: agent?.avatarIcon || DEFAULT_VALUES.avatarIcon,
      avatarGradient: agent?.avatarGradient || DEFAULT_VALUES.avatarGradient,
      avatarImageUrl: agent?.avatarImageUrl || "",
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
      // Check required fields
      const hasName = formData.name.trim().length > 0;
      const hasInstructions = formData.instructions.trim().length > 0;

      // Check avatar image URL requirement for unsplash type
      let hasValidAvatar = true;
      if (formData.avatarType === "unsplash") {
        hasValidAvatar = Boolean(formData.avatarImageUrl?.trim());
      }

      return hasName && hasInstructions && hasValidAvatar;
    }, [
      formData.name,
      formData.instructions,
      formData.avatarType,
      formData.avatarImageUrl,
    ]);

    // Effect to notify parent about validation changes
    useEffect(() => {
      onValidationChange?.(isFormValid());
    }, [
      formData.name,
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

    const isEditing = Boolean(agent);

    // Get selected icon component
    const SelectedIcon = AGENT_ICONS[formData.avatarIcon] || Bot;
    const selectedGradient =
      GRADIENT_COLORS[formData.avatarGradient] ||
      GRADIENT_COLORS["blue-purple"];

    return (
      <>
        <div className="space-y-4">
          {/* Header Section with Enhanced Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-xl" />
            <Card className="relative border-0 shadow-none bg-transparent pb-3">
              <CardHeader className="-pb-1">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${selectedGradient.from} ${selectedGradient.to} rounded-xl flex items-center justify-center overflow-hidden shadow-lg ring-4 ring-background transition-transform group-hover:scale-105`}
                    >
                      {formData.avatarType === "icon" ? (
                        <SelectedIcon className="w-8 h-8 text-white" />
                      ) : formData.avatarImageUrl ? (
                        <Image
                          src={formData.avatarImageUrl}
                          alt="Agent"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <Bot className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(true)}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110"
                    >
                      <Pencil className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {isEditing ? "Editar Agente" : "Criar Novo Agente"}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {isEditing
                        ? "Atualize as informações do seu agente"
                        : "Configure seu assistente IA personalizado"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        <Bot className="w-3 h-3 mr-1" />
                        Assistente IA
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAvatarPicker(true)}
                        className="text-xs"
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Personalizar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {/* Basic Information Section */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome do Agente *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Assistente de Vendas"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        CHAR_LIMITS.name.hard,
                        (value) =>
                          setFormData((prev) => ({ ...prev, name: value }))
                      )
                    }
                    required
                    className={getInputStyles(
                      formData.name.length,
                      CHAR_LIMITS.name.soft,
                      CHAR_LIMITS.name.hard,
                      "blue"
                    )}
                  />
                  <LimitWarning
                    current={formData.name.length}
                    softLimit={CHAR_LIMITS.name.soft}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Descrição
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
                      "blue"
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
                  <FileText className="w-5 h-5 text-purple-500" />
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
                      "purple"
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

            {/* Configuration Section - Horizontal Layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-500" />
                <span className="text-lg font-semibold">Configurações</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Label
                    htmlFor="model"
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Modelo IA:
                  </Label>
                  <Select
                    value={formData.model}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, model: value }))
                    }
                  >
                    <SelectTrigger className="w-full sm:w-40 transition-colors focus:ring-2 focus:ring-green-500/20">
                      <SelectValue placeholder="Modelo" />
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

                {isEditing && (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      Status:
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") =>
                        setFormData((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger className="w-full sm:w-32 transition-colors focus:ring-2 focus:ring-green-500/20">
                        <SelectValue placeholder="Status" />
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
                )}
              </div>
            </div>
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

NewAgentsForm.displayName = "NewAgentsForm";

export default NewAgentsForm;
export type { AgentFormProps, AgentFormRef };
