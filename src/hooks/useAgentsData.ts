import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTRPC } from "@/server/trpc/client";
import { CACHE_CONFIG } from "@/lib/cache-keys";
import type { Agent } from "@/components/features/agents";

export const useAllAgents = () => {
  const trpc = useTRPC();
  const queryOptions = trpc.agents.getMany.queryOptions();

  return useSuspenseQuery<Agent[]>({
    ...(queryOptions as any),
    ...CACHE_CONFIG.AGENTS,
  });
};

export interface MyAgentsParams {
  page?: number;
  search?: string;
}

export type AgentsSnapshot = {
  mode: "snapshot";
  agents: Agent[];
  hasMore: boolean;
};

export type AgentsPage = {
  mode: "page";
  agents: Agent[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type AgentsResponse = AgentsSnapshot | AgentsPage;

export function useMyAgents(params?: MyAgentsParams) {
  const trpc = useTRPC();
  const queryOptions = trpc.agents.getMyAgents.queryOptions(params);

  return useSuspenseQuery<AgentsResponse>({
    ...(queryOptions as any),
    ...CACHE_CONFIG.AGENTS,
  });
}

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
