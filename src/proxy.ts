import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  // console.log("token", token);
  // console.log("request.cookies", request.cookies);
  const { pathname } = request.nextUrl;

  // Public routes (allowed without login)
  const publicRoutes = ["/auth/login", "/auth/signup"];

  const isPublic = publicRoutes.includes(pathname);

  // If NOT logged in and trying to access protected route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If logged in and trying to access login page → redirect to dashboard
  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - _next (Next.js internals)
      - static files
    */
    "/((?!_next|favicon.ico).*)",
  ],
};
