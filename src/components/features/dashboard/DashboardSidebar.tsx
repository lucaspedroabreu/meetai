"use client";

import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GlassCard } from "@/components/custom-ui/glass-card";
import { MeetAILogo } from "@/components/features/brand";
import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";
import { BackgroundEffects } from "@/components/shared/BackgroundEffects";
import { UserMenu } from "./UserMenu";
import {
  dashboardSidebarNavigation,
  type SidebarNavigationSection,
  type SidebarNavigationItem,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface DashboardSidebarProps {
  user?: User;
}

// Sub-componentes memoizados
const LogoSection = memo(() => (
  <div className="flex flex-col items-center space-y-3">
    <div className="relative">
      <MeetAILogo size={54} variant="white-red" animated={true} />
    </div>
    <div className="text-center w-full">
      <div className="w-full overflow-hidden">
        <AnimatedMeetAiText
          dotsColor="red"
          showIDot={false}
          size="sm"
          textColor="white"
        />
      </div>
      <div className="h-0.5 w-12 bg-brand-gradient mx-auto mt-2 rounded-full" />
    </div>
  </div>
));

LogoSection.displayName = "LogoSection";

interface NavigationSectionProps {
  section: SidebarNavigationSection;
  currentPath: string;
  isUpgrade: boolean;
}

const NavigationSectionComponent = memo(
  ({ section, currentPath, isUpgrade }: NavigationSectionProps) => {
    // Memoizar os items para evitar re-renders desnecessários
    const memoizedItems = useMemo(() => {
      return section.items.map((item) => ({
        ...item,
        isActive: currentPath === item.url,
      }));
    }, [section.items, currentPath]);

    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-3">
            {memoizedItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <NavigationMenuItem item={item} isUpgrade={isUpgrade} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }
);

NavigationSectionComponent.displayName = "NavigationSectionComponent";

// Componente otimizado para cada item individual
const NavigationMenuItem = memo(
  ({
    item,
    isUpgrade,
  }: {
    item: SidebarNavigationItem & { isActive: boolean };
    isUpgrade: boolean;
  }) => {
    return (
      <SidebarMenuButton
        asChild
        size="lg"
        className={cn(
          "h-12 justify-start rounded-xl transition-all duration-300 text-white/90 hover:text-white group border",
          isUpgrade
            ? cn(
                "bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-400/40 backdrop-blur-sm",
                "hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-300/60 hover:shadow-lg hover:shadow-violet-500/20",
                "transform hover:scale-[1.02] relative overflow-hidden",
                item.isActive &&
                  "from-violet-500/30 to-purple-500/30 border-violet-300/70 shadow-lg shadow-violet-500/25"
              )
            : cn(
                "border-transparent hover:bg-white/8 hover:border-white/10 backdrop-blur-sm",
                "hover:shadow-brand",
                item.isActive && "bg-white/10 border-white/20 shadow-brand"
              )
        )}
      >
        <Link href={item.url} className="flex items-center gap-4 relative z-10">
          {isUpgrade && (
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          )}
          <div className="relative">
            <item.icon
              className={cn(
                "h-5 w-5 relative z-10 transition-colors duration-300",
                isUpgrade
                  ? cn(
                      "text-violet-200 group-hover:text-violet-100",
                      item.isActive ? "text-violet-100" : ""
                    )
                  : cn(
                      "text-white/90 group-hover:text-white",
                      item.isActive ? "text-white" : ""
                    )
              )}
            />
            <div
              className={cn(
                "absolute inset-0 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150",
                isUpgrade ? "bg-violet-400/30" : "bg-brand-gradient"
              )}
            ></div>
          </div>
          <span
            className={cn(
              "font-medium tracking-wide transition-colors duration-300",
              isUpgrade
                ? cn(
                    "text-violet-100 group-hover:text-white font-semibold",
                    item.isActive ? "text-white" : ""
                  )
                : cn(
                    "text-white/90 group-hover:text-white",
                    item.isActive ? "text-white" : ""
                  )
            )}
          >
            {item.title}
          </span>
          {item.badge && (
            <span
              className={cn(
                "ml-auto text-xs px-2 py-1 rounded-full font-medium",
                isUpgrade
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30 animate-pulse"
                  : "bg-violet-500/20 text-violet-200"
              )}
            >
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    );
  },
  (prevProps, nextProps) => {
    // Comparação customizada: só re-renderiza se algo importante mudou
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.isActive === nextProps.item.isActive &&
      prevProps.isUpgrade === nextProps.isUpgrade &&
      prevProps.item.url === nextProps.item.url &&
      prevProps.item.title === nextProps.item.title
    );
  }
);

NavigationMenuItem.displayName = "NavigationMenuItem";

const SectionSeparator = memo(() => (
  <div className="py-6 flex justify-center">
    <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  </div>
));

SectionSeparator.displayName = "SectionSeparator";

// Memoizando o DashboardSidebar principal
const DashboardSidebar = memo(function DashboardSidebar({
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Memoizar as seções de navegação
  const memoizedSections = useMemo(() => {
    return dashboardSidebarNavigation.map((section) => ({
      ...section,
      currentPath: pathname,
      isUpgrade: section.id === "upgrade",
    }));
  }, [pathname]);

  return (
    <Sidebar variant="sidebar" className="border-r-0">
      <div className="h-screen relative overflow-hidden flex flex-col">
        <BackgroundEffects variant="dashboard" />

        <SidebarHeader className="px-6 pt-6 pb-0 relative z-10 shrink-0">
          <GlassCard className="p-4">
            <LogoSection />
          </GlassCard>
        </SidebarHeader>

        <SidebarContent className="px-6 py-4 flex-1 relative z-10 overflow-y-auto">
          {memoizedSections.map((section, index) => (
            <React.Fragment key={section.id}>
              {index > 0 && <SectionSeparator />}
              <MemoizedNavigationSection section={section} />
            </React.Fragment>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-2 relative z-10 shrink-0">
          <GlassCard className="p-1">
            <SidebarMenu>
              <UserMenu user={user} />
            </SidebarMenu>
          </GlassCard>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
});

// Wrapper memoizado para NavigationSectionComponent
const MemoizedNavigationSection = memo(
  ({
    section,
  }: {
    section: SidebarNavigationSection & {
      currentPath: string;
      isUpgrade: boolean;
    };
  }) => {
    return (
      <NavigationSectionComponent
        section={section}
        currentPath={section.currentPath}
        isUpgrade={section.isUpgrade}
      />
    );
  },
  (prevProps, nextProps) => {
    // Só re-renderiza se a seção ou o path mudaram
    return (
      prevProps.section.id === nextProps.section.id &&
      prevProps.section.currentPath === nextProps.section.currentPath &&
      prevProps.section.isUpgrade === nextProps.section.isUpgrade
    );
  }
);

MemoizedNavigationSection.displayName = "MemoizedNavigationSection";

export default DashboardSidebar;
