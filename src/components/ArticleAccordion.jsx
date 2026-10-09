import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import BilingualText from "./BilingualText";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategory, formatDate, formatReadTime } from "@/data/insights";
import { cn } from "@/lib/utils";

const warm = [
  "linear-gradient(to right, rgba(227,121,15,0.38) 0%, rgba(227,121,15,0.14) 14%, transparent 34%)",
  "linear-gradient(to left, rgba(172,30,64,0.42) 0%, rgba(214,92,40,0.2) 16%, transparent 38%)",
  "radial-gradient(60% 100% at 100% 0%, rgba(214,173,132,0.38) 0%, transparent 70%)",
].join(", ");

function Meta({ article, language, ink }) {
  const category = getCategory(article.category);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className={cn(
          "rounded-full px-3 py-1 text-[11px] tracking-[0.04em]",
          ink ? "bg-[var(--hero-ink)]/10 text-[var(--hero-ink)]/85" : "bg-white/[0.08] text-[var(--text-secondary)]",
        )}
      >
        <T t={category.single} />
      </span>
      <span
        className={cn(
          "text-[10px] uppercase tracking-[0.18em]",
          ink ? "text-[var(--hero-ink)]/55" : "text-[var(--text-muted)]",
        )}
      >
        {formatDate(article.date, language)}
        <span className="mx-2 opacity-50">/</span>
        {formatReadTime(article.readTime, language)}
      </span>
    </div>
  );
}

// Read-more control drawn from spans, since the whole card is already a link
function ReadMore({ ink }) {
  return (
    <span className="cta cta--primary">
      <span className="cta-pill !px-6 !py-3">
        <BilingualText en="Read more" ar="اقرأ المزيد" />
      </span>
      <span className={cn("cta-circle !h-[42px] !w-[42px]", ink && "")} aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={1.5} className="rtl:-scale-x-100" />
      </span>
    </span>
  );
}

// Wide screens: one card of the row is open, showing text and an image. Hover or focus opens another.
function AccordionCard({ article, active, onActivate, language }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-current={active}
      data-nav-light={active ? "" : undefined}
      style={{ flexGrow: active ? 3.1 : 1, flexBasis: 0 }}
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[26px] border transition-[flex-grow,border-color,background-color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        active ? "border-transparent bg-[var(--hero-block)]" : "border-[var(--border-default)] bg-[var(--bg-primary)]",
      )}
    >
      {/* warm gradients, only on the open card */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", active ? "opacity-100" : "opacity-0")}
        style={{ background: warm }}
      />

      {/* Collapsed face: soft decorative circles, title, arrow */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-500 2xl:p-6",
          active ? "pointer-events-none opacity-0" : "opacity-100 delay-300",
        )}
      >
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -start-14 h-44 w-44 rounded-full bg-[var(--accent)]/[0.09]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-12 start-16 h-14 w-14 rounded-full bg-[var(--accent)]/[0.07]" />

        <div className="relative">
          <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] text-[var(--text-secondary)]">
            <T t={getCategory(article.category).single} />
          </span>
          <h3 className="mt-5 line-clamp-6 text-[1rem] font-light leading-[1.2] tracking-[-0.015em] text-[var(--text-primary)] 2xl:text-[1.15rem]">
            <T t={article.title} />
          </h3>
        </div>
        <div className="relative flex items-center justify-between gap-3">
          <span className="text-[13px] text-[var(--text-secondary)]">
            <BilingualText en="Read more" ar="اقرأ المزيد" />
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-primary)]">
            <ArrowUpRight size={15} strokeWidth={1.5} className="rtl:-scale-x-100" />
          </span>
        </div>
      </div>

      {/* Open face: fixed width so the text never reflows while the card animates */}
      <div
        className={cn(
          "absolute inset-y-0 start-0 grid w-full min-w-[28rem] grid-cols-[minmax(0,1fr)_11rem] gap-6 p-6 2xl:grid-cols-[minmax(0,1fr)_12.5rem] 2xl:gap-7 2xl:p-8 transition-opacity duration-500",
          active ? "opacity-100 delay-300" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex min-w-0 flex-col">
          <Meta article={article} language={language} ink />
          <h3 className="mt-6 text-[clamp(1.5rem,2vw,2rem)] font-light leading-[1.12] tracking-[-0.02em] text-[var(--hero-ink)]">
            <T t={article.title} />
          </h3>
          <p className="mt-4 line-clamp-4 text-[14px] leading-[1.7] text-[var(--hero-ink)]/70">
            <T t={article.excerpt} />
          </p>
          <div className="mt-auto pt-6">
            <ReadMore />
          </div>
        </div>
        <div className="scoop self-center overflow-hidden rounded-[22px]">
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          />
        </div>
      </div>
    </Link>
  );
}

// Below xl: a compact row per article, the same ingredients in a single column
function StackCard({ article, language }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className="group relative grid grid-cols-[minmax(0,1fr)_6.5rem] gap-5 overflow-hidden rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-primary)] p-5 transition-colors duration-500 hover:border-[var(--border-strong)] sm:grid-cols-[minmax(0,1fr)_8rem]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-14 -start-12 h-36 w-36 rounded-full bg-[var(--accent)]/[0.08]" />
      <div className="relative flex min-w-0 flex-col">
        <Meta article={article} language={language} />
        <h3 className="mt-4 text-[1.15rem] font-light leading-[1.2] tracking-[-0.015em] text-[var(--text-primary)]">
          <T t={article.title} />
        </h3>
        <p className="mt-3 line-clamp-2 text-[13px] leading-[1.7] text-[var(--text-secondary)]">
          <T t={article.excerpt} />
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--text-primary)]">
          <BilingualText en="Read more" ar="اقرأ المزيد" />
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="text-[var(--accent)] transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
          />
        </span>
      </div>
      <div className="scoop relative self-start overflow-hidden rounded-[18px]">
        <img
          src={article.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover"
        />
      </div>
    </Link>
  );
}

export default function ArticleAccordion({ articles }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(articles[0]?.slug);

  // Keep a valid open card when the list changes (e.g. the filter)
  useEffect(() => {
    if (!articles.some((a) => a.slug === active)) setActive(articles[0]?.slug);
  }, [articles, active]);

  return (
    <>
      <div className="hidden h-[25rem] gap-3 xl:flex">
        {articles.map((article) => (
          <AccordionCard
            key={article.slug}
            article={article}
            language={language}
            active={article.slug === active}
            onActivate={() => setActive(article.slug)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:hidden">
        {articles.map((article) => (
          <StackCard key={article.slug} article={article} language={language} />
        ))}
      </div>
    </>
  );
}
