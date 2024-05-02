import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Debes ingresar tu email institucional",
    }),
    password: z.string().min(1, {
        message: "Debes ingresar tu contraseña",
    }),
})

export const RegisterSchema = z.object({
    name: z
        .string({
            required_error: "Por favor ingresa tus nombres",
        })
        .min(3, "Tu nombre debe incluir más de 3 caracteres")
        .max(24, "Tu nombre debe contener menos de 24 caracteres"),
    email: z
        .string({
            required_error: "Por favor ingresa tu correo.",
        })
        .email("Correo inválido, revisa la sintaxis."),
    password: z
        .string({
            required_error: "Por favor ingresa una contrseña",
        })
        .min(8, "La contraseña debe contener mínimo 8 caracteres")
        .max(16, "La contraseña debe contener máximo 16 caracteres"),
});
