import { motion } from "framer-motion";
import Faq from "./Faq";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import { fund } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Home: investor questions, under the Fund section, closing on the contact button.
export default function HomeFaq() {
  return (
    <section className="relative px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pb-36 lg:pt-16">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] xl:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="xl:sticky xl:top-32 xl:self-start"
        >
          <p className="kicker">
            <BilingualText en="For investors" ar="للمستثمرين" />
          </p>
          <h2 className="mt-5 text-[clamp(2.3rem,4.4vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[var(--text-primary)] rtl:leading-[1.2] rtl:tracking-normal">
            <BilingualText en="Investor questions." ar="أسئلة المستثمرين." />
          </h2>
        </motion.div>
        <div>
          <Faq items={fund.faqs} />
          <div className="mt-12">
            <CtaLink to="/contact?interest=invest" variant="light">
              <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
