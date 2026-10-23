"use server"

import * as z from "zod";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ROLE_HOME, type UserRole } from "@/lib/roles";
import { LoginSchema } from "@/schemas";

export const login = async (
    values: z.infer<typeof LoginSchema>
): Promise<{ error: string } | { redirectTo: string }> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos." };
    }

    const { email, password } = validatedFields.data;

    try {
        // nextCookies() (src/lib/auth.ts) writes the session cookie from this server action
        const { user } = await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
        });

        return { redirectTo: ROLE_HOME[user.role as UserRole] ?? "/" };
    } catch (error) {
        if (error instanceof APIError) {
            return { error: "Credenciales inválidas." };
        }
        throw error;
    }
}

export const logout = async () => {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
}
