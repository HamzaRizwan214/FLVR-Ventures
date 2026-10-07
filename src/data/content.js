// Site-wide copy. Every string is { en, ar } and every fact here traces back to
// /understandings (owner statements and flvr.pdf). Do not add numbers, names or
// claims that are not in those files.

export const hero = {
  badge: { en: "Pronounced: flavor", ar: "النطق: فلايفر" },
  lead: {
    en: "FLVR's Studio builds and validates restaurant concepts. Investors own a share of the equity. The FLVR Fund is the intended route to exit.",
    ar: "يبني استوديو فلايفر المفاهيم ويختبرها. يمتلك المستثمرون حصة من ملكيتها، ويمثل صندوق فلايفر مسار الخروج المتوقع.",
  },
  ctaPrimary: { en: "Discuss an investment", ar: "ناقش فرصة استثمارية" },
  ctaSecondary: { en: "Explore the concepts", ar: "استكشف المفاهيم" },
};

// The playbook: Filter → Lift → Validate → Run
export const steps = [
  {
    key: "filter",
    title: { en: "Filter", ar: "تصفية" },
    desc: {
      en: "Select founder-led concepts through market research and commercial assessment.",
      ar: "اختيار المفاهيم التي يقودها مؤسسوها عبر أبحاث السوق والتقييم التجاري.",
    },
    image: "/concept.jpg",
  },
  {
    key: "lift",
    title: { en: "Lift", ar: "رفع" },
    desc: {
      en: "Strengthen the brand, menu, pricing and operating model with the founder.",
      ar: "تعزيز العلامة والقائمة والتسعير ونموذج التشغيل بالشراكة مع المؤسس.",
    },
    image: "/busy.jpg",
  },
  {
    key: "validate",
    title: { en: "Validate", ar: "تحقق" },
    desc: {
      en: "Use POP-UP to test customer response and operating economics, and guide the next decision.",
      ar: "استخدام POP-UP لاختبار استجابة العملاء والاقتصاديات التشغيلية وتوجيه القرار التالي.",
    },
    image: "/prove.jpg",
  },
  {
    key: "run",
    title: { en: "Run", ar: "تشغيل" },
    desc: {
      en: "Support launch and growth through operating systems, people and disciplined capital allocation.",
      ar: "دعم الإطلاق والنمو عبر الأنظمة التشغيلية والكوادر وتخصيص رأس المال بانضباط.",
    },
    image: "/grow.jpg",
  },
];

export const popup = {
  name: { en: "POP-UP by FLVR", ar: "POP-UP من فلايفر" },
  tagline: {
    en: "Concept validation in the real world.",
    ar: "التحقق من المفهوم في الواقع.",
  },
  body: {
    en: "Our operating studio for concept validation. Designed for live trials, it lets FLVR run founder-led concepts and test the offer, pricing, customer response and operating performance.",
    ar: "استوديو التشغيل لدينا للتحقق من المفاهيم. صُمم للتجارب الحية، ويتيح لفلايفر تشغيل المفاهيم التي يقودها مؤسسوها واختبار العرض والتسعير واستجابة العملاء والأداء التشغيلي.",
  },
};

// Studio → Investor → Fund
export const loop = [
  {
    label: { en: "Build", ar: "البناء" },
    title: { en: "The Studio", ar: "الاستوديو" },
    text: {
      en: "Builds and validates the concept.",
      ar: "يبني المفهوم ويختبره.",
    },
  },
  {
    label: { en: "Own", ar: "الملكية" },
    title: { en: "The Investor", ar: "المستثمر" },
    text: {
      en: "Buys a percentage of the concept's equity.",
      ar: "يشتري نسبة من ملكية المفهوم.",
    },
  },
  {
    label: { en: "Exit", ar: "الخروج" },
    title: { en: "The Fund", ar: "الصندوق" },
    text: {
      en: "The intended route to exit, subject to evaluation.",
      ar: "مسار الخروج المتوقع، وفق التقييم.",
    },
  },
];

// How an investor moves through a concept (How It Works page)
export const investorPath = [
  {
    label: { en: "Enter", ar: "الدخول" },
    text: {
      en: "Investors can engage before, during or after a concept's POP-UP trial, depending on the opportunity, by buying a percentage of its equity.",
      ar: "يمكن للمستثمرين الانضمام قبل تجربة POP-UP أو أثناءها أو بعدها، بحسب الفرصة، عبر شراء نسبة من ملكية المفهوم.",
    },
  },
  {
    label: { en: "Grow", ar: "النمو" },
    text: {
      en: "FLVR keeps working alongside the founder to support launch and growth.",
      ar: "يواصل فلايفر العمل إلى جانب المؤسس لدعم الإطلاق والنمو.",
    },
  },
  {
    label: { en: "Exit", ar: "الخروج" },
    text: {
      en: "The FLVR Fund is the intended route to exit. Whether and how it buys a stake is subject to evaluation of the concept.",
      ar: "صندوق فلايفر هو مسار الخروج المتوقع. وتخضع إمكانية استحواذه على الحصة وآلية ذلك لتقييم المفهوم.",
    },
  },
];

