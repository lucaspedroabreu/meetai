import { getAndValidateSession } from "@/lib/session";
import { headers } from "next/headers";
import DashboardScreen from "@/components/screens/DashboardScreen";
import { LandingPage } from "@/components/screens";

export default async function HomePage() {
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se não há sessão válida, mostra landing page
  if (error || !isValid || !session?.user) {
    return (
      <div className="animate-in fade-in duration-300">
        <LandingPage />
      </div>
    );
  }

  // Se há sessão válida, mostra dashboard screen (layout já gerencia sidebar)
  return (
    <div className="animate-in fade-in duration-300">
      <DashboardScreen />
    </div>
  );
}
