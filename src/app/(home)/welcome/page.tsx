import { auth } from "@/lib/auth";
import { WelcomeScreen } from "@/components/screens";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAndValidateSession } from "@/lib/session";

export default async function WelcomePage() {
  // Obtenção e validação robusta de sessão centralizada
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se erro na autenticação, redireciona para sign-in (comportamento seguro para página protegida)
  if (error || !isValid || !session?.user) {
    console.error("🚨 Erro de sessão na página Welcome:", error?.message);
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
