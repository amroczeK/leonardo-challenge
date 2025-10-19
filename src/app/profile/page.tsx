import { ProfileView } from "@/features/profile/components/profile-view";

export default function ProfilePage() {
  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="w-full max-w-sm">
        <ProfileView />
      </div>
    </div>
  );
}
