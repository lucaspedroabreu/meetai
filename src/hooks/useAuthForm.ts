import { useState, useCallback, useMemo } from "react";
import {
  useForm,
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

/**
 * Hook para formulários de autenticação com feedback visual em tempo real
 *
 * ## Fluxo Visual Integrado:
 * 1. **Foco**: Input fica azul, label destaca, erros somem
 * 2. **Digitação**: Validação silenciosa em campos já tocados
 * 3. **Blur**: Bordas verdes (sucesso) ou vermelhas (erro) + label colorido
 * 4. **Estado final**: Input com gradiente verde + label verde (sucesso completo)
 */

/**
 * Hook customizado para gerenciar formulários de autenticação com validação em tempo real
 * e estilos dinâmicos baseados no estado dos campos.
 *
 * @template T - Tipo dos dados do formulário que deve estender FieldValues
 *
 * ## Por que este hook existe?
 * - Unifica a lógica de validação, estado e estilos para formulários de sign-in/sign-up
 * - Elimina duplicação de código entre diferentes componentes de autenticação
 * - Fornece uma API consistente para diferentes tipos de formulário (genérico)
 * - Gerencia estados complexos de UI (focused, touched, valid) de forma centralizada
 */

// T extends FieldValues: T must be a form data type (like { email: string, password: string })
interface UseAuthFormOptions<T extends FieldValues> {
  /** Schema Zod para validação completa do formulário */
  schema: z.ZodSchema<T>;
  /** Schema base opcional para sign-up - permite validação parcial durante digitação */
  baseSchema?: z.ZodSchema<Partial<T>>; // For sign-up that needs baseSchema
  /** Array de nomes dos campos do formulário - garante type safety */
  fields: (keyof T)[]; // Array of field names from T, e.g., ["email", "password"]
  /** Modo do formulário - afeta estilos e comportamento de validação */
  mode?: "sign-in" | "sign-up";
}

/**
 * Retorno do hook - Estados e funções para orquestrar o feedback visual
 */
interface UseAuthFormReturn<T extends FieldValues> {
  form: UseFormReturn<T>;

  // Estados que controlam as 4 fases visuais:
  /** Controla: bordas azuis + labels destacados durante interação */
  focusedFields: Record<keyof T, boolean>;
  /** Controla: QUANDO iniciar feedback visual (evita erro prematuro) */
  touchedFields: Record<keyof T, boolean>;
  /** Controla: gradiente verde + label verde (confirmação de sucesso) */
  validFields: Record<keyof T, boolean>;
  /** Controla: erro temporário no submit (todos os campos ficam vermelhos) */
  submitErrorFields: Record<keyof T, boolean>;

  // Handlers que executam as transições visuais:
  /** Transição: normal → focado (azul + limpa erros) */
  handleFocus: (fieldName: keyof T) => void;
  /** Transição: focado → validado/erro (verde/vermelho + marca como tocado) */
  handleBlur: (fieldName: keyof T, field: any) => Promise<void>;
  /** Transição: em tempo real para campos tocados (atualiza validFields) */
  handleChange: (
    fieldName: keyof T,
    field: any,
    value: string
  ) => Promise<void>;

  // Funções que aplicam os estilos baseados nos estados:
  getFieldStyles: (fieldName: keyof T) => string;
  getLabelStyles: (fieldName: keyof T) => string;
  shouldShowError: (fieldName: keyof T) => boolean;

  // Funções para controlar erro de submit:
  /** Marca todos os campos como erro temporariamente (chamada quando submit falha) */
  setSubmitError: () => void;
  /** Limpa o erro de submit de todos os campos */
  clearSubmitError: () => void;
  /** Verifica se todos os campos estão válidos (para habilitar botão submit) */
  areAllFieldsValid: () => boolean;
}

/**
 * Tipo utilitário que garante que todos os campos tenham valores padrão como string vazia
 * Por que necessário: react-hook-form exige defaultValues, e queremos type safety
 */
type FormDefaultValues<T extends FieldValues> = Record<keyof T, string>;

/**
 * Constantes de estilo centralizadas
 * Por que constantes: Elimina duplicação e facilita manutenção
 * Por que objetos const: Garante imutabilidade e melhor performance
 */
const FIELD_STYLES = {
  success:
    "border-teal-500 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold placeholder:text-white/70 focus:border-teal-500 focus:ring-teal-500/20",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-white",
  normal: "border-gray-300 focus:border-primary focus:ring-primary/20 bg-white",
} as const;

/**
 * Estilos para labels com diferenciação por modo
 * Por que por modo: Sign-up e sign-in têm necessidades visuais diferentes pelo caso específico de confirmação da senha
 * Por que nested object: Organização clara de estados (focused/blurred) por modo
 */
const LABEL_STYLES = {
  signUp: {
    successFocused: "text-teal-600 font-bold",
    successBlurred: "text-teal-600",
  },
  signIn: {
    successFocused: "text-teal-600 font-bold",
    successBlurred: "text-teal-600 font-semibold",
  },
  error: "text-red-600 font-semibold",
  normal: "text-gray-700",
} as const;

/**
 * Hook principal para formulários de autenticação
 *
 * ## Fluxo de funcionamento:
 * 1. Inicialização: Cria estados e form instance
 * 2. Interação: Usuário foca/digita/sai do campo
 * 3. Validação: Em tempo real para campos tocados
 * 4. Estilo: Atualização visual baseada no estado
 *
 * ## Decisões de design:
 * - Genérico para reutilização entre diferentes formulários
 * - Estados separados para controle granular
 * - Validação apenas após interação (UX melhor)
 * - Estilos encapsulados para facilitar manutenção
 */
export function useAuthForm<T extends FieldValues>({
  schema,
  baseSchema,
  fields, // e.g., ["email", "password"]
  mode = "sign-in",
}: UseAuthFormOptions<T>): UseAuthFormReturn<T> {
  /**
   * Função auxiliar para criar objetos de estado inicial
   * Por que função: Elimina repetição na criação de estados booleanos
   * Por que useCallback: Evita recriação desnecessária
   */
  const createInitialState = useCallback(
    (initialValue: boolean) =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: initialValue }),
        {} as Record<keyof T, boolean>
      ),
    [fields]
  );

  /**
   * Gera valores padrão automaticamente como strings vazias
   * Por que automático: Evita erro manual e garante que todos os campos tenham valor inicial
   * Por que useMemo: Evita recriação em cada render
   */
  const defaultValues: FormDefaultValues<T> = useMemo(
    () =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: "" }),
        {} as FormDefaultValues<T>
      ),
    [fields]
  );

  /**
   * Estados de controle de UI - cada um tem propósito específico:
   * - focusedFields: Para estilos durante interação ativa (foco visual)
   * - touchedFields: Para controlar quando iniciar validação visual (evita feedback negativo prematuro)
   * - validFields: Para feedback visual de validação em tempo real (feedback positivo imediato)
   * - submitErrorFields: Para marcar campos como erro temporariamente após erro de submit
   */
  const [focusedFields, setFocusedFields] = useState<Record<keyof T, boolean>>(
    () => createInitialState(false)
  );

  const [touchedFields, setTouchedFields] = useState<Record<keyof T, boolean>>(
    () => createInitialState(false)
  );

  const [validFields, setValidFields] = useState<Record<keyof T, boolean>>(() =>
    createInitialState(false)
  );

  const [submitErrorFields, setSubmitErrorFields] = useState<
    Record<keyof T, boolean>
  >(() => createInitialState(false));

  /**
   * Instância do react-hook-form configurada
   * Configurações específicas:
   * - onBlur: Validação apenas ao sair do campo (evita feedback negativo prematuro)
   * - shouldFocusError: Foca automaticamente em erros quando submit (melhor UX)
   * - zodResolver: Integração com validação Zod
   */
  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    // TypeScript requires 'as any' for react-hook-form compatibility
    // but we know defaultValues is Record<keyof T, string> (all empty strings)
    defaultValues: defaultValues as any,
  });

  /**
   * Função auxiliar para obter informações de estado do campo
   * Por que centralizada: Elimina repetição nas funções de estilo
   * Por que useCallback: Performance - evita recriação desnecessária
   *
   * Retorna objeto com todas as informações necessárias para decisões de estilo/comportamento
   */
  const getFieldInfo = useCallback(
    (fieldName: keyof T) => {
      const fieldState = form.getFieldState(fieldName as Path<T>);
      const isFocused = focusedFields[fieldName];
      const hasBeenTouched = fieldState.isTouched || touchedFields[fieldName];
      const value = form.watch(fieldName as Path<T>);
      const hasValue = !!value;
      const hasError = !!fieldState.error;
      const hasSubmitError = submitErrorFields[fieldName];

      return {
        fieldState,
        isFocused,
        hasBeenTouched,
        value,
        hasValue,
        hasError,
        hasSubmitError,
      };
    },
    [form, focusedFields, touchedFields, submitErrorFields]
  );

  /**
   * Lógica de validação centralizada
   * Por que separada: Usada tanto em getFieldStyles quanto getLabelStyles
   * Por que diferente para focused/blurred: UX - comportamento visual diferente durante interação
   *
   * Regras:
   * - Focado: Mostra sucesso se válido (mesmo sem touched)
   * - Não focado: Mostra sucesso se válido e sem erros (touched ainda requerido para erro)
   */
  const getValidationState = useCallback(
    (
      fieldName: keyof T,
      hasValue: boolean,
      hasBeenTouched: boolean,
      hasError: boolean,
      isFocused: boolean
    ) => {
      // Feedback positivo: mais liberal (não precisa de touched)
      const isValidWhileFocused = hasValue && validFields[fieldName];

      // Feedback quando não focado: sucesso sem touched, erro só com touched
      const isValidWhenBlurred =
        hasValue && !hasError && validFields[fieldName];

      return isFocused ? isValidWhileFocused : isValidWhenBlurred;
    },
    [validFields]
  );

  // FASE 1: Entrada no campo (ativa foco visual + remove erros para não atrapalhar digitação)
  const handleFocus = useCallback(
    (fieldName: keyof T) => {
      setFocusedFields((prev) => ({ ...prev, [fieldName]: true }));
      setSubmitErrorFields((prev) => ({ ...prev, [fieldName]: false }));
      form.clearErrors(fieldName as Path<T>);
    },
    [form]
  );

  // FASE 2: Saída do campo (momento da avaliação visual: verde para sucesso, vermelho para erro)
  const handleBlur = useCallback(
    async (fieldName: keyof T, field: any) => {
      setFocusedFields((prev) => ({ ...prev, [fieldName]: false }));
      setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
      field.onBlur();

      const isValid = await form.trigger(fieldName as Path<T>);
      setValidFields((prev) => ({ ...prev, [fieldName]: isValid }));
    },
    [form]
  );

  // FASE 3: Digitação em tempo real (valida sempre, mas só mostra erro se já tocado)
  const handleChange = useCallback(
    async (fieldName: keyof T, field: any, value: string) => {
      field.onChange(value);

      // Sempre tenta validar para feedback positivo, independente de touched
      try {
        if (fieldName === "confirmPassword" && mode === "sign-up") {
          const password = form.getValues("password" as Path<T>);
          const isValid = value.length > 0 && value === password;
          setValidFields((prev) => ({ ...prev, [fieldName]: isValid }));
        } else {
          const schemaToUse = baseSchema || schema;
          const fieldSchema = (schemaToUse as any).shape[fieldName];
          await fieldSchema.parseAsync(value);
          setValidFields((prev) => ({ ...prev, [fieldName]: true }));
        }
      } catch {
        setValidFields((prev) => ({ ...prev, [fieldName]: false }));
      }
    },
    [form, schema, baseSchema, mode]
  );

  // Traduz estados em classes CSS para inputs (hierarquia: focado > válido > erro > normal)
  const getFieldStyles = useCallback(
    (fieldName: keyof T) => {
      const { isFocused, hasBeenTouched, hasValue, hasError, hasSubmitError } =
        getFieldInfo(fieldName);
      const isValid = getValidationState(
        fieldName,
        hasValue,
        hasBeenTouched,
        hasError,
        isFocused
      );

      if (isFocused) {
        return isValid ? FIELD_STYLES.success : FIELD_STYLES.normal;
      }

      // Prioridade: Submit error > Valid > Field error > Normal
      if (hasSubmitError) return FIELD_STYLES.error;
      if (isValid) return FIELD_STYLES.success;
      if (hasError && hasBeenTouched) return FIELD_STYLES.error;
      return FIELD_STYLES.normal;
    },
    [getFieldInfo, getValidationState]
  );

  // Traduz estados em classes CSS para labels (complementa input sem competir visualmente)
  const getLabelStyles = useCallback(
    (fieldName: keyof T) => {
      const { isFocused, hasBeenTouched, hasValue, hasError, hasSubmitError } =
        getFieldInfo(fieldName);
      const isValid = getValidationState(
        fieldName,
        hasValue,
        hasBeenTouched,
        hasError,
        isFocused
      );

      const modeStyles =
        mode === "sign-up" ? LABEL_STYLES.signUp : LABEL_STYLES.signIn;

      if (isFocused) {
        return isValid ? modeStyles.successFocused : LABEL_STYLES.normal;
      }

      // Prioridade: Submit error > Valid > Field error > Normal
      if (hasSubmitError) return LABEL_STYLES.error;
      if (isValid) return modeStyles.successBlurred;
      if (hasError && hasBeenTouched) return LABEL_STYLES.error;
      return LABEL_STYLES.normal;
    },
    [getFieldInfo, getValidationState, mode]
  );

  // Controla quando mostrar mensagem de erro (só quando não está digitando + tem erro + já interagiu)
  // Mantém feedback negativo conservador: só após touched
  const shouldShowError = useCallback(
    (fieldName: keyof T) => {
      const { isFocused, hasBeenTouched, hasError } = getFieldInfo(fieldName);
      return !isFocused && hasError && hasBeenTouched;
    },
    [getFieldInfo]
  );

  // Funções para controlar erro de submit:
  /** Marca todos os campos como erro temporariamente (chamada quando submit falha) */
  const setSubmitError = useCallback(() => {
    setSubmitErrorFields((prev) =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {} as Record<keyof T, boolean>
      )
    );
    setTouchedFields((prev) =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {} as Record<keyof T, boolean>
      )
    );
    setValidFields((prev) =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: false }),
        {} as Record<keyof T, boolean>
      )
    );
  }, [fields]);

  /** Limpa o erro de submit de todos os campos */
  const clearSubmitError = useCallback(() => {
    setSubmitErrorFields((prev) =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field]: false }),
        {} as Record<keyof T, boolean>
      )
    );
  }, [fields]);

  /** Verifica se todos os campos estão válidos (para habilitar botão submit) */
  const areAllFieldsValid = useCallback(() => {
    return fields.every((field) => validFields[field]);
  }, [fields, validFields]);

  return {
    form: form as unknown as UseFormReturn<T>,
    focusedFields,
    touchedFields,
    validFields,
    submitErrorFields,
    handleFocus,
    handleBlur,
    handleChange,
    getFieldStyles,
    getLabelStyles,
    shouldShowError,
    setSubmitError,
    clearSubmitError,
    areAllFieldsValid,
  };
}
