import { motion } from "framer-motion";
import { Banknote, Layers, MapPin, PieChart, Target, UtensilsCrossed } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import CarvedHero from "@/components/CarvedHero";
import CtaLink from "@/components/CtaLink";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { fund } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// One icon per mandate term, keyed by its English label
const termIcons = {
  Sector: UtensilsCrossed,
  Geography: MapPin,
  Stage: Layers,
  "Ticket size": Banknote,
  Ownership: PieChart,
  "Target fund size": Target,
};

// Warm off-white gradients shared with the hero banner and the POP-UP box
const warmGradients = [
  "linear-gradient(to right, rgba(227,121,15,0.42) 0%, rgba(227,121,15,0.16) 15%, transparent 38%)",
  "linear-gradient(to left, rgba(172,30,64,0.46) 0%, rgba(214,92,40,0.22) 17%, transparent 42%)",
  "radial-gradient(60% 100% at 100% 0%, rgba(214,173,132,0.40) 0%, transparent 70%)",
].join(", ");

const term = (label) => fund.terms.find((t) => t.label.en === label);

// Headline figures shown inside the hero
const keyFacts = [
  {
    term: term("Target fund size"),
    label: { en: "Planned fund", ar: "الصندوق المخطط" },
  },
  { term: term("Ticket size") },
  { term: term("Stage") },
  { term: term("Geography") },
];

export default function Funds() {
  return (
    <PageWrapper>
      {/* 1 · Hero: carved container, the headline figures inside */}
      <CarvedHero
        as="h1"
        compact
        flat
        eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
        title={<BilingualText en="The FLVR Fund" ar="صندوق فلايفر" />}
        notch={
          <div className="xl:flex xl:justify-end">
            <CtaLink to="/contact?interest=fund" variant="primary">
              <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
            </CtaLink>
          </div>
        }
      >
        <dl className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          {keyFacts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease }}
              className="flex min-h-[5.5rem] flex-col justify-between gap-3 rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-secondary)]/70 p-4"
            >
              <dt className="eyebrow !text-[9px]">
                <T t={fact.label ?? fact.term.label} />
              </dt>
              <dd className="text-[clamp(1.15rem,1.7vw,1.55rem)] font-extralight leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                <T t={fact.term.value} />
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-3 max-w-xl text-[11px] leading-[1.6] text-[var(--text-muted)]">
          <T t={fund.status} />
        </p>
      </CarvedHero>

      {/* 2 · Mandate: six small cards, one per term */}
      <section id="mandate" className="panel scroll-mt-24 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 className="text-[1.5rem] font-light tracking-[-0.02em] text-[var(--text-primary)]">
            <T t={fund.mandate.label} />
          </h2>
          <p className="text-[13px] text-[var(--text-muted)]">
            <T t={fund.mandate.title} />
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-6">
          {fund.terms.map((term, i) => {
            const Icon = termIcons[term.label.en] ?? Layers;
            return (
              <motion.div
                key={i}
                tabIndex={0}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.7, ease }}
                className="group relative flex cursor-default flex-col gap-4 overflow-hidden rounded-[18px] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 outline-none transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[var(--border-strong)] focus-visible:-translate-y-1 focus-visible:border-[var(--accent)]"
              >
                {/* Warm glow that fades in on hover or focus */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      "radial-gradient(90% 90% at 100% 0%, rgba(172,30,64,0.22), rgba(227,121,15,0.10) 45%, transparent 75%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/[0.05] text-[var(--text-primary)] transition-all duration-500 group-hover:border-transparent group-hover:bg-[linear-gradient(135deg,#ac1e40,#e3790f)] group-hover:text-white group-focus-visible:border-transparent group-focus-visible:bg-[linear-gradient(135deg,#ac1e40,#e3790f)] group-focus-visible:text-white"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <div className="relative">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    <T t={term.label} />
                  </dt>
                  <dd className="mt-1.5 text-[1.05rem] font-normal leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)]">
                    <T t={term.value} />
                  </dd>
                </div>
              </motion.div>
            );
          })}
        </dl>

        <p className="mt-4 text-[12px] leading-[1.6] text-[var(--text-muted)]">
          <T t={fund.status} />
        </p>
      </section>

      {/* 3 · Investment thesis: warm statement box */}
      <section id="thesis" className="scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          data-nav-light
          className="relative overflow-hidden rounded-[28px] bg-[var(--hero-block)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: warmGradients }}
          />
          <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--hero-ink)]/60">
              <span>02</span>
              <span className="h-px w-8 bg-[var(--hero-ink)]/30" />
              <T t={fund.thesis.label} />
            </p>
            <p className="mt-8 max-w-4xl text-[clamp(1.6rem,3.1vw,2.9rem)] font-light leading-[1.22] tracking-[-0.02em] text-[var(--hero-ink)]">
              <T t={fund.thesis.statement} />
            </p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {fund.thesis.tags.map((tag, i) => (
                <li
                  key={i}
                  className="rounded-full border border-[var(--hero-ink)]/25 px-4 py-1.5 text-[12px] text-[var(--hero-ink)]/80"
                >
                  <T t={tag} />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* 4 · Closing: the brand gradient, full card */}
      {/* <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-[28px] text-white"
        style={{ background: "linear-gradient(150deg, #ac1e40 0%, #c24a22 52%, #e3790f 100%)" }}
      >
        <div className="relative grid grid-cols-1 items-end gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:py-20">
          <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.025em]">
            <BilingualText en="Request the fund overview." ar="اطلب النظرة العامة على الصندوق." />
          </h2>
          <div>
            <p className="max-w-md text-[15px] leading-[1.8] text-white/85">
              <T t={fund.status} />
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/contact?interest=fund"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#ece8e1] px-8 py-4 text-xs font-medium uppercase tracking-[0.16em] text-[#17181a] transition-colors hover:bg-white"
              >
                <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
                <ArrowUpRight size={15} strokeWidth={1.75} className="rtl:-scale-x-100" />
              </Link>
              <Link
                to="/contact?interest=invest"
                className="text-xs uppercase tracking-[0.18em] text-white/80 underline-offset-8 transition-colors hover:text-white hover:underline"
              >
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </Link>
            </div>
            <Disclaimer className="mt-10 !text-white/65" />
          </div>
        </div>
      </motion.section> */}
    </PageWrapper>
  );
}
