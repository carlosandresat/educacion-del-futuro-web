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

export const NewClassSchema = z.object({
    topic: z
        .string({
            required_error: "Por favor ingresa un tema",
        }),
    date: z.date({
        required_error: "Tienes que escoger una fecha.",
      }),
    time: z.number({
        required_error: "Tienes que escoger una hora.",
    })
});

export const NewHomeworkSchema = z.object({
    title: z
        .string({
            required_error: "Por favor ingresa un título",
        }),
    description: z
    .string({
        required_error: "Por favor ingresa una descripción",
    }),
    dueDate: z.date({
        required_error: "Tienes que escoger una fecha.",
      }),
});

export const NewLessonSchema = z.object({
    title: z
        .string({
            required_error: "Por favor ingresa un título",
        }),
    content: z
        .string({
        required_error: "Por favor ingresa un contenido",
    }),
    date: z.date({
        required_error: "Tienes que escoger una fecha.",
      }),
});

export const HomeworkGradeSchema = z.object({
    studentId: z.number(),
    grades: z.array(
      z.object({
        homeworkId: z.number(),
        grade: z.coerce.number().min(0).max(100).nullable().optional(), // Allow null but handle it
      })
    ),
  });
  
  export const HomeworksSchema = z.object({
    students: z.array(HomeworkGradeSchema),
  });

export const LessonGradeSchema = z.object({
    studentId: z.number(),
    grades: z.array(
      z.object({
        lessonId: z.number(),
        grade: z.coerce.number().min(0).max(100),
      })
    ),
  });
  
export const LessonsSchema = z.object({
    students: z.array(LessonGradeSchema),
  });

export const AssistanceTypeSchema = z.enum(["P", "A", "F"])

export const AssistanceRegisterSchema = z.object({
    studentId: z.number(),
    register: z.array(
      z.object({
        classId: z.number(),
        assistance: AssistanceTypeSchema,
      })
    ),
});

export const AssistanceSchema = z.object({
    students: z.array(AssistanceRegisterSchema)
})

export const CreateHomeworkSchema = z.object({
    courseOfferingId: z.number().int().positive({
        message: "Invalid Course Offering ID.",
    }),
    title: z.string().min(1, { message: "Title is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    dueDate: z.date({
        required_error: "Due date is required.",
    }).refine((date) => date > new Date(), {
        message: "Due date must be in the future.",
    }),
})

export const CreateLessonSchema = z.object({
    courseOfferingId: z.number().int().positive({
        message: "Invalid Course Offering ID.",
    }),
    title: z.string().min(1, { message: "Title is required." }),
    content: z.string().min(1, { message: "Description is required." }),
    lessonDate: z.date({
        required_error: "Due date is required.",
    }).refine((date) => date > new Date(), {
        message: "Due date must be in the future.",
    }),
})
// Public enrollment forms: shared by the client forms and the API routes,
// so the server never trusts client-side validation alone.
const shortText = z.string().trim().min(1, { message: "Este campo es obligatorio." }).max(100, {
    message: "Este campo debe tener menos de 100 caracteres.",
});

const phone = z.string().trim().min(7, {
    message: "El número de telefono debe tener al menos 7 dígitos.",
}).max(20, {
    message: "El número de telefono debe tener menos de 20 dígitos.",
});

export const ClaseDemostrativaSchema = z.object({
    curso: shortText,
    horario: shortText,
    nombres: z.string().trim().min(6, {
        message: "Tu nombre debe tener al menos 6 caracteres.",
    }).max(100, {
        message: "Tu nombre debe tener menos de 100 caracteres.",
    }),
    cedula: z.string().trim().length(10, {
        message: "El número de cédula debe tener 10 dígitos.",
    }),
    telefono: phone,
    genero: shortText,
    academic_year: shortText,
    colegio: shortText,
    condicion_salud: z.string().trim().max(100, {
        message: "La condición de salud debe tener menos de 100 caracteres.",
    }).default(""),
    carrera: shortText,
    no_examenes: shortText,
    descubierto_por: shortText,
});

export const RegistroSchema = ClaseDemostrativaSchema.extend({
    representante_nombres: z.string().trim().min(6, {
        message: "Tu nombre debe tener al menos 6 caracteres.",
    }).max(100, {
        message: "Tu nombre debe tener menos de 100 caracteres.",
    }),
    representante_celular: phone,
    representante_convencional: phone,
    representante_email: z.string().trim().email({
        message: "Correo inválido.",
    }).max(100),
    representante_direccion: z.string().trim().min(6, {
        message: "La dirección debe tener al menos 6 caracteres.",
    }).max(200, {
        message: "La dirección debe tener menos de 200 caracteres.",
    }),
    expectativas: z.string().trim().max(100, {
        message: "Las expectativas deben tener menos de 100 caracteres.",
    }).default(""),
});
