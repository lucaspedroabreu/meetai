import { auth } from "@/lib/auth";
import { LandingPage, DashboardScreen } from "@/components/screens";
import { headers } from "next/headers";

export default async function Home() {
  // Autenticação server-side - muito mais segura!
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Server-side check: se há usuário autenticado, mostra dashboard
  if (session?.user?.email) {
    return (
      <div className="animate-in fade-in duration-300">
        <DashboardScreen userEmail={session.user.email} />
      </div>
    );
  }

  // Caso contrário, mostra landing page
  return (
    <div className="animate-in fade-in duration-300">
      <LandingPage />
    </div>
  );
}
