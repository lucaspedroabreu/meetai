"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Bell,
  Shield,
  Key,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Download,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    agentUpdates: boolean;
    systemUpdates: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private";
    dataCollection: boolean;
    analytics: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    defaultModel: string;
  };
}

const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    agentUpdates: true,
    systemUpdates: false,
  },
  privacy: {
    profileVisibility: "private",
    dataCollection: false,
    analytics: false,
  },
  preferences: {
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    defaultModel: "gpt-4",
  },
};

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Aqui você carregaria as configurações do usuário da API
      // const userSettings = await getUserSettings();
      // setSettings(userSettings);

      // Por enquanto, usando configurações padrão
      setSettings(defaultSettings);
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
      toast.error("Erro ao carregar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      // Aqui você salvaria as configurações via API
      // await updateUserSettings(settings);

      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (passwordForm.new.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    try {
      // Implementar mudança de senha
      // await changePassword(passwordForm.current, passwordForm.new);

      setPasswordForm({ current: "", new: "", confirm: "" });
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      toast.error("Erro ao alterar senha");
    }
  };

  const handleExportData = async () => {
    try {
      // Implementar exportação de dados
      toast.info("Preparando exportação de dados...");
      // const data = await exportUserData();
      // downloadFile(data, 'meus-dados.json');
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast.error("Erro ao exportar dados");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Implementar exclusão de conta
      // await deleteUserAccount();
      toast.success("Conta excluída com sucesso");
      // Redirecionar para página de login
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      toast.error("Erro ao excluir conta");
    }
  };

  const updateSettings = (
    section: keyof UserSettings,
    key: string,
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas preferências e configurações de conta
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações importantes por email
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  updateSettings("notifications", "email", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações no navegador
                </p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  updateSettings("notifications", "push", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Atualizações de Agentes</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações sobre seus agentes IA
                </p>
              </div>
              <Switch
                checked={settings.notifications.agentUpdates}
                onCheckedChange={(checked) =>
                  updateSettings("notifications", "agentUpdates", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Atualizações do Sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Novidades e atualizações da plataforma
                </p>
              </div>
              <Switch
                checked={settings.notifications.systemUpdates}
                onCheckedChange={(checked) =>
                  updateSettings("notifications", "systemUpdates", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferências */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Preferências
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select
                  value={settings.preferences.language}
                  onValueChange={(value) =>
                    updateSettings("preferences", "language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fuso Horário</Label>
                <Select
                  value={settings.preferences.timezone}
                  onValueChange={(value) =>
                    updateSettings("preferences", "timezone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">
                      São Paulo (GMT-3)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      New York (GMT-5)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      London (GMT+0)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Modelo de IA Padrão</Label>
              <Select
                value={settings.preferences.defaultModel}
                onValueChange={(value) =>
                  updateSettings("preferences", "defaultModel", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacidade e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Visibilidade do Perfil</Label>
                <p className="text-sm text-muted-foreground">
                  Controle quem pode ver seu perfil
                </p>
              </div>
              <Select
                value={settings.privacy.profileVisibility}
                onValueChange={(value: "public" | "private") =>
                  updateSettings("privacy", "profileVisibility", value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Público</SelectItem>
                  <SelectItem value="private">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Coleta de Dados</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir coleta de dados para melhorar o serviço
                </p>
              </div>
              <Switch
                checked={settings.privacy.dataCollection}
                onCheckedChange={(checked) =>
                  updateSettings("privacy", "dataCollection", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Compartilhar dados de uso anônimos
                </p>
              </div>
              <Switch
                checked={settings.privacy.analytics}
                onCheckedChange={(checked) =>
                  updateSettings("privacy", "analytics", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Segurança da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Alterar Senha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Alterar Senha</DialogTitle>
                  <DialogDescription>
                    Digite sua senha atual e a nova senha
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Senha Atual</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.current}
                        onChange={(e) =>
                          setPasswordForm((prev) => ({
                            ...prev,
                            current: e.target.value,
                          }))
                        }
                        placeholder="Digite sua senha atual"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Nova Senha</Label>
                    <Input
                      type="password"
                      value={passwordForm.new}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          new: e.target.value,
                        }))
                      }
                      placeholder="Digite a nova senha"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar Nova Senha</Label>
                    <Input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirm: e.target.value,
                        }))
                      }
                      placeholder="Confirme a nova senha"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleChangePassword}>Alterar Senha</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Meus Dados
            </Button>
          </CardContent>
        </Card>

        {/* Zona de Perigo */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Zona de Perigo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Excluir Conta</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Esta ação é irreversível. Todos os seus dados, agentes e
                  conversas serão permanentemente excluídos.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá
                        permanentemente sua conta e removerá todos os seus dados
                        de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Sim, excluir conta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
