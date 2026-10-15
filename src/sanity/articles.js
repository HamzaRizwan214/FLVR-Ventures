import { client } from "./client";
import { categories, articles as placeholders, getArticle as getPlaceholder } from "@/data/insights";

// Insights content comes from Sanity (document type `article`). Until the first article is
// published there, the page shows the placeholder articles in data/insights.js.

const META = `
  "slug": slug.current,
  category,
  "date": publishedAt,
  readTime,
  title,
  excerpt,
  "cover": cover.asset->url
`;

const LIST_QUERY = `*[_type == "article" && defined(slug.current) && defined(title.en)] | order(publishedAt desc){${META}}`;
// Body images carry their URL and size so the page can reserve space before they load.
const BODY = (field) =>
  `${field}[]{..., _type == "image" => {"url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}}`;
const DETAIL_QUERY = `*[_type == "article" && slug.current == $slug][0]{${META}, "bodyEn": ${BODY("bodyEn")}, "bodyAr": ${BODY("bodyAr")}}`;

const FALLBACK_COVER = "/concepts/cosmic/g2.webp";
const validCategory = (key) => (categories.some((c) => c.key === key && c.key !== "all") ? key : "article");

// Arabic is optional in the Studio: fall back to English wherever it is empty.
const pair = (v) => ({ en: v?.en ?? "", ar: v?.ar || v?.en || "" });

function toArticle(doc) {
  return {
    slug: doc.slug,
    category: validCategory(doc.category),
    date: doc.date,
    readTime: doc.readTime ?? 5,
    cover: doc.cover ? `${doc.cover}?w=1600&auto=format&q=80` : FALLBACK_COVER,
    title: pair(doc.title),
    excerpt: pair(doc.excerpt),
  };
}

let listPromise;
export function loadArticles() {
  listPromise ??= client
    .fetch(LIST_QUERY)
    .then((rows) =>
      rows.length
        ? { source: "sanity", articles: rows.map(toArticle) }
        : { source: "placeholder", articles: placeholders },
    )
    .catch((error) => {
      listPromise = undefined; // allow a retry on the next visit
      throw error;
    });
  return listPromise;
}

const detailCache = new Map();
export async function loadArticle(slug) {
  const list = await loadArticles();
  if (list.source === "placeholder") return getPlaceholder(slug) ?? null;

  if (!detailCache.has(slug)) {
    detailCache.set(
      slug,
      client
        .fetch(DETAIL_QUERY, { slug })
        .then((doc) =>
          doc
            ? {
                ...toArticle(doc),
                // Portable Text per language; English where the Arabic body is empty
                portableText: { en: doc.bodyEn ?? [], ar: doc.bodyAr?.length ? doc.bodyAr : (doc.bodyEn ?? []) },
              }
            : null,
        )
        .catch((error) => {
          detailCache.delete(slug);
          throw error;
        }),
    );
  }
  return detailCache.get(slug);
}
