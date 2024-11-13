"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password} = validatedFields.data;

    try{
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
    } catch (error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error: "Credenciales inválidas!"}
                default:
                    return { error: "Something is wrong!"}
            }
        }
        throw error;
    }
}

export const loginRedirect = async () => {
    const session = await auth()
    if (session?.user) {
        redirect(`/${session?.user.role === "STUDENT" ? "student" : session?.user.role === "TEACHER" ? "profesor" : session?.user.role === "ADMIN" ? "dashboard" : session?.user.role === "PSYCHOLOGIST" ? "psicologia": ""}`)
    }
}