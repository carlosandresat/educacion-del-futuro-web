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
        grade: z.coerce.number().min(0).max(100),
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