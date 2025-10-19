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

  // Check if user has a profile via check for user-info cookie
  const userInfoCookie = request.cookies.get("user-info")?.value;

  let hasUserInfo = false;
  if (userInfoCookie) {
    try {
      const userInfo = JSON.parse(userInfoCookie);
      hasUserInfo = !!(userInfo.username && userInfo.jobTitle);
    } catch {
      // Invalid JSON, e.g. no user info
      hasUserInfo = false;
    }
  }

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user does not have a profile and trying to access protected route, redirect to profile page
  if (!hasUserInfo && !isPublicRoute) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  // If user has profile and trying to access public pages, redirect to home page
  if (hasUserInfo && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Match all request paths except for static content
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
