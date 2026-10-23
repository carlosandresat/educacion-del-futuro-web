export const publicRoutes = [
    "/",
    "/inicio",
    "/cursos",
    "/inscripcion",
    "/inscripcion/gratis",
    "/inscripcion/registro",
];

// Endpoints used by the public enrollment forms (anonymous visitors)
export const publicApiRoutes = [
    "/api/register",
    "/api/clases-demostrativas",
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"

// Logged-in app areas: they render their own header instead of the public navbar
export const appRoutePrefixes = ["/dashboard", "/profesor", "/student", "/psicologia"];
