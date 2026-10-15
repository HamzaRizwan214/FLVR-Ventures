import { Link } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import CtaLink from "@/components/CtaLink";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { fundPage } from "@/data/content";

// The hero's dot motif: a lattice of faint dots on the end side, with a stepped cluster of
// coloured ones growing out of it. Columns run from the start side to the end side; the colours
// step from orange to wine across the cluster, the same progression as the stage cards.
const COLS = 9;
const ROWS = 4;
const steps = ["#f58a2e", "#ec5d44", "#c1304a", "#a42540", "#8f1d3a"];
const cluster = [
  // [column, row, colour step, ring?]
  [4, 3, 0],
  [5, 2, 1],
  [5, 3, 1],
  [6, 1, 2],
  [6, 2, 2],
  [6, 3, 2],
  [7, 1, 3],
  [7, 2, 3],
  [7, 3, 3],
  [8, 2, 4],
  [8, 3, 4],
  [5, 1, 1, true],
  [8, 1, 4, true],
];
const filled = new Set(cluster.map(([c, r]) => `${c}-${r}`));
const lattice = Array.from({ length: COLS * ROWS }, (_, i) => [i % COLS, Math.floor(i / COLS)]).filter(
  ([c, r]) => !filled.has(`${c}-${r}`),
);

// Mostly wine, with just a warm glow of orange in the top corner
const gradient =
  "radial-gradient(55% 85% at 6% 0%, rgba(240,106,28,0.8) 0%, rgba(207,59,43,0.45) 45%, transparent 100%), linear-gradient(135deg, #a42540 0%, #8f1d3a 45%, #5d1226 100%)";

const h2 =
  "text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.035em] rtl:leading-[1.25] rtl:tracking-normal";

// Four geometric glyphs in the shape language of the dot motif, one per figure
const icons = [
  // Fund size: a solid circle inside a ring
  <svg key="size" viewBox="0 0 48 48" className="h-full w-full" fill="currentColor" aria-hidden="true">
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="3" />
  </svg>,
  // Per business: a small dot and a larger dot, joined
  <svg key="per" viewBox="0 0 48 48" className="h-full w-full" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="24" r="6" />
    <circle cx="35" cy="24" r="12" />
    <rect x="12" y="22" width="14" height="4" />
  </svg>,
  // How early: a seed, then a half-circle growing from the line
  <svg key="early" viewBox="0 0 48 48" className="h-full w-full" fill="currentColor" aria-hidden="true">
    <circle cx="9" cy="33" r="6" />
    <path d="M18 39 A14 14 0 0 1 46 39 Z" />
  </svg>,
  // Our share: a circle with a wedge of less than half filled
  <svg key="share" viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
    <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M24 24 L24 5 A19 19 0 0 1 39.4 35.2 Z" fill="currentColor" />
  </svg>,
];

// Quiet outline patterns for the card backgrounds, one per card, drawn in the card's ink colour at
// low opacity and anchored to the bottom end corner.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
const motifs = [
  // Fund size: rings spreading from the corner, like a ripple
  <svg key="ripple" viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true">
    {[28, 52, 76, 100, 124, 148, 172].map((r) => (
      <circle key={r} cx="200" cy="200" r={r} {...line} />
    ))}
  </svg>,
  // Per business: circles growing from small to large along a rising line
  <svg key="ramp" viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true">
    {[
      [26, 176, 5],
      [54, 154, 8],
      [88, 128, 12],
      [128, 96, 17],
      [174, 56, 23],
    ].map(([cx, cy, r]) => (
      <circle key={cx} cx={cx} cy={cy} r={r} {...line} />
    ))}
  </svg>,
  // How early: nested half-circle arches rising from the edge, like growth rings
  <svg key="arches" viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
    {[20, 40, 60, 80, 100].map((r) => (
      <path key={r} d={`M${120 - r} 120 A${r} ${r} 0 0 1 ${120 + r} 120`} {...line} />
    ))}
  </svg>,
  // Our share: a circle cut into slices, with a wedge of less than half marked
  <svg key="slices" viewBox="0 0 240 240" className="h-auto w-full" aria-hidden="true">
    <circle cx="140" cy="140" r="100" {...line} />
    {Array.from({ length: 12 }, (_, k) => {
      const t = (k * Math.PI) / 6;
      return (
        <line
          key={k}
          x1="140"
          y1="140"
          x2={140 + 100 * Math.sin(t)}
          y2={140 - 100 * Math.cos(t)}
          {...line}
        />
      );
    })}
    <path d="M140 140 L140 40 A100 100 0 0 1 226.6 190 Z" fill="currentColor" fillOpacity="0.45" />
  </svg>,
];

