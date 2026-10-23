import prisma from "@/lib/db";
import { createPublicFormHandler } from "@/lib/public-form";
import { RegistroSchema } from "@/schemas";

export const POST = createPublicFormHandler(RegistroSchema, (data) =>
  prisma.registro.create({ data })
);
