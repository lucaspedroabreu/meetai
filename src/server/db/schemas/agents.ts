import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./betterAuth";

import { nanoid } from "nanoid";

export const agents = pgTable("agents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("agent_name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  instructions: text("instructions").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
