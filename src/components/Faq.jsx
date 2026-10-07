import { Plus } from "lucide-react";
import T from "./T";

// Native <details> accordion: accessible and no state to manage.
export default function Faq({ items }) {
  return (
    <div className="border-t border-[var(--border-default)]">
      {items.map((item, i) => (
        <details
          key={i}
          className="group border-b border-[var(--border-default)] py-2"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg md:text-xl font-medium text-[var(--text-primary)] font-[Metropolis] [&::-webkit-details-marker]:hidden">
            <span>
              <T t={item.q} />
            </span>
            <Plus
              size={20}
              className="shrink-0 text-[var(--brand-primary)] transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
            <T t={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
