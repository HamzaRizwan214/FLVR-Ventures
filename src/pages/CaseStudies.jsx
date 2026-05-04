import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  MapPin,
  Target,
  Zap,
  BarChart3,
  Rocket,
  Sparkles
} from "lucide-react";

// --- Animated Number Component ---
const AnimatedNumber = ({ value }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, numericValue, motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const caseStudyData = {
  "amm-abdo": {
    name: "AMM ABDO",
    nameAr: "عم عبده",
    vertical: { en: "Saudi Comfort Food", ar: "أكل شعبي سعودي" },
    heroImage: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "12×",
    metricLabel: { en: "Unit Expansion", ar: "توسع الوحدات" },
    gradient: "from-orange-400 via-amber-500 to-yellow-600",
    summary: {
      en: "Modernizing traditional Saudi street food with institutional-grade operations.",
      ar: "تحديث الأكل الشعبي السعودي التقليدي بعمليات ذات معايير مؤسسية."
    },
    stats: [
      { label: { en: "Growth", ar: "النمو" }, val: "1200%", icon: TrendingUp },
      { label: { en: "Branches", ar: "الفروع" }, val: "06", icon: MapPin },
      { label: { en: "Throughput", ar: "الإنتاجية" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "The Quality Dilemma", ar: "معضلة الجودة" },
      content: {
        en: "Traditional comfort food often relies on individual chef skills, making consistency difficult at scale. Amm Abdo needed to industrialize the 'grandmother's taste' without losing the soul of the recipe.",
        ar: "غالباً ما يعتمد الأكل الشعبي التقليدي على مهارات الطهاة الفردية، مما يجعل الاتساق صعباً عند التوسع. احتاج عم عبده إلى تحويل 'نفس الجدة' إلى نظام صناعي دون فقدان روح الوصفة."
      }
    },
    intervention: [
      {
        title: { en: "SOP Engineering", ar: "هندسة الإجراءات" },
        desc: { en: "Developed a proprietary spice-blend and pre-portioning system to ensure flavor parity across all 6 sites.", ar: "تطوير نظام خلط توابل وتقسيم مسبق لضمان تماثل النكهة في جميع المواقع الستة." }
      },
      {
        title: { en: "Supply Chain", ar: "سلسلة التوريد" },
        desc: { en: "Centralized sourcing for local ingredients, reducing food cost by 22% while increasing quality control.", ar: "توحيد مصادر المكونات المحلية، مما قلل تكلفة الغذاء بنسبة ٢٢٪ مع زيادة مراقبة الجودة." }
      },
      {
        title: { en: "Brand Evolution", ar: "تطور العلامة" },
        desc: { en: "Reimagined the visual identity to appeal to the modern Saudi youth while retaining nostalgia.", ar: "إعادة تصور الهوية البصرية لجذب الشباب السعودي الحديث مع الحفاظ على الحنين إلى الماضي." }
      },
      {
        title: { en: "Operational Tech", ar: "تكنولوجيا العمليات" },
        desc: { en: "Implemented a kitchen display system (KDS) that reduced average order prep time by 35%.", ar: "تنفيذ نظام عرض المطبخ (KDS) الذي قلل من متوسط وقت تحضير الطلبات بنسبة ٣٥٪." }
      }
    ],
    results: {
      en: "Amm Abdo is now the fastest-growing Saudi comfort food brand in Riyadh, with a proven model ready for national franchise.",
      ar: "عم عبده هو الآن أسرع علامة تجارية للأكل الشعبي السعودي نمواً في الرياض، مع نموذج مثبت جاهز للامتياز الوطني."
    },
    gallery: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "burger-abo-ashra": {
    name: "BURGER ABO ASHRA",
    nameAr: "برجر أبو عشرة",
    vertical: { en: "Fast Casual (Value)", ar: "وجبات سريعة (قيمة)" },
    heroImage: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "Market Leader",
    metricLabel: { en: "Value Segment", ar: "فئة القيمة" },
    gradient: "from-red-400 via-rose-500 to-crimson-600",
    summary: {
      en: "Disrupting the budget burger market with high-quality ingredients and lean operations.",
      ar: "تعطيل سوق البرجر الموفر بمكونات عالية الجودة وعمليات رشيقة."
    },
    stats: [
      { label: { en: "Efficiency", ar: "الكفاءة" }, val: "94%", icon: TrendingUp },
      { label: { en: "Outlets", ar: "المنافذ" }, val: "04", icon: MapPin },
      { label: { en: "Repeat", ar: "التكرار" }, val: "82%", icon: Users },
    ],
    challenge: {
      title: { en: "The Price Trap", ar: "فخ السعر" },
      content: {
        en: "In the value segment, margins are razor-thin. The challenge was to maintain a competitive price point while ensuring a product quality that outperforms international competitors.",
        ar: "في فئة القيمة، تكون الهوامش ضئيلة للغاية. كان التحدي هو الحفاظ على نقطة سعر تنافسية مع ضمان جودة منتج تتفوق على المنافسين الدوليين."
      }
    },
    intervention: [
      {
        title: { en: "Lean Logistics", ar: "الخدمات اللوجستية الرشيقة" },
        desc: { en: "Optimized the entire supply chain to eliminate middlemen, securing a 15% lower procurement cost.", ar: "تحسين سلسلة التوريد بالكامل للتخلص من الوسطاء، وتأمين تكلفة شراء أقل بنسبة ١٥٪." }
      },
      {
        title: { en: "Menu Simplicity", ar: "بساطة القائمة" },
        desc: { en: "Focused on a high-velocity, 4-item core menu to minimize waste and maximize speed.", ar: "التركيز على قائمة أساسية سريعة الحركة مكونة من ٤ عناصر لتقليل الهدر وزيادة السرعة." }
      },
      {
        title: { en: "Volume Strategy", ar: "استراتيجية الحجم" },
        desc: { en: "Leveraged delivery-first sites to drive high volume with minimal front-of-house overhead.", ar: "الاستفادة من المواقع التي تركز على التوصيل أولاً لتحقيق حجم مبيعات كبير مع الحد الأدنى من التكاليف العامة." }
      },
      {
        title: { en: "Viral Marketing", ar: "التسويق الفيروسي" },
        desc: { en: "Executed a 'brutalist' digital campaign that turned the brand's simplicity into its greatest strength.", ar: "تنفيذ حملة رقمية 'بروتالية' حولت بساطة العلامة التجارية إلى أكبر نقطة قوة لها." }
      }
    ],
    results: {
      en: "Burger Abo Ashra has redefined value for Saudi youth, achieving profitability within the first 6 months of operation.",
      ar: "أعاد برجر أبو عشرة تعريف القيمة للشباب السعودي، محققاً الربحية خلال الأشهر الستة الأولى من التشغيل."
    },
    gallery: [
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "johnny-jamal": {
    name: "JOHNNY & JAMAL",
    nameAr: "جوني وجمال",
    vertical: { en: "Fusion Casual Dining", ar: "فيوجن كاجوال" },
    heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "4.5×",
    metricLabel: { en: "Sentiment Score", ar: "مؤشر الرضا" },
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    summary: {
      en: "Blending international aesthetics with local flavors for a next-gen dining experience.",
      ar: "مزج الجماليات الدولية مع النكهات المحلية لتجربة طعام من الجيل القادم."
    },
    stats: [
      { label: { en: "Love Index", ar: "مؤشر الحب" }, val: "88%", icon: TrendingUp },
      { label: { en: "Flagships", ar: "الفروع" }, val: "02", icon: MapPin },
      { label: { en: "Social", ar: "التواصل" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "Cultural Fusion", ar: "الاندماج الثقافي" },
      content: {
        en: "Fusion concepts often fail by trying to please everyone. Johnny & Jamal needed a sharp, niche identity that resonated with the 'East meets West' lifestyle of modern Al Khobar.",
        ar: "غالباً ما تفشل مفاهيم الفيوجن بمحاولة إرضاء الجميع. احتاج جوني وجمال إلى هوية حادة ومحددة تتماشى مع أسلوب حياة 'الشرق يلتقي الغرب' في الخبر الحديثة."
      }
    },
    intervention: [
      {
        title: { en: "Experience Design", ar: "تصميم التجربة" },
        desc: { en: "Created an immersive interior concept that changes its mood from daytime cafe to evening dining.", ar: "إنشاء مفهوم داخلي غامر يغير مزاجه من مقهى نهاري إلى مطعم مسائي." }
      },
      {
        title: { en: "Flavor R&D", ar: "البحث والتطوير" },
        desc: { en: "Custom menu development blending Californian techniques with GCC spices.", ar: "تطوير قائمة مخصصة تمزج التقنيات الكاليفورنية مع توابل دول مجلس التعاون الخليجي." }
      },
      {
        title: { en: "Community Play", ar: "بناء المجتمع" },
        desc: { en: "Host regular 'founder nights' to build a loyal community of early adopters and tastemakers.", ar: "استضافة 'ليالي المؤسسين' بانتظام لبناء مجتمع مخلص من المتبنين الأوائل وصناع الذوق." }
      },
      {
        title: { en: "Digital Ecosystem", ar: "النظام الرقمي" },
        desc: { en: "Built a custom reservation and loyalty app that captures deep customer preferences.", ar: "بناء تطبيق حجز وولاء مخصص يلتقط تفضيلات العملاء العميقة." }
      }
    ],
    results: {
      en: "Johnny & Jamal has become the top-rated casual dining spot in Al Khobar, with plans to launch in Riyadh by 2026.",
      ar: "أصبح جوني وجمال المكان الأكثر تقييماً لتناول الطعام غير الرسمي في الخبر، مع خطط للإطلاق في الرياض بحلول عام ٢٠٢٦."
    },
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "the-butchery-counter": {
    name: "THE BUTCHERY COUNTER",
    nameAr: "ذا بوتشري كاونتر",
    vertical: { en: "Premium Steakhouse", ar: "ستيك هاوس فاخر" },
    heroImage: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "Farm-to-Table",
    metricLabel: { en: "Supply Integrity", ar: "سلامة التوريد" },
    gradient: "from-zinc-700 via-stone-800 to-black",
    summary: {
      en: "Elevating the meat experience through transparency, craft, and premium sourcing.",
      ar: "الارتقاء بتجربة اللحوم من خلال الشفافية والحرفية والتوريد المتميز."
    },
    stats: [
      { label: { en: "Quality", ar: "الجودة" }, val: "A+", icon: TrendingUp },
      { label: { en: "Flagship", ar: "الرئيسي" }, val: "01", icon: MapPin },
      { label: { en: "Authority", ar: "السلطة" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "The Trust Gap", ar: "فجوة الثقة" },
      content: {
        en: "The premium meat market was flooded with imported claims but lacked local transparency. The Butchery Counter had to prove its 'farm-to-table' credentials in a market skeptical of organic claims.",
        ar: "كان سوق اللحوم الفاخرة غارقاً في الادعاءات المستوردة ولكنه افتقر إلى الشفافية المحلية. كان على ذا بوتشري كاونتر إثبات مصداقية 'من المزرعة إلى المائدة' في سوق يشكك في الادعاءات العضوية."
      }
    },
    intervention: [
      {
        title: { en: "Direct Sourcing", ar: "التوريد المباشر" },
        desc: { en: "Eliminated wholesale brokers by establishing exclusive contracts with local organic farms.", ar: "القضاء على وسطاء الجملة من خلال إبرام عقود حصرية مع مزارع عضوية محلية." }
      },
      {
        title: { en: "Craft Butchery", ar: "الجزارة الحرفية" },
        desc: { en: "In-house aging rooms and master butchers performing tableside cuts.", ar: "غرف تعتيق داخلية وجزارين محترفين يقومون بتقطيع اللحم بجانب الطاولة." }
      },
      {
        title: { en: "Education Hub", ar: "مركز تعليمي" },
        desc: { en: "Integrated a workshop space to teach customers about meat grades and sustainable cooking.", ar: "دمج مساحة ورشة عمل لتعليم العملاء حول درجات اللحوم والطهي المستدام." }
      },
      {
        title: { en: "Zero-Waste Ops", ar: "عمليات بلا هدر" },
        desc: { en: "Developed a nose-to-tail menu that ensures 100% carcass utilization, increasing margin by 18%.", ar: "تطوير قائمة طعام تعتمد على استغلال الحيوان بالكامل لضمان الاستفادة بنسبة ١٠٠٪، مما رفع الهامش بنسبة ١٨٪." }
      }
    ],
    results: {
      en: "The Butchery Counter has established itself as Riyadh's ultimate authority on premium meat, with a waitlist exceeding 2 weeks.",
      ar: "أثبت ذا بوتشري كاونتر نفسه كمرجع نهائي للحوم الفاخرة في الرياض، مع قائمة انتظار تتجاوز الأسبوعين."
    },
    gallery: [
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "happiness-lab": {
    name: "HAPPINESS LAB",
    nameAr: "لاب السعادة",
    vertical: { en: "Experimental Dessert", ar: "حلويات تجريبية" },
    heroImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "3.8×",
    metricLabel: { en: "Ticket Size vs Avg", ar: "حجم الفاتورة" },
    gradient: "from-pink-400 via-rose-500 to-fuchsia-600",
    summary: {
      en: "Engineering joy through innovative dessert chemistry and retail theater.",
      ar: "هندسة الفرح من خلال كيمياء الحلويات المبتكرة والمسرح التجاري."
    },
    stats: [
      { label: { en: "Conversion", ar: "التحويل" }, val: "92%", icon: TrendingUp },
      { label: { en: "Kiosks", ar: "المنصات" }, val: "03", icon: MapPin },
      { label: { en: "Engagement", ar: "التفاعل" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "Experience Saturation", ar: "تشبع التجربة" },
      content: {
        en: "The dessert market in Saudi is hyper-competitive. Happiness Lab had to move beyond just 'tasting good' to creating an 'Instagrammable' ritual that drives organic growth.",
        ar: "سوق الحلويات في السعودية تنافسي للغاية. كان على لاب السعادة أن يتخطى مجرد 'المذاق الجيد' إلى إنشاء طقوس 'قابلة للمشاركة' تدفع النمو العضوي."
      }
    },
    intervention: [
      {
        title: { en: "Retail Theater", ar: "مسرح التجزئة" },
        desc: { en: "Using liquid nitrogen and custom plating rituals to turn every order into a performance.", ar: "استخدام النيتروجين السائل وطقوس التقديم المخصصة لتحويل كل طلب إلى عرض أدائي." }
      },
      {
        title: { en: "Mood-Based Menu", ar: "قائمة تعتمد على المزاج" },
        desc: { en: "Developed desserts scientifically paired with ingredients that trigger dopamine release.", ar: "تطوير حلويات مقترنة علمياً بمكونات تحفز إفراز الدوبامين." }
      },
      {
        title: { en: "Micro-Unit Model", ar: "نموذج الوحدات الصغيرة" },
        desc: { en: "Focused on high-footfall kiosks to minimize rent while maximizing brand visibility.", ar: "التركيز على منصات عالية الإقبال لتقليل الإيجار مع زيادة رؤية العلامة التجارية." }
      },
      {
        title: { en: "Influencer Loops", ar: "حلقات المؤثرين" },
        desc: { en: "Built a referral system where social shares translate directly into exclusive 'secret menu' access.", ar: "بناء نظام إحالة حيث تترجم المشاركات الاجتماعية مباشرة إلى وصول حصري لـ 'القائمة السرية'." }
      }
    ],
    results: {
      en: "Happiness Lab has achieved viral status in Riyadh's retail hubs, proving that experiential retail is the future of F&B.",
      ar: "حقق لاب السعادة مكانة فيروسية في مراكز التسوق بالرياض، مما يثبت أن تجارة التجزئة التجريبية هي مستقبل الأغذية والمشروبات."
    },
    gallery: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "dilli-biryani": {
    name: "DILLI BIRYANI",
    nameAr: "ديلي برياني",
    vertical: { en: "Authentic Indian", ar: "أكل هندي أصيل" },
    heroImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "220%",
    metricLabel: { en: "Delivery Volume", ar: "حجم التوصيل" },
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    summary: {
      en: "Standardizing the art of authentic Delhi biryani for rapid national scale.",
      ar: "توحيد فن البرياني الدلهي الأصيل للتوسع الوطني السريع."
    },
    stats: [
      { label: { en: "Retention", ar: "الاحتفاظ" }, val: "76%", icon: TrendingUp },
      { label: { en: "Units", ar: "الوحدات" }, val: "05", icon: MapPin },
      { label: { en: "Standard", ar: "المعيار" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "Consistency at Scale", ar: "الاتساق عند التوسع" },
      content: {
        en: "Biryani is notoriously difficult to standardize. Dilli Biryani needed to maintain the complexity of 32 spices while operating through delivery-optimized cloud kitchens.",
        ar: "من المعروف أن البرياني يصعب توحيده. احتاج ديلي برياني إلى الحفاظ على تعقيد ٣٢ توابل أثناء العمل من خلال مطابخ سحابية محسنة للتوصيل."
      }
    },
    intervention: [
      {
        title: { en: "Spice Tech", ar: "تكنولوجيا التوابل" },
        desc: { en: "Developed a proprietary vacuum-sealed spice-infusion process that preserves aroma for up to 45 mins of transit.", ar: "تطوير عملية ضخ توابل مغلفة بالتفريغ تحافظ على الرائحة لمدة تصل إلى ٤٥ دقيقة من النقل." }
      },
      {
        title: { en: "Hybrid Model", ar: "النموذج الهجين" },
        desc: { en: "Operated both 'experience centers' for dine-in and 'dark nodes' for rapid delivery fulfillment.", ar: "تشغيل كل من 'مراكز التجربة' لتناول الطعام في الداخل و 'العقد السحابية' لتنفيذ التوصيل السريع." }
      },
      {
        title: { en: "Labor Training", ar: "تدريب العمالة" },
        desc: { en: "Built a centralized training academy to certify 'Biryani Masters' in under 30 days.", ar: "بناء أكاديمية تدريب مركزية لاعتماد 'خبراء البرياني' في أقل من ٣٠ يوماً." }
      },
      {
        title: { en: "Packaging Innovation", ar: "ابتكار التغليف" },
        desc: { en: "Custom clay-pot inspired sustainable packaging that maintains heat and moisture during delivery.", ar: "تغليف مستدام مخصص مستوحى من الأواني الفخارية يحافظ على الحرارة والرطوبة أثناء التوصيل." }
      }
    ],
    results: {
      en: "Dilli Biryani has dominated the Indian segment in Riyadh's delivery market, with a 2.5x higher LTV than category average.",
      ar: "سيطر ديلي برياني على القطاع الهندي في سوق التوصيل بالرياض، مع قيمة حياة عميل أعلى بـ ٢.٥ مرة من متوسط الفئة."
    },
    gallery: [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"
    ]
  }
};


export default function CaseStudies() {
  const { id } = useParams();
  const study = caseStudyData[id] || caseStudyData["amm-abdo"];
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <PageWrapper noPadding>
      <div ref={containerRef} className="bg-[#FAFAFA] min-h-screen text-black selection:bg-black selection:text-white">
        
        {/* Apple-Tier Navigation */}
        <nav className="fixed top-24 left-0 w-full z-50 px-6 lg:px-16 pointer-events-none">
          <div className="max-w-[1600px] mx-auto">
            <Link 
              to="/portfolio"
              className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 group shadow-sm"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <BilingualText en="Back to Portfolio" ar="العودة للمحفظة" />
            </Link>
          </div>
        </nav>

        {/* Cinematic Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <img src={study.heroImage} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FAFAFA]`} />
          </motion.div>

          <div className="relative z-10 text-center text-white px-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold mb-8 font-[Metropolis] text-white/60">
                <BilingualText en="Case Study Portfolio" ar="محفظة دراسة الحالة" />
              </p>
              <h1 className="text-7xl md:text-[10rem] font-light tracking-tighter leading-[0.8] mb-12 font-[Metropolis]">
                {study.name}
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                 <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold font-[Metropolis]">
                       <BilingualText en="Vertical" ar="القطاع" />
                    </p>
                    <p className="text-xl font-medium font-[Metropolis]">
                       <BilingualText en={study.vertical.en} ar={study.vertical.ar} />
                    </p>
                 </div>
                 <div className="w-px h-12 bg-white/20 hidden md:block" />
                 <div className="max-w-xl">
                    <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed font-[Metropolis]">
                      <BilingualText en={study.summary.en} ar={study.summary.ar} />
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold font-[Metropolis]">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </section>

        {/* Bento Metrics Grid */}
        <section className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Main Highlight Card */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="md:col-span-2 p-16 bg-white rounded-[3rem] border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] flex flex-col justify-between group overflow-hidden relative"
                >
                   <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000`} />
                   <div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4 font-[Metropolis]">
                        <BilingualText en="Key Performance Indicator" ar="مؤشر الأداء الرئيسي" />
                      </p>
                      <h2 className="text-8xl md:text-[10rem] font-bold tracking-tighter text-black font-[Metropolis] leading-none mb-4">
                        <AnimatedNumber value={study.mainMetric} />
                      </h2>
                      <p className="text-2xl font-light text-black/60 font-[Metropolis]">
                        <BilingualText en={study.metricLabel.en} ar={study.metricLabel.ar} />
                      </p>
                   </div>
                   <div className="mt-20 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white">
                         <TrendingUp size={20} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest font-[Metropolis] opacity-40">Record Breaking Growth</p>
                   </div>
                </motion.div>

                {/* Sub Stats */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {study.stats.map((stat, i) => (
                      <motion.div 
                         key={i}
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.1 }}
                         className="p-12 bg-white rounded-[2.5rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-700 group"
                      >
                         <div className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-all duration-500">
                            <stat.icon size={18} />
                         </div>
                         <h3 className="text-5xl font-bold tracking-tighter mb-2 font-[Metropolis] text-black/90">
                           <AnimatedNumber value={stat.val} />
                         </h3>
                         <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold font-[Metropolis]">
                           <BilingualText en={stat.label.en} ar={stat.label.ar} />
                         </p>
                      </motion.div>
                   ))}
                   
                   {/* Vision 2030 Alignment Card */}
                   <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className={`p-12 bg-gradient-to-br ${study.gradient} rounded-[2.5rem] text-white flex flex-col justify-between`}
                   >
                      <Sparkles size={24} />
                      <div>
                         <p className="text-[10px] uppercase tracking-widest font-bold mb-2 font-[Metropolis] text-white/60">Alignment</p>
                         <h4 className="text-2xl font-light tracking-tight font-[Metropolis]">Saudi Vision 2030 Catalyst</h4>
                      </div>
                   </motion.div>
                </div>
             </div>
          </div>
        </section>

        {/* Narrative Section: The Challenge */}
        <section className="py-40 px-6 bg-white border-y border-black/[0.03]">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                   <p className="text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold mb-10 font-[Metropolis]">
                      <BilingualText en="Phase 01: The Problem" ar="المرحلة الأولى: المشكلة" />
                   </p>
                   <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-black leading-[1.1] mb-12 font-[Metropolis]">
                      <BilingualText en={study.challenge.title.en} ar={study.challenge.title.ar} />
                   </h2>
                   <div className="space-y-8">
                      <p className="text-2xl md:text-3xl text-black/80 leading-relaxed font-light font-[Metropolis]">
                         <BilingualText en={study.challenge.content.en} ar={study.challenge.content.ar} />
                      </p>
                   </div>
                </div>

                <div className="relative">
                   <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl"
                   >
                      <img src={study.gallery[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]" />
                   </motion.div>
                   {/* Abstract Decor */}
                   <div className={`absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br ${study.gradient} rounded-full blur-3xl opacity-20`} />
                </div>
             </div>
          </div>
        </section>

        {/* FLVR Intervention: The Strategy Grid */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
             <div className="mb-24 text-center">
                <p className="text-[10px] uppercase tracking-[0.6em] text-black/30 font-bold mb-6 font-[Metropolis]">
                   <BilingualText en="Strategic Layer" ar="الطبقة الاستراتيجية" />
                </p>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter font-[Metropolis]">The FLVR Intervention</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {study.intervention.map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-12 bg-white rounded-[2.5rem] border border-black/[0.03] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] transition-all duration-700"
                   >
                      <div className="flex items-start gap-8">
                         <span className="text-4xl font-light text-black/10 font-[Metropolis] group-hover:text-black transition-colors duration-500">0{i+1}</span>
                         <div>
                            <h3 className="text-3xl font-bold mb-6 tracking-tight font-[Metropolis] group-hover:text-[var(--brand-primary)] transition-colors">
                               <BilingualText en={item.title.en} ar={item.title.ar} />
                            </h3>
                            <p className="text-xl text-black/50 leading-relaxed font-medium font-[Metropolis] group-hover:text-black/80 transition-colors">
                               <BilingualText en={item.desc.en} ar={item.desc.ar} />
                            </p>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Impact Visualizer Section */}
        <section className="py-40 px-6 bg-black text-white rounded-[4rem] mx-6 mb-12 overflow-hidden relative">
          {/* Background Ambient Glow */}
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${study.gradient} opacity-20 blur-[150px]`} />
          
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                   <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold mb-10 font-[Metropolis]">
                      <BilingualText en="Strategic Outcome" ar="النتيجة الاستراتيجية" />
                   </p>
                   <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 font-[Metropolis]">
                      Measured success,<br/>exponentially delivered.
                   </h2>
                   <p className="text-2xl text-white/60 leading-relaxed font-light font-[Metropolis] mb-16">
                      <BilingualText en={study.results.en} ar={study.results.ar} />
                   </p>
                   
                   <div className="flex flex-wrap gap-12">
                      <div className="space-y-2">
                         <p className="text-5xl font-bold font-[Metropolis]">24%</p>
                         <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Cost Reduction</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-5xl font-bold font-[Metropolis]">40%</p>
                         <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Labor Utility</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-5xl font-bold font-[Metropolis]">99.9%</p>
                         <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Uptime Standard</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-6">
                      <div className="aspect-[3/4] bg-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/10">
                         <TrendingUp className="text-[var(--brand-reward)]" size={32} />
                         <div>
                            <p className="text-4xl font-bold font-[Metropolis] mb-2">High</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Market Authority</p>
                         </div>
                      </div>
                      <div className="aspect-square bg-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/10">
                         <Users className="text-emerald-400" size={32} />
                         <div>
                            <p className="text-4xl font-bold font-[Metropolis] mb-2">92%</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Retention Rate</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6 pt-12">
                      <div className="aspect-square bg-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/10">
                         <Zap className="text-amber-400" size={32} />
                         <div>
                            <p className="text-4xl font-bold font-[Metropolis] mb-2">Fast</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Scaling Cycle</p>
                         </div>
                      </div>
                      <div className="aspect-[3/4] bg-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/10">
                         <Target className="text-rose-400" size={32} />
                         <div>
                            <p className="text-4xl font-bold font-[Metropolis] mb-2">Exit</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-[Metropolis]">Thesis Proven</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Footer CTA: Reimagined */}
        <section className="py-60 bg-[#FAFAFA] text-center px-6 relative overflow-hidden">
           <div className="max-w-5xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] uppercase tracking-[0.6em] text-black/30 mb-12 font-bold font-[Metropolis]">
                  <BilingualText en="The Next Success Story" ar="قصة النجاح القادمة" />
                </p>
                <h2 className="text-6xl md:text-[8rem] font-light tracking-tighter leading-none mb-20 font-[Metropolis]">
                  Build your<br/>legacy with us.
                </h2>
                <Link 
                  to="/contact" 
                  className={`inline-flex items-center gap-6 px-16 py-8 bg-black text-white rounded-full text-xl font-medium hover:scale-105 transition-transform duration-500 shadow-2xl`}
                >
                  <BilingualText en="Initiate Discovery" ar="ابدأ الاستكشاف" />
                  <ArrowRight size={24} />
                </Link>
              </motion.div>
           </div>
        </section>

      </div>
    </PageWrapper>
  );
}
