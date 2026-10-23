import { NextResponse } from "next/server";
import { z } from "zod";

// Enrollment forms are a few hundred bytes; anything larger is not a legitimate submission
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Builds a POST handler for an anonymous public form: limits the body size, validates it with
 * `schema` on the server and stores it with `save`. Responses never echo the stored record
 * (it contains the student's cédula) nor internal error messages.
 */
export function createPublicFormHandler<T extends z.ZodTypeAny>(
  schema: T,
  save: (data: z.output<T>) => Promise<unknown>
) {
  return async function POST(request: Request) {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Solicitud demasiado grande." }, { status: 413 });
    }

    let body: unknown;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) {
        return NextResponse.json({ ok: false, error: "Solicitud demasiado grande." }, { status: 413 });
      }
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    try {
      await save(parsed.data);
      return NextResponse.json({ ok: true }, { status: 201 });
    } catch (error) {
      console.error(`Error saving public form ${new URL(request.url).pathname}:`, error);
      return NextResponse.json({ ok: false, error: "Error interno." }, { status: 500 });
    }
  };
}
