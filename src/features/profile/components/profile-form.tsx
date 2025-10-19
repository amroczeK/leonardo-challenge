"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserProfile } from "../context/profile-context";
import { ProfileSchema } from "../schemas";
import { useState } from "react";
import { ZodError } from "zod";
import FieldError from "@/components/ui/field-error";

export function ProfileForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { createUserProfile } = useUserProfile();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);
      const data = {
        jobTitle: formData.get("jobTitle") as string,
        username: formData.get("username") as string,
      };

      // Validate with Zod schema
      const validatedData = ProfileSchema.parse(data);

      // Submit to API
      await createUserProfile(validatedData.username, validatedData.jobTitle);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ form: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create your profile</CardTitle>
        <CardDescription>
          Enter your information below to complete your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="job-title">Job Title</FieldLabel>
              <Input
                id="job-title"
                name="jobTitle"
                type="text"
                placeholder="Software Engineer"
                required
                aria-invalid={!!errors.jobTitle}
                aria-describedby={
                  errors.jobTitle ? "job-title-error" : undefined
                }
              />
              <FieldError
                errorId="job-title-error"
                isError={!!errors.jobTitle}
                errorMessage={errors.jobTitle}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="john_doe"
                required
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
              />
              <FieldError
                errorId="username-error"
                isError={!!errors.username}
                errorMessage={errors.username}
              />
            </Field>
            <FieldError
              errorId="form-error"
              isError={!!errors.form}
              errorMessage={errors.form}
            />
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Complete Profile"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
