// Site-wide copy. Every string is { en, ar } and every fact here traces back to
// /understandings (owner statements and flvr.pdf). Do not add numbers, names or
// claims that are not in those files.
//
// Voice: plain, declarative, venture-style. Describe what FLVR does and what the
// evidence is. No slogans, no promises about outcomes, no exit or return language.

export const hero = {
  badge: { en: "Pronounced: flavor", ar: "النطق: فلايفر" },
  lead: {
    en: "We build restaurant concepts with founders, test them in live trials, and invest alongside partners. FLVR also plans a fund for food and beverage at Seed and Growth stage.",
    ar: "نبني مفاهيم المطاعم مع المؤسسين، ونختبرها في تجارب حية، ونستثمر إلى جانب الشركاء. وتخطط فلايفر كذلك لإطلاق صندوق للأغذية والمشروبات في مرحلتي التأسيس والنمو.",
  },
  ctaPrimary: { en: "Speak with the team", ar: "تحدث مع الفريق" },
  ctaSecondary: { en: "View the portfolio", ar: "استعرض المحفظة" },
};

// The Studio method: Filter → Lift → Validate → Run
export const steps = [
  {
    key: "filter",
    title: { en: "Filter", ar: "تصفية" },
    descriptor: { en: "Selection", ar: "الاختيار" },
    desc: {
      en: "We assess founder-led concepts through market research and commercial review.",
      ar: "نقيّم المفاهيم التي يقودها مؤسسوها عبر أبحاث السوق والمراجعة التجارية.",
    },
    image: "/concept.jpg",
  },
  {
    key: "lift",
    title: { en: "Lift", ar: "رفع" },
    descriptor: { en: "Build", ar: "البناء" },
    desc: {
      en: "We develop the brand, menu, pricing and operating model with the founder.",
      ar: "نطوّر العلامة والقائمة والتسعير ونموذج التشغيل بالشراكة مع المؤسس.",
    },
    image: "/busy.jpg",
  },
  {
    key: "validate",
    title: { en: "Validate", ar: "تحقق" },
    descriptor: { en: "Evidence", ar: "الإثبات" },
    desc: {
      en: "We run a live POP-UP trial to measure customer response and operating economics. The results inform the next decision.",
      ar: "نشغّل تجربة POP-UP حية لقياس استجابة العملاء والاقتصاديات التشغيلية، وتُبنى عليها القرارات التالية.",
    },
    image: "/prove.jpg",
  },
  {
    key: "run",
    title: { en: "Run", ar: "تشغيل" },
    descriptor: { en: "Scale", ar: "التوسع" },
    desc: {
      en: "We support launch and growth through operating systems, people and disciplined capital allocation.",
      ar: "ندعم الإطلاق والنمو عبر الأنظمة التشغيلية والكوادر وتخصيص رأس المال بانضباط.",
    },
    image: "/grow.jpg",
  },
];

export const popup = {
  name: { en: "POP-UP by FLVR", ar: "POP-UP من فلايفر" },
  body: {
    en: "POP-UP is FLVR's operating studio for concept validation. Concepts are run in live trials so the offer, pricing, customer response and operating performance can be measured.",
    ar: "POP-UP هو استوديو التشغيل لدى فلايفر للتحقق من المفاهيم. تُدار المفاهيم في تجارب حية لقياس العرض والتسعير واستجابة العملاء والأداء التشغيلي.",
  },
};

