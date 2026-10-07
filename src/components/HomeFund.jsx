import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BilingualText from "./BilingualText";
import T from "./T";
import Disclaimer from "./Disclaimer";
import { fund } from "@/data/content";

// Home: Fund snapshot band with the primary investor CTAs.
const highlights = ["Target fund size", "Ticket size", "Stage"];

export default function HomeFund() {
  const rows = fund.terms.filter((t) => highlights.includes(t.label.en));

  return (
    <section className="bg-[var(--brand-primary)] text-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <SectionHeading
          light
          eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
          title={
            <BilingualText
              en="The route to exit."
              ar="مسار الخروج."
            />
          }
          lead={<T t={fund.intro} />}
        />

        <div className="grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-3 border border-white/20">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-[var(--brand-primary)] p-8 lg:p-10"
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/60 font-[Metropolis]">
                <T t={row.label} />
              </p>
              <p className="text-3xl lg:text-4xl font-normal tracking-tight">
                <T t={row.value} />
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link to="/funds" className="btn-white">
            <BilingualText en="Explore the Fund" ar="استكشف الصندوق" />
          </Link>
          <Link to="/contact?interest=invest" className="btn-ghost">
            <BilingualText en="Discuss an investment" ar="ناقش فرصة استثمارية" />
          </Link>
        </div>

        <Disclaimer className="mt-12 !text-white/55" />
      </div>
    </section>
  );
}
