import { LandingPage, DashboardScreen } from "@/components/screens";
import { headers } from "next/headers";
import { getAndValidateSession } from "@/lib/session";

export default async function Home() {
  // Obtenção e validação robusta de sessão centralizada
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se erro, registra no log mas continua com graceful fallback
  if (error || !isValid || !session?.user) {
    console.error("🚨 Erro de sessão na página Home:", error?.message);
  }

  // Server-side check: se sessão válida, mostra dashboard
  if (isValid && session?.user) {
    return (
      <div className="animate-in fade-in duration-300">
        <DashboardScreen userEmail={session.user.email} />
      </div>
    );
  }

  // Caso contrário (sessão inválida ou erro), mostra landing page
  return (
    <div className="animate-in fade-in duration-300">
      <LandingPage />
    </div>
  );
}
