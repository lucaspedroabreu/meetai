"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Edit3,
  Calendar,
  Mail,
  Bot,
  Activity,
  TrendingUp,
  Camera,
  Save,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useMyAgents } from "@/hooks/useAgentsData";
import { toast } from "sonner";

interface ProfileStats {
  totalAgents: number;
  activeAgents: number;
  totalConversations: number;
  joinDate: string;
}

interface UserData {
  id: string;
  name?: string;
  email: string;
  image?: string | null;
  createdAt?: string | Date;
  bio?: string;
  emailVerified?: boolean;
  updatedAt?: Date;
}

export function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
  });

  // Hook para obter os agentes do usuário
  const { data: agentsData } = useMyAgents();
  const agents = agentsData?.agents ?? [];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUser(session.data.user);
        setEditForm({
          name: session.data.user.name || "",
          bio: (session.data.user as UserData).bio || "",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      toast.error("Erro ao carregar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      // Aqui você implementaria a atualização do perfil via API
      // await updateProfile(editForm);

      setUser((prev) => (prev ? { ...prev, ...editForm } : null));
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsSaving(false);
    }
  };

  const stats: ProfileStats = {
    totalAgents: agents.length,
    activeAgents: agents.filter((agent) => agent.status === "active").length,
    totalConversations: 0, // Implementar quando tiver dados de conversas
    joinDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("pt-BR")
      : "N/A",
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2);
    }
    return email?.slice(0, 2)?.toUpperCase() || "U";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações pessoais e visualize suas estatísticas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name || "Usuário"}
                  />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getUserInitials(user?.name, user?.email)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={() =>
                    toast.info("Funcionalidade em desenvolvimento")
                  }
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">
                {user?.name || "Usuário"}
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membro desde
                </Label>
                <p className="text-sm text-muted-foreground">
                  {stats.joinDate}
                </p>
              </div>

              <Separator />

              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                      Atualize suas informações pessoais
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        placeholder="Fale um pouco sobre você..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Salvando..." : "Salvar"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total de Agentes
                    </p>
                    <p className="text-2xl font-bold">{stats.totalAgents}</p>
                  </div>
                  <Bot className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Agentes Ativos
                    </p>
                    <p className="text-2xl font-bold">{stats.activeAgents}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Conversas
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.totalConversations}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Meus Agentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {agents.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Você ainda não criou nenhum agente
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => (window.location.href = "/agents")}
                  >
                    Criar Primeiro Agente
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {agents.slice(0, 5).map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {agent.description || "Sem descrição"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          agent.status === "active" ? "default" : "secondary"
                        }
                      >
                        {agent.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  ))}
                  {agents.length > 5 && (
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => (window.location.href = "/agents")}
                    >
                      Ver Todos os Agentes ({agents.length})
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
