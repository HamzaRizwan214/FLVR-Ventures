// Site-wide copy. Every string is { en, ar } and every fact here traces back to
// /understandings (owner statements and flvr.pdf). Do not add numbers, names or
// claims that are not in those files.
//
// Voice: plain, declarative, venture-style. Describe what FLVR does and what the
// evidence is. No slogans, no promises about outcomes, no exit or return language.

export const hero = {
  lead: {
    en: "We build restaurant concepts with founders, test them live, and invest alongside partners. The FLVR Fund targets food and beverage at Seed and Growth stage.",
    ar: "نبني مفاهيم المطاعم مع المؤسسين، ونختبرها في تجارب حية، ونستثمر إلى جانب الشركاء. ويستهدف صندوق فلايفر قطاع الأغذية والمشروبات في مرحلتي التأسيس والنمو.",
  },
  ctaPrimary: { en: "Speak with the team", ar: "تحدث مع الفريق" },
};

// POP-UP by FLVR: the Studio's operating studio for concept validation (Home, below the method cards)
export const popup = {
  name: { en: "POP-UP by FLVR", ar: "POP-UP من فلايفر" },
  tagline: {
    en: "Concept validation in the real world",
    ar: "التحقق من المفهوم في الواقع",
  },
  body: {
    en: "Our live testing studio. We test the offer, pricing, customer response and operations.",
    ar: "استوديو الاختبار الحي لدينا. نختبر العرض والتسعير واستجابة العملاء والتشغيل.",
  },
  investors: {
    en: "Investors can join before, during or after a trial.",
    ar: "يمكن للمستثمرين الانضمام قبل التجربة أو أثناءها أو بعدها.",
  },
};

// The Studio method: Filter → Lift → Validate → Run
export const steps = [
  {
    key: "filter",
    title: { en: "Filter", ar: "تصفية" },
    descriptor: { en: "Selection", ar: "الاختيار" },
    desc: {
      en: "We choose founder-led concepts using market research.",
      ar: "نختار المفاهيم التي يقودها مؤسسوها بالاعتماد على أبحاث السوق.",
    },
  },
  {
    key: "lift",
    title: { en: "Lift", ar: "رفع" },
    descriptor: { en: "Build", ar: "البناء" },
    desc: {
      en: "We build the brand, menu, pricing and operations with the founder.",
      ar: "نبني العلامة والقائمة والتسعير والتشغيل مع المؤسس.",
    },
  },
  {
    key: "validate",
    title: { en: "Validate", ar: "تحقق" },
    descriptor: { en: "Evidence", ar: "الإثبات" },
    desc: {
      en: "We run a live POP-UP to see how customers respond and what it costs to run.",
      ar: "نشغّل تجربة POP-UP حية لنرى استجابة العملاء وتكلفة التشغيل.",
    },
  },
  {
    key: "run",
    title: { en: "Run", ar: "تشغيل" },
    descriptor: { en: "Scale", ar: "التوسع" },
    desc: {
      en: "We support launch and growth with systems, people and disciplined use of capital.",
      ar: "ندعم الإطلاق والنمو بالأنظمة والكوادر والاستخدام المنضبط لرأس المال.",
    },
  },
];

