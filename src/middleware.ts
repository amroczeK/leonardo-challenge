import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that aren't protected
const publicRoutes = ["/profile"];

/**
 * Middleware to check if the user has a profile and redirect to the profile page if not
 * @param request
 * @returns NextResponse
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has a profile via check for user-profile cookie
  const userProfileCookie = request.cookies.get("user-profile")?.value;

  let hasUserProfile = false;
  if (userProfileCookie) {
    try {
      const userInfo = JSON.parse(userProfileCookie);
      hasUserProfile = !!(userInfo.username && userInfo.jobTitle);
    } catch {
      // Invalid JSON, e.g. no user profile
      hasUserProfile = false;
    }
  }

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user does not have a profile and trying to access protected route, redirect to profile page
  if (!hasUserProfile && !isPublicRoute) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

// Match all request paths except for static content and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
