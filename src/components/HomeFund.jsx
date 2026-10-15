import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import T from "./T";
import Disclaimer from "./Disclaimer";
import { fund, fundPage } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Mandate rows shown on Home, in the same plain wording as the Funds page.
const { figures, rows: wideRows } = fundPage.glance;
const mandateRows = [wideRows[0], wideRows[1], figures[2], figures[1]];

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
// Quiet outline patterns for the top zones: rings for the mandate, nested arches for the thesis
const motifs = {
  rings: (
    <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true">
      {[28, 52, 76, 100, 124, 148, 172].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} {...line} />
      ))}
    </svg>
  ),
  arches: (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      {[20, 40, 60, 80, 100].map((r) => (
        <path key={r} d={`M${120 - r} 120 A${r} ${r} 0 0 1 ${120 + r} 120`} {...line} />
      ))}
    </svg>
  ),
};

// A card in the style of the concept posters, with colour in place of a photo: a top zone, a
// lower panel whose top edge curves up over it, and a round arrow on the seam (ringed in the
// panel colour) that links to the matching part of the Funds page. Sizes are in cqw.
function FundPoster({ index, tone, motif, title, tag, to, label, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.9, ease }}
      className="relative min-h-[26rem] overflow-hidden rounded-[1.25rem] xl:min-h-[30rem]"
      style={{ background: tone.panel, color: tone.ink, containerType: "inline-size" }}
    >
      {/* Top zone: the content, over a quiet pattern */}
      <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden" style={{ background: tone.top }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 end-0 w-[80%] opacity-[0.12] rtl:-scale-x-100"
          style={{
            WebkitMaskImage: "radial-gradient(circle at 100% 100%, #000 18%, transparent 80%)",
            maskImage: "radial-gradient(circle at 100% 100%, #000 18%, transparent 80%)",
          }}
        >
          {motifs[motif]}
        </div>
        <div className="relative px-[7cqw] pt-[7cqw]">{children}</div>
      </div>

      {/* Panel: curved top edge, tag and title */}
      <div
        className="absolute inset-x-0 bottom-0 flex h-[44%] flex-col justify-center rounded-t-[9cqw] px-[7cqw] pb-[6cqw] pt-[8cqw]"
        style={{ background: tone.panel }}
      >
        <span
          className="w-fit rounded-[1.4cqw] border-[1.5px] px-[2.8cqw] py-[1.3cqw] leading-none"
          style={{ borderColor: tone.ink, fontSize: "clamp(12px, 3.8cqw, 14.5px)", fontWeight: 500 }}
        >
          {tag}
        </span>
        <h3
          className="mt-[4cqw] leading-[1.04] tracking-[-0.03em] rtl:leading-[1.25] rtl:tracking-normal"
          style={{ fontSize: "clamp(1.8rem, 10.5cqw, 2.8rem)", fontWeight: 700 }}
        >
          {title}
        </h3>
      </div>

      {/* Round arrow across the seam */}
      <Link
        to={to}
        aria-label={label}
        className="group absolute end-[7cqw] flex h-[15cqw] w-[15cqw] items-center justify-center rounded-full bg-[#f2eee8] text-[#131415] transition-colors duration-300 hover:bg-[image:var(--gradient-brand)] hover:text-white"
        style={{ top: "calc(56% - 7.5cqw)", boxShadow: `0 0 0 2.4cqw ${tone.panel}` }}
      >
        <ArrowUpRight
          className="h-[7cqw] w-[7cqw] transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45"
          strokeWidth={2.25}
        />
      </Link>
    </motion.div>
  );
}

// Home: the Fund. Left: heading, the two short paragraphs, the headline figure in brand gradient
// and one button. Right: two poster cards, Mandate (wine) and Investment thesis (coral).
export default function HomeFund() {
  const rows = mandateRows;
  const target = fund.terms.find((t) => t.label.en === "Target fund size");

  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div
        data-nav-light
        className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] bg-[#f2eee8] p-7 text-[#131415] sm:p-12 lg:rounded-[2.5rem] lg:p-16"
      >

        <div className="relative grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:gap-16">
          {/* Left column */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="text-[clamp(2.6rem,5.2vw,5rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#131415] rtl:leading-[1.2] rtl:tracking-normal"
            >
              <BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />
            </motion.h2>

            <div className="mt-8 max-w-[26rem] space-y-4 text-[15px] leading-[1.75] text-[#131415]/70">
              <p>
                <T t={fund.intro} />
              </p>
              <p>
                <T t={fund.status} />
              </p>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-[13px] font-semibold text-[var(--hero-accent)]">
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
                  <BilingualText en="See the Fund" ar="اطّلع على الصندوق" />
                </CtaLink>
              </div>
            </div>
          </div>

          {/* Right: two poster cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FundPoster
              index={0}
              tone={{ top: "#a42540", panel: "#8f1d3a", ink: "#ffffff" }}
              motif="rings"
              title={<T t={fund.mandate.label} />}
              tag={<T t={fund.mandate.title} />}
              to="/funds#mandate"
              label="Mandate"
            >
              <dl className="border-t border-white/25">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-6 border-b border-white/25 py-3 last:border-b-0"
                  >
                    <dt className="text-[13px] text-white/70">
                      <T t={row.label} />
                    </dt>
                    <dd className="text-end text-[15px] font-semibold">
                      <T t={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </FundPoster>

            <FundPoster
              index={1}
              tone={{ top: "#f3846c", panel: "#EC5D44", ink: "#131415" }}
              motif="arches"
              title={<T t={fund.thesis.label} />}
              tag={<T t={fund.thesis.title} />}
              to="/funds#thesis"
              label="Investment thesis"
            >
              <p className="text-[15px] font-medium leading-[1.65]">
                <T t={fundPage.thesis.statement} />
              </p>
            </FundPoster>
          </div>
        </div>

        <Disclaimer className="relative mt-12 !text-[#131415]/55" />
      </div>
    </section>
  );
}
