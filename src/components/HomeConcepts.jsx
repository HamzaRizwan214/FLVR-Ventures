import { motion } from "framer-motion";
import ConceptCard from "./ConceptCard";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import { concepts } from "@/data/concepts";

const ease = [0.22, 1, 0.36, 1];

const description = {
  en: "Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Partners can acquire a percentage of a concept's equity.",
  ar: "مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يمكن للشركاء الاستحواذ على نسبة من ملكية المفهوم.",
};

// Home: the Studio. One container that holds the heading and the four concept cards.
// A notch is cut from its top-end corner, open to the page behind, and holds the
// description and button. Below the xl breakpoint the notch is dropped and they stack.
export default function HomeConcepts() {
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
      <div className="relative px-6 pt-14 sm:px-10 xl:min-h-[15rem] xl:px-14 xl:pt-16">
        <p className="mb-5 text-[15px] text-[var(--text-secondary)]">
          <BilingualText en="The Studio" ar="الاستوديو" />
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-[17ch] text-balance text-[clamp(2.1rem,4vw,3.7rem)] font-light leading-[1.08] tracking-[-0.025em] text-[var(--text-primary)]"
        >
          <BilingualText
            en="Four concepts, each built with its founder."
            ar="أربعة مفاهيم، يقود كلاً منها مؤسسه."
          />
        </motion.h2>

        {/* Below xl: description and button stack under the title */}
        <div className="mt-8 xl:hidden">
          <p className="max-w-xl text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <BilingualText en={description.en} ar={description.ar} />
          </p>
          <div className="mt-7">
            <CtaLink to="/studio" variant="primary">
              <BilingualText en="View the Studio" ar="استعرض الاستوديو" />
            </CtaLink>
          </div>
        </div>
      </div>

      {/* Notch: open to the page, flush with the container's top-end corner. The width lives on
          this wrapper (not the box) so the box always reaches the container edge. Wide screens only. */}
      <div className="absolute end-0 top-0 hidden w-[min(40%,36rem)] min-w-[26rem] xl:block">
        <div className="carve-fill relative h-[15rem] w-full ps-12 pe-8 pt-10 [border-end-start-radius:var(--r)]">
          <p className="max-w-[28rem] text-[15px] leading-[1.75] text-[var(--text-secondary)]">
            <BilingualText en={description.en} ar={description.ar} />
          </p>
          <div className="mt-6">
            <CtaLink to="/studio" variant="primary">
              <BilingualText en="View the Studio" ar="استعرض الاستوديو" />
            </CtaLink>
          </div>
          {/* connectors: round the container's corners where the notch meets its edges */}
          <span aria-hidden="true" className="carve-c carve-c--te -start-6 top-0" />
          <span aria-hidden="true" className="carve-c carve-c--te end-0 top-full" />
        </div>
      </div>

      {/* Cards: square, swipe row on phones, grid from sm up. The cards' own edge tabs
          cut through to the container, so reset the carve colour here. */}
      <div
        className="relative mt-10 px-4 pb-4 sm:px-8 sm:pb-8 xl:mt-14 xl:px-12 xl:pb-12"
        style={{ "--card": "var(--block-dark)" }}
      >
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 xl:gap-5 [&::-webkit-scrollbar]:hidden">
          {concepts.map((concept, i) => (
            <div key={concept.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <ConceptCard concept={concept} index={i} aspect="aspect-[1/1.06]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
