import { auth } from "@/lib/auth";
import { SignUpScreen } from "@/components/screens";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  // Verificação server-side: se usuário já está logado, redireciona
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.email) {
    redirect("/"); // Usuário já logado, redireciona para home
  }

  // Se não estiver logado, mostra a tela de cadastro
  return <SignUpScreen />;
}
