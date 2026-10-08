import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import CtaLink from "./CtaLink";
import Crosshair from "./Crosshair";
import BilingualText from "./BilingualText";
import T from "./T";
import Disclaimer from "./Disclaimer";
import { fund } from "@/data/content";

// Home: Fund snapshot with both parts, Mandate and Investment thesis.
const mandateRows = ["Sector", "Stage", "Ticket size", "Target fund size"];

export default function HomeFund() {
  const rows = fund.terms.filter((t) => mandateRows.includes(t.label.en));

  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      <Crosshair className="absolute start-6 top-6 hidden lg:block" />
      <Crosshair className="absolute end-6 top-6 hidden lg:block" />

      <SectionHeading
        eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
        title={<BilingualText en="The FLVR Fund." ar="صندوق فلايفر." />}
        lead={<T t={fund.intro} />}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Mandate */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-secondary)]/50 p-7 lg:p-10"
        >
          <h3 className="mb-8 flex items-baseline gap-4 text-[clamp(1.25rem,1.8vw,1.6rem)] font-light leading-none tracking-[-0.015em] text-[var(--text-primary)]">
            {/* <span className="eyebrow !text-[10px]">01</span> */}
            <T t={fund.mandate.label} />
          </h3>
          <dl className="border-t border-[var(--border-default)]">
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--border-default)] py-5"
              >
                <dt className="text-[13px] text-[var(--text-secondary)]">
                  <T t={row.label} />
                </dt>
                <dd className="text-end text-lg font-light text-[var(--text-primary)]">
                  <T t={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Investment thesis */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-secondary)]/50 p-7 lg:p-10"
        >
          <h3 className="mb-8 flex items-baseline gap-4 text-[clamp(1.25rem,1.8vw,1.6rem)] font-light leading-none tracking-[-0.015em] text-[var(--text-primary)]">
            {/* <span className="eyebrow !text-[10px]">02</span> */}
            <T t={fund.thesis.label} />
          </h3>
          <p className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-light leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)]">
            <T t={fund.thesis.summary} />
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-[var(--text-secondary)]">
            <BilingualText
              en="Market research informs concept selection. POP-UP tests customer demand and operating economics."
              ar="تُسهم أبحاث السوق في اختيار المفاهيم، وتختبر POP-UP طلب العملاء والاقتصاديات التشغيلية."
            />
          </p>
          <Link
            to="/funds#thesis"
            className="mt-auto pt-10 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] underline-offset-8 transition-colors hover:text-[var(--text-primary)] hover:underline"
          >
            <BilingualText en="Read the full thesis" ar="اقرأ الفرضية كاملة" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
        <CtaLink to="/funds" variant="primary">
          <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
        </CtaLink>
        <CtaLink to="/contact?interest=invest" variant="outline">
          <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
        </CtaLink>
      </div>

      <Disclaimer className="mt-14" />
    </section>
  );
}
