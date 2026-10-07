import T from "./T";

// Label / value rows, e.g. the Fund's terms.
export default function TermsTable({ rows }) {
  return (
    <dl className="border-t border-[var(--border-default)]">
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-2 border-b border-[var(--border-default)] py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8 md:py-8"
        >
          <dt className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
            <T t={row.label} />
          </dt>
          <dd className="text-xl md:text-3xl font-normal tracking-tight text-[var(--text-primary)]">
            <T t={row.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
