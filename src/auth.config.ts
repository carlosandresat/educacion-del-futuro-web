import type { NextAuthConfig } from "next-auth"

// Edge-safe config shared with the middleware: no providers that touch the database.
// The Credentials provider (Prisma + bcrypt) is added in src/auth.ts, which only runs on Node.
export default {
    providers: []
} satisfies NextAuthConfig
