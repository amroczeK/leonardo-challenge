import { z } from "zod";
export const ProfileSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(2, "Job title must be at least 2 characters.")
    .max(80, "Job title is too long."),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username is too long.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "No spaces and only letters, numbers, and underscore are allowed."
    ),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
