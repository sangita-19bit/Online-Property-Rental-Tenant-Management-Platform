import { NextResponse } from "next/server";

export function middleware(request) {
  // Check for an authentication token in cookies.
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Ignore static assets, next internals, and auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // If we reach here, it's an "other page except the home page"
  // Redirect unauthenticated users to the login page
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    loginUrl.searchParams.set("msg", "Please log in to access this page.");
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Define which paths this middleware will run on
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
