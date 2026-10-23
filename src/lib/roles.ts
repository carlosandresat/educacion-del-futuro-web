export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PSYCHOLOGIST";

// Landing page for each role after signing in
export const ROLE_HOME: Record<UserRole, string> = {
  ADMIN: "/dashboard",
  TEACHER: "/profesor",
  STUDENT: "/student",
  PSYCHOLOGIST: "/psicologia",
};
