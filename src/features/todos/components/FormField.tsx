import { ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#141414]">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="neo-focus w-full rounded-[10px] neo-border bg-[#F5F1E4] px-3.5 py-3 text-[15px] font-semibold text-[#141414] outline-none"
      />
    </div>
  );
}
