import T from "./T";
import { disclaimer } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Disclaimer({ className }) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-[var(--text-muted)] max-w-2xl font-[Metropolis]",
        className,
      )}
    >
      <T t={disclaimer} />
    </p>
  );
}
