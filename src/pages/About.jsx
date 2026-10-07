import { Link } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ModelDiagram from "@/components/ModelDiagram";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { about, model } from "@/data/content";

export default function About() {
  return (
    <PageWrapper noPadding>
      <PageHeader
        eyebrow={<BilingualText en="About FLVR" ar="عن فلايفر" />}
        title={<T t={about.title} />}
        lead={<T t={about.lead} />}
      />

      {/* 1 · Structure */}
      <section className="px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow={<T t={model.eyebrow} />}
            title={<T t={model.title} />}
          />
          <ModelDiagram />
          <div className="mt-14">
            <Link
              to="/how-it-works"
              className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--brand-primary)] hover:underline font-[Metropolis]"
            >
              <BilingualText en="How we build concepts" ar="كيف نبني المفاهيم" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · Vision and mission */}
      <section className="px-6 lg:px-12 py-24 lg:py-32 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          {[about.vision, about.mission].map((item, i) => (
            <div key={i} className="border-t-2 border-[var(--brand-primary)] pt-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]">
                <T t={item.label} />
              </p>
              <p className="text-2xl md:text-3xl font-normal leading-snug tracking-tight text-[var(--text-primary)]">
                <T t={item.text} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
