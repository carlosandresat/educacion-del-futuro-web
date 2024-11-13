"use server";

import prisma from "@/lib/db";

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
}