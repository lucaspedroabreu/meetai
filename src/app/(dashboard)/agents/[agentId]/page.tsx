import AgentDetailsScreen from "@/components/screens/AgentDetailsScreen";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  // `params` is a promise in Next.js 15 for dynamic segments
  const { agentId } = await params;
  return <AgentDetailsScreen agentId={agentId} />;
}
