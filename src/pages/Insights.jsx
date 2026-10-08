import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import CarvedHero from "@/components/CarvedHero";
import CtaLink from "@/components/CtaLink";
import ArticleAccordion from "@/components/ArticleAccordion";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { articles, categories } from "@/data/insights";
import { cn } from "@/lib/utils";

export default function Insights() {
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? articles : articles.filter((a) => a.category === filter)),
    [filter],
  );

  return (
    <PageWrapper>
      <CarvedHero
        as="h1"
        flat
        eyebrow={<BilingualText en="Insights" ar="رؤى" />}
        title={
          <BilingualText
            en="Research, reports and writing from FLVR."
            ar="أبحاث وتقارير ومقالات من فلايفر."
          />
        }
        notch={
          <>
            <p className="max-w-[28rem] text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              <BilingualText
                en="Articles, research, blogs and reports on Saudi food and beverage, and on how FLVR builds and invests."
                ar="مقالات وأبحاث ومدونات وتقارير عن قطاع الأغذية والمشروبات السعودي، وعن كيفية بناء فلايفر واستثمارها."
              />
            </p>
            <div className="mt-6">
              <CtaLink to="/contact?interest=invest" variant="primary">
                <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
              </CtaLink>
            </div>
          </>
        }
      >
        {/* Filter */}
        <div
          role="tablist"
          aria-label="Filter insights"
          className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c.key)}
                className={cn(
                  "relative shrink-0 rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
                  active
                    ? "border-transparent text-[var(--text-primary)]"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="insightsFilter"
                    className="absolute inset-0 rounded-full bg-white/[0.1]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10">
                  <T t={c.label} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Articles */}
        <ArticleAccordion articles={visible} />
      </CarvedHero>
    </PageWrapper>
  );
}
