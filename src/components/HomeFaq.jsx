import SectionHeading from "./SectionHeading";
import Faq from "./Faq";
import CtaLink from "./CtaLink";
import BilingualText from "./BilingualText";
import { fund } from "@/data/content";

// Home: investor questions, directly under the Fund section.
export default function HomeFaq() {
  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] xl:gap-20">
        <SectionHeading
          className="!mb-0"
          eyebrow={<BilingualText en="For investors" ar="للمستثمرين" />}
          titleClassName="text-[clamp(1.75rem,2.8vw,2.6rem)]"
          title={<BilingualText en="Investor questions." ar="أسئلة المستثمرين." />}
        />
        <div>
          <Faq items={fund.faqs} />
          <div className="mt-10">
            <CtaLink to="/contact?interest=invest" variant="primary">
              <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
