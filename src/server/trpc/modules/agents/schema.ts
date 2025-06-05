import z from "zod";

export const insertAgentSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Nome do agente é obrigatório",
    })
    .max(100, {
      message: "Nome do agente não pode exceder 100 caracteres",
    }),
  instructions: z.string().max(500, {
    message: "Instruções não podem exceder 500 caracteres",
  }),
});

export type InsertAgentSchema = z.input<typeof insertAgentSchema>;
