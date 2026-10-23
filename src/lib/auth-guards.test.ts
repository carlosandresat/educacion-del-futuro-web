import { beforeEach, describe, expect, it, vi } from "vitest";

const getSession = vi.fn();
const findUnique = vi.fn();

vi.mock("@/lib/auth", () => ({ auth: { api: { getSession } } }));
vi.mock("@/lib/db", () => ({ default: { courseOffering: { findUnique } } }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  },
}));

const {
  AuthorizationError,
  assertCourseOfferingAccess,
  assertRole,
  canAccessCourseOffering,
  requireRole,
} = await import("@/lib/auth-guards");

const session = (id: string, role: string) => ({ user: { id, name: "Test", role } });

beforeEach(() => {
  getSession.mockReset();
  findUnique.mockReset();
});

describe("assertRole", () => {
  it("throws without a session", async () => {
    getSession.mockResolvedValue(null);
    await expect(assertRole(["TEACHER"])).rejects.toBeInstanceOf(AuthorizationError);
  });

  it("throws when the role is not allowed", async () => {
    getSession.mockResolvedValue(session("5", "STUDENT"));
    await expect(assertRole(["TEACHER", "ADMIN"])).rejects.toBeInstanceOf(AuthorizationError);
  });

  it("returns the user with a numeric id when the role is allowed", async () => {
    getSession.mockResolvedValue(session("7", "TEACHER"));
    await expect(assertRole(["TEACHER"])).resolves.toEqual({ id: 7, name: "Test", role: "TEACHER" });
  });
});

describe("requireRole", () => {
  it("sends anonymous visitors to the public home page", async () => {
    getSession.mockResolvedValue(null);
    await expect(requireRole(["ADMIN"])).rejects.toThrow(new Error("NEXT_REDIRECT:/"));
  });

  it("sends signed-in users without the role to their own landing page", async () => {
    getSession.mockResolvedValue(session("5", "STUDENT"));
    await expect(requireRole(["ADMIN"])).rejects.toThrow("NEXT_REDIRECT:/student");
  });

  it("returns the user when the role is allowed", async () => {
    getSession.mockResolvedValue(session("1", "ADMIN"));
    await expect(requireRole(["ADMIN"])).resolves.toMatchObject({ id: 1, role: "ADMIN" });
  });
});

describe("canAccessCourseOffering", () => {
  const teacher = { id: 7, name: "Test", role: "TEACHER" as const };

  it("allows the teacher who owns the offering", async () => {
    findUnique.mockResolvedValue({ teacherId: 7 });
    await expect(canAccessCourseOffering(teacher, 1)).resolves.toBe(true);
  });

  it("denies another teacher's offering", async () => {
    findUnique.mockResolvedValue({ teacherId: 8 });
    await expect(canAccessCourseOffering(teacher, 1)).resolves.toBe(false);
  });

  it("allows admins on any existing offering", async () => {
    findUnique.mockResolvedValue({ teacherId: 8 });
    await expect(canAccessCourseOffering({ ...teacher, role: "ADMIN" }, 1)).resolves.toBe(true);
  });

  it("denies missing offerings and invalid ids without querying them", async () => {
    findUnique.mockResolvedValue(null);
    await expect(canAccessCourseOffering(teacher, 99)).resolves.toBe(false);
    await expect(canAccessCourseOffering(teacher, Number("abc"))).resolves.toBe(false);
    await expect(canAccessCourseOffering(teacher, -1)).resolves.toBe(false);
    expect(findUnique).toHaveBeenCalledTimes(1);
  });
});

describe("assertCourseOfferingAccess", () => {
  it("throws for a teacher outside the offering", async () => {
    getSession.mockResolvedValue(session("7", "TEACHER"));
    findUnique.mockResolvedValue({ teacherId: 8 });
    await expect(assertCourseOfferingAccess(1)).rejects.toBeInstanceOf(AuthorizationError);
  });
});
