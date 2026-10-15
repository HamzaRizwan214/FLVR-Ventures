// The four FLVR Studio concepts.
//
// Rules (see /understandings/04-concepts-cohort.md):
//  - `stage` and `founder` stay null until the owner provides real values.
//    The UI hides them when null, so nothing like "to be confirmed" is shown.
//  - `visualisation: true` on an image shows a small "Brand visualisation" caption in the
//    modal (generated or mockup imagery), so it is never mistaken for a built site.
//  - `website` is the concept's own site. Only NAGU has one live; the others are in
//    development, so their button is shown disabled.
//
// founder shape: { name: {en, ar}, role: {en, ar}, photo: "/concepts/<slug>/founder.webp" }
// stage shape:   { en, ar }

const img = (slug, file, alt) => ({
  src: `/concepts/${slug}/${file}.webp`,
  alt,
  visualisation: true,
});

export const concepts = [
  {
    slug: "nagu",
    name: "NAGU",
    nameAr: "NAGU",
    tagline: { en: "Asian smashed burgers", ar: "برجر سماش بنكهة آسيوية" },
    description: {
      en: "Asian-influenced smashed burgers with an anime-urban brand world.",
      ar: "برجر سماش بتأثير آسيوي وعالم علامة تجارية مستوحى من الأنمي والمدينة.",
    },
    stage: null,
    founder: null,
    website: { url: "https://naguburgers.com/", domain: "naguburgers.com" },
    theme: { bg: "#0e0e0e", fg: "#f4efe9", accent: "#a22d2b" },
    logo: "/concepts/nagu/logo.webp",
    card: { src: "/concepts/nagu/card.webp", visualisation: true },
    gallery: [
      img("nagu", "card", "NAGU storefront"),
      img("nagu", "g1", "NAGU double smash burger"),
      img("nagu", "full-menu", "NAGU menu spread"),
      img("nagu", "loaded-kimchi-fries", "NAGU loaded kimchi fries"),
    ],
  },
  {
    slug: "cosmic",
    name: "COSMIC",
    nameAr: "كوزمك",
    tagline: { en: "Pizza from outer space", ar: "بيتزا من الفضاء" },
    description: {
      en: "A late-night pizza concept for Jeddah. Dark, quiet, a short menu and serious pizza.",
      ar: "مفهوم بيتزا لما بعد منتصف الليل في جدة. أجواء داكنة وهادئة، وقائمة قصيرة، وبيتزا بجدية.",
    },
    stage: null,
    founder: null,
    website: null,
    theme: { bg: "#0b0b0c", fg: "#f0ece6", accent: "#a8f03c" },
    logo: "/concepts/cosmic/logo.webp",
    card: { src: "/concepts/cosmic/card.webp", visualisation: true },
    gallery: [
      img("cosmic", "card", "COSMIC storefront"),
      img("cosmic", "g2", "COSMIC interior"),
      img("cosmic", "g1", "COSMIC pizza box"),
      img("cosmic", "m04-bag-cup-textured", "COSMIC bag and cup"),
    ],
  },
  {
    slug: "amm-abdo",
    name: "AMM ABDO",
    nameAr: "عم عبدو",
    tagline: { en: "Shawarma and kabab", ar: "شاورما وكباب" },
    description: {
      en: "Rooted in heritage. Driven by street attitude.",
      ar: "متجذّر في التراث، بروح الشارع.",
    },
    stage: null,
    founder: null,
    website: null,
    theme: { bg: "#0f1812", fg: "#f4f1ea", accent: "#3cb068" },
    logo: "/concepts/amm-abdo/logo.webp",
    card: { src: "/concepts/amm-abdo/card.webp", visualisation: true },
    gallery: [
      img("amm-abdo", "card", "AMM ABDO restaurant exterior"),
      img("amm-abdo", "hold", "AMM ABDO shawarma"),
      img("amm-abdo", "server", "AMM ABDO counter service"),
      img("amm-abdo", "kit-spit", "AMM ABDO shawarma spit"),
    ],
  },
  {
    slug: "burger-abo-ashra",
    name: "BURGER ABO ASHRA",
    nameAr: "برجر أبو عشرة",
    tagline: { en: "Burgers without falsafa", ar: "برجر بدون فلسفة" },
    description: {
      en: "A Saudi smart-value burger brand. Good meat, soft bun, fresh toppings, great sauce and a clear price.",
      ar: "علامة برجر سعودية ذكية القيمة: لحم مضبوط، خبزة طرية، إضافات فرش، صوص يفرق، وسعر واضح.",
    },
    stage: null,
    founder: null,
    website: null,
    theme: { bg: "#292929", fg: "#f0d2b5", accent: "#f1873b" },
    logo: "/concepts/burger-abo-ashra/logo-main.webp",
    card: { src: "/concepts/burger-abo-ashra/group.webp", visualisation: true },
    gallery: [
      img("burger-abo-ashra", "burger", "Burger Abo Ashra double cheeseburger"),
      img("burger-abo-ashra", "hands", "Burger Abo Ashra burger in hand"),
      img("burger-abo-ashra", "couple", "Burger Abo Ashra guests"),
      img("burger-abo-ashra", "group", "Burger Abo Ashra friends at the table"),
    ],
  },
];

export const getConcept = (slug) => concepts.find((c) => c.slug === slug);
