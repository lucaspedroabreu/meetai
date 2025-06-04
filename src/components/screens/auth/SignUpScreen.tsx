"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { translateError } from "@/lib/utils";
import {
  AuthFormHeader,
  AuthFormField,
  AuthFormActions,
  AuthSocialLogin,
  AuthFormFooter,
  AuthSuccessMessage,
} from "@/components/features/auth";
import {
  AUTH_FORM_TEXTS,
  AUTH_FIELD_LABELS,
  AUTH_FIELD_PLACEHOLDERS,
  AUTH_VALIDATION,
} from "@/constants/auth";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(
        AUTH_VALIDATION.NAME_MIN_LENGTH,
        `Nome deve ter pelo menos ${AUTH_VALIDATION.NAME_MIN_LENGTH} caracteres`
      ),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(
        AUTH_VALIDATION.PASSWORD_SIGNUP_MIN_LENGTH,
        `Senha deve ter pelo menos ${AUTH_VALIDATION.PASSWORD_SIGNUP_MIN_LENGTH} caracteres`
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Create base schema without refine for field validation
const baseSignUpSchema = z.object({
  name: z
    .string()
    .min(
      AUTH_VALIDATION.NAME_MIN_LENGTH,
      `Nome deve ter pelo menos ${AUTH_VALIDATION.NAME_MIN_LENGTH} caracteres`
    ),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(
      AUTH_VALIDATION.PASSWORD_SIGNUP_MIN_LENGTH,
      `Senha deve ter pelo menos ${AUTH_VALIDATION.PASSWORD_SIGNUP_MIN_LENGTH} caracteres`
    ),
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

  const handleErrorRetry = () => {
    setError(null);
    // Opcional: focar no primeiro campo para facilitar nova tentativa
    form.setFocus("name");
  };

  if (success) {
    return <AuthSuccessMessage />;
  }

  return (
    <>
      <AuthFormHeader
        title={AUTH_FORM_TEXTS.SIGN_UP.title}
        description={AUTH_FORM_TEXTS.SIGN_UP.description}
        logoSize={40}
      />

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AuthFormField
              control={form.control}
              name="name"
              label={AUTH_FIELD_LABELS.name}
              placeholder={AUTH_FIELD_PLACEHOLDERS.name}
              tabIndex={1}
              isLoading={isAuthenticating}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              getFieldStyles={getFieldStyles}
              getLabelStyles={getLabelStyles}
              shouldShowError={shouldShowError}
            />

            <AuthFormField
              control={form.control}
              name="email"
              label={AUTH_FIELD_LABELS.email}
              type="email"
              placeholder={AUTH_FIELD_PLACEHOLDERS.email}
              tabIndex={2}
              isLoading={isAuthenticating}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              getFieldStyles={getFieldStyles}
              getLabelStyles={getLabelStyles}
              shouldShowError={shouldShowError}
            />

            <AuthFormField
              control={form.control}
              name="password"
              label={AUTH_FIELD_LABELS.password}
              type="password"
              placeholder={AUTH_FIELD_PLACEHOLDERS.passwordSignUp}
              tabIndex={3}
              isLoading={isAuthenticating}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              getFieldStyles={getFieldStyles}
              getLabelStyles={getLabelStyles}
              shouldShowError={shouldShowError}
            />

            <AuthFormField
              control={form.control}
              name="confirmPassword"
              label={AUTH_FIELD_LABELS.confirmPassword}
              type="password"
              placeholder={AUTH_FIELD_PLACEHOLDERS.confirmPassword}
              tabIndex={4}
              isLoading={isAuthenticating}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              getFieldStyles={getFieldStyles}
              getLabelStyles={getLabelStyles}
              shouldShowError={shouldShowError}
            />

            <AuthFormActions
              submitLabel={AUTH_FORM_TEXTS.SIGN_UP.submitButton}
              isLoading={isAuthenticating}
              loadingLabel={AUTH_FORM_TEXTS.SIGN_UP.loadingButton}
              areAllFieldsValid={areAllFieldsValid}
              error={error}
              onErrorRetry={handleErrorRetry}
              tabIndex={5}
            />
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {AUTH_FORM_TEXTS.SIGN_UP.hasAccountText}{" "}
            <Link
              href="/sign-in"
              className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
            >
              {AUTH_FORM_TEXTS.SIGN_UP.signInLink}
            </Link>
          </p>
        </div>

        <AuthSocialLogin isLoading={isAuthenticating} />

        <AuthFormFooter />
      </CardContent>
    </>
  );
}
