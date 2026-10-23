import { beforeEach, describe, expect, it, vi } from "vitest";

const assertCourseOfferingAccess = vi.fn();
const prisma = {
  homework: { findMany: vi.fn(), create: vi.fn() },
  enrollment: { findMany: vi.fn() },
  homeworkGrade: { upsert: vi.fn(), deleteMany: vi.fn() },
  $transaction: vi.fn(),
};

vi.mock("@/lib/db", () => ({ default: prisma }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
class AuthorizationError extends Error {}
vi.mock("@/lib/auth-guards", async () => ({ AuthorizationError, assertCourseOfferingAccess, assertRole: vi.fn() }));

const { createHomework, updateHomeworkGrades } = await import("@/actions/teacher");

const grades = (studentId: number, homeworkId: number, grade: unknown) => ({
  students: [{ studentId, grades: [{ homeworkId, grade }] }],
});

beforeEach(() => {
  vi.clearAllMocks();
  assertCourseOfferingAccess.mockResolvedValue({ id: 7, name: "Test", role: "TEACHER" });
  prisma.homework.findMany.mockResolvedValue([{ id: 10 }]);
  prisma.enrollment.findMany.mockResolvedValue([{ studentId: 20 }]);
  prisma.$transaction.mockResolvedValue([]);
});

describe("updateHomeworkGrades", () => {
  it("returns an error without touching grades when the user cannot access the course", async () => {
    assertCourseOfferingAccess.mockRejectedValue(new AuthorizationError("No autorizado"));
    await expect(updateHomeworkGrades(grades(20, 10, "90") as never, 1)).resolves.toEqual({ error: "No autorizado" });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("rejects homeworks that belong to another course", async () => {
    await expect(updateHomeworkGrades(grades(20, 99, "90") as never, 1)).resolves.toEqual({
      error: "Las notas no corresponden a este curso.",
    });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("rejects students that are not enrolled in the course", async () => {
    await expect(updateHomeworkGrades(grades(21, 10, "90") as never, 1)).resolves.toEqual({
      error: "Las notas no corresponden a este curso.",
    });
  });

  it("returns validation errors for out-of-range grades", async () => {
    const result = await updateHomeworkGrades(grades(20, 10, "150") as never, 1);
    expect(result).toHaveProperty("error");
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("writes every grade in a single transaction", async () => {
    const data = {
      students: [{ studentId: 20, grades: [{ homeworkId: 10, grade: "90" }, { homeworkId: 10, grade: "" }] }],
    };
    await expect(updateHomeworkGrades(data as never, 1)).resolves.toEqual({ ok: true });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.$transaction.mock.calls[0][0]).toHaveLength(2);
    expect(prisma.homeworkGrade.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ create: { homeworkId: 10, studentId: 20, grade: 90 } })
    );
    // An emptied input deletes the grade instead of storing 0
    expect(prisma.homeworkGrade.deleteMany).toHaveBeenCalledWith({ where: { homeworkId: 10, studentId: 20 } });
  });

  it("returns an error when the transaction fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    prisma.$transaction.mockRejectedValue(new Error("connection lost"));
    const result = await updateHomeworkGrades(grades(20, 10, "90") as never, 1);
    expect(result).toEqual({ error: "No se pudieron guardar las notas. Inténtalo de nuevo más tarde." });
  });
});

describe("createHomework", () => {
  const valid = { courseOfferingId: 1, title: "Tarea", description: "Descripción", dueDate: new Date(Date.now() + 86_400_000) };

  it("returns validation errors instead of throwing", async () => {
    const yesterday = new Date(Date.now() - 2 * 86_400_000);
    await expect(createHomework({ ...valid, dueDate: yesterday })).resolves.toEqual({
      error: "La fecha de entrega no puede estar en el pasado.",
    });
    expect(prisma.homework.create).not.toHaveBeenCalled();
  });

  it("creates the homework when the user can access the course", async () => {
    await expect(createHomework(valid)).resolves.toEqual({ ok: true });
    expect(prisma.homework.create).toHaveBeenCalledTimes(1);
  });
});
