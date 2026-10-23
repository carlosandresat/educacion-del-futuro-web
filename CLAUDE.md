# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web y app interna de **Educación del Futuro**, academia preuniversitaria en Riobamba (Ecuador). Empezó como sitio informativo con formularios de inscripción y ahora se está extendiendo hacia una app para profesores, administración, estudiantes y psicología. La UI y los textos están en español; los comentarios del código, en inglés.

Stack: Next.js 16 (App Router, Turbopack) + React 19 · Better Auth (email/contraseña, sesiones en DB con cookie cache) · Prisma 7 sobre PostgreSQL (Neon) · shadcn/ui (Radix, estilo `new-york`) + Tailwind 4 · react-hook-form + Zod 4 · Vitest · desplegado en Vercel (Node 24, `iad1`).

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run lint         # ESLint 10 (configuración flat en eslint.config.mjs; el build ya no hace lint)
npm run typecheck    # tsc --noEmit
npm test             # Vitest (unit tests con Prisma/auth mockeados; no necesita base de datos)
npx vitest run src/lib/auth-guards.test.ts  # un solo archivo de tests
npx prisma generate  # también corre en postinstall; genera el cliente en src/generated/prisma (ignorado por git)
npx prisma migrate dev --name <cambio>  # nueva migración contra la rama dev
npx prisma db seed   # roles y cursos; con SEED_TEST_USERS=true, además un usuario de prueba por rol
```

Prisma 7: la configuración del CLI está en `prisma.config.ts` (carga `.env` con dotenv y usa `DIRECT_URL`), y en runtime `src/lib/db.ts` usa `@prisma/adapter-pg` con la `DATABASE_URL` pooled. Los tipos y el cliente se importan desde `@/generated/prisma/client`, no desde `@prisma/client`.

CI (`.github/workflows/ci.yml`) corre lint, typecheck, tests y build en cada push a `main` y en cada PR. Las variables están documentadas en `.env.example`. El `.env` local apunta a la rama `dev` del proyecto de Neon "EDF Academy Web" (`aws-us-east-1`); producción es la rama `production` y solo recibe `prisma migrate deploy`. El registro público está desactivado: los usuarios se crean con `npm run user:create -- <email> "<nombre>" <ROL>` (o con el seed en dev). Better Auth limita los inicios de sesión en producción (unos pocos intentos cada 10 s por IP).

**Videos del sitio público (alojados fuera del repo):** el video de `src/app/page.tsx` y los de explicación de cada curso en `cursos-accordion.tsx` (Expedición Científica, Ruta del Genio, Sendero del Guerrero) están en Cloudinary (`res.cloudinary.com/djqqonsys`). Los de testimonio (`cursos-accordion.tsx`) y el de introducción (`mision-vision.tsx`) están en el bucket `edf-bucket` de Google Cloud Storage; si la billing account de GCP se cierra, esos videos dejan de cargar y los datos pueden borrarse. Mantener la facturación activa o migrarlos antes de la versión final.

## Arquitectura

**Dos mitades con flujos de datos distintos:**
- *Sitio público* (`/`, `/inicio`, `/cursos`, `/inscripcion/*`): contenido estático en `src/data/` y componentes cliente. Los formularios de inscripción hacen `fetch` a `src/app/api/register` y `src/app/api/clases-demostrativas`, que escriben en las tablas planas `registro` y `clases_demostrativas` (sin relación con `User`).
- *App* (`/profesor`, `/profesor/[class_id]`, `/dashboard`, `/student`, `/psicologia`; prefijos en `appRoutePrefixes`): Server Components que llaman server actions de `src/actions/`. El modelo relacional es `User` (con `role`: enum `ADMIN | TEACHER | STUDENT | PSYCHOLOGIST`) → `Course` → `CourseOffering` (curso + profesor + horario), del que cuelgan `Enrollment`, `Homework`, `Lesson`, `Class` y sus notas o ausencias. En las URLs, `class_id` es en realidad el id de un `CourseOffering`.

**Autenticación y autorización (tres capas):**
1. `src/proxy.ts` (el antiguo middleware; en Next 16 corre en Node) + `src/routes.ts`: chequeo optimista (solo mira si existe la cookie de sesión, sin validarla). Toda ruta que no esté en `publicRoutes`/`publicApiRoutes` exige sesión. Una ruta pública nueva (página o API) debe agregarse ahí.
2. `src/lib/auth.ts`: configuración de Better Auth (adaptador Prisma, ids `Int` con `generateId: "serial"`, `role` como campo adicional no editable, `nextCookies()` para que las server actions puedan escribir cookies). La ruta es `src/app/api/auth/[...all]`. Login y logout son server actions en `src/actions/login.ts`, y la página inicial de cada rol está en `ROLE_HOME` (`src/lib/roles.ts`).
3. `src/lib/auth-guards.ts`: el control real de rol y de propiedad. Usar `requireRole` en páginas (redirige) y `assertRole`/`assertCourseOfferingAccess` en server actions (lanza). **Toda server action nueva debe llamar a un guard**: las server actions son endpoints POST invocables desde cualquier ruta, incluidas las públicas, así que el middleware no las protege.

Archivos con `"use server"` exponen *cada* export como endpoint. Los helpers que solo usa código de servidor (p. ej. `auth-guards.ts`) no deben llevar la directiva.

Las server actions que el cliente necesita para mostrar errores devuelven `{ error }` en vez de lanzar (ver `createHomework`): en producción Next.js oculta los mensajes de los errores lanzados.

Los schemas Zod compartidos están en `src/schemas/index.ts`. Los formularios públicos usan `RegistroSchema`/`ClaseDemostrativaSchema` en el cliente y en las rutas API (`src/lib/public-form.ts`). `z.config(z.locales.es())` deja los mensajes por defecto en español.

## Estado de funcionalidades

- Funciona: sitio público, formularios de inscripción y clases demostrativas (validados en el servidor), login y logout por rol, ruleta (el premio se sortea en el servidor y queda en una cookie firmada), lista de cursos del profesor, notas de tareas (guardar y borrar), crear tarea, y la portada del estudiante (sus cursos).
- A medias: **Lecciones** y **Asistencia** usan alumnos y datos de ejemplo fijos en el código y no persisten (`lessons-tab.tsx`, `assistance-tab.tsx`). Los formularios de crear lección y crear clase solo muestran un toast (`createLesson` existe pero nadie la llama, y no hay action para crear clases). El **Dashboard** admin tiene tablas vacías o falsas.
- Solo placeholder: `/psicologia`. No existe interfaz para `AbsenceRegister`, `PsychologyRegister` y `Penaltie`, ni para gestionar usuarios y matrículas (por ahora se usa `npm run user:create`).

## Pendientes

- [ ] Persistir notas de Lecciones y Asistencia (rediseñar `AbsenceRegister` con un estado P/A/F por clase y alumno) y conectar crear lección/clase. Cuando haya un segundo caso real, extraer de `homework-tab.tsx` un componente de tabla editable reutilizable.
- [ ] Dashboard admin con datos reales de `registro` y `clases_demostrativas`, más la gestión de usuarios y matrículas.
- [ ] Rate limit para `/api/register` y `/api/clases-demostrativas` (Firewall de Vercel). Por ahora solo existe el límite de 16 KB por request.
- [ ] Rol de Postgres sin privilegios para la app (hoy se usa `neondb_owner`).
- [ ] Opcional: regenerar `components/ui` con el shadcn actual (estilo v4). Es un cambio de diseño.
