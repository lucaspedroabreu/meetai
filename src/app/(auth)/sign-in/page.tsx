import { SignInScreen } from "@/components/screens";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAndValidateSession } from "@/lib/session";

export default async function SignInPage() {
  // Obtenção e validação robusta de sessão centralizada
  const { session, isValid, error } = await getAndValidateSession(
    await headers()
  );

  // Se erro na autenticação, registra mas permite acesso (usuário pode tentar login)
  if (error || !isValid || !session?.user) {
    console.error("🚨 Erro de sessão na página Sign-in:", error?.message);
  }

  // Validação robusta de sessão - se já estiver logado, redireciona
  if (isValid && session?.user) {
    redirect("/"); // Usuário já logado, redireciona para home
  }

  // Se não estiver logado (ou erro na verificação), mostra a tela de login
  return <SignInScreen />;
}
