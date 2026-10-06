interface BrandBadgeProps {
  size?: "sm" | "lg";
}

export function BrandBadge({ size = "lg" }: BrandBadgeProps) {
  const sizeClasses = size === "lg" ? "text-2xl px-4 py-1.5" : "text-lg px-3 py-1";

  return (
    <div
      className={`inline-block font-bold text-[#141414] bg-[#FFD23F] neo-border neo-shadow-sm rounded-xl font-[family-name:var(--font-space-grotesk)] ${sizeClasses}`}
    >
      Pebble
    </div>
  );
}