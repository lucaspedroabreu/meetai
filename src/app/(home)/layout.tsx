import React from "react";
import { getAndValidateSession } from "@/lib/session";
import { headers } from "next/headers";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isValid } = await getAndValidateSession(await headers());

  // Se o usuário está logado, usa o layout do dashboard
  if (isValid && session?.user) {
    return <DashboardLayout user={session.user}>{children}</DashboardLayout>;
  }

  // Se não está logado, renderiza apenas as children (landing page)
  return <>{children}</>;
}
