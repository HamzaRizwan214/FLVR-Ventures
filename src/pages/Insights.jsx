import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import ArticleCard from "@/components/ArticleCard";
import { categories } from "@/data/insights";
import { useArticles } from "@/hooks/useArticles";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

export default function Insights() {
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { status, articles } = useArticles();

  const visible = useMemo(
    () => (filter === "all" ? articles : articles.filter((a) => a.category === filter)),
    [articles, filter],
  );
  const shown = visible.slice(0, limit);

  return (
    <PageWrapper>
      <section className="panel px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Heading */}
        <h1
          className="max-w-[20ch] text-[clamp(2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)] rtl:leading-[1.25] rtl:tracking-normal"
          style={{ fontWeight: 400 }}
        >
          <BilingualText en="Research, reports and writing from FLVR." ar="أبحاث وتقارير ومقالات من فلايفر." />
        </h1>
        <p className="mt-4 max-w-[32rem] text-[15px] leading-[1.6] text-[var(--text-secondary)]">
          <BilingualText
            en="Articles, research, blogs and reports on Saudi food and beverage, and on how FLVR builds and invests."
            ar="مقالات وأبحاث ومدونات وتقارير عن قطاع الأغذية والمشروبات السعودي، وعن كيفية بناء فلايفر واستثمارها."
          />
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
          {/* Filters: a column of pills on wide screens, a scrolling row on small ones */}
          <div
            role="tablist"
            aria-label="Filter insights"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:items-start lg:self-start lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => {
              const active = filter === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(c.key);
                    setLimit(PAGE_SIZE);
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-200",
                    active
                      ? "border-white bg-white text-[#111]"
                      : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-white/50 hover:text-white",
                  )}
                >
                  <T t={c.label} />
                </button>
              );
            })}
          </div>

          {/* Articles */}
          <div>
            {status === "loading" && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <div className="aspect-[4/3.4] rounded-[1.5rem] bg-[var(--bg-secondary)]" />
                    <div className="mt-4 h-6 w-4/5 rounded-full bg-[var(--bg-secondary)]" />
                    <div className="mt-3 h-4 w-3/5 rounded-full bg-[var(--bg-secondary)]" />
                  </div>
                ))}
              </div>
            )}
            {status === "error" && (
              <p className="py-16 text-[15px] text-[var(--text-secondary)]">
                <BilingualText
                  en="Articles could not be loaded. Please try again shortly."
                  ar="تعذّر تحميل المقالات. يرجى المحاولة مرة أخرى بعد قليل."
                />
              </p>
            )}
            {status === "ready" && visible.length === 0 && (
              <p className="py-16 text-[15px] text-[var(--text-secondary)]">
                <BilingualText en="Nothing published in this category yet." ar="لا يوجد محتوى منشور في هذا التصنيف بعد." />
              </p>
            )}
            {shown.length > 0 && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}

            {visible.length > limit && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((n) => n + PAGE_SIZE)}
                  className="rounded-full border border-[var(--border-strong)] px-7 py-3 text-[14px] font-semibold text-[var(--text-primary)] transition-colors hover:bg-white/10"
                >
                  <BilingualText en="Show more" ar="عرض المزيد" />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-14 border-t border-[var(--border-default)] pt-6 text-[14px] text-[var(--text-secondary)]">
          <Link
            to="/contact?interest=invest"
            className="font-semibold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:decoration-[var(--accent)]"
          >
            <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
          </Link>
        </p>
      </section>
    </PageWrapper>
  );
}
