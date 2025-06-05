import { useState, forwardRef, useImperativeHandle } from "react";
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

interface AgentFormProps {
  agent?: Agent;
  onSubmit: (agentData: Partial<Agent>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface AgentFormRef {
  handleSubmit: () => void;
}

// Available icons mapping (for display) - must match AvatarPicker
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

// Gradient colors mapping
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

const AgentForm = forwardRef<AgentFormRef, AgentFormProps>(
  ({ agent, onSubmit, onCancel: _onCancel, isLoading: _isLoading }, ref) => {
    const [formData, setFormData] = useState({
      name: agent?.name || "",
      description: agent?.description || "",
      instructions: agent?.instructions || "",
      model: agent?.model || "gpt-4",
      status: agent?.status || ("active" as const),
      avatarType: agent?.avatarType || "icon",
      avatarIcon: agent?.avatarIcon || "bot",
      avatarGradient: agent?.avatarGradient || "blue-purple",
      avatarImageUrl: agent?.avatarImageUrl || "",
    });

    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

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
        <div className="space-y-6">
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
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="transition-colors focus:ring-2 focus:ring-blue-500/20"
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
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
                    className="transition-colors focus:ring-2 focus:ring-blue-500/20 resize-none"
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
                      setFormData((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    rows={3}
                    required
                    className="transition-colors focus:ring-2 focus:ring-purple-500/20 resize-none"
                  />
                  <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                    💡 Estas instruções definem a personalidade e comportamento
                    do agente
                  </p>
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
                      <SelectItem value="gpt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          GPT-4
                        </div>
                      </SelectItem>
                      <SelectItem value="gpt-3.5-turbo">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          GPT-3.5 Turbo
                        </div>
                      </SelectItem>
                      <SelectItem value="claude-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          Claude 3
                        </div>
                      </SelectItem>
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

AgentForm.displayName = "AgentForm";

export default AgentForm;
export type { AgentFormProps, AgentFormRef };
