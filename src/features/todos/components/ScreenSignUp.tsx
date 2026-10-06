import { ChangeEvent, FormEvent } from "react";
import { AuthCard } from "./AuthCard";
import { FormField } from "./FormField";

interface ScreenSignUpProps {
  email: string;
  password: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoToLogin: () => void;
}

export function ScreenSignUp({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoToLogin,
}: ScreenSignUpProps) {
  return (
    <AuthCard
      subtitle="A no-nonsense place for your notes and tasks."
      heading="Create your account"
      onSubmit={onSubmit}
      footer={
        <>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onGoToLogin();
            }}
          >
            Log in
          </a>
        </>
      }
    >
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="you@example.com"
        required
        className="mb-4"
      />
      <FormField
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="At least 8 characters"
        required
        className="mb-6"
      />
      <button
        type="submit"
        className="neo-border neo-shadow neo-shadow-active neo-focus w-full cursor-pointer rounded-xl bg-[#FF5C5C] py-[15px] text-[15px] font-extrabold hover:bg-[#FF7373]"
      >
        Sign up
      </button>
    </AuthCard>
  );
}