// How FLVR is organised: three parts, not a sequence.
export const model = {
  eyebrow: { en: "Structure", ar: "الهيكل" },
  title: { en: "How FLVR is organised.", ar: "كيف تنتظم فلايفر." },
  parts: [
    {
      title: { en: "Studio", ar: "الاستوديو" },
      text: {
        en: "Builds and validates restaurant concepts with founders.",
        ar: "يبني مفاهيم المطاعم ويختبرها بالشراكة مع المؤسسين.",
      },
    },
    {
      title: { en: "Co-investment", ar: "الاستثمار المشترك" },
      text: {
        en: "Partners hold a percentage of a concept's equity alongside the Studio.",
        ar: "يمتلك الشركاء نسبة من ملكية المفهوم إلى جانب الاستوديو.",
      },
    },
    {
      title: { en: "Fund", ar: "الصندوق" },
      text: {
        en: "A planned vehicle for food and beverage businesses and technology at Seed and Growth stage.",
        ar: "أداة استثمارية مخطط لها لأعمال الأغذية والمشروبات والتقنية في مرحلتي التأسيس والنمو.",
      },
    },
  ],
};

// How an investor works with FLVR (How It Works page)
export const participation = {
  eyebrow: { en: "Investors", ar: "المستثمرون" },
  title: { en: "Working with investors.", ar: "العمل مع المستثمرين." },
  items: [
    {
      label: { en: "Review", ar: "الاطلاع" },
      text: {
        en: "Investors can review relevant research, concept plans and operating results, where available.",
        ar: "يمكن للمستثمرين الاطلاع على الأبحاث وخطط المفاهيم والنتائج التشغيلية ذات الصلة، حيثما توفرت.",
      },
    },
    {
      label: { en: "Engage", ar: "التعاون" },
      text: {
        en: "Engagement can begin before, during or after a concept's POP-UP trial, depending on the opportunity.",
        ar: "يمكن أن يبدأ التعاون قبل تجربة POP-UP للمفهوم أو أثناءها أو بعدها، بحسب الفرصة.",
      },
    },
    {
      label: { en: "Co-invest", ar: "الاستثمار المشترك" },
      text: {
        en: "Investors acquire a percentage of equity in a concept, alongside the Studio.",
        ar: "يستحوذ المستثمرون على نسبة من ملكية المفهوم إلى جانب الاستوديو.",
      },
    },
  ],
};

export const fund = {
  intro: {
    en: "A planned investment vehicle targeting SAR 100M, focused on food and beverage businesses and technology serving the sector.",
    ar: "أداة استثمارية مخطط لها تستهدف ١٠٠ مليون ريال، وتركّز على أعمال الأغذية والمشروبات والتقنية الخادمة للقطاع.",
  },
  approach: {
    en: "Its approach combines capital with hands-on operating capability.",
    ar: "ويجمع نهجها الاستثماري بين رأس المال والقدرة التشغيلية المباشرة.",
  },
  terms: [
    {
      label: { en: "Sector", ar: "القطاع" },
      value: { en: "F&B businesses and tech", ar: "أعمال الأغذية والمشروبات والتقنية" },
    },
    {
      label: { en: "Geography", ar: "الجغرافيا" },
      value: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
    },
    {
      label: { en: "Stage", ar: "المرحلة" },
      value: { en: "Seed & Growth", ar: "التأسيس والنمو" },
    },
    {
      label: { en: "Ticket size", ar: "حجم الاستثمار" },
      value: { en: "SAR 1–5M", ar: "١–٥ مليون ريال" },
    },
    {
      label: { en: "Ownership", ar: "الملكية" },
      value: {
        en: "Minority or majority, set by evaluating each opportunity",
        ar: "أقلية أو أغلبية، بحسب تقييم كل فرصة",
      },
    },
    {
      label: { en: "Target fund size", ar: "حجم الصندوق المستهدف" },
      value: { en: "SAR 100M", ar: "١٠٠ مليون ريال" },
    },
  ],
  status: {
    en: "The Fund is a planned investment vehicle. Contact the team for available information.",
    ar: "الصندوق أداة استثمارية مخطط لها. تواصل مع الفريق للحصول على المعلومات المتاحة.",
  },
  focus: {
    title: { en: "Investment focus", ar: "التركيز الاستثماري" },
    text: {
      en: "The Fund targets food and beverage businesses and sector technology at Seed and Growth stage, with ticket sizes of SAR 1–5M. Ownership is set by evaluating each opportunity.",
      ar: "يستهدف الصندوق أعمال الأغذية والمشروبات وتقنيات القطاع في مرحلتي التأسيس والنمو، بحجم استثمار يتراوح بين ١ و٥ ملايين ريال، وتُحدَّد الملكية بتقييم كل فرصة.",
    },
  },
  faqs: [
    {
      q: { en: "When can investors engage?", ar: "متى يمكن للمستثمرين الانضمام؟" },
      a: {
        en: "Before, during or after a concept's POP-UP trial, depending on the opportunity.",
        ar: "قبل تجربة POP-UP للمفهوم أو أثناءها أو بعدها، بحسب الفرصة.",
      },
    },
    {
      q: { en: "What is the current fund status?", ar: "ما هي الحالة الحالية للصندوق؟" },
      a: {
        en: "The Fund is a planned investment vehicle targeting SAR 100M. Contact the team for available information.",
        ar: "الصندوق أداة استثمارية مخطط لها تستهدف ١٠٠ مليون ريال. تواصل مع الفريق للحصول على المعلومات المتاحة.",
      },
    },
    {
      q: { en: "What can an investor review?", ar: "ماذا يمكن للمستثمر الاطلاع عليه؟" },
      a: {
        en: "Relevant research, concept plans and operating results where available.",
        ar: "الأبحاث وخطط المفاهيم والنتائج التشغيلية ذات الصلة، حيثما توفرت.",
      },
    },
  ],
};

