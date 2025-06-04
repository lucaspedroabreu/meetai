"use client";

import React, { createContext, useContext, memo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DashboardSidebar,
  DashboardHeader,
  DashboardErrorBoundary,
} from "@/components/features/dashboard";
import { MobileProvider } from "@/hooks/use-mobile";
import type { User } from "@/types/user";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: User;
}

// Context para dados do usuário no dashboard
const DashboardUserContext = createContext<User | undefined>(undefined);

export const useDashboardUser = () => {
  return useContext(DashboardUserContext);
};

// Memoizando o layout interno
const DashboardLayoutInner = memo(function DashboardLayoutInner({
  children,
  user,
}: DashboardLayoutProps) {
  return (
    <DashboardUserContext.Provider value={user}>
      <SidebarProvider>
        <div className="min-h-screen bg-background flex w-full">
          <DashboardSidebar user={user} />
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <DashboardHeader />
            <main className="flex-1 overflow-auto py-10 w-full">
              <div className="w-full">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DashboardUserContext.Provider>
  );
});

function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <MobileProvider>
      <DashboardLayoutInner user={user}>{children}</DashboardLayoutInner>
    </MobileProvider>
  );
}

// Wrapper com Error Boundary
export default function DashboardLayoutWithErrorBoundary(
  props: DashboardLayoutProps
) {
  return (
    <DashboardErrorBoundary>
      <DashboardLayout {...props} />
    </DashboardErrorBoundary>
  );
}
