import { eq, and } from "drizzle-orm";
import { baseProcedure, protectedProcedure, createTRPCRouter } from "../init";
import { agents as agentsTable } from "@/server/db/schemas/agents";
import { z } from "zod";
export const agentsRouter = createTRPCRouter({
  // Público - listar todos os agents (sem dados privados)
  getMany: baseProcedure.query(async ({ ctx }) => {
    ctx.log("Listando agents públicos");

    const agents = await ctx.db
      .select({
        id: agentsTable.id,
        name: agentsTable.name,
        // description: agentsTable.description,
        // Excluir campos privados como userId, etc.
      })
      .from(agentsTable);

    return agents;
  }),

  // Privado - listar agents do usuário logado
  getMyAgents: protectedProcedure.query(async ({ ctx }) => {
    ctx.log("Listando agents do usuário", { userId: ctx.user.id });

    const agents = await ctx.db
      .select()
      .from(agentsTable)
      .where(eq(agentsTable.userId, ctx.user.id));

    return agents;
  }),

  // Privado - criar novo agent
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        instructions: z.string().max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.log("Criando novo agent", {
        userId: ctx.user.id,
        agentName: input.name,
      });

      const [agent] = await ctx.db
        .insert(agentsTable)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .returning();

      return agent;
    }),

  // Privado - obter agent específico (apenas se for do usuário)
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      ctx.log("Buscando agent por ID", {
        userId: ctx.user.id,
        agentId: input.id,
      });

      const [agent] = await ctx.db
        .select()
        .from(agentsTable)
        .where(
          and(eq(agentsTable.id, input.id), eq(agentsTable.userId, ctx.user.id))
        )
        .limit(1);

      if (!agent) {
        throw new Error(
          "Agent não encontrado ou você não tem permissão para visualizá-lo"
        );
      }

      // Verificar se o agent pertence ao usuário (se necessário)
      if (agent.userId !== ctx.user.id) {
        throw new Error("Você não tem permissão para visualizar este agent");
      }

      return agent;
    }),

  // Privado - atualizar agent
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        // outros campos...
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      ctx.log("Atualizando agent", {
        userId: ctx.user.id,
        agentId: id,
      });

      // Primeiro verificar se o agent existe e pertence ao usuário
      const [existingAgent] = await ctx.db
        .select()
        .from(agentsTable)
        .where(eq(agentsTable.id, id))
        .limit(1);

      if (!existingAgent || existingAgent.userId !== ctx.user.id) {
        throw new Error(
          "Agent não encontrado ou você não tem permissão para editá-lo"
        );
      }

      // Atualizar
      const [updatedAgent] = await ctx.db
        .update(agentsTable)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(agentsTable.id, id))
        .returning();

      return updatedAgent;
    }),

  // Privado - deletar agent
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.log("Deletando agent", {
        userId: ctx.user.id,
        agentId: input.id,
      });

      // Verificar se o agent pertence ao usuário antes de deletar
      const [existingAgent] = await ctx.db
        .select()
        .from(agentsTable)
        .where(eq(agentsTable.id, input.id))
        .limit(1);

      if (!existingAgent || existingAgent.userId !== ctx.user.id) {
        throw new Error(
          "Agent não encontrado ou você não tem permissão para deletá-lo"
        );
      }

      await ctx.db.delete(agentsTable).where(eq(agentsTable.id, input.id));

      return { success: true };
    }),
});
