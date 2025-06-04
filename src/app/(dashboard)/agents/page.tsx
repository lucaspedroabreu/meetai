import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/server/trpc/server";
import AgentsScreen from "@/components/screens/AgentsScreen";

const AgentsPage = async () => {
  const queryClient = getQueryClient();

  // Prefetch das queries que serão usadas pelos componentes
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  void queryClient.prefetchQuery(trpc.agents.getMyAgents.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AgentsScreen />
    </HydrationBoundary>
  );
};

export default AgentsPage;
