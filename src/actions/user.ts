// Not a server action on purpose: it returns the full user row (password hash included)
// and is only meant to be called from server code such as the auth callbacks.
import prisma from "@/lib/db";

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
}