import { createTRPCRouter } from "../init";

import { agentsRouter } from "./agents";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  agents: agentsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
