// Creates (or resets the password of) an email/password user, since public sign-up is disabled.
// Usage: pnpm user:create <email> "<name>" <ADMIN|TEACHER|STUDENT|PSYCHOLOGIST>
// The password comes from CREATE_USER_PASSWORD or is generated and printed once.
// Targets whatever DATABASE_URL points to (.env = dev branch); export the production URL to use it there.
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { PrismaClient, Role } from "../src/generated/prisma/client";

const [email, name, role] = process.argv.slice(2);

if (!email || !name || !role || !(role in Role)) {
  console.error('Usage: pnpm user:create <email> "<name>" <ADMIN|TEACHER|STUDENT|PSYCHOLOGIST>');
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const password = process.env.CREATE_USER_PASSWORD || randomBytes(12).toString("base64url");
  const hashed = await hashPassword(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, role: role as Role },
    create: { email, name, role: role as Role, emailVerified: true },
  });
  const account = await prisma.account.findFirst({ where: { userId: user.id, providerId: "credential" } });
  if (account) {
    await prisma.account.update({ where: { id: account.id }, data: { password: hashed } });
  } else {
    await prisma.account.create({
      data: { userId: user.id, providerId: "credential", accountId: String(user.id), password: hashed },
    });
  }

  console.log(`User ${email} (${role}) is ready.`);
  if (!process.env.CREATE_USER_PASSWORD) console.log(`Generated password (shown once): ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
