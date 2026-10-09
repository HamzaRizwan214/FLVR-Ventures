import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import ConceptShowcase from "@/components/ConceptShowcase";
import SectionHeading from "@/components/SectionHeading";
import CtaLink from "@/components/CtaLink";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { getConcept } from "@/data/concepts";
import { steps, contact } from "@/data/content";
import { useConceptModal } from "@/contexts/ConceptModalContext";

const ease = [0.22, 1, 0.36, 1];

const showcaseDescription = {
  en: "Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Partners can acquire a percentage of a concept's equity.",
  ar: "مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يمكن للشركاء الاستحواذ على نسبة من ملكية المفهوم.",
};

export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const { open } = useConceptModal();

  // Old links such as /portfolio?concept=nagu still open that concept, in the modal.
  useEffect(() => {
    const slug = params.get("concept");
    if (slug && getConcept(slug)) {
      open(slug);
      setParams({}, { replace: true });
    }
  }, [params, open, setParams]);

  return (
    <PageWrapper>
      {/* 1 · The carved showcase, same as Home */}
      <ConceptShowcase
        as="h1"
        eyebrow={<BilingualText en="Portfolio" ar="المحفظة" />}
        title={
          <BilingualText
            en="Four concepts, each built with its founder."
            ar="أربعة مفاهيم، يقود كلاً منها مؤسسه."
          />
        }
        description={showcaseDescription}
        cta={{
          to: "/contact?interest=invest",
          label: <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />,
        }}
      />

      {/* 2 · The same method for every concept */}
      {/* <section className="panel px-6 py-20 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow={<BilingualText en="Method" ar="المنهجية" />}
          title={
            <BilingualText
              en="The same four stages for every concept."
              ar="المراحل الأربع نفسها لكل مفهوم."
            />
          }
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-[var(--border-default)] bg-[var(--border-default)] sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease }}
              className="bg-[var(--bg-primary)] p-7 lg:p-9"
            >
              <p className="eyebrow mb-10 flex items-center gap-3 !text-[10px]">
                <span>0{i + 1}</span>
                <span className="text-[var(--accent)]">
                  <T t={step.descriptor} />
                </span>
              </p>
              <h3 className="mb-3 text-2xl font-light tracking-[-0.015em] text-[var(--text-primary)]">
                <T t={step.title} />
              </h3>
              <p className="text-[14px] leading-[1.75] text-[var(--text-secondary)]">
                <T t={step.desc} />
              </p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* 3 · Closing call to action: warm light box, same family as the hero banner */}
      {/* <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease }}
        data-nav-light
        className="relative overflow-hidden rounded-[28px] bg-[var(--hero-block)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right, rgba(227,121,15,0.42) 0%, rgba(227,121,15,0.16) 15%, transparent 38%)",
              "linear-gradient(to left, rgba(172,30,64,0.46) 0%, rgba(214,92,40,0.22) 17%, transparent 42%)",
              "radial-gradient(60% 100% at 100% 0%, rgba(214,173,132,0.40) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
        <div className="relative grid grid-cols-1 items-end gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:py-20">
          <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.025em] text-[var(--hero-ink)]">
            <BilingualText en="Have a concept of your own?" ar="لديك مفهوم خاص؟" />
          </h2>
          <div>
            <p className="max-w-md text-[15px] leading-[1.8] text-[var(--hero-ink)]/75">
              <T t={contact.lead} />
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <CtaLink to="/contact?interest=own" variant="primary">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
              <Link
                to="/funds"
                className="text-xs uppercase tracking-[0.18em] text-[var(--hero-ink)]/70 underline-offset-8 transition-colors hover:text-[var(--hero-ink)] hover:underline"
              >
                <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section> */}
    </PageWrapper>
  );
}
