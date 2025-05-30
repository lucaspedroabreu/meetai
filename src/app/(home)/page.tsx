import { getAndValidateSession } from "@/lib/session";
import { headers } from "next/headers";
import DashboardScreen from "@/components/screens/DashboardScreen";
import { LandingPage } from "@/components/screens";

export default async function HomePage() {
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se erro, registra no log mas continua com graceful fallback
  if (error || !isValid || !session?.user) {
    const errorMessage = error?.message || "Sessão inválida ou expirada";
    console.log("ℹ️ Estado da sessão na página Home:", {
      hasError: !!error,
      isValid,
      hasUser: !!session?.user,
      message: errorMessage,
    });

    // Caso sessão inválida, mostra landing page
    return (
      <div className="animate-in fade-in duration-300">
        <LandingPage />
      </div>
    );
  }

  // Server-side check: se sessão válida, mostra dashboard
  return (
    <div className="animate-in fade-in duration-300">
      <DashboardScreen userEmail={session.user.email} />
    </div>
  );
}
