import { LoginForm } from "@/features/authentication/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
