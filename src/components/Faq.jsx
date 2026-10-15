import { Plus } from "lucide-react";
import T from "./T";

// Native <details> accordion: accessible and no state to manage.
export default function Faq({ items }) {
  return (
    <div className="border-t border-white/10">
      {items.map((item, i) => (
        <details key={i} className="group border-b border-white/10">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-lg font-semibold tracking-[-0.01em] text-[var(--text-primary)] transition-colors hover:text-white sm:text-xl rtl:tracking-normal [&::-webkit-details-marker]:hidden">
            <span>
              <T t={item.q} />
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-[var(--accent)] transition-all duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-[image:var(--gradient-brand)] group-open:text-white">
              <Plus size={17} strokeWidth={1.75} />
            </span>
          </summary>
          <p className="max-w-2xl pb-8 text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <T t={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
