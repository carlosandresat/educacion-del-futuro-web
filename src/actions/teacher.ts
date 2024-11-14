"use server"

import prisma from "@/lib/db";
import { CreateHomeworkSchema } from "@/schemas";
import { z } from "zod"

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

export async function createHomework(input: z.infer<typeof CreateHomeworkSchema>) {
    const parsedInput = CreateHomeworkSchema.safeParse(input)
    if (!parsedInput.success) {
        // Extract and concatenate all validation error messages
        const errorMessages = parsedInput.error.errors.map((err) => err.message).join(", ")
        throw new Error(`Invalid input data: ${errorMessages}`)
    }
    const { courseOfferingId, title, description, dueDate } = parsedInput.data
    try {
        // Check if the CourseOffering exists
        const courseOffering = await prisma.courseOffering.findUnique({
            where: { id: courseOfferingId },
        })

        if (!courseOffering) {
            throw new Error(`CourseOffering with ID ${courseOfferingId} does not exist.`)
        }

        // Create the new Homework entry
        const newHomework = await prisma.homework.create({
            data: {
                courseOfferingId,
                title,
                description,
                dueDate,
            },
        })

        return newHomework
    } catch (error) {
        console.error("Error creating homework:", error)
        throw new Error("Failed to create homework. Please try again later.")
    }
}