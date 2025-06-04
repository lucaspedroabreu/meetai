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
} from "@/components/features/auth";
import {
  AUTH_FORM_TEXTS,
  AUTH_FIELD_LABELS,
  AUTH_FIELD_PLACEHOLDERS,
  AUTH_VALIDATION,
} from "@/constants/auth";

const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(
      AUTH_VALIDATION.PASSWORD_MIN_LENGTH,
      `Senha deve ter pelo menos ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} caracteres`
    ),
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
    } catch (_authError) {
      // Erro local já em português, não precisa traduzir
      setError("Erro inesperado no login");
      setSubmitError(); // Marca todos os campos como erro temporariamente
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleErrorRetry = () => {
    setError(null);
    // Opcional: focar no primeiro campo para facilitar nova tentativa
    form.setFocus("email");
  };

  return (
    <>
      <AuthFormHeader
        title={AUTH_FORM_TEXTS.SIGN_IN.title}
        description={AUTH_FORM_TEXTS.SIGN_IN.description}
      />

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AuthFormField
              control={form.control}
              name="email"
              label={AUTH_FIELD_LABELS.email}
              type="email"
              placeholder={AUTH_FIELD_PLACEHOLDERS.email}
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
              name="password"
              label={AUTH_FIELD_LABELS.password}
              type="password"
              placeholder={AUTH_FIELD_PLACEHOLDERS.password}
              tabIndex={2}
              isLoading={isAuthenticating}
              showForgotPassword={true}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              getFieldStyles={getFieldStyles}
              getLabelStyles={getLabelStyles}
              shouldShowError={shouldShowError}
            />

            <AuthFormActions
              submitLabel={AUTH_FORM_TEXTS.SIGN_IN.submitButton}
              isLoading={isAuthenticating}
              loadingLabel={AUTH_FORM_TEXTS.SIGN_IN.loadingButton}
              areAllFieldsValid={areAllFieldsValid}
              error={error}
              onErrorRetry={handleErrorRetry}
              tabIndex={3}
            />
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {AUTH_FORM_TEXTS.SIGN_IN.noAccountText}{" "}
            <Link
              href="/sign-up"
              className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
            >
              {AUTH_FORM_TEXTS.SIGN_IN.createAccountLink}
            </Link>
          </p>
        </div>

        <AuthSocialLogin isLoading={isAuthenticating} />

        <AuthFormFooter />
      </CardContent>
    </>
  );
}
