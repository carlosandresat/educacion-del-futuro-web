import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// Role ids are fixed: src/auth.ts maps roleId -> role name
const ROLES = [
  { id: 1, name: "admin" },
  { id: 2, name: "teacher" },
  { id: 3, name: "student" },
  { id: 4, name: "psychologist" },
];

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
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: { name: role.name },
      create: role,
    });
  }
  // Keep the sequence ahead of the fixed ids
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('roles', 'id'), (SELECT MAX(id) FROM roles))`
  );

  for (const name of COURSES) {
    const existing = await prisma.course.findFirst({ where: { name } });
    if (!existing) {
      await prisma.course.create({ data: { name, description: "" } });
    }
  }
}

async function upsertUser(email: string, name: string, roleId: number, hashedPassword: string) {
  return prisma.user.upsert({
    where: { email },
    update: { name, roleId, password: hashedPassword },
    create: { email, name, roleId, password: hashedPassword },
  });
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
  const hashedPassword = await bcrypt.hash(password, 10);

  const [, teacher, otherTeacher, student, otherStudent] = await Promise.all([
    upsertUser("admin@edf.test", "Admin Prueba", 1, hashedPassword),
    upsertUser("profesor@edf.test", "Profesor Prueba", 2, hashedPassword),
    upsertUser("profesor2@edf.test", "Profesora Prueba", 2, hashedPassword),
    upsertUser("estudiante@edf.test", "Estudiante Prueba", 3, hashedPassword),
    upsertUser("estudiante2@edf.test", "Estudiante Dos", 3, hashedPassword),
    upsertUser("psicologia@edf.test", "Psicóloga Prueba", 4, hashedPassword),
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

  // Test users are opt-in so production only gets roles and courses
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
