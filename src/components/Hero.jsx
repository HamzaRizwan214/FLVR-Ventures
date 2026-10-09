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

// Home hero: one warm box, no cut-out. On wide screens: the description and button on the left
// (right-aligned), a hairline, then the heading, the group centred. On smaller screens the same
// three stack top to bottom: heading, description, button.
export default function Hero() {
  return (
    <section className="panel p-2.5 sm:p-3">
      <div data-nav-light className="relative overflow-hidden rounded-[22px] bg-[var(--hero-block)]">
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

        {/* Wide screens: description and button (right-aligned) | hairline | heading, the group
            centred in the box. Smaller screens stack: heading, description, button. */}
        <div className="relative flex flex-col gap-8 px-6 py-12 sm:px-10 lg:py-14 xl:flex-row xl:items-stretch xl:justify-center xl:gap-10 xl:px-14 xl:py-16">
          {/* Description and button */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease }}
            className="order-2 flex flex-col xl:order-1 xl:max-w-[24rem] xl:items-end xl:justify-between xl:text-end"
          >
            <p className="max-w-[28rem] text-[15px] leading-[1.75] text-[var(--hero-ink)]/75">
              <T t={hero.lead} />
            </p>
            <div className="mt-6 xl:mt-8">
              <CtaLink to="/contact?interest=invest" variant="primary">
                <T t={hero.ctaPrimary} />
              </CtaLink>
            </div>
          </motion.div>

          {/* Hairline between the two */}
          <span aria-hidden="true" className="order-2 hidden w-px self-stretch bg-[var(--hero-ink)]/20 xl:block" />

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="order-1 text-balance text-[clamp(2.2rem,4.3vw,4.1rem)] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--hero-ink)] xl:order-3 xl:max-w-[17ch]"
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
      </div>
    </section>
  );
}
