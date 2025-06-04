# Agents Feature

Esta feature contém todos os componentes relacionados à funcionalidade de Agentes IA do sistema.

## Estrutura

```
agents/
├── types.ts                 # Tipos TypeScript compartilhados
├── AgentsWelcomeSection.tsx # Seção de boas-vindas com logo e estatísticas
├── CreateAgentSection.tsx   # Seção para criar novos agentes
├── AgentsGrid.tsx          # Grid principal que gerencia lista e estado vazio
├── AgentCard.tsx           # Card individual para cada agente
├── AgentsEmptyState.tsx    # Estado vazio quando não há agentes
├── index.ts                # Barrel exports
└── README.md               # Esta documentação
```

## Componentes

### `AgentsWelcomeSection`

Seção de boas-vindas com logo animado e contador de agentes.

**Props:**

- `agentsCount?: number` - Número de agentes ativos

### `CreateAgentSection`

Seção destacada para criação de novos agentes.

**Props:**

- `onCreateAgent?: () => void` - Callback para criar agente
- `onViewModels?: () => void` - Callback para ver modelos disponíveis

### `AgentsGrid`

Componente principal que gerencia a exibição da lista de agentes ou estado vazio.

**Props:**

- `agents?: Agent[]` - Lista de agentes
- `isLoading?: boolean` - Estado de carregamento
- `onCreateFirstAgent?: () => void` - Callback para criar primeiro agente
- `onConfigureAgent?: (agent: Agent) => void` - Callback para configurar agente

### `AgentCard`

Card individual para exibir informações de um agente.

**Props:**

- `agent: Agent` - Dados do agente
- `index: number` - Índice na lista
- `onConfigure?: (agent: Agent) => void` - Callback para configurar

### `AgentsEmptyState`

Estado vazio exibido quando não há agentes criados.

**Props:**

- `onCreateFirstAgent?: () => void` - Callback para criar primeiro agente

## Tipos

### `Agent`

```typescript
interface Agent {
  id: string | number;
  name?: string;
  description?: string;
  status?: "active" | "inactive";
  model?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
```

### `AgentActions`

```typescript
interface AgentActions {
  onCreateAgent?: () => void;
  onViewModels?: () => void;
  onCreateFirstAgent?: () => void;
  onConfigureAgent?: (agent: Agent) => void;
  onDeleteAgent?: (agent: Agent) => void;
  onToggleStatus?: (agent: Agent) => void;
}
```

## Uso

```typescript
import {
  AgentsWelcomeSection,
  CreateAgentSection,
  AgentsGrid,
  type Agent,
} from "@/components/features/agents";

// No seu componente
<AgentsWelcomeSection agentsCount={5} />
<CreateAgentSection
  onCreateAgent={handleCreate}
  onViewModels={handleViewModels}
/>
<AgentsGrid
  agents={agentsData}
  isLoading={loading}
  onConfigureAgent={handleConfigure}
/>
```

## Features

- ✅ **Modular**: Cada componente tem responsabilidade única
- ✅ **Tipado**: TypeScript com tipos centralizados
- ✅ **Responsivo**: Design adaptável para mobile/desktop
- ✅ **Estados**: Loading, vazio, erro tratados
- ✅ **Acessível**: Suporte a screen readers
- ✅ **Performático**: Componentes otimizados

## TODO

- [ ] Implementar modal de criação de agente
- [ ] Implementar modal de configuração
- [ ] Implementar página de modelos disponíveis
- [ ] Adicionar testes unitários
- [ ] Implementar drag & drop para reordenar
- [ ] Adicionar filtros e busca
