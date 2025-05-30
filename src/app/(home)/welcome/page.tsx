import WelcomeScreen from "@/components/screens/WelcomeScreen";
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
    const errorMessage = error?.message || "Sessão inválida ou expirada";
    console.log("ℹ️ Estado da sessão na página Welcome:", {
      hasError: !!error,
      isValid,
      hasUser: !!session?.user,
      message: errorMessage,
    });
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
