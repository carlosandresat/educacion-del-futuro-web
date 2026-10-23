import { beforeEach, describe, expect, it, vi } from "vitest";

const assertCourseOfferingAccess = vi.fn();
const prisma = {
  homework: { findMany: vi.fn(), create: vi.fn() },
  enrollment: { findMany: vi.fn() },
  homeworkGrade: { upsert: vi.fn(), deleteMany: vi.fn() },
};

vi.mock("@/lib/db", () => ({ default: prisma }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/auth-guards", async () => {
  class AuthorizationError extends Error {}
  return { AuthorizationError, assertCourseOfferingAccess, assertRole: vi.fn() };
});

const { createHomework, updateHomeworkGrades } = await import("@/actions/teacher");

const grades = (studentId: number, homeworkId: number, grade: unknown) => ({
  students: [{ studentId, grades: [{ homeworkId, grade }] }],
});

beforeEach(() => {
  vi.clearAllMocks();
  assertCourseOfferingAccess.mockResolvedValue({ id: 7, name: "Test", role: "TEACHER" });
  prisma.homework.findMany.mockResolvedValue([{ id: 10 }]);
  prisma.enrollment.findMany.mockResolvedValue([{ studentId: 20 }]);
});

describe("updateHomeworkGrades", () => {
  it("checks access to the course offering before touching grades", async () => {
    assertCourseOfferingAccess.mockRejectedValue(new Error("No autorizado"));
    await expect(updateHomeworkGrades(grades(20, 10, "90") as never, 1)).rejects.toThrow("No autorizado");
    expect(prisma.homeworkGrade.upsert).not.toHaveBeenCalled();
  });

  it("rejects homeworks that belong to another course", async () => {
    await expect(updateHomeworkGrades(grades(20, 99, "90") as never, 1)).rejects.toThrow(
      "Las notas no corresponden a este curso."
    );
    expect(prisma.homeworkGrade.upsert).not.toHaveBeenCalled();
  });

  it("rejects students that are not enrolled in the course", async () => {
    await expect(updateHomeworkGrades(grades(21, 10, "90") as never, 1)).rejects.toThrow(
      "Las notas no corresponden a este curso."
    );
  });

  it("stores a typed grade", async () => {
    await updateHomeworkGrades(grades(20, 10, "90") as never, 1);
    expect(prisma.homeworkGrade.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ create: { homeworkId: 10, studentId: 20, grade: 90 } })
    );
  });

  it("deletes the grade when the input is emptied instead of storing 0", async () => {
    await updateHomeworkGrades(grades(20, 10, "") as never, 1);
    expect(prisma.homeworkGrade.deleteMany).toHaveBeenCalledWith({ where: { homeworkId: 10, studentId: 20 } });
    expect(prisma.homeworkGrade.upsert).not.toHaveBeenCalled();
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
