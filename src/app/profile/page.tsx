import { ProfileForm } from "@/features/profile/profile-form";

export default function ProfilePage() {
  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="w-full max-w-sm">
        <ProfileForm />
      </div>
    </div>
  );
}
