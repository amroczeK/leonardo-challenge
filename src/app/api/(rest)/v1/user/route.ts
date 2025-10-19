import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ProfileSchema } from "@/features/profile/schemas";

const COOKIE_NAME: string = "user-profile";
const COOKIE_MAX_AGE: number = 60 * 60 * 24; // 1 day

/**
 * GET /api/v1/user - Get user profile from cookie
 * @returns - The response object containing the user info if found, or an error if not
 */
export async function GET() {
  const cookieStore = await cookies();
  const userProfileCookie = cookieStore.get(COOKIE_NAME)?.value;

  if (!userProfileCookie) {
    return NextResponse.json(
      { error: "User profile not found" },
      { status: 404 }
    );
  }

  try {
    const userProfile = JSON.parse(userProfileCookie);
    const { username, jobTitle } = userProfile;

    // Validate with Zod schema
    const validatedData = ProfileSchema.parse({ username, jobTitle });

    return NextResponse.json(validatedData);
  } catch {
    // If invalid, clear the cookie
    cookieStore.delete(COOKIE_NAME);
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

    cookieStore.set(COOKIE_NAME, JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
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
 * PATCH /api/v1/user - Update user profile (partial update)
 * @param request - The request object containing the fields to update
 * @returns - The response object containing the updated user info if successful, or an error if not
 */
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const userProfileCookie = cookieStore.get(COOKIE_NAME)?.value;

    if (!userProfileCookie) {
      return NextResponse.json(
        { error: "Profile not found, create a profile first." },
        { status: 404 }
      );
    }

    // Get existing profile data
    const userProfile = JSON.parse(userProfileCookie);

    // Get update data
    const updates = await request.json();

    // Merge current data with updates
    const updatedProfile = {
      ...userProfile,
      ...updates,
    };

    // Validate merged data with Zod schema
    const validatedData = ProfileSchema.parse(updatedProfile);

    // Set updated profile in cookie
    cookieStore.set(COOKIE_NAME, JSON.stringify(validatedData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user profile", details: error },
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
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true }, { status: 204 }); // Return HTTP No Content
}
