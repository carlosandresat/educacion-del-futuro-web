import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { PrismaClient, type Role } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const COURSES = [
  "Numérico",
  "Lógico",
  "Verbal",
  "Atención y Concentración",
  "Abstracto",
  "Física",
  "Ciudadanía",
  "Historia",
  "Matemáticas",
  "Emprendimiento y Gestión",
  "Lengua y Literatura",
  "Química",
  "Biología",
  "Inglés",
];

async function seedBaseData() {
  for (const name of COURSES) {
    const existing = await prisma.course.findFirst({ where: { name } });
    if (!existing) {
      await prisma.course.create({ data: { name, description: "" } });
    }
  }
}

// Same shape Better Auth uses for email/password users: the hash lives in a "credential" account
async function upsertUser(email: string, name: string, role: Role, hashedPassword: string) {
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, role },
    create: { email, name, role, emailVerified: true },
  });
  const account = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });
  if (account) {
    await prisma.account.update({ where: { id: account.id }, data: { password: hashedPassword } });
  } else {
    await prisma.account.create({
      data: { userId: user.id, providerId: "credential", accountId: String(user.id), password: hashedPassword },
    });
  }
  return user;
}

async function findOrCreateOffering(courseName: string, teacherId: number, schedule: string) {
  const course = await prisma.course.findFirstOrThrow({ where: { name: courseName } });
  const existing = await prisma.courseOffering.findFirst({
    where: { courseId: course.id, teacherId },
  });
  return existing ?? prisma.courseOffering.create({ data: { courseId: course.id, teacherId, schedule } });
}

async function seedTestData() {
  const password = process.env.SEED_TEST_PASSWORD;
  if (!password) {
    throw new Error("SEED_TEST_PASSWORD is required when SEED_TEST_USERS=true");
  }
  const hashedPassword = await hashPassword(password);

  const [, teacher, otherTeacher, student, otherStudent] = await Promise.all([
    upsertUser("admin@edf.test", "Admin Prueba", "ADMIN", hashedPassword),
    upsertUser("profesor@edf.test", "Profesor Prueba", "TEACHER", hashedPassword),
    upsertUser("profesor2@edf.test", "Profesora Prueba", "TEACHER", hashedPassword),
    upsertUser("estudiante@edf.test", "Estudiante Prueba", "STUDENT", hashedPassword),
    upsertUser("estudiante2@edf.test", "Estudiante Dos", "STUDENT", hashedPassword),
    upsertUser("psicologia@edf.test", "Psicóloga Prueba", "PSYCHOLOGIST", hashedPassword),
  ]);

  // Two offerings for one teacher and one for another, to exercise ownership checks
  const numerico = await findOrCreateOffering("Numérico", teacher.id, "Lunes 08:00");
  await findOrCreateOffering("Lógico", teacher.id, "Martes 08:00");
  await findOrCreateOffering("Verbal", otherTeacher.id, "Miércoles 08:00");

  for (const studentId of [student.id, otherStudent.id]) {
    const enrolled = await prisma.enrollment.findFirst({
      where: { studentId, courseOfferingId: numerico.id },
    });
    if (!enrolled) {
      await prisma.enrollment.create({
        data: { studentId, courseOfferingId: numerico.id, enrollmentDate: new Date() },
      });
    }
  }

  for (const title of ["Tarea 1", "Tarea 2"]) {
    const existing = await prisma.homework.findFirst({
      where: { title, courseOfferingId: numerico.id },
    });
    if (!existing) {
      await prisma.homework.create({
        data: {
          title,
          description: `${title} de prueba`,
          courseOfferingId: numerico.id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }
  }
}

async function main() {
  await seedBaseData();

  // Test users are opt-in so production only gets the course catalog
  if (process.env.SEED_TEST_USERS === "true") {
    await seedTestData();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
