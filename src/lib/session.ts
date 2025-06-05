import { auth } from "@/lib/auth";
import { tryCatch, isDefined, isString } from "@/utils/error-handling";

/**
 * Tipos nativos do Better Auth - usando o tipo real da API
 */
type SessionResponse = Awaited<ReturnType<typeof auth.api.getSession>>;

/**
 * Resultado estruturado da validação de sessão
 */
export interface SessionValidationResult {
  session: SessionResponse;
  isValid: boolean;
  error: Error | null;
}

/**
 * Função principal para obter e validar sessão de forma robusta
 *
 * Esta função:
 * - Faz a chamada auth.api.getSession() com tratamento de erro
 * - Valida a sessão obtida usando os tipos nativos do Better Auth
 * - Retorna dados estruturados para facilitar o uso
 *
 * @param headers - Headers da requisição (obtidos com await headers())
 * @returns Objeto com session, isValid, error e user
 */
export async function getAndValidateSession(
  headers: Headers
): Promise<SessionValidationResult> {
  const { data: sessionResponse, error } = await tryCatch(
    auth.api.getSession({ headers })
  );

  if (error) {
    // Log do erro para debugging (em produção, usar serviço de logging)
    console.error("🚨 Erro ao obter sessão:", error);

    return {
      session: null,
      isValid: false,
      error,
    };
  }

  // Validação usando os tipos nativos
  const isValid = validateSessionResponse(sessionResponse);

  return {
    session: isValid ? sessionResponse : null,
    isValid,
    error: null,
  };
}

/**
 * Valida se uma resposta de sessão é válida e ativa
 *
 * Verifica:
 * - Presença do email do usuário
 * - Presença do ID do usuário
 * - Se a sessão não expirou (usando a estrutura nativa do Better Auth)
 *
 * @param sessionResponse - Resposta nativa do auth.api.getSession()
 * @returns true se a sessão é válida, false caso contrário
 */
function validateSessionResponse(sessionResponse: SessionResponse): boolean {
  // Verificação básica: resposta existe e tem usuário com email e id
  if (!sessionResponse?.user?.email || !sessionResponse?.user?.id) {
    return false;
  }

  // Usar type guards para validação condicional - não queremos falhar rápido aqui
  if (
    !isDefined(sessionResponse.user.email) ||
    !isString(sessionResponse.user.email)
  ) {
    return false;
  }

  if (!isDefined(sessionResponse.user.id)) {
    return false;
  }

  // Verificação de expiração usando a estrutura nativa do Better Auth
  if (sessionResponse.session?.expiresAt) {
    const expirationDate = new Date(sessionResponse.session.expiresAt);
    const currentDate = new Date();

    // Se a sessão expirou, é inválida
    if (expirationDate <= currentDate) {
      return false;
    }
  }

  // Se passou em todas as verificações, a sessão é válida
  return true;
}

/**
 * Constantes para facilitar o debugging
 */
export const SESSION_VALIDATION_ERRORS = {
  NO_SESSION: "Sessão não encontrada",
  NO_USER: "Usuário não encontrado na sessão",
  NO_EMAIL: "Email do usuário não encontrado",
  NO_ID: "ID do usuário não encontrado",
  EXPIRED: "Sessão expirada",
  NETWORK_ERROR: "Erro de rede ao obter sessão",
  AUTH_SERVICE_ERROR: "Erro no serviço de autenticação",
} as const;
