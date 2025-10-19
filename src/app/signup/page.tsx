import { SignupForm } from "@/features/authentication/signup-form";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
