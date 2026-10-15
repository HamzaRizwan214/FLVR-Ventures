import T from "./T";
import { disclaimer } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Disclaimer({ className }) {
  return (
    <p
      className={cn(
        "max-w-2xl text-xs leading-relaxed text-[var(--text-muted)]",
        className,
      )}
    >
      <T t={disclaimer} />
    </p>
  );
}
