"use client";
import ButtonVariantsGuide from "@/components/custom/ButtonVariantsGuide";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, error, isPending, refetch } = authClient.useSession();

  // Estados para registro
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isSignUpPending, setIsSignUpPending] = useState(false);

  // Estados para login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginPending, setIsLoginPending] = useState(false);

  // Estado para alternar entre formulários
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSignUpPending(true);

    await authClient.signUp.email(
      {
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
      },
      {
        onSuccess: () => {
          window.alert("Conta criada com sucesso!");
          setSignUpEmail("");
          setSignUpName("");
          setSignUpPassword("");
          refetch();
        },
        onError: (error) => {
          window.alert(`Erro ao criar conta: ${error.error.message}`);
        },
      }
    );

    setIsSignUpPending(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoginPending(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        window.alert(`Erro no login: ${error.message}`);
      } else {
        window.alert("Login realizado com sucesso!");
        setLoginEmail("");
        setLoginPassword("");
        refetch();
      }
    } catch (err) {
      window.alert("Erro inesperado no login");
    }

    setIsLoginPending(false);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.alert("Logout realizado com sucesso!");
            refetch();
          },
        },
      });
    } catch (err) {
      window.alert("Erro inesperado no logout");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando sessão...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-screen theme-transition">
      <h1 className="text-3xl font-bold mb-6">Meet AI!</h1>

      {session?.user?.email ? (
        <div className="text-center theme-transition">
          <p className="mb-4">Logado como: {session.user.email}</p>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1 theme-transition">
            <Button
              variant={!isLoginMode ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setIsLoginMode(false)}
            >
              Registrar
            </Button>
            <Button
              variant={isLoginMode ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setIsLoginMode(true)}
            >
              Login
            </Button>
          </div>

          {!isLoginMode ? (
            // Formulário de Registro
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                Criar Conta
              </h2>
              <Input
                type="text"
                placeholder="Nome"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                required
                disabled={isSignUpPending}
              />
              <Input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
                disabled={isSignUpPending}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
                disabled={isSignUpPending}
              />
              <Button
                variant="default"
                type="submit"
                disabled={isSignUpPending}
                className="mt-2"
              >
                {isSignUpPending ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          ) : (
            // Formulário de Login
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                Fazer Login
              </h2>
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                disabled={isLoginPending}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                disabled={isLoginPending}
              />
              <Button
                variant="default"
                type="submit"
                disabled={isLoginPending}
                className="mt-2"
              >
                {isLoginPending ? "Fazendo login..." : "Entrar"}
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
