import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import CtaLink from "./CtaLink";
import Crosshair from "./Crosshair";
import BilingualText from "./BilingualText";
import T from "./T";
import Disclaimer from "./Disclaimer";
import { fund } from "@/data/content";

// Home: Fund snapshot with the primary investor CTAs.
const highlights = ["Target fund size", "Ticket size", "Stage"];

export default function HomeFund() {
  const rows = fund.terms.filter((t) => highlights.includes(t.label.en));

  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      <Crosshair className="absolute start-6 top-6 hidden lg:block" />
      <Crosshair className="absolute end-6 top-6 hidden lg:block" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <div>
          <SectionHeading
            className="!mb-10"
            eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
            title={<BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />}
            lead={<T t={fund.intro} />}
          />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaLink to="/funds" variant="primary">
              <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
            </CtaLink>
            <CtaLink to="/contact?interest=invest" variant="outline">
              <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
            </CtaLink>
          </div>
        </div>

        <dl className="self-end border-t border-[var(--border-default)]">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-7"
            >
              <dt className="eyebrow">
                <T t={row.label} />
              </dt>
              <dd className="text-[clamp(1.6rem,3vw,2.6rem)] font-extralight tracking-[-0.01em] text-[var(--text-primary)]">
                <T t={row.value} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <Disclaimer className="mt-16" />
    </section>
  );
}
