// Insights: articles, research, blogs and reports.
//
// !! PLACEHOLDER CONTENT. These five articles are dummy text written only so the page design
// can be reviewed. Titles, dates, read times and bodies are not real publications. Replace them
// before launch. Covers reuse concept imagery (renders).
//
// Block types in `body`: p, h2, quote, list ({ items: [{en, ar}] }). Each text is { en, ar }.

export const categories = [
  { key: "all", label: { en: "All", ar: "الكل" } },
  { key: "article", label: { en: "Articles", ar: "مقالات" }, single: { en: "Article", ar: "مقال" } },
  { key: "research", label: { en: "Research", ar: "أبحاث" }, single: { en: "Research", ar: "بحث" } },
  { key: "blog", label: { en: "Blogs", ar: "مدونات" }, single: { en: "Blog", ar: "مدونة" } },
  { key: "report", label: { en: "Reports", ar: "تقارير" }, single: { en: "Report", ar: "تقرير" } },
];

export const getCategory = (key) => categories.find((c) => c.key === key);

export const articles = [
  {
    slug: "how-a-concept-earns-its-place",
    category: "article",
    date: "2026-09-24",
    readTime: 5,
    cover: "/concepts/cosmic/g2.webp",
    title: {
      en: "How a concept earns its place in the portfolio",
      ar: "كيف يكسب المفهوم مكانه في المحفظة",
    },
    excerpt: {
      en: "Every FLVR concept goes through the same four stages. Here is what each stage is designed to prove, and why the order matters.",
      ar: "يمر كل مفهوم لدى فلايفر بالمراحل الأربع نفسها. إليكم ما صُممت كل مرحلة لإثباته، ولماذا يهم الترتيب.",
    },
    body: [
      {
        type: "p",
        text: {
          en: "FLVR does not start with a brand. It starts with a question: does this concept have a reason to exist in Saudi Arabia's food and beverage market?",
          ar: "لا تبدأ فلايفر بعلامة تجارية، بل بسؤال: هل لهذا المفهوم سبب للوجود في سوق الأغذية والمشروبات السعودي؟",
        },
      },
      { type: "h2", text: { en: "Filter: selection comes first", ar: "التصفية: الاختيار أولاً" } },
      {
        type: "p",
        text: {
          en: "Founder-led concepts are assessed through market research and commercial review before any effort goes into building them.",
          ar: "تُقيَّم المفاهيم التي يقودها مؤسسوها عبر أبحاث السوق والمراجعة التجارية قبل بذل أي جهد في بنائها.",
        },
      },
      { type: "h2", text: { en: "Lift and Validate: build, then test", ar: "الرفع والتحقق: البناء ثم الاختبار" } },
      {
        type: "p",
        text: {
          en: "The brand, menu, pricing and operating model are developed with the founder. A live POP-UP trial then measures customer response and operating economics.",
          ar: "تُطوَّر العلامة والقائمة والتسعير ونموذج التشغيل بالشراكة مع المؤسس. ثم تقيس تجربة POP-UP الحية استجابة العملاء والاقتصاديات التشغيلية.",
        },
      },
      {
        type: "quote",
        text: { en: "Evidence first. Everything else follows.", ar: "الأدلة أولاً. وكل شيء آخر يتبعها." },
      },
      { type: "h2", text: { en: "Run: scale with discipline", ar: "التشغيل: التوسع بانضباط" } },
      {
        type: "p",
        text: {
          en: "Concepts that validate move into launch and growth, supported by operating systems, people and disciplined capital allocation.",
          ar: "تنتقل المفاهيم التي تنجح في التحقق إلى الإطلاق والنمو، بدعم من الأنظمة التشغيلية والكوادر وتخصيص رأس المال بانضباط.",
        },
      },
    ],
  },
  {
    slug: "inside-a-pop-up-trial",
    category: "blog",
    date: "2026-09-10",
    readTime: 4,
    cover: "/concepts/nagu/card.webp",
    title: { en: "Inside a POP-UP trial", ar: "داخل تجربة POP-UP" },
    excerpt: {
      en: "A POP-UP is how FLVR tests an offer in real conditions, before and while investors engage.",
      ar: "POP-UP هو الطريقة التي تختبر بها فلايفر العرض في ظروف حقيقية، قبل انضمام المستثمرين وأثناءه.",
    },
    body: [
      {
        type: "p",
        text: {
          en: "POP-UP by FLVR is our operating studio for concept validation. It is designed for live trials, so a concept is run, not just described.",
          ar: "POP-UP من فلايفر هو استوديو التشغيل لدينا للتحقق من المفاهيم. صُمم للتجارب الحية، فيُشغَّل المفهوم فعلياً ولا يُكتفى بوصفه.",
        },
      },
      { type: "h2", text: { en: "What we measure", ar: "ما الذي نقيسه" } },
      {
        type: "list",
        items: [
          { en: "The offer", ar: "العرض" },
          { en: "Pricing", ar: "التسعير" },
          { en: "Customer response", ar: "استجابة العملاء" },
          { en: "Operating performance", ar: "الأداء التشغيلي" },
        ],
      },
      {
        type: "p",
        text: {
          en: "The results inform the next decision for the concept, whether that is to refine it, continue, or stop.",
          ar: "تُبنى على النتائج القرارات التالية للمفهوم، سواء بتحسينه أو المتابعة أو التوقف.",
        },
      },
      { type: "h2", text: { en: "Why investors care", ar: "لماذا يهتم المستثمرون" } },
      {
        type: "p",
        text: {
          en: "Investors can engage before, during or after a concept's trial, depending on the opportunity. Operating results are reviewed where available.",
          ar: "يمكن للمستثمرين الانضمام قبل تجربة المفهوم أو أثناءها أو بعدها، بحسب الفرصة. وتُراجع النتائج التشغيلية حيثما توفرت.",
        },
      },
    ],
  },
  {
    slug: "familiar-high-frequency-food-categories",
    category: "research",
    date: "2026-08-28",
    readTime: 6,
    cover: "/concepts/amm-abdo/kit-spit.webp",
    title: {
      en: "Why familiar, high-frequency food categories",
      ar: "لماذا فئات الأغذية المألوفة والمتكررة الاستهلاك",
    },
    excerpt: {
      en: "The Fund's thesis favours food people already know and buy often, set apart by brand, culture and experience.",
      ar: "تفضّل فرضية الصندوق الأغذية التي يعرفها الناس ويشترونها كثيراً، وتتميز بالعلامة والثقافة والتجربة.",
    },
    body: [
      {
        type: "p",
        text: {
          en: "Our thesis centres on familiar, high-frequency food categories, differentiated through brand identity, cultural relevance and customer experience.",
          ar: "تقوم فرضيتنا على فئات الأغذية المألوفة والمتكررة الاستهلاك، التي تتميز بهوية العلامة والملاءمة الثقافية وتجربة العملاء.",
        },
      },
      { type: "h2", text: { en: "Familiar and frequent", ar: "مألوفة ومتكررة" } },
      {
        type: "p",
        text: {
          en: "Categories that customers already understand need less explaining, and categories they buy often give a concept more chances to earn repeat visits.",
          ar: "الفئات التي يفهمها العملاء أصلاً تحتاج إلى شرح أقل، والفئات التي يشترونها كثيراً تمنح المفهوم فرصاً أكثر لكسب الزيارات المتكررة.",
        },
      },
      { type: "h2", text: { en: "Set apart by what is felt", ar: "التميّز بما يُحَس" } },
      {
        type: "list",
        items: [
          { en: "Brand identity", ar: "هوية العلامة" },
          { en: "Cultural relevance", ar: "الملاءمة الثقافية" },
          { en: "Customer experience", ar: "تجربة العملاء" },
        ],
      },
      {
        type: "quote",
        text: {
          en: "Market research informs selection. POP-UP tests demand and economics.",
          ar: "تُسهم أبحاث السوق في الاختيار، وتختبر POP-UP الطلب والاقتصاديات.",
        },
      },
      {
        type: "p",
        text: {
          en: "Together, they inform investment and growth decisions.",
          ar: "وتُسهم معاً في قرارات الاستثمار والنمو.",
        },
      },
    ],
  },
  {
    slug: "saudi-food-and-beverage-a-market-view",
    category: "report",
    date: "2026-08-12",
    readTime: 8,
    cover: "/concepts/amm-abdo/atm-street.webp",
    title: {
      en: "Saudi food and beverage: a market view",
      ar: "الأغذية والمشروبات في السعودية: نظرة على السوق",
    },
    excerpt: {
      en: "A placeholder for FLVR's market research: how we read the sector before a concept is selected.",
      ar: "مساحة مخصصة لأبحاث فلايفر عن السوق: كيف نقرأ القطاع قبل اختيار أي مفهوم.",
    },
    body: [
      {
        type: "p",
        text: {
          en: "This is a placeholder for a longer report. It will set out how FLVR reads the Saudi food and beverage sector and what that means for the concepts it builds.",
          ar: "هذا نص تجريبي لتقرير أطول. سيعرض كيف تقرأ فلايفر قطاع الأغذية والمشروبات السعودي وما يعنيه ذلك للمفاهيم التي تبنيها.",
        },
      },
      { type: "h2", text: { en: "Scope", ar: "النطاق" } },
      {
        type: "p",
        text: {
          en: "The report will cover the sector as it relates to Seed and Growth stage food and beverage businesses in Saudi Arabia.",
          ar: "سيغطي التقرير القطاع فيما يتعلق بأعمال الأغذية والمشروبات في مرحلتي التأسيس والنمو في المملكة العربية السعودية.",
        },
      },
      { type: "h2", text: { en: "Approach", ar: "المنهج" } },
      {
        type: "p",
        text: {
          en: "Market research feeds concept selection. Findings are tested in the field through POP-UP trials and reviewed before decisions are made.",
          ar: "تغذّي أبحاث السوق اختيار المفاهيم. وتُختبر النتائج ميدانياً عبر تجارب POP-UP وتُراجع قبل اتخاذ القرارات.",
        },
      },
    ],
  },
  {
    slug: "building-a-concept-with-its-founder",
    category: "article",
    date: "2026-07-30",
    readTime: 5,
    cover: "/concepts/burger-abo-ashra/couple.webp",
    title: {
      en: "Building a concept with its founder",
      ar: "بناء المفهوم مع مؤسسه",
    },
    excerpt: {
      en: "FLVR concepts are founder-led. This is how the Studio works alongside the people behind each brand.",
      ar: "المفاهيم لدى فلايفر يقودها مؤسسوها. هكذا يعمل الاستوديو إلى جانب أصحاب كل علامة.",
    },
    body: [
      {
        type: "p",
        text: {
          en: "Concepts are founder-led. FLVR works alongside founders to develop, validate and support the business.",
          ar: "المفاهيم يقودها مؤسسوها. ويعمل فلايفر إلى جانب المؤسسين لتطوير العمل والتحقق منه ودعمه.",
        },
      },
      { type: "h2", text: { en: "No traction required", ar: "لا يُشترط وجود زخم سابق" } },
      {
        type: "p",
        text: {
          en: "A concept does not need existing traction to be assessed. Market research and validation come first, and traction is one input where it is available.",
          ar: "لا يحتاج المفهوم إلى زخم سابق ليُقيَّم. تأتي أبحاث السوق والتحقق أولاً، ويكون الزخم أحد المدخلات متى توفر.",
        },
      },
      { type: "h2", text: { en: "Capital, brand and operating support", ar: "رأس المال والعلامة والدعم التشغيلي" } },
      {
        type: "p",
        text: {
          en: "The Studio contributes brand development and operating expertise, so the founder can focus on the product and the story.",
          ar: "يسهم الاستوديو بتطوير العلامة والخبرة التشغيلية، ليتفرغ المؤسس للمنتج والحكاية.",
        },
      },
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);

// Locale-aware date, Gregorian in Arabic too
export function formatDate(iso, language) {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatReadTime(minutes, language) {
  return language === "ar" ? `${minutes} دقائق للقراءة` : `${minutes} min read`;
}
