import z from "zod";
import {
  AI_MODELS,
  AGENT_STATUS,
  AVATAR_TYPES,
  AGENT_AVATAR_ICONS,
  AVATAR_GRADIENTS,
  DEFAULT_VALUES,
} from "@/constants/agents";

export const insertAgentSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Nome do agente é obrigatório",
      })
      .max(100, {
        message: "Nome do agente não pode exceder 100 caracteres",
      }),
    instructions: z
      .string()
      .min(1, {
        message: "Instruções são obrigatórias",
      })
      .max(500, {
        message: "Instruções não podem exceder 500 caracteres",
      }),
    description: z.string().optional(),
    model: z.enum(AI_MODELS).default(DEFAULT_VALUES.model),
    status: z.enum(AGENT_STATUS).default(DEFAULT_VALUES.status),
    avatarType: z.enum(AVATAR_TYPES).default(DEFAULT_VALUES.avatarType),
    avatarIcon: z.enum(AGENT_AVATAR_ICONS).default(DEFAULT_VALUES.avatarIcon),
    avatarGradient: z
      .enum(AVATAR_GRADIENTS)
      .default(DEFAULT_VALUES.avatarGradient),
    avatarImageUrl: z
      .string()
      .transform((val) => (val === "" ? null : val))
      .nullable()
      .refine(
        (val) => val === null || z.string().url().safeParse(val).success,
        {
          message: "URL da imagem deve ser válida",
        }
      )
      .optional(),
  })
  .refine(
    (data) => {
      // Se tipo é 'icon', imageUrl deve ser null/undefined
      if (data.avatarType === "icon") {
        return !data.avatarImageUrl;
      }
      return true;
    },
    {
      message:
        "Quando o tipo de avatar é 'icon', a URL da imagem deve estar vazia",
      path: ["avatarImageUrl"],
    }
  )
  .refine(
    (data) => {
      // Se tipo é 'unsplash', avatarIcon e avatarGradient são opcionais/podem ser padrão
      // mas imageUrl deve estar presente
      if (data.avatarType === "unsplash") {
        return Boolean(data.avatarImageUrl);
      }
      return true;
    },
    {
      message:
        "Quando o tipo de avatar é 'unsplash', a URL da imagem é obrigatória",
      path: ["avatarImageUrl"],
    }
  );

export const updateAgentSchema = z
  .object({
    id: z.string().min(1, {
      message: "ID do agente é obrigatório",
    }),
    instructions: z
      .string()
      .min(1, {
        message: "Instruções são obrigatórias",
      })
      .max(500, {
        message: "Instruções não podem exceder 500 caracteres",
      })
      .optional(),
    description: z.string().optional(),
    model: z.enum(AI_MODELS).optional(),
    status: z.enum(AGENT_STATUS).optional(),
    avatarType: z.enum(AVATAR_TYPES).optional(),
    avatarIcon: z.enum(AGENT_AVATAR_ICONS).optional(),
    avatarGradient: z.enum(AVATAR_GRADIENTS).optional(),
    avatarImageUrl: z
      .string()
      .transform((val) => (val === "" ? null : val))
      .nullable()
      .refine(
        (val) => val === null || z.string().url().safeParse(val).success,
        {
          message: "URL da imagem deve ser válida",
        }
      )
      .optional(),
  })
  .refine(
    (data) => {
      // Se tipo é 'icon', imageUrl deve ser null/undefined
      if (data.avatarType === "icon") {
        return !data.avatarImageUrl;
      }
      return true;
    },
    {
      message:
        "Quando o tipo de avatar é 'icon', a URL da imagem deve estar vazia",
      path: ["avatarImageUrl"],
    }
  )
  .refine(
    (data) => {
      // Se tipo é 'unsplash', avatarIcon e avatarGradient são opcionais/podem ser padrão
      // mas imageUrl deve estar presente
      if (data.avatarType === "unsplash") {
        return Boolean(data.avatarImageUrl);
      }
      return true;
    },
    {
      message:
        "Quando o tipo de avatar é 'unsplash', a URL da imagem é obrigatória",
      path: ["avatarImageUrl"],
    }
  );

export const getAgentByIdSchema = z.object({
  id: z.string().min(1, {
    message: "ID do agente é obrigatório",
  }),
});

export const deleteAgentSchema = z.object({
  id: z.string().min(1, {
    message: "ID do agente é obrigatório",
  }),
});

export const listAgentsSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).default(10).optional(),
  search: z.string().nullish().optional(),
});

export type InsertAgentSchema = z.input<typeof insertAgentSchema>;
export type UpdateAgentSchema = z.input<typeof updateAgentSchema>;
export type GetAgentByIdSchema = z.input<typeof getAgentByIdSchema>;
export type DeleteAgentSchema = z.input<typeof deleteAgentSchema>;
export type ListAgentsSchema = z.input<typeof listAgentsSchema>;
