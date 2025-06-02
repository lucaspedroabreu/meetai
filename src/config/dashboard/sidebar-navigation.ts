import { Video, Bot, Star, type LucideIcon } from "lucide-react";

export interface SidebarNavigationItem {
  id: string;
  title: string;
  icon: LucideIcon;
  url: string;
  badge?: string;
}

export interface SidebarNavigationSection {
  id: string;
  title?: string;
  items: SidebarNavigationItem[];
}

export const dashboardSidebarNavigation: SidebarNavigationSection[] = [
  {
    id: "main",
    title: "Principal",
    items: [
      {
        id: "meetings",
        title: "Reuniões",
        icon: Video,
        url: "/meetings",
      },
      {
        id: "agents",
        title: "Agentes IA",
        icon: Bot,
        url: "/agents",
      },
    ],
  },
  {
    id: "upgrade",
    title: "Premium",
    items: [
      {
        id: "upgrade",
        title: "Upgrade",
        icon: Star,
        url: "/upgrade",
        badge: "NEW",
      },
    ],
  },
];
