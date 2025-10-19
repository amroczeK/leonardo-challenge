import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ProfileSchema } from "@/features/profile/schemas";

/**
 * GET /api/v1/user - Get user profile from cookie
 * @returns - The response object containing the user info if found, or an error if not
 */
export async function GET() {
  const cookieStore = await cookies();
  const userProfileCookie = cookieStore.get("user-profile")?.value;

  if (!userProfileCookie) {
    return NextResponse.json(
      { error: "User profile not found" },
      { status: 404 }
    );
  }

  try {
    const userProfile = JSON.parse(userProfileCookie);
    return NextResponse.json(userProfile);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse user profile" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/user - Create user profile and set it in a cookie with HTTP Only, Secure, SameSite Lax, and Max Age of 1 day
 * @param request - The request object containing the username and job title
 * @returns - The response object containing the user info if successful, or an error if not
 */
export async function POST(request: Request) {
  try {
    const { username, jobTitle } = await request.json();

    // Validate with Zod schema
    const validatedData = ProfileSchema.parse({ username, jobTitle });

    if (!username || !jobTitle) {
      return NextResponse.json(
        { error: "Username and job title are required" },
        { status: 400 }
      );
    }

    const userProfile = {
      username: validatedData.username,
      jobTitle: validatedData.jobTitle,
    };
    const cookieStore = await cookies();

    cookieStore.set("user-profile", JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to set user profile", details: error },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/user - Delete user profile from cookie
 * @returns - The response object containing a success message if successful, or an error if not
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("user-profile");
  return NextResponse.json({ success: true }, { status: 204 }); // Return HTTP No Content
}
