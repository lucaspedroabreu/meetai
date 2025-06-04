import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/routers/_app";

const handler = async (req: Request) => {
  try {
    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: createTRPCContext,
      onError:
        process.env.NODE_ENV === "development"
          ? ({ path, error }) => {
              console.error(
                `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
              );
            }
          : undefined,
    });

    // Adicionar cabeçalhos de segurança
    response.headers.set("Content-Security-Policy", "default-src 'self'");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
  } catch (error) {
    // Log do erro no desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.error("❌ tRPC Handler Error:", error);
    }

    // Retornar erro genérico em produção
    return new Response(
      JSON.stringify({
        error: {
          message:
            process.env.NODE_ENV === "development"
              ? (error as Error).message
              : "Internal Server Error",
        },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Content-Security-Policy": "default-src 'self'",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );
  }
};

export { handler as GET, handler as POST };
