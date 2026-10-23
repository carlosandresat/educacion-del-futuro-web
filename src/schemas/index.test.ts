import { describe, expect, it } from "vitest";
import { CreateHomeworkSchema, CreateLessonSchema, HomeworksSchema } from "@/schemas";

const DAY = 24 * 60 * 60 * 1000;

describe("homework grades", () => {
  const parse = (grade: unknown) =>
    HomeworksSchema.safeParse({ students: [{ studentId: 1, grades: [{ homeworkId: 1, grade }] }] });

  it.each([
    ["", null],
    [null, null],
    [undefined, null],
    ["85", 85],
    [99.5, 99.5],
  ])("parses %j as %j", (input, expected) => {
    const result = parse(input);
    expect(result.success && result.data.students[0].grades[0].grade).toBe(expected);
  });

  it.each(["150", "-1", "abc"])("rejects %j", (input) => {
    expect(parse(input).success).toBe(false);
  });
});

describe("homework and lesson dates", () => {
  const homework = (dueDate: Date) =>
    CreateHomeworkSchema.safeParse({ courseOfferingId: 1, title: "T", description: "D", dueDate });

  it("accepts today at local midnight (what the date picker sends)", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(homework(today).success).toBe(true);
  });

  it("rejects due dates in the past", () => {
    expect(homework(new Date(Date.now() - 2 * DAY)).success).toBe(false);
  });

  it("accepts past lesson dates", () => {
    const result = CreateLessonSchema.safeParse({
      courseOfferingId: 1,
      title: "Lección",
      content: "Contenido",
      lessonDate: new Date(Date.now() - 7 * DAY),
    });
    expect(result.success).toBe(true);
  });
});
