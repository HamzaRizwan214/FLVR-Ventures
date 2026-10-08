import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import BilingualText from "./BilingualText";
import CtaLink from "./CtaLink";
import T from "./T";
import { hero } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Thin ring icon set inline in the headline, as in the reference.
function RingIcon() {
  return (
    <span
      aria-hidden="true"
      className="me-[0.2em] inline-flex h-[0.7em] w-[0.7em] translate-y-[0.02em] items-center justify-center rounded-full border border-[var(--hero-accent)] align-baseline text-[var(--hero-accent)]"
    >
      <UtensilsCrossed className="h-[46%] w-[46%]" strokeWidth={1.5} />
    </span>
  );
}

// Home hero: a carved card. The heading block is L-shaped: its lower end-corner is carved away
// and the description and button sit in that space (wide screens). On smaller screens they
// simply stack under the heading.
export default function Hero() {
  return (
    <section className="panel carve p-2.5 sm:p-3">
      {/* Heading block, L-shaped on desktop */}
      <div className="relative overflow-hidden rounded-[22px] bg-[var(--hero-block)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              // warm orange from the left edge
              "linear-gradient(to right, rgba(227,121,15,0.42) 0%, rgba(227,121,15,0.16) 15%, transparent 38%)",
              // crimson into orange from the right edge
              "linear-gradient(to left, rgba(172,30,64,0.46) 0%, rgba(214,92,40,0.22) 17%, transparent 42%)",
              // soft copper wash from the top-right corner
              "radial-gradient(60% 100% at 100% 0%, rgba(214,173,132,0.40) 0%, transparent 70%)",
            ].join(", "),
          }}
        />

        <div className="relative px-6 pb-14 pt-14 sm:px-10 lg:px-14 lg:pb-20 lg:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="max-w-[16ch] text-balance text-[clamp(2.3rem,4.9vw,4.5rem)] font-light leading-[1.08] tracking-[-0.025em] text-[var(--hero-ink)] sm:max-w-[19ch] xl:max-w-[20ch]"
          >
            <BilingualText
              en={
                <>
                  Backing the next generation of
                  <span className="block">
                    {/* <RingIcon /> */}
                    Saudi F&B brands.
                  </span>
                </>
              }
              ar={
                <>
                  ندعم الجيل القادم من
                  <span className="block">
                    {/* <RingIcon /> */}
                    علامات الأغذية والمشروبات السعودية.
                  </span>
                </>
              }
            />
          </motion.h1>
        </div>

        {/* Carved space: description and button, centred in the carve. Wide screens only. */}
        <div className="absolute bottom-0 end-0 hidden xl:block">
          <div className="carve-fill relative flex min-h-[14rem] w-[min(38vw,30rem)] flex-col justify-center py-9 pe-9 ps-9 [border-start-start-radius:var(--r)]">
            <p className="max-w-[26rem] text-[15px] leading-[1.8] text-[var(--text-secondary)]">
              <T t={hero.lead} />
            </p>
            <div className="mt-6">
              <CtaLink to="/contact?interest=invest" variant="primary">
                <T t={hero.ctaPrimary} />
              </CtaLink>
            </div>
            {/* connectors: round the block's corners where the notch meets its edges */}
            <span
              aria-hidden="true"
              className="carve-c carve-c--be bottom-0 -start-6"
            />
            <span
              aria-hidden="true"
              className="carve-c carve-c--be bottom-full end-0"
            />
          </div>
        </div>
      </div>

      {/* Below xl: description and button stacked under the heading block */}
      <div className="px-3 pb-3 pt-7 sm:px-5 xl:hidden">
        <p className="max-w-xl text-[15px] leading-[1.8] text-[var(--text-secondary)]">
          <T t={hero.lead} />
        </p>
        <div className="mt-7">
          <CtaLink to="/contact?interest=invest" variant="primary">
            <T t={hero.ctaPrimary} />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
