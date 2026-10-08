import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import TermsTable from "@/components/TermsTable";
import Faq from "@/components/Faq";
import CtaLink from "@/components/CtaLink";
import Crosshair from "@/components/Crosshair";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { fund } from "@/data/content";

export default function Funds() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow={<BilingualText en="The Fund" ar="الصندوق" />}
        title={<BilingualText en="The FLVR Fund" ar="صندوق فلايفر" />}
        lead={
          <>
            <T t={fund.intro} /> <T t={fund.approach} />
          </>
        }
      />

      {/* 1 · Terms */}
      <section className="panel px-6 py-20 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow={<BilingualText en="Terms" ar="الشروط" />}
          title={<BilingualText en="Fund terms." ar="شروط الصندوق." />}
          lead={<T t={fund.status} />}
        />
        <TermsTable rows={fund.terms} />
      </section>

      {/* 2 · Investment focus */}
      <section className="panel px-6 py-20 lg:px-12 lg:py-28">
        <Crosshair className="absolute start-6 top-6 hidden lg:block" />
        <Crosshair className="absolute end-6 top-6 hidden lg:block" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <p className="eyebrow">
            <T t={fund.focus.title} />
          </p>
          <p className="max-w-3xl text-[clamp(1.5rem,2.8vw,2.5rem)] font-light leading-[1.3] tracking-[-0.01em] text-[var(--text-primary)]">
            <T t={fund.focus.text} />
          </p>
        </div>
      </section>

      {/* 3 · Questions + CTA */}
      <section className="panel px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading
            className="!mb-0"
            eyebrow={<BilingualText en="For investors" ar="للمستثمرين" />}
            title={<BilingualText en="Investor questions." ar="أسئلة المستثمرين." />}
          />
          <div>
            <Faq items={fund.faqs} />
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaLink to="/contact?interest=fund" variant="primary">
                <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
              </CtaLink>
              <CtaLink to="/contact?interest=invest" variant="outline">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
            </div>
            <Disclaimer className="mt-12" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
