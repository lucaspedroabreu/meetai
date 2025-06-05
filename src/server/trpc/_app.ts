import { createTRPCRouter } from "./init";

import { agentsRouter } from "./routes/agents";
import { authRouter } from "./routes/auth";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  agents: agentsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
