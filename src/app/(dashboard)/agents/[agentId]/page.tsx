import AgentDetailsScreen from "@/components/screens/AgentDetailsScreen";

interface AgentPageProps {
  params: {
    agentId: string;
  };
}

export default function AgentPage({ params }: AgentPageProps) {
  return <AgentDetailsScreen agentId={params.agentId} />;
}
