import { auth } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

// Keep this module free of "use server": these helpers must not become callable endpoints.

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PSYCHOLOGIST" | "GUEST";

export type SessionUser = {
  id: number;
  name: string | null;
  role: UserRole;
};

export class AuthorizationError extends Error {
  constructor(message = "No autorizado") {
    super(message);
    this.name = "AuthorizationError";
  }
}

async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  const id = Number(session?.user?.id);

  if (!session?.user || !Number.isInteger(id)) return null;

  return {
    id,
    name: session.user.name ?? null,
    role: session.user.role as UserRole,
  };
}

/**
 * For server actions: throws if the current user is not logged in or lacks one of the roles.
 */
export async function assertRole(roles: UserRole[]): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user || !roles.includes(user.role)) throw new AuthorizationError();

  return user;
}

/**
 * For pages: redirects to the home page if the current user is not logged in or lacks one of the roles.
 */
export async function requireRole(roles: UserRole[]): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user || !roles.includes(user.role)) redirect("/");

  return user;
}

/**
 * Admins can access every CourseOffering; teachers only the ones assigned to them.
 */
export async function canAccessCourseOffering(user: SessionUser, courseOfferingId: number): Promise<boolean> {
  if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) return false;

  const courseOffering = await prisma.courseOffering.findUnique({
    where: { id: courseOfferingId },
    select: { teacherId: true },
  });

  if (!courseOffering) return false;

  return user.role === "ADMIN" || courseOffering.teacherId === user.id;
}

/**
 * For server actions: throws unless the current user is a teacher/admin with access to the CourseOffering.
 */
export async function assertCourseOfferingAccess(courseOfferingId: number): Promise<SessionUser> {
  const user = await assertRole(["TEACHER", "ADMIN"]);

  if (!(await canAccessCourseOffering(user, courseOfferingId))) throw new AuthorizationError();

  return user;
}
