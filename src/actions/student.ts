"use server"

import prisma from "@/lib/db";
import { assertRole } from "@/lib/auth-guards";

/**
 * Retrieves the course offerings the logged-in student is enrolled in.
 *
 * @returns A promise that resolves to an array with the offering `id`, course `name` and `schedule`.
 * @throws An error if the user is not a student or the database query fails.
 */
export async function getMyEnrollments(): Promise<{ id: number; name: string; schedule: string }[]> {
  // The student is taken from the session, never from the client
  const user = await assertRole(["STUDENT"])

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: user.id },
    select: {
      courseOffering: {
        select: {
          id: true,
          schedule: true,
          course: { select: { name: true } },
        },
      },
    },
  })

  return enrollments.map(({ courseOffering }) => ({
    id: courseOffering.id,
    name: courseOffering.course.name,
    schedule: courseOffering.schedule,
  }))
}
