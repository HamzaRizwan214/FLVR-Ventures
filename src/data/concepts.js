// The four FLVR Studio concepts.
//
// Rules (see /understandings/04-concepts-cohort.md):
//  - `stage` and `founder` stay null until the owner provides real values.
//    The UI hides them when null, so nothing like "to be confirmed" is shown.
//  - `visualisation: true` on an image labels it "Brand visualisation"
//    (generated or mockup imagery) so it is never mistaken for a built site.
//
// founder shape: { name: {en, ar}, role: {en, ar}, photo: "/concepts/<slug>/founder.webp" }
// stage shape:   { en, ar }

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
    theme: { bg: "#0e0e0e", fg: "#f4efe9", accent: "#a22d2b" },
    logo: "/concepts/nagu/logo.webp",
    card: { src: "/concepts/nagu/card.webp", visualisation: true },
    gallery: [
      { src: "/concepts/nagu/g1.webp", alt: "NAGU double smash burger", visualisation: true },
      { src: "/concepts/nagu/g2.webp", alt: "NAGU menu spread", visualisation: true },
      { src: "/concepts/nagu/g3.webp", alt: "NAGU collectible character card", visualisation: true },
      { src: "/concepts/nagu/g4.webp", alt: "NAGU city skyline artwork", visualisation: true },
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
    theme: { bg: "#0b0b0c", fg: "#f0ece6", accent: "#a8f03c" },
    logo: "/concepts/cosmic/logo.webp",
    card: { src: "/concepts/cosmic/card.webp", visualisation: true },
    gallery: [
      { src: "/concepts/cosmic/g1.webp", alt: "COSMIC pizza box", visualisation: true },
      { src: "/concepts/cosmic/g2.webp", alt: "COSMIC interior", visualisation: true },
      { src: "/concepts/cosmic/g3.webp", alt: "COSMIC key visual", visualisation: true },
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
    theme: { bg: "#0f1812", fg: "#f4f1ea", accent: "#3cb068" },
    logo: "/concepts/amm-abdo/logo.webp",
    card: { src: "/concepts/amm-abdo/card.webp", visualisation: true },
    gallery: [
      { src: "/concepts/amm-abdo/g1.webp", alt: "AMM ABDO wordmark", visualisation: false },
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
    theme: { bg: "#292929", fg: "#f0d2b5", accent: "#f1873b" },
    logo: "/concepts/burger-abo-ashra/logo.webp",
    card: { src: "/concepts/burger-abo-ashra/card.webp", visualisation: false },
    gallery: [
      { src: "/concepts/burger-abo-ashra/logo-10.webp", alt: "Burger 10 logo", visualisation: false },
    ],
  },
];

export const getConcept = (slug) => concepts.find((c) => c.slug === slug);
