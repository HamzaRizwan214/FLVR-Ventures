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

// Tray cell: rises in, with a stagger.
function Cell({ index, className, style, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease }}
      style={style}
      className={`flex min-h-[340px] flex-col rounded-[20px] p-7 xl:min-h-[440px] xl:p-9 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Home: the Fund. Left column: title, the two short paragraphs, then the headline figure and one
// button directly under them. Right: two separate cards, Mandate and Investment thesis (brand gradient).
export default function HomeFund() {
  const rows = mandateRows.map((l) => fund.terms.find((t) => t.label.en === l));
  const target = fund.terms.find((t) => t.label.en === "Target fund size");

  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-24">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] xl:gap-12">
        {/* Left column */}
        <div className="flex flex-col">
          <h2 className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-light leading-[1.04] tracking-[-0.025em] text-[var(--text-primary)]">
            <BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />
          </h2>

          <div className="mt-8 max-w-[24rem] space-y-4 text-[14px] leading-[1.75] text-[var(--text-secondary)]">
            <p>
              <T t={fund.intro} />
            </p>
            <p>
              <T t={fund.status} />
            </p>
          </div>

          <div className="mt-8">
            <p className="text-[clamp(2.8rem,4.4vw,4.2rem)] font-extralight leading-none tracking-[-0.035em] text-[var(--text-primary)]">
              <T t={target.value} />
            </p>
            <div className="mt-8">
              <CtaLink to="/funds" variant="primary">
                <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
              </CtaLink>
            </div>
          </div>
        </div>

        {/* Two separate cards, no shared tray */}
        <div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* 01 Mandate */}
            <Cell index={0} className="bg-[var(--bg-secondary)]">
              <p className="eyebrow !text-[10px]">01</p>
              <h3 className="mt-3 text-[1.6rem] font-light leading-tight tracking-[-0.015em] text-[var(--text-primary)]">
                <T t={fund.mandate.label} />
              </h3>
              <dl className="mt-auto border-t border-[var(--border-default)] pt-1">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-3.5 last:border-b-0"
                  >
                    <dt className="text-[13px] text-[var(--text-muted)]">
                      <T t={row.label} />
                    </dt>
                    <dd className="text-end text-[15px] font-light text-[var(--text-primary)]">
                      <T t={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Cell>

            {/* 02 Investment thesis: brand gradient */}
            <Cell
              index={1}
              className="text-white"
              style={{ background: "linear-gradient(160deg, #ac1e40 0%, #c24a22 52%, #e3790f 100%)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">02</p>
              <h3 className="mt-3 text-[1.6rem] font-light leading-tight tracking-[-0.015em]">
                <T t={fund.thesis.label} />
              </h3>
              <p className="mt-auto text-[15px] font-light leading-[1.7] text-white/95">
                <T t={fund.thesis.summary} />
              </p>
              <Link
                to="/funds#thesis"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white"
              >
                <BilingualText en="Read the full thesis" ar="اقرأ الفرضية كاملة" />
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
                />
              </Link>
            </Cell>
          </div>
        </div>
      </div>

      <Disclaimer className="mt-10" />
    </section>
  );
}