export const fund = {
  intro: {
    en: "A planned investment vehicle targeting SAR 100M, focused on F&B businesses and technology serving the sector.",
    ar: "أداة استثمارية مخطط لها تستهدف ١٠٠ مليون ريال، وتركّز على أعمال الأغذية والمشروبات والتقنية الخادمة للقطاع.",
  },
  approach: {
    en: "Its investment approach combines capital with hands-on operating capability.",
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
        en: "Minority or majority, set by evaluating the concept",
        ar: "أقلية أو أغلبية، بحسب تقييم المفهوم",
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
  role: {
    title: { en: "The route to exit", ar: "مسار الخروج" },
    text: {
      en: "When a Studio concept grows, the Fund can acquire an investor's stake, as a minority or majority holder, subject to evaluation of the concept.",
      ar: "عندما ينمو أحد مفاهيم الاستوديو، يمكن للصندوق الاستحواذ على حصة المستثمر، كأقلية أو أغلبية، وفق تقييم المفهوم.",
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
  tagline: { en: "Operator thinking. Investor clarity.", ar: "فكر المشغّل. وضوح المستثمر." },
  lead: {
    en: "FLVR Ventures is KSA's first F&B-exclusive venture builder and investment platform, backing founder-led concepts with capital, brand development and operating expertise.",
    ar: "فلايفر فينتشرز هي أول منصة سعودية لبناء المشاريع والاستثمار متخصصة حصراً في الأغذية والمشروبات، وتدعم المفاهيم التي يقودها مؤسسوها برأس المال وتطوير العلامة والخبرة التشغيلية.",
  },
  arms: [
    {
      title: { en: "The Studio", ar: "الاستوديو" },
      text: {
        en: "Builds restaurant concepts and runs them through the playbook: Filter, Lift, Validate, Run. Each concept is founder-led, with FLVR working alongside.",
        ar: "يبني مفاهيم المطاعم ويمررها عبر المنهجية: تصفية، رفع، تحقق، تشغيل. كل مفهوم يقوده مؤسسه بينما يعمل فلايفر إلى جانبه.",
      },
    },
    {
      title: { en: "The Fund", ar: "الصندوق" },
      text: {
        en: "A planned investment vehicle for F&B businesses and technology serving the sector, and the intended route to exit for investors in Studio concepts.",
        ar: "أداة استثمارية مخطط لها لأعمال الأغذية والمشروبات والتقنية الخادمة للقطاع، وهي مسار الخروج المتوقع للمستثمرين في مفاهيم الاستوديو.",
      },
    },
  ],
  vision: {
    label: { en: "Vision", ar: "الرؤية" },
    text: {
      en: "To build, nurture, and scale the next generation of iconic Saudi F&B brands.",
      ar: "بناء ورعاية وتوسيع الجيل القادم من العلامات السعودية الأيقونية في قطاع الأغذية والمشروبات.",
    },
  },
  mission: {
    label: { en: "Mission", ar: "المهمة" },
    text: {
      en: "To turn promising F&B concepts into scalable, enduring brands through brand optimization, financial discipline, operational excellence, brand outreach, and strategic growth levers.",
      ar: "تحويل مفاهيم الأغذية والمشروبات الواعدة إلى علامات قابلة للتوسع ومستدامة عبر تحسين العلامة والانضباط المالي والتميز التشغيلي والانتشار والرافعات الاستراتيجية للنمو.",
    },
  },
};

export const contact = {
  title: { en: "Discuss an investment", ar: "ناقش فرصة استثمارية" },
  lead: {
    en: "Tell us what you would like to discuss: a concept, the Fund, or a partnership with FLVR.",
    ar: "أخبرنا بما تود مناقشته: مفهوم، أو الصندوق، أو شراكة مع فلايفر.",
  },
  interests: [
    { value: "invest", label: { en: "Invest in a concept", ar: "الاستثمار في مفهوم" } },
    { value: "fund", label: { en: "Fund overview", ar: "نظرة عامة على الصندوق" } },
    { value: "partner", label: { en: "Partnership", ar: "شراكة" } },
    { value: "own", label: { en: "Bring a concept", ar: "لدي مفهوم خاص" } },
  ],
};

export const disclaimer = {
  en: "For information only. This is not an offer or solicitation. The FLVR Fund is a planned vehicle.",
  ar: "للمعلومات فقط. هذا ليس عرضاً أو دعوة للاستثمار. صندوق فلايفر أداة مخطط لها.",
};
