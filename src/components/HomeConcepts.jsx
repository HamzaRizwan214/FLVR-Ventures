import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import ConceptCard from "./ConceptCard";
import BilingualText from "./BilingualText";
import { concepts } from "@/data/concepts";

// Home: the four concepts. Each card opens its drawer on the Studio page.
export default function HomeConcepts() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 sm:py-32 border-t border-[var(--border-default)]">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <SectionHeading
          eyebrow={<BilingualText en="The Studio" ar="الاستوديو" />}
          title={
            <BilingualText
              en="Four brands. Four opportunities. One growth platform."
              ar="أربع علامات. أربع فرص. منصة نمو واحدة."
            />
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((concept, i) => (
            <ConceptCard
              key={concept.slug}
              concept={concept}
              index={i}
              to={`/portfolio?concept=${concept.slug}`}
            />
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/portfolio"
            className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--brand-primary)] hover:underline font-[Metropolis]"
          >
            <BilingualText en="View all concepts" ar="عرض جميع المفاهيم" />
          </Link>
        </div>
      </div>
    </section>
  );
}
