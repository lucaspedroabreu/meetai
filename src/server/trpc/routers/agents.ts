import { eq, and } from "drizzle-orm";
import { baseProcedure, protectedProcedure, createTRPCRouter } from "../init";
import { agents as agentsTable } from "@/server/db/schemas/agents";
import { z } from "zod";
import { assert, assertDefined, assertIsString } from "@/utils/error-handling";

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
    assertDefined(
      ctx.user?.id,
      "User ID deve estar definido para usuários autenticados"
    );

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
      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );
      assertIsString(input.name, "Nome do agent deve ser uma string");
      assertIsString(input.instructions, "Instruções devem ser uma string");
      assert(
        input.name.trim().length > 0,
        "Nome do agent não pode estar vazio"
      );
      assert(
        input.instructions.length <= 500,
        "Instruções não podem exceder 500 caracteres"
      );

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

      assertDefined(agent, "Agent criado deve retornar dados");
      return agent;
    }),

  // Privado - obter agent específico (apenas se for do usuário)
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );
      assertIsString(input.id, "ID do agent deve ser uma string");
      assert(input.id.trim().length > 0, "ID do agent não pode estar vazio");

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

      assert(
        agent,
        "Agent não encontrado ou você não tem permissão para visualizá-lo"
      );

      // Verificar se o agent pertence ao usuário (dupla verificação de segurança)
      assert(
        agent.userId === ctx.user.id,
        "Você não tem permissão para visualizar este agent"
      );

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

      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );
      assertIsString(id, "ID do agent deve ser uma string");
      assert(id.trim().length > 0, "ID do agent não pode estar vazio");

      if (updateData.name !== undefined) {
        assertIsString(updateData.name, "Nome do agent deve ser uma string");
        assert(
          updateData.name.trim().length > 0,
          "Nome do agent não pode estar vazio"
        );
      }

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

      assert(
        existingAgent && existingAgent.userId === ctx.user.id,
        "Agent não encontrado ou você não tem permissão para editá-lo"
      );

      // Atualizar
      const [updatedAgent] = await ctx.db
        .update(agentsTable)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(agentsTable.id, id))
        .returning();

      assertDefined(updatedAgent, "Agent atualizado deve retornar dados");
      return updatedAgent;
    }),

  // Privado - deletar agent
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );
      assertIsString(input.id, "ID do agent deve ser uma string");
      assert(input.id.trim().length > 0, "ID do agent não pode estar vazio");

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

      assert(
        existingAgent && existingAgent.userId === ctx.user.id,
        "Agent não encontrado ou você não tem permissão para deletá-lo"
      );

      await ctx.db.delete(agentsTable).where(eq(agentsTable.id, input.id));

      return { success: true };
    }),
});
