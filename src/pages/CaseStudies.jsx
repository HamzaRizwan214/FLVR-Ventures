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
  "lune-cafe": {
    name: "LUNE CAFÉ",
    nameAr: "لون كافيه",
    vertical: { en: "Specialty Coffee", ar: "قهوة مختصة" },
    heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "8.4×",
    metricLabel: { en: "Revenue Multiple", ar: "مضاعف الإيرادات" },
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    summary: {
      en: "From a single neighborhood roastery to a city-wide benchmark for specialty coffee.",
      ar: "من محمصة محلية في حي واحد إلى معيار مرجعي للقهوة المختصة على مستوى المدينة."
    },
    stats: [
      { label: { en: "Growth", ar: "النمو" }, val: "840%", icon: TrendingUp },
      { label: { en: "Branches", ar: "الفروع" }, val: "08", icon: MapPin },
      { label: { en: "Loyalty", ar: "الولاء" }, val: "92%", icon: Users },
    ],
    challenge: {
      title: { en: "The Scale Ceiling", ar: "سقف التوسع" },
      content: {
        en: "Lune had the product-market fit but lacked the operational blueprint to scale without losing quality. The challenge was transitioning from founder-led operations to an institutional system while maintaining the 'soul' of the neighborhood café.",
        ar: "كان لدى لون الملاءمة بين المنتج والسوق ولكنها افتقرت إلى المخطط التشغيلي للتوسع دون فقدان الجودة. كان التحدي يكمن في الانتقال من العمليات التي يقودها المؤسس إلى نظام مؤسسي مع الحفاظ على 'روح' المقهى المحلي."
      }
    },
    intervention: [
      {
        title: { en: "Operational Blueprint", ar: "المخطط التشغيلي" },
        desc: { en: "We built a modular SOP system allowing for rapid branch rollouts in under 45 days.", ar: "قمنا ببناء نظام إجراءات تشغيلية قياسية يسمح بنشر الفروع السريعة في أقل من ٤٥ يومًا." }
      },
      {
        title: { en: "Capital Structuring", ar: "هيكلة رأس المال" },
        desc: { en: "Secured Series A funding to fuel multi-site expansion across Riyadh.", ar: "تأمين تمويل الجولة أ لدعم التوسع في مواقع متعددة في جميع أنحاء الرياض." }
      },
      {
        title: { en: "Supply Chain", ar: "سلسلة التوريد" },
        desc: { en: "Direct-trade sourcing agreements reducing raw material costs by 18%.", ar: "اتفاقيات توريد التجارة المباشرة التي قللت تكاليف المواد الخام بنسبة ١٨٪." }
      },
      {
        title: { en: "Digital Transformation", ar: "التحول الرقمي" },
        desc: { en: "Integrated a unified POS and loyalty system that increased repeat visits by 22%.", ar: "دمج نظام نقاط بيع وولاء موحد أدى إلى زيادة الزيارات المتكررة بنسبة ٢٢٪." }
      }
    ],
    results: {
      en: "Today, Lune is a household name in Riyadh's specialty coffee scene, with a clear path toward national expansion and a potential exit in 2027.",
      ar: "اليوم، أصبح لون اسماً مألوفاً في مشهد القهوة المختصة في الرياض، مع مسار واضح نحو التوسع الوطني وخروج محتمل في عام ٢٠٢٧."
    },
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "beyond-burger": {
    name: "BEYOND BURGER",
    nameAr: "بيوند برغر",
    vertical: { en: "Plant-Based Casual", ar: "نباتي كاجوال" },
    heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "Category Leader",
    metricLabel: { en: "Market Position", ar: "مكانة السوق" },
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    summary: {
      en: "Redefining the burger experience for the health-conscious Saudi youth.",
      ar: "إعادة تعريف تجربة البرجر للشباب السعودي المهتم بالصحة."
    },
    stats: [
      { label: { en: "Market Share", ar: "حصة السوق" }, val: "34%", icon: TrendingUp },
      { label: { en: "Outlets", ar: "المنافذ" }, val: "03", icon: MapPin },
      { label: { en: "Retention", ar: "الاحتفاظ" }, val: "78%", icon: Users },
    ],
    challenge: {
      title: { en: "The Stigma", ar: "الوصمة" },
      content: {
        en: "Plant-based food was seen as 'boring' or 'tasteless' in the local market. FLVR had to create a brand that led with flavor and 'cool-factor' rather than just health benefits.",
        ar: "كان يُنظر إلى الطعام النباتي على أنه 'ممل' أو 'عديم الطعم' في السوق المحلي. كان على فليفر إنشاء علامة تجارية تقود بالنكهة و 'عامل الجذب' بدلاً من مجرد الفوائد الصحية."
      }
    },
    intervention: [
      {
        title: { en: "Brand Identity", ar: "هوية العلامة" },
        desc: { en: "Developed a high-energy, brutalist aesthetic that resonated with Gen-Z.", ar: "تطوير جمالية بروتالية مفعمة بالطاقة لاقت صدى لدى الجيل زد." }
      },
      {
        title: { en: "Flavor R&D", ar: "البحث والتطوير" },
        desc: { en: "Custom patty recipes specifically tuned to the Arabian palate's preference for spices.", ar: "وصفات برجر مخصصة تم ضبطها خصيصاً لتناسب تفضيلات الذوق العربي للتوابل." }
      },
      {
        title: { en: "Influencer Network", ar: "شبكة المؤثرين" },
        desc: { en: "Strategically partnered with lifestyle icons to normalize plant-based dining in Saudi.", ar: "الشراكة الاستراتيجية مع أيقونات أسلوب الحياة لتطبيع تناول الطعام النباتي في السعودية." }
      },
      {
        title: { en: "Menu Engineering", ar: "هندسة القائمة" },
        desc: { en: "Optimized ingredient cross-utilization to reduce food waste by 14%.", ar: "تحسين الاستخدام المتبادل للمكونات لتقليل نفايات الطعام بنسبة ١٤٪." }
      }
    ],
    results: {
      en: "Beyond Burger is now the most recognized Saudi-born plant-based brand, proving that sustainability and scale can coexist in F&B.",
      ar: "بيوند برجر هي الآن العلامة التجارية النباتية السعودية الأكثر شهرة، مما يثبت أن الاستدامة والتوسع يمكن أن يتعايشا في قطاع الأغذية والمشروبات."
    },
    gallery: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "cloud-kitchen-x": {
    name: "CLOUD KITCHEN X",
    nameAr: "كلاود كيتشن إكس",
    vertical: { en: "Ghost Kitchen", ar: "مطبخ سحابي" },
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "3.2×",
    metricLabel: { en: "EBITDA Efficiency", ar: "كفاءة الأرباح" },
    gradient: "from-blue-400 via-indigo-500 to-violet-600",
    summary: {
      en: "Operational excellence in the invisible engine of food delivery.",
      ar: "التميز التشغيلي في المحرك الخفي لتوصيل الطعام."
    },
    stats: [
      { label: { en: "Efficiency", ar: "الكفاءة" }, val: "3.2x", icon: TrendingUp },
      { label: { en: "Units", ar: "الوحدات" }, val: "12", icon: MapPin },
      { label: { en: "Uptime", ar: "وقت التشغيل" }, val: "99.9%", icon: Users },
    ],
    challenge: {
      title: { en: "Unit Economics", ar: "اقتصاديات الوحدة" },
      content: {
        en: "High commission rates from aggregators were killing margins. Cloud Kitchen X needed a volume-led strategy combined with aggressive cost-of-labor optimization.",
        ar: "كانت معدلات العمولات المرتفعة من منصات التوصيل تقتل الهوامش. احتاجت كلاود كيتشن إكس إلى استراتيجية تقودها الأحجام مدمجة مع تحسين قوي لتكلفة العمالة."
      }
    },
    intervention: [
      {
        title: { en: "Proprietary ERP", ar: "نظام ERP خاص" },
        desc: { en: "A custom operating system to manage 14 brands from a single kitchen line.", ar: "نظام تشغيل مخصص لإدارة ١٤ علامة تجارية من خط مطبخ واحد." }
      },
      {
        title: { en: "Labor Engineering", ar: "هندسة العمالة" },
        desc: { en: "Cross-training staff to handle diverse cuisines, maximizing labor utility by 40%.", ar: "تدريب الموظفين على التعامل مع مطابخ متنوعة، مما رفع فائدة العمالة بنسبة ٤٠٪." }
      },
      {
        title: { en: "Demand Forecasting", ar: "التنبؤ بالطلب" },
        desc: { en: "Implemented AI models to predict peak hours, reducing ingredient spoilage by 25%.", ar: "تنفيذ نماذج الذكاء الاصطناعي للتنبؤ بساعات الذروة، مما قلل من تلف المكونات بنسبة ٢٥٪." }
      },
      {
        title: { en: "Dark Brand Incubation", ar: "حضانة العلامات التجارية" },
        desc: { en: "Developed 6 in-house 'dark brands' to fill market gaps identified through data.", ar: "تطوير ٦ 'علامات تجارية سحابية' داخلية لسد فجوات السوق المحددة من خلال البيانات." }
      }
    ],
    results: {
      en: "Cloud Kitchen X has achieved the highest EBITDA margin in its category across the GCC.",
      ar: "حققت كلاود كيتشن إكس أعلى هامش ربح في فئتها في جميع أنحاء دول مجلس التعاون الخليجي."
    },
    gallery: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=800&auto=format&fit=crop"
    ]
  },
  "new-street": {
    name: "THE NEW STREET",
    nameAr: "الشارع الجديد",
    vertical: { en: "Saudi Casual Dining", ar: "مطعم سعودي" },
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "Launch Success",
    metricLabel: { en: "Market Entry", ar: "دخول السوق" },
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    summary: {
      en: "Modernizing Saudi culinary classics for a new generation of diners.",
      ar: "تحديث كلاسيكيات الطهي السعودي لجيل جديد من رواد المطاعم."
    },
    stats: [
      { label: { en: "Capacity", ar: "السعة" }, val: "100%", icon: TrendingUp },
      { label: { en: "Outlets", ar: "المنافذ" }, val: "01", icon: MapPin },
      { label: { en: "Footfall", ar: "الإقبال" }, val: "High", icon: Users },
    ],
    challenge: {
      title: { en: "Tradition vs Scale", ar: "التقليد مقابل التوسع" },
      content: {
        en: "Traditional Saudi dining often relies on boutique, slow-moving operations. The New Street needed a system that could deliver authenticity at the speed and scale of a modern commercial brand.",
        ar: "غالباً ما تعتمد المطاعم السعودية التقليدية على عمليات صغيرة وبطيئة. احتاج الشارع الجديد إلى نظام يمكنه تقديم الأصالة بسرعة وحجم العلامة التجارية التجارية الحديثة."
      }
    },
    intervention: [
      {
        title: { en: "Cultural Branding", ar: "العلامة التجارية الثقافية" },
        desc: { en: "Reimagined traditional elements into a sharp, brutalist brand identity.", ar: "إعادة تصور العناصر التقليدية في هوية علامة تجارية حادة وبروتالية." }
      },
      {
        title: { en: "Systematization", ar: "التحويل إلى نظام" },
        desc: { en: "Developed a central prep-kitchen model to ensure consistency across future multi-city sites.", ar: "تطوير نموذج مطبخ تحضير مركزي لضمان الاتساق عبر المواقع المستقبلية في مدن متعددة." }
      },
      {
        title: { en: "Real Estate Strategy", ar: "استراتيجية العقارات" },
        desc: { en: "Secured a high-visibility flagship location in Riyadh's primary lifestyle district.", ar: "تأمين موقع رئيسي بارز في منطقة أسلوب الحياة الأساسية في الرياض." }
      },
      {
        title: { en: "Hospitality Academy", ar: "أكاديمية الضيافة" },
        desc: { en: "Built an internal training program to standardize the 'modern Saudi' service experience.", ar: "بناء برنامج تدريبي داخلي لتوحيد تجربة الخدمة 'السعودية الحديثة'." }
      }
    ],
    results: {
      en: "The flagship location in Riyadh has become a cultural landmark, consistently operating at full capacity since its launch.",
      ar: "أصبح الموقع الرئيسي في الرياض معلماً ثقافياً، حيث يعمل باستمرار بكامل طاقته منذ إطلاقه."
    },
    gallery: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop"
    ]
  }
};

export default function CaseStudies() {
  const { id } = useParams();
  const study = caseStudyData[id] || caseStudyData["lune-cafe"];
  
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
