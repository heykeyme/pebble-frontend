import { FormEvent, ReactNode } from "react";
import { BrandBadge } from "./BrandBadge";

interface AuthCardProps {
  subtitle: string;
  heading: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ subtitle, heading, onSubmit, children, footer }: AuthCardProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-8">
      <div className="w-full max-w-[400px]">
        <div className="mb-7 text-center">
          <BrandBadge />
          <p className="mt-3 text-sm font-semibold text-[#4A473E]">{subtitle}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="neo-border neo-shadow-lg rounded-2xl bg-white px-7 py-8"
        >
          <h2 className="mb-5 text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            {heading}
          </h2>
          {children}
          {footer && (
            <div className="mt-[18px] text-center text-sm font-semibold">{footer}</div>
          )}
        </form>
      </div>
    </div>
  );
}
