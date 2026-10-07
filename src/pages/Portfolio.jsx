import { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import ConceptCard from "@/components/ConceptCard";
import ConceptDrawer from "@/components/ConceptDrawer";
import BilingualText from "@/components/BilingualText";
import { concepts, getConcept } from "@/data/concepts";

// The Studio: the four concepts investors can buy equity in.
export default function Portfolio() {
  const [params, setParams] = useSearchParams();
  const active = getConcept(params.get("concept"));

  const open = (slug) => setParams({ concept: slug });
  const close = useCallback(() => setParams({}, { replace: true }), [setParams]);

  return (
    <PageWrapper noPadding>
      <PageHeader
        eyebrow={<BilingualText en="The Studio" ar="الاستوديو" />}
        title={
          <BilingualText
            en="Four brands. Four opportunities. One growth platform."
            ar="أربع علامات. أربع فرص. منصة نمو واحدة."
          />
        }
        lead={
          <BilingualText
            en="Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Investors buy a percentage of a concept's equity."
            ar="مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يشتري المستثمرون نسبة من ملكية المفهوم."
          />
        }
      />

      <section className="px-6 lg:px-12 py-20 lg:py-28">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {concepts.map((concept, i) => (
              <ConceptCard
                key={concept.slug}
                concept={concept}
                index={i}
                onOpen={() => open(concept.slug)}
              />
            ))}
          </div>

          <div className="mt-20 flex flex-col gap-8 border-t border-[var(--border-default)] pt-12 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <Link to="/contact?interest=invest" className="btn-primary">
                <BilingualText en="Discuss an investment" ar="ناقش فرصة استثمارية" />
              </Link>
              <Link to="/how-it-works" className="btn-secondary">
                <BilingualText en="How a concept is validated" ar="كيف يُختبر المفهوم" />
              </Link>
            </div>
            <Link
              to="/contact?interest=own"
              className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-[Metropolis]"
            >
              <BilingualText en="Have your own concept? Talk to us" ar="لديك مفهوم خاص؟ تحدث معنا" />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && <ConceptDrawer key={active.slug} concept={active} onClose={close} />}
      </AnimatePresence>
    </PageWrapper>
  );
}
