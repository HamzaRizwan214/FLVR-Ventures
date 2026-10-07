import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import LoopDiagram from "@/components/LoopDiagram";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { about } from "@/data/content";

export default function About() {
  return (
    <PageWrapper noPadding>
      <PageHeader
        eyebrow={<BilingualText en="About FLVR" ar="عن فلايفر" />}
        title={<T t={about.tagline} />}
        lead={<T t={about.lead} />}
      />

      {/* 1 · Two arms */}
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<BilingualText en="Two arms" ar="ذراعان" />}
            title={
              <BilingualText
                en="One builds. One backs."
                ar="ذراع يبني. وذراع يدعم."
              />
            }
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {about.arms.map((arm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="border border-[var(--border-default)] bg-[var(--bg-secondary)] p-10 lg:p-14"
              >
                <h3 className="mb-6 text-3xl md:text-4xl font-normal tracking-tight text-[var(--text-primary)]">
                  <T t={arm.title} />
                </h3>
                <p className="text-lg leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
                  <T t={arm.text} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · The loop */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-[var(--bg-secondary)] border-y border-[var(--border-default)]">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<BilingualText en="The model" ar="النموذج" />}
            title={
              <BilingualText
                en="From concept to exit, in one line."
                ar="من المفهوم إلى الخروج في سطر واحد."
              />
            }
          />
          <LoopDiagram />
          <div className="mt-14">
            <Link
              to="/how-it-works"
              className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--brand-primary)] hover:underline font-[Metropolis]"
            >
              <BilingualText en="See how it works" ar="اطّلع على كيفية العمل" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · Vision and mission */}
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          {[about.vision, about.mission].map((item, i) => (
            <div key={i} className="border-t-2 border-[var(--brand-primary)] pt-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]">
                <T t={item.label} />
              </p>
              <p className="text-2xl md:text-3xl font-normal leading-snug tracking-tight text-[var(--text-primary)]">
                <T t={item.text} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
