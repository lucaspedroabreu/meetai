import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
// import {
//   username,
//   twoFactor,
//   anonymous,
//   admin,
//   organization,
// } from "better-auth/plugins";

import * as schema from "@/db/schema";

const baseURL = process.env.BETTER_AUTH_URL || "https://www.meetai.com.br";

// Debug log para verificar qual URL está sendo usada
if (process.env.NODE_ENV === "development") {
  console.log("🔧 Better Auth baseURL:", baseURL);
  console.log("🌍 BETTER_AUTH_URL env:", process.env.BETTER_AUTH_URL);
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      ...schema,
    },
  }),
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        (() => {
          throw new Error("GOOGLE_CLIENT_ID environment variable is required");
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        (() => {
          throw new Error(
            "GOOGLE_CLIENT_SECRET environment variable is required"
          );
        })(),
    },
    github: {
      clientId:
        process.env.GITHUB_CLIENT_ID ??
        (() => {
          throw new Error("GITHUB_CLIENT_ID environment variable is required");
        })(),
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ??
        (() => {
          throw new Error(
            "GITHUB_CLIENT_SECRET environment variable is required"
          );
        })(),
    },
  },
  // plugins: [username(), twoFactor(), anonymous(), admin(), organization()],
});
