import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./betterAuth";

import { nanoid } from "nanoid";

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
  model: text("model").notNull().default("gpt-4"),
  status: text("status").notNull().default("active"), // 'active' | 'inactive'

  // Avatar fields
  avatarType: text("avatar_type").notNull().default("icon"), // 'icon' | 'unsplash'
  avatarIcon: text("avatar_icon").notNull().default("bot"),
  avatarGradient: text("avatar_gradient").notNull().default("blue-purple"),
  avatarImageUrl: text("avatar_image_url"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
