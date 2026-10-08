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

// Cell wrapper: rises in, with a stagger.
function Cell({ index, className, style, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease }}
      style={style}
      className={`flex min-h-[340px] flex-col rounded-[20px] p-7 lg:min-h-[380px] lg:p-9 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Home: the Fund. A small label, two short paragraphs and the title, then a dark tray
// holding three cells: Mandate, Investment thesis (brand gradient) and the target size.
export default function HomeFund() {
  const rows = mandateRows.map((l) => fund.terms.find((t) => t.label.en === l));
  const target = fund.terms.find((t) => t.label.en === "Target fund size");

  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      {/* Top row */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[auto_minmax(0,21rem)_minmax(0,1fr)] lg:items-start lg:gap-x-10">
        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-4 py-2 text-[12px] text-[var(--text-primary)] lg:order-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <BilingualText en="The Fund" ar="الصندوق" />
        </span>

        <div className="order-3 space-y-4 text-[14px] leading-[1.75] text-[var(--text-secondary)] lg:order-2">
          <p>
            <T t={fund.intro} />
          </p>
          <p>
            <T t={fund.status} />
          </p>
        </div>

        <h2 className="order-2 text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.04] tracking-[-0.025em] text-[var(--text-primary)] lg:order-3 lg:justify-self-end">
          <BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />
        </h2>
      </div>

      {/* Tray */}
      <div className="mt-12 rounded-[26px] border border-[var(--border-default)] bg-[var(--bg-page)] p-2 lg:mt-16">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr_1.1fr]">
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
            <p className="mt-auto text-[clamp(1.15rem,1.55vw,1.4rem)] font-light leading-[1.4] tracking-[-0.01em] text-white/95">
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

          {/* Target size + actions */}
          <Cell
            index={2}
            className="relative overflow-hidden bg-[var(--bg-secondary)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 70% at 0% 100%, rgba(172,30,64,0.22), rgba(227,121,15,0.08) 50%, transparent 75%)",
              }}
            />
            <p className="eyebrow relative !text-[10px]">
              <BilingualText en="Planned fund" ar="الصندوق المخطط" />
            </p>
            <p className="relative mt-3 text-[clamp(2.8rem,4.6vw,4.4rem)] font-extralight leading-none tracking-[-0.035em] text-[var(--text-primary)]">
              <T t={target.value} />
            </p>
            <p className="relative mt-3 text-[13px] text-[var(--text-muted)]">
              <T t={target.label} />
            </p>
            <div className="relative mt-auto flex flex-col items-start gap-3 pt-10">
              <CtaLink to="/funds" variant="primary">
                <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
              </CtaLink>
              <CtaLink to="/contact?interest=invest" variant="outline">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
            </div>
          </Cell>
        </div>
      </div>

      <Disclaimer className="mt-10" />
    </section>
  );
}
