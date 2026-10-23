import { getSessionCookie } from "better-auth/cookies"
import { NextResponse, type NextRequest } from "next/server"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicApiRoutes,
    publicRoutes,
} from "@/routes"

// Next 16 proxy (Node runtime). Optimistic check only: it looks for the session cookie without validating it.
// Pages and server actions validate the session and role through src/lib/auth-guards.ts.
export function proxy(req: NextRequest) {
    const { nextUrl } = req;
    const isLoggedIn = !!getSessionCookie(req);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || publicApiRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute){
        return;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute){
        return NextResponse.redirect(new URL("/", nextUrl))
    }

    return
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };
