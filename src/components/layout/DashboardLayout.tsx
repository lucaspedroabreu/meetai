"use client";

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DashboardErrorBoundary } from "@/components/dashboard/DashboardErrorBoundary";
import type { User } from "@/types/user";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: User;
}

function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar user={user} />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
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
