import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer reads .env on its own. The CLI (migrate, db seed) uses the direct,
// non-pooled URL; the app connects through the pooled DATABASE_URL in src/lib/db.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // `prisma generate` (postinstall) does not connect, so a missing URL must not break installs
    url: process.env.DIRECT_URL ?? "",
  },
});
