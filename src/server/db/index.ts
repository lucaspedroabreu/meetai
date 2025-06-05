import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { assertDefined, assertIsString } from "@/utils/error-handling";

assertDefined(process.env.DATABASE_URL, "DATABASE_URL is not set");
assertIsString(process.env.DATABASE_URL, "DATABASE_URL must be a string");

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });
