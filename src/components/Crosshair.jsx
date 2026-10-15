import { cn } from "@/lib/utils";

// Thin "+" registration mark used as an editorial detail on panels.
export default function Crosshair({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block h-[15px] w-[15px] shrink-0", className)}
    >
      <i className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--border-strong)]" />
      <i className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--border-strong)]" />
    </span>
  );
}
