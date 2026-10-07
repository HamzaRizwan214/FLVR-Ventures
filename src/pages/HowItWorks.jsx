import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { steps, popup, participation } from "@/data/content";

const intro = {
  en: "We work alongside founders to strengthen each concept, test its commercial assumptions and support launch and growth.",
  ar: "نعمل إلى جانب المؤسسين لتعزيز كل مفهوم واختبار افتراضاته التجارية ودعم الإطلاق والنمو.",
};

export default function HowItWorks() {
  return (
    <PageWrapper noPadding>
      <PageHeader
        eyebrow={<BilingualText en="Method" ar="المنهجية" />}
        title={
          <BilingualText
            en="How we build concepts."
            ar="كيف نبني المفاهيم."
          />
        }
        lead={<T t={intro} />}
      />

      {/* 1 · The playbook */}
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<BilingualText en="The Studio method" ar="منهجية الاستوديو" />}
            title={
              <BilingualText
                en="Filter. Lift. Validate. Run."
                ar="تصفية. رفع. تحقق. تشغيل."
              />
            }
          />

          <div className="border-t border-[var(--border-default)]">
            {steps.map((step, i) => (
              <React.Fragment key={step.key}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-6 border-b border-[var(--border-default)] py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:py-14"
                >
                  <div>
                    <p className="mb-3 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] font-[Metropolis]">
                      <span className="text-[var(--text-muted)]">0{i + 1}</span>
                      <span className="text-[var(--brand-primary)]">
                        <T t={step.descriptor} />
                      </span>
                    </p>
                    <h3 className="text-4xl md:text-6xl font-normal tracking-tighter text-[var(--text-primary)]">
                      <T t={step.title} />
                    </h3>
                  </div>
                  <p className="max-w-xl text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
                    <T t={step.desc} />
                  </p>
                </motion.div>

                {/* POP-UP sits inside the Validate step */}
                {step.key === "validate" && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="my-10 border-s-4 border-[var(--brand-primary)] bg-[var(--bg-brand-tint)] p-8 md:my-14 md:p-12"
                  >
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]">
                      <T t={popup.name} />
                    </p>
                    <p className="max-w-3xl text-2xl md:text-3xl font-normal leading-snug tracking-tight text-[var(--text-primary)]">
                      <T t={popup.body} />
                    </p>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · The investor path */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<T t={participation.eyebrow} />}
            title={<T t={participation.title} />}
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {participation.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="border-t-2 border-[var(--brand-primary)] pt-8"
              >
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
                  0{i + 1}
                </p>
                <h3 className="mb-4 text-3xl font-normal tracking-tight text-[var(--text-primary)]">
                  <T t={item.label} />
                </h3>
                <p className="text-lg leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
                  <T t={item.text} />
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap items-center gap-6">
            <Link to="/portfolio" className="btn-primary">
              <BilingualText en="View the portfolio" ar="استعرض المحفظة" />
            </Link>
            <Link to="/funds" className="btn-secondary">
              <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
