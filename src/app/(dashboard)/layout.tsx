import React from "react";
import { getAndValidateSession } from "@/lib/session";
import { headers } from "next/headers";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { redirect } from "next/navigation";
export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se não há sessão válida, redireciona para a página de login
  if (error || !isValid || !session?.user) {
    redirect("/sign-in");
  }

  // Se o usuário está logado, usa o layout do dashboard
  return <DashboardLayout user={session.user}>{children}</DashboardLayout>;
}
