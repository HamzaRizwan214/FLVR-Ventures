import CarvedHero from "./CarvedHero";
import ConceptCard from "./ConceptCard";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import { concepts } from "@/data/concepts";

// The concept section used on Home and on the Portfolio page: the carved hero holding the
// heading, a description and button in the notch, and the four square cards below.
//   eyebrow, title: ReactNodes   description: { en, ar }   cta: { to, label: ReactNode }
export default function ConceptShowcase({ eyebrow, title, description, cta, as = "h2" }) {
  return (
    <CarvedHero
      as={as}
      eyebrow={eyebrow}
      title={title}
      notch={
        <>
          <p className="max-w-[28rem] text-[15px] leading-[1.75] text-[var(--text-secondary)]">
            <BilingualText en={description.en} ar={description.ar} />
          </p>
          <div className="mt-6">
            <CtaLink to={cta.to} variant="primary">
              {cta.label}
            </CtaLink>
          </div>
        </>
      }
    >
      {/* Square cards: swipe row on phones, grid from sm up */}
      <div className="-mx-4 flex snap-x snap-mandatory scroll-ps-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:scroll-ps-0 sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 xl:gap-5 [&::-webkit-scrollbar]:hidden">
        {concepts.map((concept, i) => (
          <div key={concept.slug} className="w-[74%] shrink-0 snap-start sm:w-auto">
            <ConceptCard concept={concept} index={i} aspect="aspect-[1/0.84]" />
          </div>
        ))}
      </div>
    </CarvedHero>
  );
}
