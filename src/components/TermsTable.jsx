import T from "./T";

// Hairline label / value rows, e.g. the Fund's terms.
export default function TermsTable({ rows }) {
  return (
    <dl className="border-t border-[var(--border-default)]">
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-2 border-b border-[var(--border-default)] py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline md:gap-8 md:py-7"
        >
          <dt className="eyebrow">
            <T t={row.label} />
          </dt>
          <dd className="text-[clamp(1.2rem,2.1vw,1.9rem)] font-light tracking-[-0.005em] text-[var(--text-primary)]">
            <T t={row.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
