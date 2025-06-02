"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
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
import { ErrorMessage } from "@/components/ui/error-message";
import {
  SuccessIcon,
  GoogleIcon,
  GitHubIcon,
  LoadingSpinner,
} from "@/components/custom/icons";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Create base schema without refine for field validation
const baseSignUpSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
  } = useAuthForm<SignUpFormData>({
    schema: signUpSchema,
    baseSchema: baseSignUpSchema,
    fields: ["name", "email", "password", "confirmPassword"],
    mode: "sign-up",
    confirmField: "confirmPassword",
    referenceField: "password",
  });

  const onSubmit = async (data: SignUpFormData) => {
    // Validate all fields before submission
    const isValid = await form.trigger();

    if (!isValid) {
      // Get all errors and focus on the first error field
      const errors = form.formState.errors;
      const firstErrorField = Object.keys(errors)[0] as keyof SignUpFormData;
      if (firstErrorField) {
        form.setFocus(firstErrorField);
      }
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
          onSuccess: async () => {
            // Conta criada com sucesso, agora fazer login automático
            try {
              const loginResult = await authClient.signIn.email({
                email: data.email,
                password: data.password,
              });

              if (loginResult.error) {
                // Se falhar o login automático, redireciona para sign-in
                setSuccess(true);
                form.reset();
                setTimeout(() => {
                  router.push("/sign-in");
                }, 2000);
              } else {
                // Login automático bem-sucedido, redireciona para welcome
                setSuccess(true);
                form.reset();
                setTimeout(() => {
                  router.push("/welcome");
                }, 2000);
              }
            } catch (_loginError) {
              // Se falhar o login automático, redireciona para sign-in
              setSuccess(true);
              form.reset();
              setTimeout(() => {
                router.push("/sign-in");
              }, 2000);
            }
          },
          onError: ({ error }) => {
            // Traduz apenas erros que vêm do servidor (podem estar em inglês)
            const translatedError = translateError(
              error.message || "Erro ao criar conta"
            );
            setError(translatedError);
            setSubmitError(); // Marca todos os campos como erro temporariamente
          },
        }
      );
    } catch (_signUpError) {
      // Erro local já em português, não precisa traduzir
      setError("Erro inesperado ao criar conta");
      setSubmitError(); // Marca todos os campos como erro temporariamente
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (success) {
    return (
      <CardContent className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <SuccessIcon size={32} />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          Conta criada com sucesso!
        </h2>
        <p className="text-gray-600 mb-4 max-w-sm mx-auto text-sm">
          Bem-vindo ao MeetAI! Fazendo login automaticamente e preparando sua
          experiência...
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
          <LoadingSpinner
            size={16}
            className="border-gray-300 border-t-purple-600"
          />
          <span>Preparando sua conta...</span>
        </div>
        <Button
          onClick={() => router.push("/welcome")}
          variant="outline"
          className="h-10 px-6 bg-white hover-purple"
        >
          Continuar para Welcome
        </Button>
      </CardContent>
    );
  }

  return (
    <>
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-3">
          <MeetAILogo animated size={40} variant="default" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Criar sua conta
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm">
          Preencha os dados para começar sua jornada
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Grid para Nome e Email - economiza espaço vertical */}
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  const showError = shouldShowError("name");

                  return (
                    <FormItem>
                      <FormLabel
                        className={`text-sm font-medium transition-colors ${getLabelStyles(
                          "name"
                        )}`}
                      >
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Seu nome completo"
                          disabled={isAuthenticating}
                          value={field.value}
                          onFocus={() => handleFocus("name")}
                          onBlur={() => handleBlur("name", field)}
                          onChange={(e) =>
                            handleChange("name", field, e.target.value)
                          }
                          className={`h-10 transition-all duration-200 ${getFieldStyles(
                            "name"
                          )}`}
                        />
                      </FormControl>
                      <div className="flex items-center h-2 -mt-1">
                        <div className="flex-1">
                          {showError && <FormMessage className="text-xs" />}
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />

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
                          className={`h-10 transition-all duration-200 ${getFieldStyles(
                            "email"
                          )}`}
                        />
                      </FormControl>
                      <div className="flex items-center h-2 -mt-1">
                        <div className="flex-1">
                          {showError && <FormMessage className="text-xs" />}
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* Grid para Senha e Confirmar Senha */}
            <div className="grid grid-cols-1 gap-3">
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
                          className={`h-10 transition-all duration-200 ${getFieldStyles(
                            "password"
                          )}`}
                        />
                      </FormControl>
                      <div className="flex items-center h-2 -mt-1">
                        <div className="flex-1">
                          {showError && <FormMessage className="text-xs" />}
                        </div>
                        <span className="text-xs text-gray-500 ml-auto">
                          &#x28;mín. 8 caracteres&#41;
                        </span>
                      </div>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => {
                  const showError = shouldShowError("confirmPassword");

                  return (
                    <FormItem>
                      <FormLabel
                        className={`text-sm font-medium transition-colors ${getLabelStyles(
                          "confirmPassword"
                        )}`}
                      >
                        Confirmar senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          disabled={isAuthenticating}
                          value={field.value}
                          onFocus={() => handleFocus("confirmPassword")}
                          onBlur={() => handleBlur("confirmPassword", field)}
                          onChange={(e) =>
                            handleChange(
                              "confirmPassword",
                              field,
                              e.target.value
                            )
                          }
                          className={`h-10 transition-all duration-200 ${getFieldStyles(
                            "confirmPassword"
                          )}`}
                        />
                      </FormControl>
                      <div className="flex items-center h-2 -mt-1">
                        <div className="flex-1">
                          {showError && <FormMessage className="text-xs" />}
                        </div>
                      </div>
                    </FormItem>
                  );
                }}
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isAuthenticating}
              className={`w-full h-10 transition-all duration-200 bg-brand-gradient hover:bg-brand-gradient-hover ${
                !areAllFieldsValid() && !isAuthenticating
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                  : ""
              }`}
            >
              {isAuthenticating ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size={16} />
                  Criando conta...
                </div>
              ) : (
                "Criar conta gratuita"
              )}
            </Button>

            {/* Erro geral do formulário - compactado */}
            {error && (
              <ErrorMessage
                error={error}
                onRetry={() => {
                  setError(null);
                  // Opcional: focar no primeiro campo para facilitar nova tentativa
                  form.setFocus("name");
                }}
                className="mt-2"
              />
            )}
          </form>
        </Form>

        {/* Seção de link para login - compactada */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/sign-in"
              className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>

        {/* Separador compactado */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500 font-medium">
              Ou continue com
            </span>
          </div>
        </div>

        {/* Botões sociais compactados */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            disabled={isAuthenticating}
            className="h-9 border-gray-300 hover-purple transition-colors bg-white text-sm"
            onClick={() => {
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/welcome",
                newUserCallbackURL: "/welcome",
              });
            }}
          >
            <GoogleIcon size={16} className="mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            disabled={isAuthenticating}
            className="h-9 border-gray-300 hover-purple transition-colors bg-white text-sm"
            onClick={() => {
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/welcome",
                newUserCallbackURL: "/welcome",
              });
            }}
          >
            <GitHubIcon size={16} className="mr-2" />
            GitHub
          </Button>
        </div>

        {/* Termos compactados */}
        <div className="text-center pt-2">
          <p className="text-muted-foreground text-center text-xs text-balance leading-tight">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="text-brand-primary hover:text-brand-secondary underline underline-offset-4"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="text-brand-primary hover:text-brand-secondary underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </CardContent>
    </>
  );
}
