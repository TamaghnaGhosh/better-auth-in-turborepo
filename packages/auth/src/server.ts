import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Import your database
import { authDb } from "@workspace/db/auth-db";

export const auth = betterAuth({
  database: drizzleAdapter(authDb, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  pages: {
    signIn: "/login",
  },
  trustedOrigins:
    process.env.NODE_ENV === "production"
      ? [process.env.APP1_URD, process.env.APP2_URD].filter(
          (url): url is string => Boolean(url),
        )
      : [
          "http://localhost:3000",
          "http://localhost:3000",
          "http://localhost:3000",
          "http://localhost:3000",
        ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});


export type Auth = ReturnType<typeof betterAuth>;
export type Session = Auth["$Infer"]["Session"];
