import {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { AuthCard } from "./AuthCard";

const CODE_LENGTH = 4;

interface ScreenVerifyProps {
  email: string;
  code: string;
  error: boolean;
  resendLabel: string;
  onCodeChange: (code: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
  onGoToLogin: () => void;
}

export function ScreenVerify({
  email,
  code,
  error,
  resendLabel,
  onCodeChange,
  onSubmit,
  onResend,
  onGoToLogin,
}: ScreenVerifyProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: CODE_LENGTH }, (_, i) => code[i] ?? "");

  const handleDigitChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const digit = e.target.value.replace(/\D/g, "").slice(-1);
      const nextDigits = [...digits];
      nextDigits[index] = digit;
      onCodeChange(nextDigits.join(""));

      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    onCodeChange(pasted);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  return (
    <AuthCard
      subtitle="One more step to activate your account."
      heading="Enter verification code"
      onSubmit={onSubmit}
      footer={
        <>
          <div>
            Didn&apos;t get a code?{" "}
            <button
              type="button"
              onClick={onResend}
              className="font-extrabold underline underline-offset-2"
            >
              {resendLabel}
            </button>
          </div>
          <div className="mt-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToLogin();
              }}
            >
              Back to login
            </a>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#8A8578]">
            Try 0000 to preview the error state.
          </div>
        </>
      }
    >
      <p className="mb-5 text-[15px] font-semibold leading-relaxed text-[#4A473E]">
        We sent a 4-digit code to{" "}
        <strong className="text-[#141414]">{email}</strong>. Enter it below to
        verify your account.
      </p>

      {error && (
        <div className="neo-border mb-[18px] rounded-[10px] bg-[#FF5C5C] px-4 py-3.5 text-[13.5px] font-bold leading-relaxed">
          That code isn&apos;t right. Check your inbox and try again.
        </div>
      )}

      <div className="mb-6 flex justify-center gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            required
            autoFocus={index === 0}
            value={digit}
            onChange={handleDigitChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste}
            className="neo-focus h-14 w-14 rounded-[10px] neo-border bg-[#F5F1E4] text-center text-2xl font-extrabold text-[#141414] outline-none"
          />
        ))}
      </div>

      <button
        type="submit"
        className="neo-border neo-shadow neo-shadow-active neo-focus w-full cursor-pointer rounded-xl bg-[#FF5C5C] py-[15px] text-[15px] font-extrabold hover:bg-[#FF7373]"
      >
        Verify
      </button>
    </AuthCard>
  );
}
