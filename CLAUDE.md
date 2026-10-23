# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web y app interna de **Educación del Futuro**, academia preuniversitaria en Riobamba (Ecuador). Empezó como sitio informativo con formularios de inscripción y ahora se está extendiendo hacia una app para profesores, administración, estudiantes y psicología. La UI y los textos están en español; los comentarios del código, en inglés.

Stack: Next.js 15 (App Router) + React 19 · Better Auth (email/contraseña, sesiones en DB con cookie cache) · Prisma 7 sobre PostgreSQL (Neon) · shadcn/ui (Radix, estilo `new-york`) + Tailwind · react-hook-form + Zod · desplegado en Vercel.

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run lint         # next lint
npx tsc --noEmit     # type-check (src/components/ui/dialog.tsx tiene 2 errores previos conocidos)
npx prisma generate  # también corre en postinstall; genera el cliente en src/generated/prisma (ignorado por git)
npx prisma migrate dev --name <cambio>  # nueva migración contra la rama dev
npx prisma db seed   # roles y cursos; con SEED_TEST_USERS=true, además un usuario de prueba por rol
```

Prisma 7: la configuración del CLI está en `prisma.config.ts` (carga `.env` con dotenv y usa `DIRECT_URL`), y en runtime `src/lib/db.ts` usa `@prisma/adapter-pg` con la `DATABASE_URL` pooled. Los tipos y el cliente se importan desde `@/generated/prisma/client`, no desde `@prisma/client`.

No hay tests. Las variables están documentadas en `.env.example`. El `.env` local apunta a la rama `dev` del proyecto de Neon "EDF Academy Web" (`aws-us-east-1`); producción es la rama `production` y solo recibe `prisma migrate deploy`. El registro público está desactivado: los usuarios se crean con `npm run user:create -- <email> "<nombre>" <ROL>` (o con el seed en dev). Better Auth limita los inicios de sesión en producción (unos pocos intentos cada 10 s por IP).

## Arquitectura

**Dos mitades con flujos de datos distintos:**
- *Sitio público* (`/`, `/inicio`, `/cursos`, `/inscripcion/*`): contenido estático en `src/data/` y componentes cliente. Los formularios de inscripción hacen `fetch` a `src/app/api/register` y `src/app/api/clases-demostrativas`, que escriben en las tablas planas `registro` y `clases_demostrativas` (sin relación con `User`).
- *App* (`/profesor`, `/profesor/[class_id]`, `/dashboard`): Server Components que llaman server actions de `src/actions/`. El modelo relacional es `User` (con `role`: enum `ADMIN | TEACHER | STUDENT | PSYCHOLOGIST`) → `Course` → `CourseOffering` (curso + profesor + horario), del que cuelgan `Enrollment`, `Homework`, `Lesson`, `Class` y sus notas o ausencias. En las URLs, `class_id` es en realidad el id de un `CourseOffering`.

**Autenticación y autorización (tres capas):**
1. `src/middleware.ts` + `src/routes.ts`: chequeo optimista (solo mira si existe la cookie de sesión, sin validarla). Toda ruta que no esté en `publicRoutes`/`publicApiRoutes` exige sesión. Una ruta pública nueva (página o API) debe agregarse ahí.
2. `src/lib/auth.ts`: configuración de Better Auth (adaptador Prisma, ids `Int` con `generateId: "serial"`, `role` como campo adicional no editable, `nextCookies()` para que las server actions puedan escribir cookies). La ruta es `src/app/api/auth/[...all]`. Login y logout son server actions en `src/actions/login.ts`, y la página inicial de cada rol está en `ROLE_HOME` (`src/lib/roles.ts`).
3. `src/lib/auth-guards.ts`: el control real de rol y de propiedad. Usar `requireRole` en páginas (redirige) y `assertRole`/`assertCourseOfferingAccess` en server actions (lanza). **Toda server action nueva debe llamar a un guard**: las server actions son endpoints POST invocables desde cualquier ruta, incluidas las públicas, así que el middleware no las protege.

Archivos con `"use server"` exponen *cada* export como endpoint. Los helpers que solo usa código de servidor (p. ej. `auth-guards.ts`) no deben llevar la directiva.

Los schemas Zod compartidos están en `src/schemas/index.ts`. Los formularios públicos usan `RegistroSchema`/`ClaseDemostrativaSchema` en el cliente y en las rutas API (`src/lib/public-form.ts`). `z.config(z.locales.es())` deja los mensajes por defecto en español.

## Estado de funcionalidades

- Funciona: sitio público, formularios de inscripción y clases demostrativas, login, ruleta de premios, lista de cursos del profesor, notas de tareas (lee y guarda) y crear tarea.
- A medias: **Lecciones** y **Asistencia** usan alumnos y datos de ejemplo fijos en el código y no persisten (`lessons-tab.tsx`, `assistance-tab.tsx`). Los formularios de crear lección y crear clase solo muestran un toast (`createLesson` existe pero nadie la llama, y no hay action para crear clases). El **Dashboard** admin tiene tablas vacías o falsas.
- No existe: portales de estudiante (`/student`) y psicología (`/psicologia`), aunque el login redirige a ellos. Interfaz para `AbsenceRegister`, `PsychologyRegister` y `Penaltie`.

## Refactorizaciones pendientes

- [x] Validar con Zod en servidor `/api/register` y `/api/clases-demostrativas`; no devolver `error.message` ni el registro completo (contiene cédula).
- [x] Sincronizar Prisma: la única migración (`20240502145500_init`) no coincide con `schema.prisma` (users.id TEXT vs Int; faltan roles, courses, etc.). Hacer baseline de la base actual antes de cualquier `migrate`.
- [ ] `ROLE_HOME` apunta a `/student` y `/psicologia`, que todavía no existen. El rol ya viene del enum `User.role`.
- [ ] `CreateHomeworkSchema`/`CreateLessonSchema` exigen fecha > ahora (rechaza "hoy" y lecciones pasadas) y el error se pierde en un toast genérico.
- [ ] `HomeworkGradeSchema`: `z.coerce` convierte un input vacío en 0; no hay forma de borrar una nota.
- [ ] Ruleta: el premio se decide en el cliente y se guarda en una cookie sin firmar; se puede falsificar.
- [ ] Persistir Lecciones y Asistencia (alinear el schema P/A/F con `AbsenceRegister`), conectar crear lección/clase y reemplazar `window.location.reload()` por `revalidatePath`/`router.refresh()`.
- [x] Quitar `import { auth, signOut } from "@/auth"` de los componentes cliente (`*-tab.tsx`) y los imports muertos.
- [x] Evitar la consulta a la base en cada `auth()` (callback `jwt`).
- [ ] Actualizar dependencias: Next 15/16 (`cookies()`/`params` async), Auth.js estable, Prisma 6+, ESLint 9, TypeScript. Eliminar las que no se usan: `puppeteer`, `puppeteer-core`, `chrome-aws-lambda`, `formidable`, `ws`, `dotenv`, `@neondatabase/serverless`, `@prisma/adapter-neon`, `swiper`, `framer-motion`. Mover `@types/*`/`typescript`/`eslint` a `devDependencies`.
