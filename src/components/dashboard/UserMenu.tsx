"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  CreditCard,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import type { User as UserType } from "@/types/user";
import Image from "next/image";

interface UserMenuProps {
  user?: UserType;
}

interface UserInfo {
  initials: string;
  displayName: string;
  email: string;
}

const getUserInfo = (user?: UserType): UserInfo => {
  if (!user) {
    return {
      initials: "U",
      displayName: "Usuário",
      email: "",
    };
  }

  // Usar name se disponível, senão extrair do email
  const displayName =
    user.name ||
    user.email
      .split("@")[0]
      .replace(".", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Gerar iniciais do nome ou email
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2)
    : user.email
        .split("@")[0]
        .split(".")
        .map((part) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2) || user.email.slice(0, 2).toUpperCase();

  return {
    initials,
    displayName,
    email: user.email,
  };
};

const UserAvatar = ({
  initials,
  image,
}: {
  initials: string;
  image?: string | null;
}) => (
  <div className="relative">
    {image ? (
      <Image
        src={image}
        alt="Avatar do usuário"
        width={40}
        height={40}
        className="w-10 h-10 rounded-xl object-cover shadow-lg"
      />
    ) : (
      <div className="w-10 h-10 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
        {initials}
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/30 to-indigo-600/30 rounded-xl blur-md -z-10"></div>
  </div>
);

// Componente para os itens do menu (reutilizável)
const MenuItems = ({
  onClose,
  handleLogout,
  toggleTheme,
  isLoggingOut,
  theme,
  isMobile = false,
}: {
  onClose?: () => void;
  handleLogout: () => void;
  toggleTheme: () => void;
  isLoggingOut: boolean;
  theme: string | undefined;
  isMobile?: boolean;
}) => {
  const handleItemClick = (action: () => void) => {
    action();
    onClose?.();
  };

  if (isMobile) {
    return (
      <div className="space-y-2 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-base"
          onClick={() => handleItemClick(() => {})}
        >
          <User className="mr-3 h-5 w-5" />
          Perfil
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-base"
          onClick={() => handleItemClick(() => {})}
        >
          <Settings className="mr-3 h-5 w-5" />
          Configurações
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-base"
          onClick={() => handleItemClick(() => {})}
        >
          <CreditCard className="mr-3 h-5 w-5" />
          Assinaturas
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-base"
          onClick={() => handleItemClick(toggleTheme)}
        >
          {theme === "dark" ? (
            <Sun className="mr-3 h-5 w-5" />
          ) : (
            <Moon className="mr-3 h-5 w-5" />
          )}
          Alternar tema
        </Button>

        <div className="border-t border-border my-4" />

        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-base text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={() => handleItemClick(handleLogout)}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          {isLoggingOut ? "Saindo..." : "Sair"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        Perfil
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        Configurações
      </DropdownMenuItem>

      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        Assinaturas
      </DropdownMenuItem>

      <DropdownMenuItem onClick={toggleTheme}>
        {theme === "dark" ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        )}
        Alternar tema
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
      >
        <LogOut className="mr-2 h-4 w-4" />
        {isLoggingOut ? "Saindo..." : "Sair"}
      </DropdownMenuItem>
    </>
  );
};

export const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const userInfo = getUserInfo(user);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
          onError: (error) => {
            console.error("Falha no logout:", error);
            // TODO: Mostrar notificação toast aqui
          },
        },
      });
    } catch (error) {
      console.error("Erro inesperado no logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!user) return null;

  const MenuButton = (
    <SidebarMenuButton
      size="lg"
      className="h-14 hover:bg-white/5 group p-3 px-2 transition-all duration-300 rounded-xl w-full justify-start"
    >
      <UserAvatar initials={userInfo.initials} image={user.image} />
      <div className="flex flex-col items-start flex-1 min-w-0">
        <span className="text-sm font-semibold text-white/95 truncate">
          {userInfo.displayName}
        </span>
        <span className="text-xs text-white/60 truncate font-medium">
          {userInfo.email}
        </span>
      </div>
      <ChevronDown className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-all duration-300 group-hover:scale-110" />
    </SidebarMenuButton>
  );

  // Mobile: Usar Drawer
  if (isMobile) {
    return (
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>{MenuButton}</DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="text-center">
            <div className="flex flex-col items-center space-y-3 pb-4">
              <UserAvatar initials={userInfo.initials} image={user.image} />
              <div>
                <DrawerTitle className="text-lg font-semibold">
                  {userInfo.displayName}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground">
                  {userInfo.email}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <MenuItems
            onClose={() => setDrawerOpen(false)}
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            isLoggingOut={isLoggingOut}
            theme={theme}
            isMobile={true}
          />

          <DrawerFooter className="pt-4">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Usar DropdownMenu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{MenuButton}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <MenuItems
          handleLogout={handleLogout}
          toggleTheme={toggleTheme}
          isLoggingOut={isLoggingOut}
          theme={theme}
          isMobile={false}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
