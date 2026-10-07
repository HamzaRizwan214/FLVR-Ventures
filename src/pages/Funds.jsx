import { Link } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import TermsTable from "@/components/TermsTable";
import Faq from "@/components/Faq";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { fund } from "@/data/content";

export default function Funds() {
  return (
    <PageWrapper noPadding>
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
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<BilingualText en="Terms" ar="الشروط" />}
            title={<BilingualText en="At a glance." ar="لمحة سريعة." />}
            lead={<T t={fund.status} />}
          />
          <TermsTable rows={fund.terms} />
        </div>
      </section>

      {/* 2 · Role in the model */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-[var(--brand-primary)] text-white">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <h2 className="text-4xl md:text-6xl font-normal tracking-tighter leading-[1.05]">
            <T t={fund.role.title} />
          </h2>
          <p className="max-w-3xl text-2xl md:text-4xl font-normal leading-snug tracking-tight">
            <T t={fund.role.text} />
          </p>
        </div>
      </section>

      {/* 3 · Questions + CTA */}
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <SectionHeading
            className="!mb-0"
            eyebrow={<BilingualText en="For investors" ar="للمستثمرين" />}
            title={<BilingualText en="Good to know." ar="من المفيد معرفته." />}
          />
          <div>
            <Faq items={fund.faqs} />
            <div className="mt-14 flex flex-wrap items-center gap-6">
              <Link to="/contact?interest=fund" className="btn-primary">
                <BilingualText en="Request fund overview" ar="اطلب نظرة عامة على الصندوق" />
              </Link>
              <Link to="/contact?interest=invest" className="btn-secondary">
                <BilingualText en="Discuss an investment" ar="ناقش فرصة استثمارية" />
              </Link>
            </div>
            <Disclaimer className="mt-12" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