// How an investor works with FLVR (Funds page)
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
    en: "A SAR 100M fund for food and beverage businesses and food tech in Saudi Arabia.",
    ar: "صندوق بقيمة ١٠٠ مليون ريال لأعمال الأغذية والمشروبات وتقنيات الأغذية في المملكة العربية السعودية.",
  },

  // Part 1: the Mandate
  mandate: {
    label: { en: "Mandate", ar: "التفويض الاستثماري" },
    title: { en: "Where the Fund invests.", ar: "أين يستثمر الصندوق." },
  },
  terms: [
    {
      label: { en: "Sector", ar: "القطاع" },
      value: {
        en: "F&B businesses and tech",
        ar: "أعمال الأغذية والمشروبات والتقنية",
      },
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
      value: { en: "Minority", ar: "أقلية" },
    },
    {
      label: { en: "Target fund size", ar: "حجم الصندوق المستهدف" },
      value: { en: "SAR 100M", ar: "١٠٠ مليون ريال" },
    },
  ],
  status: {
    en: "Talk to the team for what's available today.",
    ar: "تواصل مع الفريق لمعرفة المتاح اليوم.",
  },

  // Part 2: the Investment thesis
  thesis: {
    label: { en: "Investment thesis", ar: "الفرضية الاستثمارية" },
    title: { en: "How the Fund decides.", ar: "كيف يتخذ الصندوق قراراته." },
    statement: {
      en: "Our thesis centres on familiar, high-frequency food categories, differentiated through brand identity, cultural relevance and customer experience.",
      ar: "تقوم فرضيتنا الاستثمارية على فئات الأغذية المألوفة والمتكررة الاستهلاك، التي تتميز بهوية العلامة والملاءمة الثقافية وتجربة العملاء.",
    },
    // Short summary used on the Home page
    summary: {
      en: "Familiar, high-frequency food categories, differentiated through brand identity, cultural relevance and customer experience.",
      ar: "فئات أغذية مألوفة ومتكررة الاستهلاك، تتميز بهوية العلامة والملاءمة الثقافية وتجربة العملاء.",
    },
    tags: [
      { en: "Familiar categories", ar: "فئات مألوفة" },
      { en: "High-frequency", ar: "استهلاك متكرر" },
      { en: "Brand identity", ar: "هوية العلامة" },
      { en: "Cultural relevance", ar: "الملاءمة الثقافية" },
      { en: "Customer experience", ar: "تجربة العملاء" },
    ],
    stepsTitle: {
      en: "How evidence informs decisions",
      ar: "كيف تُبنى القرارات على الأدلة",
    },
    steps: [
      {
        title: { en: "Selection", ar: "الاختيار" },
        text: {
          en: "Market research informs concept selection.",
          ar: "تُسهم أبحاث السوق في اختيار المفاهيم.",
        },
      },
      {
        title: { en: "Validation", ar: "التحقق" },
        text: {
          en: "POP-UP tests customer demand and operating economics.",
          ar: "تختبر POP-UP طلب العملاء والاقتصاديات التشغيلية.",
        },
      },
      {
        title: { en: "Decision", ar: "القرار" },
        text: {
          en: "Together, they inform investment and growth decisions.",
          ar: "وتُسهم معاً في قرارات الاستثمار والنمو.",
        },
      },
    ],
  },

  faqs: [
    {
      q: {
        en: "When can investors engage?",
        ar: "متى يمكن للمستثمرين الانضمام؟",
      },
      a: {
        en: "Before, during or after a concept's POP-UP trial, depending on the opportunity.",
        ar: "قبل تجربة POP-UP للمفهوم أو أثناءها أو بعدها، بحسب الفرصة.",
      },
    },
    {
      q: {
        en: "What is the current fund status?",
        ar: "ما هي الحالة الحالية للصندوق؟",
      },
      a: {
        en: "The Fund targets SAR 100M. Contact the team for available information.",
        ar: "يستهدف الصندوق ١٠٠ مليون ريال. تواصل مع الفريق للحصول على المعلومات المتاحة.",
      },
    },
    {
      q: {
        en: "What can an investor review?",
        ar: "ماذا يمكن للمستثمر الاطلاع عليه؟",
      },
      a: {
        en: "Relevant research, concept plans and operating results where available.",
        ar: "الأبحاث وخطط المفاهيم والنتائج التشغيلية ذات الصلة، حيثما توفرت.",
      },
    },
  ],
};

