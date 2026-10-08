import { Plus } from "lucide-react";
import T from "./T";

// Native <details> accordion: accessible and no state to manage.
export default function Faq({ items }) {
  return (
    <div className="border-t border-[var(--border-default)]">
      {items.map((item, i) => (
        <details key={i} className="group border-b border-[var(--border-default)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-light text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
            <span>
              <T t={item.q} />
            </span>
            <Plus
              size={18}
              strokeWidth={1.25}
              className="shrink-0 text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-xl pb-7 text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <T t={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
