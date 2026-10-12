import { motion } from "framer-motion";
import ConceptPosters from "./ConceptPosters";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";

const ease = [0.22, 1, 0.36, 1];

const description = {
  en: "Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Partners can acquire a percentage of a concept's equity.",
  ar: "مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يمكن للشركاء الاستحواذ على نسبة من ملكية المفهوم.",
};

// Home: the portfolio. A big heading, a short description with the button, then four tall photo
// cards (a swipe row on phones).
export default function HomeConcepts() {
  return (
    <section className="sc-mobile-only relative px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1480px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20"
        >
          <div>
            <p className="kicker">
              <BilingualText en="Portfolio" ar="المحفظة" />
            </p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.3rem,4.8vw,4.7rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text-primary)] rtl:leading-[1.2] rtl:tracking-normal">
              <BilingualText
                en="Four concepts, each built with its founder."
                ar="أربعة مفاهيم، يقود كلاً منها مؤسسه."
              />
            </h2>
          </div>
          <div className="max-w-[26rem] lg:pb-2">
            <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)] sm:text-base">
              <BilingualText en={description.en} ar={description.ar} />
            </p>
            <div className="mt-7">
              <CtaLink to="/portfolio" variant="primary">
                <BilingualText en="View the portfolio" ar="استعرض المحفظة" />
              </CtaLink>
            </div>
          </div>
        </motion.div>

        <ConceptPosters />
      </div>
    </section>
  );
}
