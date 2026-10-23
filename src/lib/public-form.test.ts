import { describe, expect, it, vi } from "vitest";
import { createPublicFormHandler } from "@/lib/public-form";
import { ClaseDemostrativaSchema } from "@/schemas";

const valid = {
  curso: "Curso de Conocimientos",
  horario: "15:00-16:30",
  nombres: "Estudiante de Prueba",
  cedula: "0601234567",
  telefono: "0999999999",
  genero: "f",
  academic_year: "3ro Bach",
  colegio: "Colegio de Prueba",
  carrera: "Medicina",
  no_examenes: "1",
  descubierto_por: "internet",
};

const post = (body: string) =>
  new Request("http://localhost/api/clases-demostrativas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

describe("createPublicFormHandler", () => {
  it("stores valid submissions without echoing them back", async () => {
    const save = vi.fn().mockResolvedValue({ id: 1, ...valid });
    const response = await createPublicFormHandler(ClaseDemostrativaSchema, save)(post(JSON.stringify(valid)));

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
    expect(save).toHaveBeenCalledWith({ ...valid, condicion_salud: "" });
  });

  it("strips fields that are not part of the schema (mass assignment)", async () => {
    const save = vi.fn().mockResolvedValue({});
    await createPublicFormHandler(ClaseDemostrativaSchema, save)(
      post(JSON.stringify({ ...valid, id: 999, createdAt: "2000-01-01" }))
    );

    expect(save.mock.calls[0][0]).not.toHaveProperty("id");
    expect(save.mock.calls[0][0]).not.toHaveProperty("createdAt");
  });

  it("rejects invalid data with field errors", async () => {
    const save = vi.fn();
    const response = await createPublicFormHandler(ClaseDemostrativaSchema, save)(
      post(JSON.stringify({ ...valid, cedula: "123" }))
    );

    expect(response.status).toBe(400);
    expect((await response.json()).fieldErrors).toHaveProperty("cedula");
    expect(save).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    const handler = createPublicFormHandler(ClaseDemostrativaSchema, vi.fn());
    expect((await handler(post("{oops"))).status).toBe(400);
    expect((await handler(post(JSON.stringify({ ...valid, colegio: "a".repeat(20_000) })))).status).toBe(413);
  });

  it("hides internal errors from the response", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const save = vi.fn().mockRejectedValue(new Error('relation "registro" does not exist'));
    const response = await createPublicFormHandler(ClaseDemostrativaSchema, save)(post(JSON.stringify(valid)));

    expect(response.status).toBe(500);
    expect(JSON.stringify(await response.json())).not.toContain("registro");
  });
});
