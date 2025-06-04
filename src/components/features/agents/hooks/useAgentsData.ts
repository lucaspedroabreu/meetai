import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/server/trpc/client";
import { CACHE_CONFIG } from "@/lib/cache-keys";

export const useAllAgents = () => {
  const trpc = useTRPC();
  const queryOptions = trpc.agents.getMany.queryOptions();

  return useSuspenseQuery({
    ...queryOptions,
    ...CACHE_CONFIG.AGENTS,
  });
};

export const useMyAgents = () => {
  const trpc = useTRPC();
  const queryOptions = trpc.agents.getMyAgents.queryOptions();

  return useSuspenseQuery({
    ...queryOptions,
    ...CACHE_CONFIG.AGENTS,
  });
};