// Orange to wine, with one off-white card
const cardTones = [
  { bg: "#f58a2e", ink: "#131415" },
  { bg: "#ec5d44", ink: "#131415" },
  { bg: "#f2eee8", ink: "#131415" },
  { bg: "#8f1d3a", ink: "#ffffff" },
];

// The range of one investment: a bar with a marker at each end
function Range({ tone }) {
  const dot = "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[3px]";
  return (
    <span className="mt-4 block">
      <span className="relative mx-2 block">
        <span className="block h-1.5 rounded-full" style={{ background: tone.ink }} />
        <span
          aria-hidden="true"
          className={`${dot} start-0 -translate-x-1/2 rtl:translate-x-1/2`}
          style={{ background: tone.ink, borderColor: tone.bg }}
        />
        <span
          aria-hidden="true"
          className={`${dot} end-0 translate-x-1/2 rtl:-translate-x-1/2`}
          style={{ background: tone.ink, borderColor: tone.bg }}
        />
      </span>
      <span className="mt-3 flex justify-between text-[12px] font-medium opacity-80">
        <T t={fundPage.ruler.from} />
        <T t={fundPage.ruler.to} />
      </span>
    </span>
  );
}

// One figure as a flat card: label and glyph on top, then the value and what it means.
function GlanceCard({ item, index }) {
  const tone = cardTones[index];
  return (
    <div
      className="relative flex flex-col gap-6 overflow-hidden rounded-[1.25rem] p-5"
      style={{ background: tone.bg, color: tone.ink }}
    >
      {/* the quiet pattern, fading out before it reaches the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 end-0 w-[88%] opacity-[0.12] rtl:-scale-x-100"
        style={{
          WebkitMaskImage: "radial-gradient(circle at 100% 100%, #000 18%, transparent 80%)",
          maskImage: "radial-gradient(circle at 100% 100%, #000 18%, transparent 80%)",
        }}
      >
        {motifs[index]}
      </div>
      <div className="relative flex items-start justify-between gap-3">
        <span className="text-[14px] font-medium opacity-75">
          <T t={item.label} />
        </span>
        <span className="block h-8 w-8 shrink-0">{icons[index]}</span>
      </div>
      <div className="relative mt-auto">
        <p
          className="text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.08] tracking-[-0.03em] rtl:leading-[1.3] rtl:tracking-normal"
          style={{ fontWeight: 400 }}
        >
          <T t={item.value} />
        </p>
        <p className="mt-2 text-[14px] font-medium leading-[1.5] opacity-85">
          <T t={item.meaning} />
        </p>
        {item.range && <Range tone={tone} />}
      </div>
    </div>
  );
}

export default function Funds() {
  const { figures, rows } = fundPage.glance;

  return (
    <PageWrapper>
      {/* 1 · Hero: one headline, one sentence, one button, and the dot motif */}
      <section
        data-nav-light
        className="relative overflow-hidden rounded-[28px] bg-[#f2eee8] px-6 py-9 text-[#131415] sm:px-10 lg:px-14 lg:py-10"
        style={{ "--d": "clamp(2.4rem, 3.4vw, 3.2rem)" }}
      >
        {/* Dot motif, wide screens only. The lattice fades out toward the text. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 end-14 hidden lg:block rtl:-scale-x-100"
          style={{
            width: `calc(var(--d) * ${COLS})`,
            height: `calc(var(--d) * ${ROWS})`,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 52%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 52%)",
          }}
        >
          {lattice.map(([col, row]) => (
            <span
              key={`g${col}-${row}`}
              className="absolute rounded-full"
              style={{
                left: `calc(var(--d) * ${col})`,
                top: `calc(var(--d) * ${row})`,
                width: "var(--d)",
                height: "var(--d)",
                background: "rgba(19,20,21,0.07)",
              }}
            />
          ))}
          {cluster.map(([col, row, step, ring]) => (
            <span
              key={`c${col}-${row}`}
              className="absolute rounded-full"
              style={{
                left: `calc(var(--d) * ${col})`,
                top: `calc(var(--d) * ${row})`,
                width: "var(--d)",
                height: "var(--d)",
                background: ring ? "transparent" : steps[step],
                boxShadow: ring ? `inset 0 0 0 2px ${steps[step]}` : undefined,
              }}
            />
          ))}
        </div>

        <div className="relative lg:pe-[calc(var(--d)*9+3rem)]">
          <h1
            className="max-w-[22ch] text-[clamp(1.9rem,3.3vw,3rem)] leading-[1.04] tracking-[-0.04em] rtl:leading-[1.25] rtl:tracking-normal"
            style={{ fontWeight: 700 }}
          >
            <T t={fundPage.title} />
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="max-w-[26rem] text-[16px] leading-[1.5] text-[#131415]/70">
              <T t={fundPage.lead} />
            </p>
            <CtaLink to="/contact?interest=fund" variant="primary">
              <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 2 · At a glance: two statements, then four tall cards */}
      <section id="mandate" className="panel scroll-mt-24 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <h2 className={`${h2} text-[var(--text-primary)]`} style={{ fontWeight: 400 }}>
          <T t={fundPage.glance.title} />
        </h2>

        {/* What we back, Where */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:max-w-[52rem]">
          {rows.map((row) => (
            <div key={row.label.en}>
              <p className="text-[13px] text-[var(--text-secondary)]">
                <T t={row.label} />
              </p>
              <p
                className="mt-2 text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] rtl:leading-[1.4] rtl:tracking-normal"
                style={{ fontWeight: 400 }}
              >
                <T t={row.value} />
              </p>
              <p className="mt-2 max-w-[24rem] text-[14px] leading-[1.55] text-[var(--text-secondary)]">
                <T t={row.meaning} />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((item, i) => (
            <GlanceCard key={item.label.en} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* 3 · Investment thesis, on the brand gradient, with the three steps as white cards */}
      <section
        id="thesis"
        className="grain relative scroll-mt-24 overflow-hidden rounded-[28px] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-12"
        style={{ background: gradient }}
      >
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-[15px] font-semibold text-white/85">
              <T t={fundPage.thesis.kicker} />
            </p>
            <h2
              className="mt-3 max-w-[16ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.06] tracking-[-0.035em] rtl:leading-[1.25] rtl:tracking-normal"
              style={{ fontWeight: 700 }}
            >
              <T t={fundPage.thesis.statement} />
            </h2>
          </div>
          <ol className="border-t border-white/30">
            {fundPage.thesis.criteria.map((c, i) => (
              <li key={c.name.en} className="flex items-baseline gap-4 border-b border-white/30 py-3">
                <span className="w-6 shrink-0 text-[13px] font-semibold text-white/60">0{i + 1}</span>
                <span>
                  <span className="block text-[clamp(1.05rem,1.4vw,1.2rem)] font-semibold leading-[1.2]">
                    <T t={c.name} />
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-[1.45] text-white/80">
                    <T t={c.gloss} />
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* How we decide: three white cards, each a step higher than the last */}
        <p className="relative z-10 mt-8 text-[15px] font-semibold text-white/85">
          <T t={fundPage.thesis.decide} />
        </p>
        <div className="relative z-10 mt-3 grid grid-cols-1 items-end gap-3 md:grid-cols-3 md:gap-4">
          {fundPage.thesis.steps.map((step, i) => (
            <div
              key={step.title.en}
              className="flex flex-col justify-between gap-6 rounded-[1.25rem] bg-white p-6 text-[#131415] md:min-h-[var(--h)]"
              style={{ "--h": `${9 + i * 1.5}rem` }}
            >
              <h3
                className="text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.05] tracking-[-0.03em] rtl:leading-[1.3] rtl:tracking-normal"
                style={{ fontWeight: 700 }}
              >
                <T t={step.title} />
              </h3>
              <p className="max-w-[20rem] text-[14px] font-medium leading-[1.5] text-[#131415]/60">
                <T t={step.text} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · Closing: one button, one quiet link */}
      <section id="contact" className="scroll-mt-24 rounded-[28px] bg-[image:var(--gradient-brand)] p-px">
        <div className="grid grid-cols-1 items-end gap-10 rounded-[27px] bg-[var(--bg-primary)] px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14 lg:px-14 lg:py-16">
          <h2
            className="max-w-[14ch] text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.04em] text-[var(--text-primary)] rtl:leading-[1.25] rtl:tracking-normal"
            style={{ fontWeight: 700 }}
          >
            <T t={fundPage.closing} />
          </h2>
          <div>
            <p className="max-w-[28rem] text-[16px] leading-[1.55] text-[var(--text-secondary)]">
              <T t={fundPage.status} />
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/contact?interest=invest"
                className="text-[14px] font-semibold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:decoration-[var(--accent)]"
              >
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </Link>
            </div>
            <Disclaimer className="mt-9" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
