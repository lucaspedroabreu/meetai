"use client";

import React, { useState, memo } from "react";
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

const UserAvatar = memo(
  ({ initials, image }: { initials: string; image?: string | null }) => (
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
  )
);

UserAvatar.displayName = "UserAvatar";

// Componente para os itens do menu (reutilizável)
const MenuItems = memo(
  ({
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
          className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? "Saindo..." : "Sair"}
        </DropdownMenuItem>
      </>
    );
  }
);

MenuItems.displayName = "MenuItems";

export const UserMenu = memo(({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const userInfo = getUserInfo(user);

  // Layout para Mobile (Drawer)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <SidebarMenuButton className="w-full h-14 justify-start gap-3 rounded-xl transition-all duration-200 hover:bg-white/10 hover:shadow-lg">
            <UserAvatar initials={userInfo.initials} image={user?.image} />
            <div className="flex-1 text-left overflow-hidden">
              <div className="text-sm font-medium text-white truncate">
                {userInfo.displayName}
              </div>
              <div className="text-xs text-white/70 truncate">
                {userInfo.email}
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </SidebarMenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-center">
            <div className="flex flex-col items-center space-y-3">
              <UserAvatar initials={userInfo.initials} image={user?.image} />
              <div>
                <DrawerTitle>{userInfo.displayName}</DrawerTitle>
                <DrawerDescription>{userInfo.email}</DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <MenuItems
            onClose={() => setIsOpen(false)}
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            isLoggingOut={isLoggingOut}
            theme={theme}
            isMobile={true}
          />

          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Layout para Desktop (DropdownMenu)
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="w-full h-14 justify-start gap-3 rounded-xl transition-all duration-200 hover:bg-white/10 hover:shadow-lg">
          <UserAvatar initials={userInfo.initials} image={user?.image} />
          <div className="flex-1 text-left overflow-hidden">
            <div className="text-sm font-medium text-white truncate">
              {userInfo.displayName}
            </div>
            <div className="text-xs text-white/70 truncate">
              {userInfo.email}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        className="w-56 p-2 rounded-xl border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl"
      >
        <MenuItems
          onClose={() => setIsOpen(false)}
          handleLogout={handleLogout}
          toggleTheme={toggleTheme}
          isLoggingOut={isLoggingOut}
          theme={theme}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserMenu.displayName = "UserMenu";
