"use server"

import prisma from "@/lib/db";
import { AuthorizationError, assertCourseOfferingAccess, assertRole } from "@/lib/auth-guards";
import { CreateHomeworkSchema, CreateLessonSchema, HomeworksSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod"

/**
 * Retrieves the CourseOfferings of the logged-in tutor (professor). Admins get every CourseOffering.
 *
 * @returns A promise that resolves to an array of CourseOffering objects containing `id` and `name`.
 * @throws An error if the user is not a teacher/admin or the database query fails.
 */
export async function getMyCourses(): Promise<{ id: number; name: string }[]> {
  // The tutor is taken from the session, never from the client
  const user = await assertRole(["TEACHER", "ADMIN"])

  try {
    // Query CourseOffering where teacherId matches the logged-in tutor
    const courseOfferings = await prisma.courseOffering.findMany({
      where: user.role === "ADMIN" ? {} : { teacherId: user.id },
      select: {
        id: true, // Select the ID of the CourseOffering
        course: {
          select: {
            name: true, // Select the name of the associated Course
          },
        },
      },
    })

    // Map the results to include only id and course name
    return courseOfferings.map((offering) => ({
      id: offering.id,
      name: offering.course.name,
    }))
  } catch (error) {
    console.error(`Error fetching courses for tutor ID ${user.id}:`, error)
    throw new Error("Failed to fetch courses for the specified tutor.")
  }
}

export async function createHomework(input: z.infer<typeof CreateHomeworkSchema>) {
    const parsedInput = CreateHomeworkSchema.safeParse(input)
    if (!parsedInput.success) {
        // Extract and concatenate all validation error messages
        const errorMessages = parsedInput.error.errors.map((err) => err.message).join(", ")
        throw new Error(`Invalid input data: ${errorMessages}`)
    }
    const { courseOfferingId, title, description, dueDate } = parsedInput.data

    // Check that the CourseOffering exists and belongs to the logged-in tutor
    await assertCourseOfferingAccess(courseOfferingId)

    try {
        // Create the new Homework entry
        await prisma.homework.create({
            data: {
                courseOfferingId,
                title,
                description,
                dueDate,
            },
        })
    } catch (error) {
        console.error("Error creating homework:", error)
        throw new Error("Failed to create homework. Please try again later.")
    }
}

export async function getInitialHomeworksData(courseOfferingId:number) {
  await assertCourseOfferingAccess(courseOfferingId);

  // Fetch students enrolled in the course offering
  const enrollments = await prisma.enrollment.findMany({
    where: { courseOfferingId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const students = enrollments.map((enrollment) => enrollment.student);

  // Fetch homework assignments for the course offering
  const homeworks = await prisma.homework.findMany({
    where: { courseOfferingId },
    select: {
      id: true,
      title: true,
    },
  });

  // Fetch existing homework grades
  const homeworkGrades = await prisma.homeworkGrade.findMany({
    where: {
      homework: {
        courseOfferingId,
      },
    },
    select: {
      studentId: true,
      homeworkId: true,
      grade: true,
    },
  });

  // Organize grades per student
  const studentsWithGrades = students.map((student) => {
    const grades = homeworks.map((homework) => {
      const gradeRecord = homeworkGrades.find(
        (hg) => hg.studentId === student.id && hg.homeworkId === homework.id
      );
      return {
        homeworkId: homework.id,
        grade: gradeRecord ? gradeRecord.grade : null, // or default to 0
      };
    });
    return {
      studentId: student.id,
      grades,
    };
  });

  const defaultValues = {
    students: studentsWithGrades,
  };

  return {
    students,
    homeworks,
    defaultValues,
  };
}

export async function updateHomeworkGrades(
  data:  z.infer<typeof HomeworksSchema>,
  courseOfferingId: number
) {
  // Validate the input data using the HomeworksSchema
  const parsedData = HomeworksSchema.safeParse(data);

  if (!parsedData.success) {
    // Extract and concatenate all validation error messages
    const errorMessages = parsedData.error.errors.map((err) => err.message).join(", ");
    throw new Error(`Invalid input data: ${errorMessages}`);
  }

  await assertCourseOfferingAccess(courseOfferingId);

  // Every grade must reference a homework of this course and a student enrolled in it,
  // otherwise a tutor could write grades of other courses through their own courseOfferingId
  const [courseHomeworks, courseEnrollments] = await Promise.all([
    prisma.homework.findMany({ where: { courseOfferingId }, select: { id: true } }),
    prisma.enrollment.findMany({ where: { courseOfferingId }, select: { studentId: true } }),
  ]);
  const homeworkIds = new Set(courseHomeworks.map((homework) => homework.id));
  const studentIds = new Set(courseEnrollments.map((enrollment) => enrollment.studentId));

  const belongsToCourse = parsedData.data.students.every(
    ({ studentId, grades }) =>
      studentIds.has(studentId) && grades.every(({ homeworkId }) => homeworkIds.has(homeworkId))
  );

  if (!belongsToCourse) {
    throw new AuthorizationError("Las notas no corresponden a este curso.");
  }

  try {
    // Iterate over each student in the data
    for (const student of parsedData.data.students) {
      const { studentId, grades } = student;

      // Iterate over each grade entry for the student
      for (const gradeEntry of grades) {
        const { homeworkId, grade } = gradeEntry;

        if (grade !== null && grade !== undefined) {
          // Proceed with upsert
          await prisma.homeworkGrade.upsert({
            where: {
              homework_student_unique: {
                homeworkId,
                studentId,
              },
            },
            update: {
              grade,
              updatedAt: new Date(),
            },
            create: {
              homeworkId,
              studentId,
              grade,
            },
          });
        }
      }
    }

    // Optionally, revalidate the path or return success message
    revalidatePath(`/profesor/${courseOfferingId}`);
  } catch (error) {
    console.error("Error updating homework grades:", error);
    throw new Error("Failed to update homework grades. Please try again later.");
  }
}

export async function createLesson(input: z.infer<typeof CreateLessonSchema>) {
  const parsedInput = CreateLessonSchema.safeParse(input)
  if (!parsedInput.success) {
      // Extract and concatenate all validation error messages
      const errorMessages = parsedInput.error.errors.map((err) => err.message).join(", ")
      throw new Error(`Invalid input data: ${errorMessages}`)
  }
  const { courseOfferingId, title, content, lessonDate } = parsedInput.data

  // Check that the CourseOffering exists and belongs to the logged-in tutor
  await assertCourseOfferingAccess(courseOfferingId)

  try {
      // Create the new Lesson entry
      await prisma.lesson.create({
          data: {
              courseOfferingId,
              title,
              content,
              lessonDate,
          },
      })
  } catch (error) {
      console.error("Error creating homework:", error)
      throw new Error("Failed to create homework. Please try again later.")
  }
}