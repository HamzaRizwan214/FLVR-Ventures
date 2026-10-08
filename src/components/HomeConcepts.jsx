import ConceptShowcase from "./ConceptShowcase";
import BilingualText from "./BilingualText";

const description = {
  en: "Restaurant concepts built and validated by the FLVR Studio, each led by its founder. Partners can acquire a percentage of a concept's equity.",
  ar: "مفاهيم مطاعم يبنيها استوديو فلايفر ويختبرها، ويقود كلاً منها مؤسسه. يمكن للشركاء الاستحواذ على نسبة من ملكية المفهوم.",
};

// Home: the portfolio, as the shared carved showcase.
export default function HomeConcepts() {
  return (
    <ConceptShowcase
      eyebrow={<BilingualText en="Portfolio" ar="المحفظة" />}
      title={
        <BilingualText
          en="Four concepts, each built with its founder."
          ar="أربعة مفاهيم، يقود كلاً منها مؤسسه."
        />
      }
      description={description}
      cta={{
        to: "/portfolio",
        label: <BilingualText en="View the portfolio" ar="استعرض المحفظة" />,
      }}
    />
  );
}
