import { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import ConceptCard from "@/components/ConceptCard";
import ConceptDrawer from "@/components/ConceptDrawer";
import CtaLink from "@/components/CtaLink";
import BilingualText from "@/components/BilingualText";
import { concepts, getConcept } from "@/data/concepts";

// The Studio: the four concepts partners can acquire equity in.
export default function Studio() {
  const [params, setParams] = useSearchParams();
  const active = getConcept(params.get("concept"));

  const open = (slug) => setParams({ concept: slug });
  const close = useCallback(() => setParams({}, { replace: true }), [setParams]);

  return (
    <PageWrapper>
      <PageHeader
        eyebrow={<BilingualText en="The Studio" ar="الاستوديو" />}
        title={<BilingualText en="Studio concepts" ar="مفاهيم الاستوديو" />}
        lead={
          <BilingualText
            en="Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Partners can acquire a percentage of a concept's equity."
            ar="مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يمكن للشركاء الاستحواذ على نسبة من ملكية المفهوم."
          />
        }
      />

      <section className="panel px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {concepts.map((concept, i) => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
              index={i}
              onOpen={() => open(concept.slug)}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-[var(--border-default)] pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaLink to="/contact?interest=invest" variant="primary">
              <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
            </CtaLink>
            <CtaLink to="/funds" variant="outline">
              <BilingualText en="Fund overview" ar="نظرة عامة على الصندوق" />
            </CtaLink>
          </div>
          <Link
            to="/contact?interest=own"
            className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] underline-offset-8 transition-colors hover:text-[var(--text-primary)] hover:underline"
          >
            <BilingualText en="Have a concept of your own? Contact us" ar="لديك مفهوم خاص؟ تواصل معنا" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {active && <ConceptDrawer key={active.slug} concept={active} onClose={close} />}
      </AnimatePresence>
    </PageWrapper>
  );
}