export const about = {
  title: {
    en: "A venture studio and planned fund for Saudi food and beverage.",
    ar: "استوديو مشاريع وصندوق مخطط له لقطاع الأغذية والمشروبات السعودي.",
  },
  lead: {
    en: "FLVR Ventures is Saudi Arabia's first venture builder and investment platform focused exclusively on food and beverage. We back founder-led concepts with capital, brand development and operating expertise.",
    ar: "فلايفر فينتشرز هي أول منصة سعودية لبناء المشاريع والاستثمار متخصصة حصراً في الأغذية والمشروبات. ندعم المفاهيم التي يقودها مؤسسوها برأس المال وتطوير العلامة والخبرة التشغيلية.",
  },
  vision: {
    label: { en: "Vision", ar: "الرؤية" },
    text: {
      en: "To build, nurture and scale Saudi food and beverage brands.",
      ar: "بناء ورعاية وتوسيع علامات الأغذية والمشروبات السعودية.",
    },
  },
  mission: {
    label: { en: "Mission", ar: "المهمة" },
    text: {
      en: "To develop promising food and beverage concepts into scalable, durable businesses through brand development, financial discipline, operational excellence and disciplined growth.",
      ar: "تطوير مفاهيم الأغذية والمشروبات الواعدة إلى أعمال قابلة للتوسع ومستدامة عبر تطوير العلامة والانضباط المالي والتميز التشغيلي والنمو المنضبط.",
    },
  },
};

export const contact = {
  eyebrow: { en: "Contact", ar: "التواصل" },
  title: { en: "Speak with the team", ar: "تحدث مع الفريق" },
  lead: {
    en: "Tell us what you would like to discuss: a concept, the Fund, or a partnership.",
    ar: "أخبرنا بما تود مناقشته: مفهوم، أو الصندوق، أو شراكة.",
  },
  interests: [
    { value: "invest", label: { en: "Co-invest in a concept", ar: "الاستثمار المشترك في مفهوم" } },
    { value: "fund", label: { en: "Fund overview", ar: "نظرة عامة على الصندوق" } },
    { value: "partner", label: { en: "Partnership", ar: "شراكة" } },
    { value: "own", label: { en: "Bring a concept", ar: "لدي مفهوم خاص" } },
  ],
};

export const disclaimer = {
  en: "For information only. This is not an offer or solicitation. The FLVR Fund is a planned vehicle.",
  ar: "للمعلومات فقط. هذا ليس عرضاً أو دعوة للاستثمار. صندوق فلايفر أداة مخطط لها.",
};
