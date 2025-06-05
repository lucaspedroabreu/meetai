import { initTRPC, TRPCError } from "@trpc/server";
// cache removido - não é seguro para contextos com dados de usuário
import superjson from "superjson";
import { headers } from "next/headers";
import { getAndValidateSession } from "@/lib/session";
import { db } from "@/server/db";

// Função async pura - sem cache para evitar vazamento de dados entre usuários
export const createTRPCContext = async () => {
  // Obter headers da requisição
  const reqHeaders = await headers();

  // Obter e validar sessão usando sua função existente
  const { session, isValid, error } = await getAndValidateSession(reqHeaders);

  // Extrair informações úteis dos headers
  const userAgent = reqHeaders.get("user-agent") || "Unknown";
  const ipAddress =
    reqHeaders.get("x-forwarded-for")?.split(",")[0] ||
    reqHeaders.get("x-real-ip") ||
    reqHeaders.get("cf-connecting-ip") || // Cloudflare
    "127.0.0.1";

  // Construir contexto completo
  const context = {
    // Banco de dados
    db,

    // Informações de sessão
    session: isValid ? session : null,
    isAuthenticated: isValid,
    sessionError: error,

    // Dados do usuário (apenas se autenticado)
    user:
      isValid && session?.user
        ? {
            ...session.user,
          }
        : null,

    // Informações da requisição
    headers: {
      userAgent,
      ipAddress,
      // Adicionar outros headers úteis
      authorization: reqHeaders.get("authorization"),
      contentType: reqHeaders.get("content-type"),
      origin: reqHeaders.get("origin"),
      referer: reqHeaders.get("referer"),
    },

    // Logs estruturados
    log: (message: string, data?: unknown) => {
      console.log(`[tRPC ${new Date().toISOString()}] ${message}`, {
        userId: session?.user?.id || "anonymous",
        userAgent,
        ipAddress,
        ...(typeof data === "object" && data !== null ? data : { data }),
      });
    },
  };

  return context;
};

// Inferir o tipo do context
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Procedures públicas (sem validação de autenticação)
export const publicProcedure = baseProcedure;

// Procedures com validação de autenticação
export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  // Validar se está autenticado
  if (!ctx.isAuthenticated || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Você precisa estar logado para acessar este recurso",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // TypeScript agora sabe que user não é null
    },
  });
});

// Procedure para admins (se você tiver roles)
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  // Assumindo que você tenha um campo role - ajuste conforme necessário
  // if (ctx.user.role !== 'admin') {
  //   throw new Error("Acesso negado. Apenas administradores podem acessar este recurso");
  // }

  return next({ ctx });
});
