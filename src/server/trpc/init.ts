import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { headers } from "next/headers";
import { getAndValidateSession } from "@/lib/session";
import { db } from "@/server/db";

export const createTRPCContext = cache(async () => {
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
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
            emailVerified: session.user.emailVerified,
            createdAt: session.user.createdAt,
            updatedAt: session.user.updatedAt,
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

    // Métodos auxiliares
    requireAuth: () => {
      if (!isValid || !session?.user) {
        throw new Error("Autenticação necessária para acessar este recurso");
      }
      return session.user;
    },

    requireRole: (_requiredRole: string) => {
      const user = context.requireAuth();
      // Assumindo que você tenha roles no user - ajuste conforme sua implementação
      // if (user.role !== requiredRole) {
      //   throw new Error(`Acesso negado. Role necessária: ${requiredRole}`);
      // }
      return user;
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
});

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

// Procedures com validação de autenticação
export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  // Validar se está autenticado
  if (!ctx.isAuthenticated || !ctx.user) {
    throw new Error("Você precisa estar logado para acessar este recurso");
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
