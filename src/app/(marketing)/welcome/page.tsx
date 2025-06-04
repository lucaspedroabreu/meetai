import OnboardingScreen from "@/components/screens/OnboardingScreen";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAndValidateSession } from "@/lib/session";

export default async function WelcomePage() {
  // Obtenção e validação robusta de sessão centralizada
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se não está logado ou há erro, redireciona para sign-in
  if (error || !isValid || !session?.user) {
    redirect("/sign-in");
  }

  // Se logado, mostra tela de welcome/onboarding
  return (
    <div className="animate-in fade-in duration-500">
      <OnboardingScreen
        userEmail={session.user.email}
        userName={session.user.name}
      />
    </div>
  );
}
