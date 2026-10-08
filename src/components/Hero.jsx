import { motion } from "framer-motion";
import BilingualText from "./BilingualText";
import CtaLink from "./CtaLink";
import Crosshair from "./Crosshair";
import T from "./T";
import { hero } from "@/data/content";

// Home hero: uppercase headline left, hairline + lead + CTAs right,
// then the FLVR film in a softly graded rounded frame.
export default function Hero() {
  return (
    <section className="panel overflow-hidden px-4 pb-4 pt-14 sm:px-6 sm:pb-6 lg:px-10 lg:pb-10 lg:pt-24">
      <div className="grid grid-cols-1 gap-12 px-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20 lg:px-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.3rem,5.8vw,5.2rem)] font-light uppercase leading-[1.04] tracking-[-0.01em] text-[var(--text-primary)]"
        >
          <BilingualText
            en={
              <>
                A venture studio for{" "}
                <span className="text-[var(--accent)]">Saudi food and beverage</span>
              </>
            }
            ar={
              <>
                استوديو مشاريع لقطاع{" "}
                <span className="text-[var(--accent)]">الأغذية والمشروبات السعودي</span>
              </>
            }
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-8"
        >
          <div className="mb-8 flex items-center gap-5">
            <Crosshair />
            <span className="hairline flex-1" />
          </div>
          <p className="max-w-md text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <T t={hero.lead} />
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaLink to="/contact?interest=invest" variant="primary">
              <T t={hero.ctaPrimary} />
            </CtaLink>
            <CtaLink to="/studio" variant="outline">
              <T t={hero.ctaSecondary} />
            </CtaLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[22px] sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.webp"
          aria-hidden="true"
          src="/FLVR.mp4"
          className="h-full w-full object-cover brightness-[0.78] saturate-[0.8]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)]/50 via-transparent to-transparent"
        />
        <span className="pill absolute start-5 top-5 bg-black/35 backdrop-blur-md">
          <T t={hero.badge} />
        </span>
      </motion.div>
    </section>
  );
}
