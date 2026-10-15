import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Link2 } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import ArticleBody from "@/components/ArticleBody";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { useLanguage } from "@/contexts/LanguageContext";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { chipTone, getCategory, formatDate, formatReadTime } from "@/data/insights";

const pill =
  "inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:bg-white/10";

// One labelled detail of the article
function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-[12px] text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1.5 text-[15px] font-medium text-[var(--text-primary)]">{children}</dd>
    </div>
  );
}

// Copies the page address, and says so
function CopyLink() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available: nothing to do */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[13px] font-medium text-[var(--text-primary)] transition-colors hover:bg-white/10"
    >
      {copied ? <Check size={14} strokeWidth={2} /> : <Link2 size={14} strokeWidth={2} />}
      <span role="status">
        {copied ? <BilingualText en="Link copied" ar="تم نسخ الرابط" /> : <BilingualText en="Copy link" ar="نسخ الرابط" />}
      </span>
    </button>
  );
}

// Article page, in the Insights style: one reading column (title, cover, text, then the article's
// details at the foot) with more articles stacked beside it on wide screens.
export default function Article() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { status, article } = useArticle(slug);
  const { articles } = useArticles();

  if (status === "loading") {
    return (
      <PageWrapper>
        <section className="panel px-5 py-10 sm:px-8 lg:px-12 lg:py-14" aria-busy="true">
          <div className="h-10 w-2/3 rounded-full bg-[var(--bg-secondary)]" />
          <div className="mt-4 h-5 w-1/2 rounded-full bg-[var(--bg-secondary)]" />
          <div className="mt-10 aspect-[16/8] rounded-[1.5rem] bg-[var(--bg-secondary)]" />
        </section>
      </PageWrapper>
    );
  }
  if (status === "error") {
    return (
      <PageWrapper>
        <section className="panel flex min-h-[40vh] flex-col items-start justify-center gap-6 px-6 py-16 sm:px-10">
          <p className="text-[17px] text-[var(--text-secondary)]">
            <BilingualText
              en="This article could not be loaded. Please try again shortly."
              ar="تعذّر تحميل المقال. يرجى المحاولة مرة أخرى بعد قليل."
            />
          </p>
          <Link to="/insights" className={pill}>
            <BilingualText en="All insights" ar="كل الرؤى" />
          </Link>
        </section>
      </PageWrapper>
    );
  }
  if (!article) return <Navigate to="/insights" replace />;

  const category = getCategory(article.category);
  const tone = chipTone[article.category] ?? chipTone.article;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <PageWrapper>
      <article className="panel px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div
          className={`grid grid-cols-1 gap-12 ${related.length > 0 ? "xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-14" : ""}`}
        >
          {/* Reading column */}
          <div className="min-w-0">
            <h1
              className="max-w-[22ch] text-balance text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.06] tracking-[-0.035em] text-[var(--text-primary)] rtl:leading-[1.25] rtl:tracking-normal"
              style={{ fontWeight: 400 }}
            >
              <T t={article.title} />
            </h1>
            <p className="mt-5 max-w-[40rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-[var(--text-secondary)]">
              <T t={article.excerpt} />
            </p>

            <div className="relative mt-8 aspect-[16/9] max-w-[42rem] overflow-hidden rounded-[1.5rem] bg-[var(--bg-secondary)]">
              <img
                src={article.cover}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="mt-12 max-w-[42rem]">
              <ArticleBody article={article} language={language} />
            </div>

            {/* The article's details, at the foot */}
            <div className="mt-14 max-w-[42rem] border-t border-[var(--border-default)] pt-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                <Detail label={<BilingualText en="Category" ar="التصنيف" />}>
                  <span
                    className="inline-block rounded-full px-3 py-1.5 text-[12px] font-medium leading-none"
                    style={{ background: tone.bg, color: tone.ink }}
                  >
                    <T t={category.single} />
                  </span>
                </Detail>
                <Detail label={<BilingualText en="Published" ar="تاريخ النشر" />}>
                  {formatDate(article.date, language)}
                </Detail>
                <Detail label={<BilingualText en="Reading time" ar="مدة القراءة" />}>
                  {formatReadTime(article.readTime, language)}
                </Detail>
                <Detail label={<BilingualText en="Author" ar="الكاتب" />}>
                  <BilingualText en="FLVR Ventures" ar="فلايفر فينتشرز" />
                </Detail>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  to="/insights"
                  className="group inline-flex items-center gap-3 text-[14px] font-medium text-[var(--text-primary)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] transition-colors group-hover:bg-white/10">
                    <ArrowLeft size={16} strokeWidth={2} className="rtl:-scale-x-100" />
                  </span>
                  <BilingualText en="All insights" ar="كل الرؤى" />
                </Link>
                <CopyLink />
                <Link
                  to="/contact?interest=invest"
                  className="text-[14px] font-semibold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:decoration-[var(--accent)]"
                >
                  <BilingualText en="Speak with the team" ar="تحدث مع الفريق" />
                </Link>
              </div>
            </div>
          </div>

          {/* More articles, beside the text on wide screens and below it otherwise */}
          {related.length > 0 && (
            <aside>
              <h2
                className="text-[clamp(1.4rem,2vw,1.8rem)] leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] rtl:leading-[1.3] rtl:tracking-normal"
                style={{ fontWeight: 400 }}
              >
                <BilingualText en="More from FLVR." ar="المزيد من فلايفر." />
              </h2>
              <ul className="mt-5 border-t border-[var(--border-default)]">
                {related.map((a) => (
                  <li key={a.slug} className="border-b border-[var(--border-default)]">
                    <Link to={`/insights/${a.slug}`} className="group block py-5">
                      <span className="flex items-start justify-between gap-5">
                        <span
                          className="text-[1.15rem] leading-[1.25] tracking-[-0.02em] text-[var(--text-primary)] rtl:leading-[1.45] rtl:tracking-normal"
                          style={{ fontWeight: 700 }}
                        >
                          <T t={a.title} />
                        </span>
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] transition-colors duration-300 group-hover:border-transparent group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white group-focus-visible:border-transparent group-focus-visible:bg-[image:var(--gradient-brand)] group-focus-visible:text-white">
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45"
                          />
                        </span>
                      </span>
                      {/* The article's cover opens under the title on hover or focus */}
                      <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                        <span className="block overflow-hidden">
                          <span className="mt-4 block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[var(--bg-secondary)]">
                            <img
                              src={a.cover}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>
    </PageWrapper>
  );
}
