import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import T from "./T";
import { chipTone, getCategory, formatDate, formatReadTime } from "@/data/insights";
import { useLanguage } from "@/contexts/LanguageContext";

// One article: a rounded cover with a category chip and a round arrow in a notch, then the title,
// a short description and the date. The whole card is the link.
export default function ArticleCard({ article }) {
  const { language } = useLanguage();
  const category = getCategory(article.category);
  const tone = chipTone[article.category] ?? chipTone.article;
  return (
    <Link to={`/insights/${article.slug}`} className="group block">
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.5rem] bg-[var(--bg-secondary)]">
        <img
          src={article.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <span
          className="absolute start-3 top-3 rounded-full px-3 py-1 text-[12px] font-medium leading-none"
          style={{ background: tone.bg, color: tone.ink, paddingBlock: "0.4rem" }}
        >
          <T t={category.single} />
        </span>
        {/* the notch, with the round arrow inside it */}
        <span className="absolute bottom-0 end-0 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-ss-[1.5rem] bg-[var(--bg-primary)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2eee8] text-[#131415] transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white">
            <ArrowUpRight
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45"
            />
          </span>
        </span>
      </div>

      <h3
        className="mt-4 line-clamp-3 text-[clamp(1.35rem,1.8vw,1.7rem)] leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)] rtl:leading-[1.35] rtl:tracking-normal"
        style={{ fontWeight: 700 }}
      >
        <T t={article.title} />
      </h3>
      <p className="mt-2 line-clamp-3 text-[14px] leading-[1.55] text-[var(--text-secondary)]">
        <T t={article.excerpt} />
      </p>
      <p className="mt-3 text-[12px] text-[var(--text-muted)]">
        {formatDate(article.date, language)}
        <span className="mx-2 opacity-50">·</span>
        {formatReadTime(article.readTime, language)}
      </p>
    </Link>
  );
}

