import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/db";

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : undefined;
const baseURL = process.env.BETTER_AUTH_URL ?? vercelUrl;

export const auth = betterAuth({
  baseURL,
  // Sign-in requests are rejected unless their Origin is one of these
  trustedOrigins: [
    "https://edfacademy.com",
    "https://www.edfacademy.com",
    vercelUrl,
    vercelBranchUrl,
    baseURL?.startsWith("http://localhost") ? "http://localhost:*" : undefined,
  ].filter((origin): origin is string => Boolean(origin)),
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // Accounts are created by the institute (seed/admin), never by visitors
    disableSignUp: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["ADMIN", "TEACHER", "STUDENT", "PSYCHOLOGIST"],
        required: false,
        defaultValue: "STUDENT",
        input: false,
      },
    },
  },
  session: {
    // Avoids a database round trip on every getSession() for 5 minutes
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  advanced: {
    // Keep the existing autoincrement Int ids
    database: { generateId: "serial" },
  },
  // Must be last: lets server actions (sign in/out) set cookies
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
