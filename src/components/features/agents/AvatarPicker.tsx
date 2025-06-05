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
  RefreshCw,
  Camera,
} from "lucide-react";

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

interface UnsplashImage {
  id: string;
  thumb: string;
  small: string;
  alt: string;
}

// Available icons for agents
const AGENT_ICONS = [
  { id: "bot", icon: Bot, label: "Bot" },
  { id: "brain", icon: Brain, label: "Brain" },
  { id: "cpu", icon: Cpu, label: "CPU" },
  { id: "sparkles", icon: Sparkles, label: "Sparkles" },
  { id: "zap", icon: Zap, label: "Zap" },
  { id: "message", icon: MessageSquare, label: "Message" },
  { id: "lightbulb", icon: Lightbulb, label: "Lightbulb" },
  { id: "cog", icon: Cog, label: "Settings" },
  { id: "wand", icon: Wand2, label: "Magic" },
  { id: "shield", icon: Shield, label: "Shield" },
  { id: "rocket", icon: Rocket, label: "Rocket" },
  { id: "heart", icon: Heart, label: "Heart" },
];

// Gradient color combinations
const GRADIENT_COLORS = [
  {
    id: "blue-purple",
    from: "from-blue-500",
    to: "to-purple-500",
    label: "Blue to Purple",
  },
  {
    id: "green-teal",
    from: "from-green-500",
    to: "to-teal-500",
    label: "Green to Teal",
  },
  {
    id: "orange-red",
    from: "from-orange-500",
    to: "to-red-500",
    label: "Orange to Red",
  },
  {
    id: "pink-purple",
    from: "from-pink-500",
    to: "to-purple-500",
    label: "Pink to Purple",
  },
  {
    id: "indigo-blue",
    from: "from-indigo-500",
    to: "to-blue-500",
    label: "Indigo to Blue",
  },
  {
    id: "yellow-orange",
    from: "from-yellow-500",
    to: "to-orange-500",
    label: "Yellow to Orange",
  },
  {
    id: "cyan-blue",
    from: "from-cyan-500",
    to: "to-blue-500",
    label: "Cyan to Blue",
  },
  {
    id: "purple-pink",
    from: "from-purple-500",
    to: "to-pink-500",
    label: "Purple to Pink",
  },
];

export default function AvatarPicker({
  open,
  onClose,
  currentAvatar,
  onSelect,
}: AvatarPickerProps) {
  const [tempAvatar, setTempAvatar] = useState(currentAvatar);
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTempAvatar(currentAvatar);
  }, [currentAvatar]);

  // Load default images when dialog opens
  useEffect(() => {
    if (open && unsplashImages.length === 0) {
      loadDefaultImages();
    }
  }, [open, unsplashImages.length]);

  const loadDefaultImages = async () => {
    setLoadingImages(true);
    setError(null);

    try {
      const response = await fetch(`/api/unsplash/collections?count=6`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setUnsplashImages(data);
      } else {
        throw new Error("No avatar images found");
      }
    } catch (error) {
      console.error("Failed to fetch default images:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load images"
      );
    }
    setLoadingImages(false);
  };

  const fetchNewImages = async () => {
    setLoadingImages(true);
    setError(null);

    try {
      // Force refresh with timestamp to avoid cache
      const timestamp = Date.now();
      const response = await fetch(
        `/api/unsplash/collections?count=6&refresh=true&t=${timestamp}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setUnsplashImages(data);
        setError(null); // Clear any previous errors
      } else {
        setError("Nenhuma nova imagem encontrada.");
      }
    } catch (error) {
      console.error("Failed to fetch new images:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load new images"
      );
    }
    setLoadingImages(false);
  };

  const handleConfirm = () => {
    onSelect(tempAvatar);
    onClose();
  };

  const handleClose = () => {
    setError(null);
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fetchNewImages}
                  disabled={loadingImages}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${
                      loadingImages ? "animate-spin" : ""
                    }`}
                  />
                  {loadingImages ? "Carregando..." : "Buscar Novas"}
                </Button>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              {loadingImages && unsplashImages.length === 0 && (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Carregando imagens...
                    </p>
                  </div>
                </div>
              )}

              {unsplashImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {unsplashImages.map((img, index) => (
                    <button
                      key={img.id || index}
                      type="button"
                      onClick={() =>
                        setTempAvatar((prev) => ({
                          ...prev,
                          imageUrl: img.small,
                        }))
                      }
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        tempAvatar.imageUrl === img.small
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
              )}

              {!loadingImages && unsplashImages.length === 0 && !error && (
                <div className="text-center py-8">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Nenhuma imagem carregada ainda
                  </p>
                  <Button
                    variant="outline"
                    onClick={loadDefaultImages}
                    className="mt-4"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Carregar Imagens
                  </Button>
                </div>
              )}
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
