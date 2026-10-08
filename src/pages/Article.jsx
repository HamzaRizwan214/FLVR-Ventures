import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import ArticleAccordion from "@/components/ArticleAccordion";
import CtaLink from "@/components/CtaLink";
import SectionHeading from "@/components/SectionHeading";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { useLanguage } from "@/contexts/LanguageContext";
import { articles, getArticle, getCategory, formatDate, formatReadTime } from "@/data/insights";

const ease = [0.22, 1, 0.36, 1];

// One block of an article body
function Block({ block, id }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={id}
          className="mb-5 mt-14 scroll-mt-28 text-[clamp(1.5rem,2.3vw,2.1rem)] font-light leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          <T t={block.text} />
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-s-2 border-[var(--accent)] ps-7 text-[clamp(1.4rem,2.3vw,2rem)] font-light leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)]">
          <T t={block.text} />
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-7 space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-4 text-[17px] text-[var(--text-primary)]">
              <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-[var(--accent)]" />
              <T t={item} />
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="mb-6 text-[17px] leading-[1.9] text-[var(--text-secondary)]">
          <T t={block.text} />
        </p>
      );
  }
}

// Article page, split layout: on wide screens a sticky portrait card (title, meta and a
// modest cover) stays in view on one side while the text scrolls on the other.
export default function Article() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const article = getArticle(slug);

  if (!article) return <Navigate to="/insights" replace />;

  const category = getCategory(article.category);
  const headings = article.body
    .map((b, i) => ({ b, id: `s${i}` }))
    .filter(({ b }) => b.type === "h2");
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 gap-2 sm:gap-3 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:items-start">
        {/* Sticky header card */}
        <header className="relative flex flex-col overflow-hidden rounded-[28px] bg-[var(--block-dark)] xl:sticky xl:top-[5.5rem] xl:h-[calc(100dvh-6.75rem)] xl:min-h-[38rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(to right, rgba(214,173,132,0.16) 0%, rgba(214,173,132,0.05) 16%, transparent 36%)",
                "linear-gradient(to left, rgba(172,30,64,0.34) 0%, rgba(214,92,40,0.12) 18%, transparent 46%)",
              ].join(", "),
            }}
          />

          <div className="relative flex flex-1 flex-col p-6 sm:p-10 xl:min-h-0 xl:p-10">
            <Link
              to="/insights"
              className="group inline-flex w-fit items-center gap-2.5 text-[12px] uppercase tracking-[0.16em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1"
              />
              <BilingualText en="All insights" ar="كل الرؤى" />
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3 xl:mt-12">
              <span className="pill bg-white/10 text-[var(--text-primary)]">
                <T t={category.single} />
              </span>
              <span className="eyebrow !text-[10px]">
                {formatDate(article.date, language)}
                <span className="mx-2.5 text-[var(--border-strong)]">/</span>
                {formatReadTime(article.readTime, language)}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="mt-6 text-balance text-[clamp(1.9rem,3.2vw,3.1rem)] font-light leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]"
            >
              <T t={article.title} />
            </motion.h1>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              <T t={article.excerpt} />
            </p>
            <p className="mt-6 text-[12px] text-[var(--text-muted)]">
              <BilingualText en="By FLVR Ventures" ar="بقلم فلايفر فينتشرز" />
            </p>

            {/* Modest cover: fills the leftover height beside the text on wide screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease }}
              className="mt-8 overflow-hidden rounded-[20px] border border-[var(--border-default)] xl:mt-8 xl:min-h-[11rem] xl:flex-1"
            >
              <img
                src={article.cover}
                alt=""
                fetchPriority="high"
                className="aspect-[16/10] w-full object-cover brightness-[0.92] xl:aspect-auto xl:h-full"
              />
            </motion.div>
          </div>
        </header>

        {/* Text */}
        <section className="panel px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          {headings.length > 1 && (
            <nav aria-label="In this article" className="mb-12 border-b border-[var(--border-default)] pb-8">
              <p className="eyebrow mb-4 !text-[10px]">
                <BilingualText en="In this article" ar="في هذا المقال" />
              </p>
              <ul className="flex flex-wrap gap-2">
                {headings.map(({ b, id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="inline-block rounded-full border border-[var(--border-default)] px-4 py-2 text-[12px] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      <T t={b.text} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <article className="max-w-[40rem]">
            {article.body.map((block, i) => (
              <Block key={i} block={block} id={`s${i}`} />
            ))}
          </article>
        </section>
      </div>

      {/* Related */}
      <section className="panel px-6 py-20 lg:px-12 lg:py-24">
        <SectionHeading
          eyebrow={<BilingualText en="Keep reading" ar="تابع القراءة" />}
          title={<BilingualText en="More from FLVR." ar="المزيد من فلايفر." />}
        />
        <ArticleAccordion articles={related} />
        <div className="mt-12">
          <CtaLink to="/insights" variant="outline">
            <BilingualText en="All insights" ar="كل الرؤى" />
          </CtaLink>
        </div>
      </section>
    </PageWrapper>
  );
}
