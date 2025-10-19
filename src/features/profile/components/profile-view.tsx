"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useUserProfile } from "../context/profile-context";
import { useState } from "react";
import { ProfileForm } from "./profile-form";
import ProfileFieldInfo from "./profile-field-info";

export function ProfileView() {
  const { userProfile, isLoading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading your profile information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render create form if user has no profile
  if (!userProfile) {
    return <ProfileForm mode="create" />;
  }

  // Render edit form if user has profile and is editing
  if (isEditing) {
    return (
      <ProfileForm
        mode="edit"
        defaultValues={{
          username: userProfile.username,
          jobTitle: userProfile.jobTitle,
        }}
        onSuccess={handleEditSuccess}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Render profile info if user has profile and is not editing
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <ProfileFieldInfo label="Job Title" value={userProfile.jobTitle} />
          </Field>
          <Field>
            <ProfileFieldInfo label="Username" value={userProfile.username} />
          </Field>
          <Field>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
