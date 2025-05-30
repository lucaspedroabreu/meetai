import { SignUpScreen } from "@/components/screens";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAndValidateSession } from "@/lib/session";

export default async function SignUpPage() {
  // Obtenção e validação robusta de sessão centralizada
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se erro na autenticação, registra mas permite acesso (usuário pode tentar cadastro)
  if (error || !isValid || !session?.user) {
    const errorMessage = error?.message || "Sessão inválida ou expirada";
    console.log("ℹ️ Estado da sessão na página Sign-up:", {
      hasError: !!error,
      isValid,
      hasUser: !!session?.user,
      message: errorMessage,
    });
  }

  // Validação robusta de sessão - se já estiver logado, redireciona
  if (isValid && session?.user) {
    redirect("/"); // Usuário já logado, redireciona para home
  }

  // Se não estiver logado (ou erro na verificação), mostra a tela de cadastro
  return <SignUpScreen />;
}
