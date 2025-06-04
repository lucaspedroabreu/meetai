import { baseProcedure, createTRPCRouter } from "../init";

export const authRouter = createTRPCRouter({
  // Retorna a sessão do usuário atual
  getSession: baseProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
      isAuthenticated: ctx.isAuthenticated,
      session: ctx.session,
    };
  }),

  // Verificar se está autenticado (apenas true/false)
  isAuthenticated: baseProcedure.query(async ({ ctx }) => {
    return ctx.isAuthenticated;
  }),
});
