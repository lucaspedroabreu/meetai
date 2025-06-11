"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  ArrowUpDown,
  Bot,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  MessageSquare,
  Lightbulb,
  Cog,
  Wand2,
  Shield,
  Rocket,
  Heart,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Agent } from "./types";

// Mapeamento dos ícones
const ICON_COMPONENTS = {
  bot: Bot,
  brain: Brain,
  cpu: Cpu,
  sparkles: Sparkles,
  zap: Zap,
  message: MessageSquare,
  lightbulb: Lightbulb,
  cog: Cog,
  wand: Wand2,
  shield: Shield,
  rocket: Rocket,
  heart: Heart,
} as const;

// Mapeamento dos gradientes
const GRADIENT_CLASSES = {
  "blue-purple": "from-blue-500 to-purple-500",
  "green-teal": "from-green-500 to-teal-500",
  "orange-red": "from-orange-500 to-red-500",
  "pink-purple": "from-pink-500 to-purple-500",
  "indigo-blue": "from-indigo-500 to-blue-500",
  "yellow-orange": "from-yellow-500 to-orange-500",
  "cyan-blue": "from-cyan-500 to-blue-500",
  "purple-pink": "from-purple-500 to-pink-500",
} as const;

// Status de pagamento de exemplo
const PAYMENT_STATUS = {
  pending: { label: "Pendente", icon: Clock, color: "text-yellow-600" },
  processing: { label: "Processando", icon: Loader2, color: "text-blue-600" },
  success: { label: "Pago", icon: CheckCircle, color: "text-green-600" },
  failed: { label: "Falhou", icon: XCircle, color: "text-red-600" },
} as const;

type PaymentStatus = keyof typeof PAYMENT_STATUS;

// Tipo da linha da tabela (mais explícito e seguro)
export interface AgentRow extends Agent {
  payment: {
    amount: number;
    status: PaymentStatus;
  };
  meetingsCount: number;
}

interface AgentsTableProps {
  agents: Agent[];
  showFilter?: boolean;
}

export default function AgentsTable({
  agents,
  showFilter = false,
}: AgentsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();

  // Dados com pagamento de exemplo - Memoizados para performance
  const agentsWithPayment: AgentRow[] = useMemo(() => {
    return agents.map((agent, index) => {
      // Usando o ID do agente como seed para valores consistentes
      const seed = agent.id ? String(agent.id).length : index;
      const amountSeed = ((seed * 127) % 500) + 50; // Determinístico baseado no agente
      const statusSeed = (seed * 31) % 4; // Determinístico baseado no agente

      return {
        ...agent,
        payment: {
          amount: amountSeed,
          status: ["pending", "processing", "success", "failed"][
            statusSeed
          ] as PaymentStatus,
        },
        meetingsCount: (seed * 13) % 25, // Simulado 0-24
      };
    });
  }, [agents]); // Só recalcula se a lista de agentes mudar

  const columns: ColumnDef<AgentRow>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            Agente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const agent = row.original;
        const handleClick = () => {
          router.push(`/agents/${agent.id || row.index}`);
        };

        return (
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -ml-2"
            onClick={handleClick}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 bg-gradient-to-br ${
                agent.avatarType === "icon" && agent.avatarGradient
                  ? GRADIENT_CLASSES[
                      agent.avatarGradient as keyof typeof GRADIENT_CLASSES
                    ] || "from-blue-500 to-purple-500"
                  : "from-blue-500 to-purple-500"
              } rounded-lg flex items-center justify-center shadow-sm overflow-hidden`}
            >
              {agent.avatarType === "unsplash" && agent.avatarImageUrl ? (
                <Image
                  src={agent.avatarImageUrl}
                  alt={agent.name || "Agent"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                (() => {
                  const IconComponent = agent.avatarIcon
                    ? ICON_COMPONENTS[
                        agent.avatarIcon as keyof typeof ICON_COMPONENTS
                      ]
                    : Bot;
                  return IconComponent ? (
                    <IconComponent className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  );
                })()
              )}
            </div>
            <div>
              <div className="font-medium text-sm">
                {agent.name || `Agente #${row.index + 1}`}
              </div>
              <div className="text-xs text-muted-foreground">
                {agent.model?.toUpperCase() || "GPT-4"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === "inactive"
                ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {status === "inactive" ? "Inativo" : "Ativo"}
          </span>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => {
        const description = row.original.description;
        return (
          <div className="max-w-[300px] truncate text-sm text-muted-foreground">
            {description ||
              "Assistente IA personalizado para automatizar tarefas"}
          </div>
        );
      },
    },
    {
      accessorKey: "payment.amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-medium"
          >
            Valor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = row.original.payment.amount;
        return (
          <div className="text-sm font-medium text-green-600">
            R${" "}
            {amount.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "payment.status",
      header: "Pagamento",
      cell: ({ row }) => {
        const paymentStatus = row.original.payment.status;
        const StatusInfo = PAYMENT_STATUS[paymentStatus];
        return (
          <div
            className={`flex items-center space-x-1 text-xs ${StatusInfo.color}`}
          >
            <StatusInfo.icon
              className={`w-3 h-3 ${
                paymentStatus === "processing" ? "animate-spin" : ""
              }`}
            />
            <span>{StatusInfo.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "meetingsCount",
      header: "Reuniões",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.meetingsCount}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const agent = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/agents/${agent.id || row.index}`);
            }}
            className="hover:border-blue-400 dark:hover:border-blue-600"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: agentsWithPayment,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Filtros */}
      {showFilter && (
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Filtrar por nome do agente..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* Tabela */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum agente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
