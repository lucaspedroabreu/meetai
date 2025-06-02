"use client";

import React from "react";
import { usePathname } from "next/navigation";
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
import { GlassCard } from "@/components/ui/glass-card";
import { MeetAILogo } from "@/components/custom/Logo";
import AnimatedMeetAiText from "@/components/custom/AnimatedMeetAiText";
import { BackgroundEffects } from "@/components/shared/BackgroundEffects";
import { UserMenu } from "@/components/dashboard/UserMenu";
import {
  dashboardSidebarNavigation,
  type SidebarNavigationSection,
} from "@/config/dashboard/sidebar-navigation";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface DashboardSidebarProps {
  user?: User;
}

// Sub-componentes
const LogoSection = () => (
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
);

interface NavigationSectionProps {
  section: SidebarNavigationSection;
  currentPath: string;
  isUpgrade: boolean;
}

const NavigationSectionComponent = ({
  section,
  currentPath,
  isUpgrade,
}: NavigationSectionProps) => (
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu className="space-y-3">
        {section.items.map((item) => {
          const isActive = currentPath === item.url;

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                size="lg"
                className={cn(
                  "h-12 justify-start rounded-xl transition-all duration-300 text-white/90 hover:text-white group border",
                  isUpgrade
                    ? cn(
                        "glass-card-dark border-purple-500/30",
                        "hover:border-purple-400/50 hover-violet",
                        isActive && "glass-card border-purple-400/60"
                      )
                    : cn(
                        "border-transparent hover:bg-white/8 hover:border-white/10 backdrop-blur-sm",
                        "hover:shadow-brand",
                        isActive && "bg-white/10 border-white/20 shadow-brand"
                      )
                )}
              >
                <a href={item.url} className="flex items-center gap-4">
                  <div className="relative">
                    <item.icon
                      className={cn(
                        "h-5 w-5 relative z-10 transition-colors duration-300",
                        isUpgrade
                          ? "text-violet-300 group-hover:text-violet-200"
                          : "text-white/90 group-hover:text-white",
                        isActive &&
                          (isUpgrade ? "text-violet-100" : "text-white")
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150",
                        isUpgrade ? "bg-brand-gradient" : "bg-brand-gradient"
                      )}
                    ></div>
                  </div>
                  <span
                    className={cn(
                      "font-medium tracking-wide transition-colors duration-300",
                      isUpgrade
                        ? "text-violet-100 group-hover:text-white"
                        : "text-white/90 group-hover:text-white",
                      isActive && "text-white"
                    )}
                  >
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-violet-500/20 text-violet-200 px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

const SectionSeparator = () => (
  <div className="py-6 flex justify-center">
    <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  </div>
);

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

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
          {dashboardSidebarNavigation.map((section, index) => (
            <React.Fragment key={section.id}>
              {index > 0 && <SectionSeparator />}
              <NavigationSectionComponent
                section={section}
                currentPath={pathname}
                isUpgrade={section.id === "upgrade"}
              />
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
}
