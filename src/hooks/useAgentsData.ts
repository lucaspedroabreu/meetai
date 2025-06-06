import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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

export const useCreateAgent = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutationOptions = trpc.agents.create.mutationOptions();

  return useMutation({
    ...mutationOptions,
    onSuccess: () => {
      // Invalidar cache usando utils do TRPC
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMyAgents"], { type: "query" }],
      });
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMany"], { type: "query" }],
      });
    },
  });
};

export const useUpdateAgent = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutationOptions = trpc.agents.update.mutationOptions();

  return useMutation({
    ...mutationOptions,
    onSuccess: () => {
      // Invalidar cache usando utils do TRPC
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMyAgents"], { type: "query" }],
      });
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMany"], { type: "query" }],
      });
    },
  });
};

export const useDeleteAgent = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutationOptions = trpc.agents.delete.mutationOptions();

  return useMutation({
    ...mutationOptions,
    onSuccess: () => {
      // Invalidar cache usando utils do TRPC
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMyAgents"], { type: "query" }],
      });
      queryClient.invalidateQueries({
        queryKey: [["agents", "getMany"], { type: "query" }],
      });
    },
  });
};
