import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import TermsTable from "@/components/TermsTable";
import Faq from "@/components/Faq";
import CtaLink from "@/components/CtaLink";
import Crosshair from "@/components/Crosshair";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { fund } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Jump links styled like the segmented toggle used in the nav.
function PartLinks() {
  const link =
    "rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:bg-white/[0.09] hover:text-[var(--text-primary)]";
  return (
    <nav
      aria-label="Fund sections"
      className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-white/[0.03] p-1"
    >
      <a href="#mandate" className={link}>
        <T t={fund.mandate.label} />
      </a>
      <a href="#thesis" className={link}>
        <T t={fund.thesis.label} />
      </a>
    </nav>
  );
}

export default function Funds() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
        title={<BilingualText en="The FLVR Fund" ar="صندوق فلايفر" />}
        lead={<T t={fund.intro} />}
      >
        <PartLinks />
      </PageHeader>

      {/* 1 · Mandate */}
      <section id="mandate" className="panel scroll-mt-24 px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading
            className="!mb-0"
            eyebrow="01"
            titleClassName="text-[clamp(1.5rem,2.3vw,2.1rem)]"
            title={<T t={fund.mandate.label} />}
            lead={<T t={fund.mandate.title} />}
          />
          <div>
            <TermsTable rows={fund.terms} />
            <p className="mt-8 max-w-xl text-sm leading-[1.8] text-[var(--text-muted)]">
              <T t={fund.status} />
            </p>
          </div>
        </div>
      </section>

      {/* 2 · Investment thesis */}
      <section id="thesis" className="panel scroll-mt-24 px-6 py-20 lg:px-12 lg:py-28">
        <Crosshair className="absolute start-6 top-6 hidden lg:block" />
        <Crosshair className="absolute end-6 top-6 hidden lg:block" />

        <SectionHeading
          className="!mb-12 lg:!mb-14"
          eyebrow="02"
          titleClassName="text-[clamp(1.5rem,2.3vw,2.1rem)]"
          title={<T t={fund.thesis.label} />}
          lead={<T t={fund.thesis.title} />}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl text-[clamp(1.5rem,2.9vw,2.6rem)] font-light leading-[1.3] tracking-[-0.01em] text-[var(--text-primary)]"
        >
          <T t={fund.thesis.statement} />
        </motion.p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {fund.thesis.tags.map((tag, i) => (
            <li key={i} className="pill">
              <T t={tag} />
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-24">
          <p className="eyebrow mb-8">
            <T t={fund.thesis.stepsTitle} />
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-[var(--border-default)] bg-[var(--border-default)] md:grid-cols-3">
            {fund.thesis.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                className="bg-[var(--bg-primary)] p-8 lg:p-10"
              >
                <p className="eyebrow mb-10 !text-[10px]">0{i + 1}</p>
                <h3 className="mb-3 text-xl font-light tracking-[-0.005em] text-[var(--text-primary)]">
                  <T t={step.title} />
                </h3>
                <p className="text-[15px] leading-[1.8] text-[var(--text-secondary)]">
                  <T t={step.text} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Questions + CTA */}
      <section className="panel px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading
            className="!mb-0"
            eyebrow={<BilingualText en="For investors" ar="للمستثمرين" />}
            title={<BilingualText en="Investor questions." ar="أسئلة المستثمرين." />}
          />
          <div>
            <Faq items={fund.faqs} />
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaLink to="/contact?interest=fund" variant="primary">
                <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
              </CtaLink>
              <CtaLink to="/contact?interest=invest" variant="outline">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
            </div>
            <Disclaimer className="mt-12" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