// The Funds page, in short plain language for investors. The wording here is only for that page;
// the longer fund copy above is still used on Home.
export const fundPage = {
  kicker: { en: "The FLVR Fund", ar: "صندوق فلايفر" },
  title: {
    en: "A fund for Saudi food and beverage.",
    ar: "صندوق للأغذية والمشروبات في السعودية.",
  },
  lead: {
    en: "The Fund invests in food and beverage brands and food tech in Saudi Arabia.",
    ar: "يستثمر الصندوق في علامات الأغذية والمشروبات وتقنيات الأغذية في السعودية.",
  },
  glance: {
    title: { en: "The Fund at a glance", ar: "الصندوق باختصار" },
    // the four figures, side by side
    figures: [
      {
        label: { en: "Fund size", ar: "حجم الصندوق" },
        value: { en: "SAR 100M", ar: "١٠٠ مليون ريال" },
        meaning: {
          en: "The amount we aim to raise.",
          ar: "المبلغ الذي نستهدف جمعه.",
        },
      },
      {
        label: { en: "Per business", ar: "لكل شركة" },
        value: { en: "SAR 1–5M", ar: "١–٥ مليون ريال" },
        meaning: {
          en: "How much we put into one business.",
          ar: "المبلغ الذي نضخه في الشركة الواحدة.",
        },
        range: false,
      },
      {
        label: { en: "How early", ar: "المرحلة" },
        value: { en: "Seed and Growth", ar: "التأسيس والنمو" },
        meaning: {
          en: "Seed: just starting out. Growth: already trading and ready to scale.",
          ar: "التأسيس: في بداية الطريق. النمو: يعمل بالفعل وجاهز للتوسع.",
        },
      },
      {
        label: { en: "Our share", ar: "حصتنا" },
        value: { en: "Minority", ar: "أقلية" },
        meaning: {
          en: "We hold less than half of a business.",
          ar: "نملك أقل من نصف الشركة.",
        },
      },
    ],
    // the two wider terms, as rows
    rows: [
      {
        label: { en: "What we back", ar: "ما ندعمه" },
        value: {
          en: "Food & beverage brands and food tech",
          ar: "علامات الأغذية والمشروبات وتقنيات الأغذية",
        },
        meaning: {
          en: "Businesses that make, sell or serve food and drink, and the technology behind them.",
          ar: "أعمال تصنع الأغذية والمشروبات أو تبيعها أو تقدمها، والتقنية التي تقف خلفها.",
        },
      },
      {
        label: { en: "Where", ar: "أين" },
        value: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
        meaning: {
          en: "All investments are made in Saudi Arabia.",
          ar: "تتم جميع الاستثمارات داخل المملكة العربية السعودية.",
        },
      },
    ],
  },

  ruler: {
    from: { en: "SAR 1M", ar: "١ مليون ريال" },
    to: { en: "SAR 5M", ar: "٥ ملايين ريال" },
  },

  thesis: {
    kicker: { en: "Investment thesis", ar: "الفرضية الاستثمارية" },
    statement: {
      en: "We back food people already buy often, and brands that stand out.",
      ar: "ندعم أغذية يشتريها الناس كثيراً، وعلامات تتميز عن غيرها.",
    },
    criteria: [
      {
        name: { en: "Familiar categories", ar: "فئات مألوفة" },
        gloss: { en: "Food people already know.", ar: "أغذية يعرفها الناس." },
      },
      {
        name: { en: "High-frequency", ar: "استهلاك متكرر" },
        gloss: {
          en: "Things people buy again and again.",
          ar: "أشياء يشتريها الناس مراراً.",
        },
      },
      {
        name: { en: "Brand identity", ar: "هوية العلامة" },
        gloss: {
          en: "A look and voice that set a brand apart.",
          ar: "مظهر وصوت يميّزان العلامة.",
        },
      },
      {
        name: { en: "Cultural relevance", ar: "الملاءمة الثقافية" },
        gloss: {
          en: "Fits local taste and culture.",
          ar: "يناسب الذوق المحلي والثقافة.",
        },
      },
      {
        name: { en: "Customer experience", ar: "تجربة العملاء" },
        gloss: {
          en: "How it feels to buy and to visit.",
          ar: "كيف تبدو تجربة الشراء والزيارة.",
        },
      },
    ],
    decide: { en: "How we decide", ar: "كيف نقرر" },
    steps: [
      {
        title: { en: "Pick", ar: "نختار" },
        text: {
          en: "Market research chooses the concept.",
          ar: "تساعدنا أبحاث السوق على اختيار المفهوم.",
        },
      },
      {
        title: { en: "Test", ar: "نختبر" },
        text: {
          en: "POP-UP checks demand and running costs with real customers.",
          ar: "تختبر POP-UP الطلب وتكاليف التشغيل مع عملاء حقيقيين.",
        },
      },
      {
        title: { en: "Decide", ar: "نقرر" },
        text: {
          en: "The results guide investment and growth.",
          ar: "تقود النتائج قرارات الاستثمار والنمو.",
        },
      },
    ],
  },

  status: {
    en: "Talk to the team for what's available today.",
    ar: "تواصل مع الفريق لمعرفة المتاح اليوم.",
  },
  closing: {
    en: "Request the fund overview.",
    ar: "اطلب النظرة العامة على الصندوق.",
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
    {
      value: "invest",
      label: { en: "Co-invest in a concept", ar: "الاستثمار المشترك في مفهوم" },
    },
    {
      value: "fund",
      label: { en: "Fund overview", ar: "نظرة عامة على الصندوق" },
    },
    { value: "partner", label: { en: "Partnership", ar: "شراكة" } },
    { value: "own", label: { en: "Bring a concept", ar: "لدي مفهوم خاص" } },
  ],
};

export const disclaimer = {
  en: "For information only. This is not an offer or solicitation.",
  ar: "للمعلومات فقط. هذا ليس عرضاً أو دعوة للاستثمار.",
};
