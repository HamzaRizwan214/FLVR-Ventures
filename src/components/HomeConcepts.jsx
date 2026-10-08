import SectionHeading from "./SectionHeading";
import ConceptCard from "./ConceptCard";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import { concepts } from "@/data/concepts";

// Home: the four concepts. Each card opens its drawer on the Studio page.
export default function HomeConcepts() {
  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      <SectionHeading
        eyebrow={<BilingualText en="The Studio" ar="الاستوديو" />}
        title={
          <BilingualText
            en="Four concepts, each built with its founder."
            ar="أربعة مفاهيم، يقود كلاً منها مؤسسه."
          />
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((concept, i) => (
          <ConceptCard
            key={concept.slug}
            concept={concept}
            index={i}
            to={`/studio?concept=${concept.slug}`}
          />
        ))}
      </div>

      <div className="mt-14">
        <CtaLink to="/studio" variant="outline">
          <BilingualText en="View the Studio" ar="استعرض الاستوديو" />
        </CtaLink>
      </div>
    </section>
  );
}
