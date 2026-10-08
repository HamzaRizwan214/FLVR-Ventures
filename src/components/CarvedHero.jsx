import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// The carved container used at the top of Home sections and inner pages: a charcoal surface with
// soft side gradients, a heading, and a notch cut from its top-end corner (open to the page) that
// holds `notch`. Below xl the notch is dropped and its content stacks under the title.
//   eyebrow, title, notch: ReactNodes   children: the body, shown inside the container below
//   as: "h1" | "h2"   notchHeight: Tailwind height class for the notch
//   flat: no cut-out. `notch` content sits in a normal right-hand column instead (stacked on smaller screens)
export default function CarvedHero({
  eyebrow,
  title,
  notch,
  children,
  as = "h2",
  notchHeight = "h-[15rem]",
  compact = false,
  flat = false,
}) {
  const Title = motion[as];

  return (
    <section
      className="carve relative overflow-hidden rounded-[28px] bg-[var(--block-dark)]"
      // The notch reveals the page itself, not a panel.
      style={{ "--card": "var(--bg-page)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(to right, rgba(214,173,132,0.14) 0%, rgba(214,173,132,0.04) 16%, transparent 34%)",
            "linear-gradient(to left, rgba(172,30,64,0.30) 0%, rgba(214,92,40,0.10) 18%, transparent 40%)",
          ].join(", "),
        }}
      />

      {/* Heading */}
      <div
        className={
          flat
            ? "relative px-6 pt-14 sm:px-10 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:items-end xl:gap-16 xl:px-14 xl:pt-16"
            : compact
              ? "relative px-5 pt-8 sm:px-8 xl:min-h-[9.5rem] xl:px-10 xl:pt-9"
              : "relative px-6 pt-14 sm:px-10 xl:min-h-[15rem] xl:px-14 xl:pt-16"
        }
      >
        <div>
        <p className={compact ? "mb-2 text-[13px] text-[var(--text-secondary)]" : "mb-5 text-[15px] text-[var(--text-secondary)]"}>{eyebrow}</p>
        <Title
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className={
            compact
              ? "max-w-[20ch] text-balance text-[clamp(1.7rem,2.8vw,2.5rem)] font-light leading-[1.08] tracking-[-0.025em] text-[var(--text-primary)]"
              : "max-w-[17ch] text-balance text-[clamp(2.1rem,4vw,3.7rem)] font-light leading-[1.08] tracking-[-0.025em] text-[var(--text-primary)]"
          }
        >
          {title}
        </Title>
        </div>

        {/* Flat: content in its own column on xl, stacked below it on smaller screens */}
        {flat && <div className="mt-8 xl:mt-0 xl:pb-1">{notch}</div>}

        {/* Carved: below xl the notch content stacks under the title */}
        {!flat && <div className={compact ? "mt-5 xl:hidden" : "mt-8 xl:hidden"}>{notch}</div>}
      </div>

      {!flat && (
        <>
      {/* Notch: open to the page, flush with the top-end corner. The width lives on the wrapper
          so the box always reaches the container edge. Wide screens only. */}
      <div className="absolute end-0 top-0 hidden w-[min(40%,36rem)] min-w-[26rem] xl:block">
        <div
          className={`carve-fill relative ${compact ? "h-[9.5rem] pe-6 ps-9 pt-7" : `${notchHeight} pe-8 ps-12 pt-10`} w-full [border-end-start-radius:var(--r)]`}
        >
          {notch}
          {/* connectors: round the container's corners where the notch meets its edges */}
          <span aria-hidden="true" className="carve-c carve-c--te -start-6 top-0" />
          <span aria-hidden="true" className="carve-c carve-c--te end-0 top-full" />
        </div>
      </div>
        </>
      )}

      {/* Body. Anything carved inside it cuts through to the container, so reset the colour. */}
      <div
        className={
          compact
            ? "relative mt-5 px-3 pb-5 sm:px-6 sm:pb-6 xl:mt-6 xl:px-8 xl:pb-7"
            : "relative mt-10 px-4 pb-8 sm:px-8 sm:pb-8 xl:mt-14 xl:px-12 xl:pb-12"
        }
        style={{ "--card": "var(--block-dark)" }}
      >
        {children}
      </div>
    </section>
  );
}
