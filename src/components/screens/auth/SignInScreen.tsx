"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MeetAILogo } from "@/components/custom/Logo";
import { authClient } from "@/lib/auth-client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { translateError } from "@/lib/utils";
import {
  ErrorIcon,
  GoogleIcon,
  GitHubIcon,
  LoadingSpinner,
} from "@/components/custom/icons";

const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    form,
    handleFocus,
    handleBlur,
    handleChange,
    getFieldStyles,
    getLabelStyles,
    shouldShowError,
    setSubmitError,
    areAllFieldsValid,
  } = useAuthForm<SignInFormData>({
    schema: signInSchema,
    fields: ["email", "password"],
    mode: "sign-in",
  });

  const onSubmit = async (data: SignInFormData) => {
    // Validate all fields before submission
    const isValid = await form.trigger();

    if (!isValid) {
      // Get all errors and focus on the first error field
      const errors = form.formState.errors;
      const firstErrorField = Object.keys(errors)[0] as keyof SignInFormData;
      if (firstErrorField) {
        form.setFocus(firstErrorField);
      }
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        // Traduz apenas erros que vêm do servidor (podem estar em inglês)
        const translatedError = translateError(
          result.error.message || "Erro no login"
        );
        setError(translatedError);
        setSubmitError(); // Marca todos os campos como erro temporariamente
      } else {
        router.push("/");
      }
    } catch (err) {
      // Erro local já em português, não precisa traduzir
      setError("Erro inesperado no login");
      setSubmitError(); // Marca todos os campos como erro temporariamente
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Card className="shadow-2xl border border-gray-200 bg-white">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <MeetAILogo animated size={48} variant="default" />
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Bem-vindo de volta
        </CardTitle>
        <CardDescription className="text-gray-600">
          Faça login na sua conta para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const showError = shouldShowError("email");

                return (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium transition-colors ${getLabelStyles(
                        "email"
                      )}`}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        disabled={isAuthenticating}
                        value={field.value}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email", field)}
                        onChange={(e) =>
                          handleChange("email", field, e.target.value)
                        }
                        className={`h-11 transition-all duration-200 ${getFieldStyles(
                          "email"
                        )}`}
                        tabIndex={1}
                      />
                    </FormControl>
                    <div className="h-3 -mt-1">
                      {showError && <FormMessage className="text-xs ml-1" />}
                    </div>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const showError = shouldShowError("password");

                return (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium transition-colors ${getLabelStyles(
                        "password"
                      )}`}
                    >
                      Senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isAuthenticating}
                        value={field.value}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password", field)}
                        onChange={(e) =>
                          handleChange("password", field, e.target.value)
                        }
                        className={`h-11 transition-all duration-200 ${getFieldStyles(
                          "password"
                        )}`}
                        tabIndex={2}
                      />
                    </FormControl>
                    <div className="flex items-center h-3 -mt-1">
                      <div className="flex-1">
                        {showError && <FormMessage className="text-xs" />}
                      </div>
                      <Link
                        href="#"
                        className="text-xs text-teal-700 hover:text-teal-600 transition-colors ml-auto"
                        tabIndex={4}
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </FormItem>
                );
              }}
            />

            <div className="pt-1">
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isAuthenticating}
                className={`w-full transition-all duration-200 ${
                  !areAllFieldsValid() && !isAuthenticating
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                    : ""
                }`}
                tabIndex={3}
              >
                {isAuthenticating ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size={16} />
                    Autenticando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </div>

            {/* Erro geral do formulário */}
            {error && (
              <div className="bg-red-100 border border-red-300 rounded-md p-3 flex items-start gap-2">
                <ErrorIcon size={16} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/sign-up"
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Criar conta gratuita
            </Link>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500 font-medium">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            disabled={isAuthenticating}
            className="h-11 border-gray-300 hover:bg-gray-50 transition-colors bg-white"
            onClick={() => {
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                newUserCallbackURL: "/welcome", // Novos usuários vão para onboarding
              });
            }}
          >
            <GoogleIcon size={20} className="mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            disabled={isAuthenticating}
            className="h-11 border-gray-300 hover:bg-gray-50 transition-colors bg-white"
            onClick={() => {
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                newUserCallbackURL: "/welcome", // Novos usuários vão para onboarding
              });
            }}
          >
            <GitHubIcon size={20} className="mr-2" />
            GitHub
          </Button>
        </div>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao continuar, você concorda com nossos{" "}
            <Link href="/terms">Termos de Serviço</Link> e{" "}
            <Link href="/privacy">Política de Privacidade</Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
