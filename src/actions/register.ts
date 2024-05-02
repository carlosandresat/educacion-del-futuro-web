"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma  from "@/lib/db";
import { RegisterSchema } from "@/schemas";



export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { name, password, email } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return { error: "Email ya registrado" };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { sucess: "Pre-Registro completado" };
};
