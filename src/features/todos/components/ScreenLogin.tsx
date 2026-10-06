import { ChangeEvent, FormEvent } from "react";
import { AuthCard } from "./AuthCard";
import { FormField } from "./FormField";

interface ScreenLoginProps {
  loginEmail: string;
  loginPassword: string;
  loginError: boolean;
  onLoginEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLoginPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onGoToSignup: () => void;
  onResend: () => void;
}

export function ScreenLogin({
  loginEmail,
  loginPassword,
  loginError,
  onLoginEmailChange,
  onLoginPasswordChange,
  onSubmit,
  onGoToSignup,
  onResend,
}: ScreenLoginProps) {
  return (
    <AuthCard
      subtitle="Welcome back."
      heading="Log in"
      onSubmit={onSubmit}
      footer={
        <>
          <div>
            New here?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToSignup();
              }}
            >
              Create an account
            </a>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#8A8578]">
            Try &quot;unverified@example.com&quot; to preview the error state.
          </div>
        </>
      }
    >
      {loginError && (
        <div className="neo-border mb-[18px] rounded-[10px] bg-[#FF5C5C] px-4 py-3.5 text-[13.5px] font-bold leading-relaxed">
          Your email isn&apos;t verified yet. Check your inbox, or{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onResend();
            }}
          >
            resend the verification email
          </a>
          .
        </div>
      )}
      <FormField
        label="Email"
        type="email"
        value={loginEmail}
        onChange={onLoginEmailChange}
        placeholder="you@example.com"
        required
        className="mb-4"
      />
      <FormField
        label="Password"
        type="password"
        value={loginPassword}
        onChange={onLoginPasswordChange}
        placeholder="Your password"
        required
        className="mb-6"
      />
      <button
        type="submit"
        className="neo-border neo-shadow neo-shadow-active neo-focus w-full cursor-pointer rounded-xl bg-[#FF5C5C] py-[15px] text-[15px] font-extrabold hover:bg-[#FF7373]"
      >
        Log in
      </button>
    </AuthCard>
  );
}
