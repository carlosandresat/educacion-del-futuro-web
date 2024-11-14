import prisma from "@/lib/db"; // Adjust the import path based on your project structure

/**
 * Retrieves all CourseOfferings assigned to a specific tutor (professor).
 *
 * @param tutorId - The ID of the tutor (professor).
 * @returns A promise that resolves to an array of CourseOffering objects containing `id` and `name`.
 * @throws An error if the database query fails.
 */
export async function getCoursesByTutorId(tutorId: number): Promise<{ id: number; name: string }[]> {
  try {
    // Query CourseOffering where teacherId matches the provided tutorId
    const courseOfferings = await prisma.courseOffering.findMany({
      where: { teacherId: tutorId },
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
    console.error(`Error fetching courses for tutor ID ${tutorId}:`, error)
    throw new Error("Failed to fetch courses for the specified tutor.")
  }
}