import type { Agent } from "@/components/features/agents/types";

export const PAGE_SIZE = 10;

export function prepareAgents(agents: Agent[], search: string, page: number) {
  // filtro por nome, descrição e instruções
  const lowerSearch = search.toLowerCase();
  const filtered = agents.filter((a) => {
    const nameMatch = a.name?.toLowerCase().includes(lowerSearch);
    const descriptionMatch = a.description?.toLowerCase().includes(lowerSearch);
    const instructionsMatch = a.instructions
      ?.toLowerCase()
      .includes(lowerSearch);

    return nameMatch || descriptionMatch || instructionsMatch;
  });

  // ordena pelo campo meetingsCount se existir (desc)
  const ordered = [...filtered].sort(
    (
      a: Agent & { meetingsCount?: number },
      b: Agent & { meetingsCount?: number }
    ) => {
      const mb = b.meetingsCount ?? 0;
      const ma = a.meetingsCount ?? 0;
      return mb - ma;
    }
  );

  const total = ordered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = ordered.slice(start, start + PAGE_SIZE);

  return { total, totalPages, currentPage, slice };
}
