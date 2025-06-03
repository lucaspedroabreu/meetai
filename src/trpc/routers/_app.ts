import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  // Exemplo básico de query
  hello: baseProcedure
    .input(
      z.object({
        text: z.string().min(1, "Texto não pode estar vazio"),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Olá ${input.text}!`,
        timestamp: new Date(),
      };
    }),

  // Exemplo básico de mutation
  createGreeting: baseProcedure
    .input(
      z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        message: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      // Aqui você faria a persistência no banco de dados
      return {
        id: Math.random().toString(36),
        name: input.name,
        message: input.message || `Bem-vindo, ${input.name}!`,
        createdAt: new Date(),
      };
    }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
