import { auth } from "@/lib/auth";
import { WelcomeScreen } from "@/components/screens";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  // Autenticação server-side obrigatória para welcome
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se não logado, redireciona para sign-in
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  // Se logado, mostra tela de welcome/onboarding
  return (
    <div className="animate-in fade-in duration-500">
      <WelcomeScreen
        userEmail={session.user.email}
        userName={session.user.name}
      />
    </div>
  );
}
