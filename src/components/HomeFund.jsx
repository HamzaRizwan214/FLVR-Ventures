import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import T from "./T";
import Disclaimer from "./Disclaimer";
import { fund } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Mandate rows shown on Home; the full six-term table is on the Funds page.
const mandateRows = ["Sector", "Geography", "Stage", "Ticket size"];

function Cell({ index, className, style, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.9, ease }}
      style={style}
      className={`grain relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-8 xl:min-h-[30rem] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Home: the Fund. Left: heading, the two short paragraphs, the headline figure in brand gradient
// and one button. Right: two cards, Mandate and Investment thesis (brand gradient).
export default function HomeFund() {
  const rows = mandateRows.map((l) => fund.terms.find((t) => t.label.en === l));
  const target = fund.terms.find((t) => t.label.en === "Target fund size");

  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0e0e0f] p-7 sm:p-12 lg:rounded-[2.5rem] lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 end-[-10%] h-[34rem] w-[34rem] rounded-full opacity-40 blur-[110px]"
          style={{ background: "radial-gradient(circle, #ff9205 0%, #ac1e40 55%, transparent 72%)" }}
        />

        <div className="relative grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:gap-16">
          {/* Left column */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="text-[clamp(2.6rem,5.2vw,5rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-[var(--text-primary)] rtl:leading-[1.2] rtl:tracking-normal"
            >
              <BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />
            </motion.h2>

            <div className="mt-8 max-w-[26rem] space-y-4 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              <p>
                <T t={fund.intro} />
              </p>
              <p>
                <T t={fund.status} />
              </p>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-[13px] font-semibold text-[var(--accent)]">
                <T t={target.label} />
              </p>
              <p
                dir="ltr"
                className="text-gradient mt-2 w-fit text-[clamp(3.6rem,7.4vw,7rem)] font-extrabold leading-none tracking-[-0.045em]"
              >
                <T t={target.value} />
              </p>
              <div className="mt-9">
                <CtaLink to="/funds" variant="primary">
                  <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
                </CtaLink>
              </div>
            </div>
          </div>

          {/* Right: two cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Cell index={0} className="bg-[#161617] ring-1 ring-white/[0.06]">
              <p className="text-[13px] font-semibold text-[var(--accent)]" dir="ltr">
                #01
              </p>
              <h3 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-[-0.025em] text-[var(--text-primary)] rtl:tracking-normal">
                <T t={fund.mandate.label} />
              </h3>
              <dl className="mt-auto border-t border-white/10 pt-1">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4 last:border-b-0"
                  >
                    <dt className="text-[13px] text-[var(--text-muted)]">
                      <T t={row.label} />
                    </dt>
                    <dd className="text-end text-[15px] font-semibold text-[var(--text-primary)]">
                      <T t={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Cell>

            <Cell
              index={1}
              className="text-white"
              style={{ background: "linear-gradient(155deg, #ac1e40 0%, #d2512a 52%, #ff9205 100%)" }}
            >
              <p className="text-[13px] font-semibold text-white/80" dir="ltr">
                #02
              </p>
              <h3 className="mt-3 text-[1.9rem] font-bold leading-tight tracking-[-0.025em] rtl:tracking-normal">
                <T t={fund.thesis.label} />
              </h3>
              <p className="mt-auto text-[15px] leading-[1.7] text-white/95">
                <T t={fund.thesis.summary} />
              </p>
              <Link
                to="/funds#thesis"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white"
              >
                <BilingualText en="Read the full thesis" ar="اقرأ الفرضية كاملة" />
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
                />
              </Link>
            </Cell>
          </div>
        </div>

        <Disclaimer className="relative mt-12" />
      </div>
    </section>
  );
}
