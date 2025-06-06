import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./betterAuth";
import { nanoid } from "nanoid";
import { DEFAULT_VALUES } from "@/constants/agents";

export const agents = pgTable("agents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("agent_name").notNull(),
  description: text("description"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  instructions: text("instructions").notNull(),
  model: text("model").notNull().default(DEFAULT_VALUES.model),
  status: text("status").notNull().default(DEFAULT_VALUES.status), // 'active' | 'inactive'

  // Avatar fields
  avatarType: text("avatar_type").notNull().default(DEFAULT_VALUES.avatarType), // 'icon' | 'unsplash'
  avatarIcon: text("avatar_icon").notNull().default(DEFAULT_VALUES.avatarIcon),
  avatarGradient: text("avatar_gradient")
    .notNull()
    .default(DEFAULT_VALUES.avatarGradient),
  avatarImageUrl: text("avatar_image_url"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
