import { eq, and, or, ilike, count } from "drizzle-orm";
import { baseProcedure, protectedProcedure, createTRPCRouter } from "../init";
import { agents as agentsTable } from "@/server/db/schemas/agents";
import { assert, assertDefined, assertIsString } from "@/utils/error-handling";
import {
  insertAgentSchema,
  updateAgentSchema,
  getAgentByIdSchema,
  deleteAgentSchema,
  listAgentsSchema,
} from "../modules/agents/schema";

const SNAPSHOT_LIMIT = 100;

export const agentsRouter = createTRPCRouter({
  // Público - listar todos os agents (sem dados privados)
  getMany: baseProcedure
    .input(listAgentsSchema.optional())
    .query(async ({ ctx, input }) => {
      const { page = 1, pageSize = 10, search } = input ?? {};

      ctx.log("Listando agents públicos", { page, pageSize, search });

      const offset = (page - 1) * pageSize;

      // Construir filtro de busca
      const searchFilter = search
        ? or(
            ilike(agentsTable.name, `%${search}%`),
            ilike(agentsTable.description, `%${search}%`),
            ilike(agentsTable.instructions, `%${search}%`)
          )
        : undefined;

      // Total de registros
      const [{ value: total }] = await ctx.db
        .select({ value: count() })
        .from(agentsTable)
        .where(searchFilter);

      const agents = await ctx.db
        .select({
          id: agentsTable.id,
          name: agentsTable.name,
          description: agentsTable.description,
        })
        .from(agentsTable)
        .where(searchFilter);

      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      return agents;
    }),

  // Privado - listar agents do usuário logado
  getMyAgents: protectedProcedure
    .input(listAgentsSchema.optional())
    .query(async ({ ctx, input }) => {
      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );

      const { page, pageSize = 10, search } = input ?? {};

      ctx.log("Listando agents do usuário", {
        userId: ctx.user.id,
        page,
        pageSize,
        search,
      });

      // Filtro base: pertencer ao usuárioal
      let baseFilter = eq(agentsTable.userId, ctx.user.id);

      // Aplica busca se existir
      const searchFilter = search
        ? or(
            ilike(agentsTable.name, `%${search}%`),
            ilike(agentsTable.description, `%${search}%`),
            ilike(agentsTable.instructions, `%${search}%`)
          )
        : undefined;

      const combinedFilter = searchFilter
        ? and(baseFilter, searchFilter)
        : baseFilter;

      // ───────── SNAPSHOT (sem pagina) ─────────
      if (!page) {
        const rows = await ctx.db
          .select()
          .from(agentsTable)
          .where(combinedFilter)
          .limit(SNAPSHOT_LIMIT + 1);

        const hasMore = rows.length > SNAPSHOT_LIMIT;
        return {
          mode: "snapshot" as const,
          agents: rows.slice(0, SNAPSHOT_LIMIT),
          hasMore,
        };
      }

      // ───────── PAGINAÇÃO REAL ─────────
      const offset = (page - 1) * pageSize;

      const [{ value: total }] = await ctx.db
        .select({ value: count() })
        .from(agentsTable)
        .where(combinedFilter);

      const agents = await ctx.db
        .select()
        .from(agentsTable)
        .where(combinedFilter)
        .limit(pageSize)
        .offset(offset);

      return {
        mode: "page" as const,
        agents,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
        currentPage: page,
      };
    }),

  // Privado - criar novo agent
  create: protectedProcedure
    .input(insertAgentSchema)
    .mutation(async ({ ctx, input }) => {
      ctx.log("Criando novo agent");

      const [createdAgent] = await ctx.db
        .insert(agentsTable)
        .values({
          ...input,
          userId: ctx.user.id,
        })
        .returning();

      assertDefined(createdAgent, "Agent criado deve retornar dados");
      ctx.log("Novo agente criado", {
        agentId: createdAgent.id,
        agentName: createdAgent.name,
      });

      return createdAgent;
    }),

  // Privado - obter agent específico (apenas se for do usuário)
  getById: protectedProcedure
    .input(getAgentByIdSchema)
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
    .input(updateAgentSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      assertDefined(
        ctx.user?.id,
        "User ID deve estar definido para usuários autenticados"
      );
      assertIsString(id, "ID do agent deve ser uma string");
      assert(id.trim().length > 0, "ID do agent não pode estar vazio");

      ctx.log("Atualizando agent", {
        userId: ctx.user.id,
        agentId: id,
      });

      // Verificar se o agent existe e pertence ao usuário
      const [existingAgent] = await ctx.db
        .select()
        .from(agentsTable)
        .where(and(eq(agentsTable.id, id), eq(agentsTable.userId, ctx.user.id)))
        .limit(1);

      assert(
        existingAgent,
        "Agent não encontrado ou você não tem permissão para editá-lo"
      );

      // Atualizar o agent (já garantido que pertence ao usuário)
      const [updatedAgent] = await ctx.db
        .update(agentsTable)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(and(eq(agentsTable.id, id), eq(agentsTable.userId, ctx.user.id)))
        .returning();

      assertDefined(updatedAgent, "Agent atualizado deve retornar dados");
      return updatedAgent;
    }),

  // Privado - deletar agent
  delete: protectedProcedure
    .input(deleteAgentSchema)
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

      // Verificar se o agent existe e pertence ao usuário antes de deletar
      const [existingAgent] = await ctx.db
        .select()
        .from(agentsTable)
        .where(
          and(eq(agentsTable.id, input.id), eq(agentsTable.userId, ctx.user.id))
        )
        .limit(1);

      assert(
        existingAgent && existingAgent.userId === ctx.user.id,
        "Agent não encontrado ou você não tem permissão para deletá-lo"
      );

      // Deletar o agent (já garantido que pertence ao usuário)
      await ctx.db
        .delete(agentsTable)
        .where(
          and(eq(agentsTable.id, input.id), eq(agentsTable.userId, ctx.user.id))
        );

      return { success: true };
    }),
});
