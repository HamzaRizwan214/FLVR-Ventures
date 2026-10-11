import { PortableText } from "@portabletext/react";
import T from "./T";

function ListItem({ children }) {
  return (
    <li className="flex items-baseline gap-4 text-[17px] text-[var(--text-primary)]">
      <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-[var(--accent)]" />
      <span>{children}</span>
    </li>
  );
}

// Sanity rich text, styled to match the article page.
const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[17px] leading-[1.9] text-[var(--text-secondary)]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-14 scroll-mt-28 text-[clamp(1.5rem,2.3vw,2.1rem)] font-light leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)]">
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-12 border-s-2 border-[var(--accent)] ps-7 text-[clamp(1.4rem,2.3vw,2rem)] font-light leading-[1.3] tracking-[-0.015em] text-[var(--text-primary)]">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-10">
          <img
            src={`${value.url}?w=1400&auto=format&q=80`}
            alt={value.alt || ""}
            width={value.width}
            height={value.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-[18px] border border-[var(--border-default)]"
          />
          {value.caption && (
            <figcaption className="mt-3 text-[13px] leading-[1.6] text-[var(--text-muted)]">{value.caption}</figcaption>
          )}
        </figure>
      ) : null,
  },
  list: {
    bullet: ({ children }) => <ul className="my-7 space-y-3.5">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <ListItem>{children}</ListItem>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-[var(--text-primary)]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-[var(--accent)] underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
};

// One block of a placeholder article (data/insights.js)
function LegacyBlock({ block }) {
  switch (block.type) {
    case "h2":
      return components.block.h2({ children: <T t={block.text} /> });
    case "quote":
      return components.block.blockquote({ children: <T t={block.text} /> });
    case "list":
      return (
        <ul className="my-7 space-y-3.5">
          {block.items.map((item, i) => (
            <ListItem key={i}>
              <T t={item} />
            </ListItem>
          ))}
        </ul>
      );
    default:
      return components.block.normal({ children: <T t={block.text} /> });
  }
}

export default function ArticleBody({ article, language }) {
  if (article.portableText) {
    return <PortableText value={article.portableText[language] ?? article.portableText.en} components={components} />;
  }
  return article.body.map((block, i) => <LegacyBlock key={i} block={block} />);
}
