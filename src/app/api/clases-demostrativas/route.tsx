import prisma from "@/lib/db";
import { createPublicFormHandler } from "@/lib/public-form";
import { ClaseDemostrativaSchema } from "@/schemas";

export const POST = createPublicFormHandler(ClaseDemostrativaSchema, (data) =>
  prisma.clases_demostrativas.create({ data })
);
