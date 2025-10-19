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

export function ProfileForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { createUserProfile } = useUserProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        jobTitle: formData.get("jobTitle") as string,
        username: formData.get("username") as string,
      };

      await createUserProfile(data.username, data.jobTitle);
    } catch (error) {
      console.error("Form submission error:", error);
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
              />
            </Field>
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
