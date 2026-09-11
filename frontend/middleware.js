import { NextResponse } from "next/server";

export function middleware(request) {
  // Check for an authentication token in cookies.
  // Note: Adjust the cookie name if your implementation uses a different one (e.g., 'session', 'jwt').
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  const protectedRoutes = ["/dashboard", "/payments", "/maintenance"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users to the login page
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Define which paths this middleware will run on
  matcher: [
    "/dashboard/:path*",
    "/payments/:path*",
    "/maintenance/:path*"
  ],
};
