import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bot,
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
} from "lucide-react";
import { AGENT_AVATAR_ICONS, AVATAR_GRADIENTS } from "@/constants/agents";

interface AvatarPickerProps {
  open: boolean;
  onClose: () => void;
  currentAvatar: {
    type: string;
    icon: string;
    gradient: string;
    imageUrl: string;
  };
  onSelect: (avatar: {
    type: string;
    icon: string;
    gradient: string;
    imageUrl: string;
  }) => void;
}

interface AvatarImage {
  id: string;
  thumb: string;
  alt: string;
  style: string;
}

// Mapeamento dos ícones usando as constantes
const ICON_COMPONENTS = {
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
} as const;

const ICON_LABELS = {
  bot: "Bot",
  brain: "Brain",
  cpu: "CPU",
  sparkles: "Sparkles",
  zap: "Zap",
  message: "Message",
  lightbulb: "Lightbulb",
  cog: "Settings",
  wand: "Magic",
  shield: "Shield",
  rocket: "Rocket",
  heart: "Heart",
} as const;

// Criar array de ícones usando as constantes
const AGENT_ICONS = AGENT_AVATAR_ICONS.map((iconId) => ({
  id: iconId,
  icon: ICON_COMPONENTS[iconId],
  label: ICON_LABELS[iconId],
}));

// Mapeamento dos gradientes usando as constantes
const GRADIENT_CONFIG = {
  "blue-purple": {
    from: "from-blue-500",
    to: "to-purple-500",
    label: "Blue to Purple",
  },
  "green-teal": {
    from: "from-green-500",
    to: "to-teal-500",
    label: "Green to Teal",
  },
  "orange-red": {
    from: "from-orange-500",
    to: "to-red-500",
    label: "Orange to Red",
  },
  "pink-purple": {
    from: "from-pink-500",
    to: "to-purple-500",
    label: "Pink to Purple",
  },
  "indigo-blue": {
    from: "from-indigo-500",
    to: "to-blue-500",
    label: "Indigo to Blue",
  },
  "yellow-orange": {
    from: "from-yellow-500",
    to: "to-orange-500",
    label: "Yellow to Orange",
  },
  "cyan-blue": {
    from: "from-cyan-500",
    to: "to-blue-500",
    label: "Cyan to Blue",
  },
  "purple-pink": {
    from: "from-purple-500",
    to: "to-pink-500",
    label: "Purple to Pink",
  },
} as const;

// Criar array de gradientes usando as constantes
const GRADIENT_COLORS = AVATAR_GRADIENTS.map((gradientId) => ({
  id: gradientId,
  ...GRADIENT_CONFIG[gradientId],
}));

// Avatares hardcoded de alta qualidade
const AVATAR_IMAGES: AvatarImage[] = [
  {
    id: "avatar-1",
    thumb:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop&q=80",
    alt: "Friendly Robot Assistant",
    style: "realistic",
  },
  {
    id: "avatar-2",
    thumb:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=200&h=200&fit=crop&q=80",
    alt: "Modern AI Robot",
    style: "sleek",
  },
  {
    id: "avatar-3",
    thumb:
      "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=200&h=200&fit=crop&q=80",
    alt: "Humanoid Assistant",
    style: "humanoid",
  },
  {
    id: "avatar-4",
    thumb:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=200&h=200&fit=crop&q=80",
    alt: "Tech-Enhanced Avatar",
    style: "tech",
  },
  {
    id: "avatar-5",
    thumb:
      "https://images.unsplash.com/photo-1563207153-f403bf289096?w=200&h=200&fit=crop&q=80",
    alt: "Friendly AI Character",
    style: "friendly",
  },
  {
    id: "avatar-6",
    thumb:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?w=200&h=200&fit=crop&q=80",
    alt: "Cyber Assistant",
    style: "cyber",
  },
];

export default function AvatarPicker({
  open,
  onClose,
  currentAvatar,
  onSelect,
}: AvatarPickerProps) {
  const [tempAvatar, setTempAvatar] = useState(currentAvatar);

  useEffect(() => {
    setTempAvatar(currentAvatar);
  }, [currentAvatar]);

  const handleConfirm = () => {
    onSelect(tempAvatar);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  // Get selected icon component for preview
  const SelectedIcon =
    AGENT_ICONS.find((i) => i.id === tempAvatar.icon)?.icon || Bot;
  const selectedGradient =
    GRADIENT_COLORS.find((g) => g.id === tempAvatar.gradient) ||
    GRADIENT_COLORS[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${selectedGradient.from} ${selectedGradient.to} rounded-lg flex items-center justify-center overflow-hidden shadow-lg`}
            >
              {tempAvatar.type === "icon" ? (
                <SelectedIcon className="w-5 h-5 text-white" />
              ) : tempAvatar.imageUrl ? (
                <Image
                  src={tempAvatar.imageUrl}
                  alt="Agent"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <DialogTitle>Escolher Avatar do Agente</DialogTitle>
              <DialogDescription>
                Personalize a aparência do seu agente IA
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs
            value={tempAvatar.type}
            onValueChange={(value) =>
              setTempAvatar((prev) => ({ ...prev, type: value }))
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="icon">Ícone</TabsTrigger>
              <TabsTrigger value="unsplash">Imagens</TabsTrigger>
            </TabsList>

            <TabsContent value="icon" className="space-y-4">
              <div>
                <Label className="text-sm mb-2 block">Selecione um Ícone</Label>
                <div className="grid grid-cols-6 gap-2">
                  {AGENT_ICONS.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setTempAvatar((prev) => ({ ...prev, icon: id }))
                      }
                      className={`p-3 rounded-lg border-2 transition-all ${
                        tempAvatar.icon === id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      title={label}
                    >
                      <Icon className="w-5 h-5 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Cores do Gradiente</Label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADIENT_COLORS.map(({ id, from, to, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setTempAvatar((prev) => ({ ...prev, gradient: id }))
                      }
                      className={`h-12 rounded-lg bg-gradient-to-r ${from} ${to} border-2 transition-all ${
                        tempAvatar.gradient === id
                          ? "border-primary shadow-lg scale-105"
                          : "border-transparent hover:scale-105"
                      }`}
                      title={label}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="unsplash" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Imagens de robôs e IA
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {AVATAR_IMAGES.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() =>
                      setTempAvatar((prev) => ({
                        ...prev,
                        imageUrl: img.thumb,
                      }))
                    }
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      tempAvatar.imageUrl === img.thumb
                        ? "border-primary shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={img.thumb}
                      alt={img.alt}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
