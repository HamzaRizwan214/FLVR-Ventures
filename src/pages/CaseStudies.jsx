import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Users, MapPin } from "lucide-react";

const caseStudyData = {
  "lune-cafe": {
    name: "LUNE CAFÉ",
    nameAr: "لون كافيه",
    vertical: { en: "Specialty Coffee", ar: "قهوة مختصة" },
    heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
    mainMetric: "8.4×",
    metricLabel: { en: "Revenue Multiple", ar: "مضاعف الإيرادات" },
    summary: {
      en: "From a single neighborhood roastery to a city-wide benchmark for specialty coffee.",
      ar: "من محمصة محلية في حي واحد إلى معيار مرجعي للقهوة المختصة على مستوى المدينة."
    },
    stats: [
      { label: { en: "Growth", ar: "النمو" }, val: "840%", icon: TrendingUp },
      { label: { en: "Branches", ar: "الفروع" }, val: "08", icon: MapPin },
      { label: { en: "Customer Love", ar: "ولاء العملاء" }, val: "92%", icon: Users },
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
    mainMetric: "Market Leader",
    metricLabel: { en: "Category Creation", ar: "إنشاء الفئة" },
    summary: {
      en: "Redefining the burger experience for the health-conscious Saudi youth.",
      ar: "إعادة تعريف تجربة البرجر للشباب السعودي المهتم بالصحة."
    },
    stats: [
      { label: { en: "Market Share", ar: "حصة السوق" }, val: "#1", icon: TrendingUp },
      { label: { en: "Outlets", ar: "المنافذ" }, val: "03", icon: MapPin },
      { label: { en: "Repeat Rate", ar: "معدل التكرار" }, val: "78%", icon: Users },
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

  return (
    <PageWrapper noPadding>
      <div className="bg-white min-h-screen">
        {/* Navigation Bar (Sticky/Float) */}
        <div className="fixed top-24 left-0 w-full z-[40] px-6 lg:px-16 pointer-events-none">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <Link 
              to="/portfolio"
              className="pointer-events-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors bg-white/80 backdrop-blur-md px-4 py-2 border border-black/5"
            >
              <ArrowLeft size={14} />
              <BilingualText en="Back to Portfolio" ar="العودة للمحفظة" />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img src={study.heroImage} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="relative z-10 text-center text-white px-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 font-[Metropolis]"
            >
              <BilingualText en="Case Study" ar="دراسة حالة" />
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-light tracking-tighter mb-8"
            >
              {study.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed font-[Metropolis]"
            >
              <BilingualText en={study.summary.en} ar={study.summary.ar} />
            </motion.p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
             <div className="w-0.5 h-12 bg-white/20" />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-20 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {study.stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon size={24} className="text-[var(--brand-primary)]" />
                </div>
                <h3 className="text-5xl font-bold text-black mb-2 tracking-tighter font-[Metropolis]">{stat.val}</h3>
                <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                  <BilingualText en={stat.label.en} ar={stat.label.ar} />
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Challenge Side */}
              <div className="lg:col-span-5">
                <div className="sticky top-40 space-y-12">
                   <div>
                     <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-primary)] font-bold mb-6 font-[Metropolis]">
                        <BilingualText en="The Challenge" ar="التحدي" />
                     </p>
                     <h2 className="text-4xl font-light tracking-tighter text-black mb-8">
                        <BilingualText en={study.challenge.title.en} ar={study.challenge.title.ar} />
                     </h2>
                     <p className="text-xl text-black/60 leading-relaxed font-medium font-[Metropolis]">
                        <BilingualText en={study.challenge.content.en} ar={study.challenge.content.ar} />
                     </p>
                   </div>

                   {/* Vertical Gallery Addition */}
                   <div className="space-y-6 pt-12">
                      {study.gallery.map((img, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2 }}
                          className="relative aspect-square overflow-hidden bg-zinc-100 border border-black/5"
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Solution Side */}
              <div className="lg:col-span-7 space-y-24">
                 <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-primary)] font-bold mb-12 font-[Metropolis]">
                      <BilingualText en="FLVR Intervention" ar="تدخل فليفر" />
                    </p>
                    <div className="space-y-16">
                       {study.intervention.map((item, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="flex gap-8 group"
                         >
                           <span className="text-[10px] font-mono text-black/20 mt-1">0{i+1}</span>
                           <div>
                              <h4 className="text-2xl font-bold text-black mb-4 font-[Metropolis]">
                                <BilingualText en={item.title.en} ar={item.title.ar} />
                              </h4>
                              <p className="text-lg text-black/50 leading-relaxed font-medium font-[Metropolis]">
                                <BilingualText en={item.desc.en} ar={item.desc.ar} />
                              </p>
                           </div>
                         </motion.div>
                       ))}
                    </div>
                 </div>

                 {/* Impact Box */}
                 <div className="space-y-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-primary)] font-bold font-[Metropolis]">
                      <BilingualText en="Performance Breakdown" ar="تحليل الأداء" />
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Metric 1: Revenue Growth Chart */}
                      <div className="bg-[#FAFAFA] p-8 border border-black/5 rounded-none flex flex-col justify-between h-[240px]">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis] mb-1">
                            <BilingualText en="Revenue Trajectory" ar="مسار الإيرادات" />
                          </p>
                          <h4 className="text-2xl font-bold font-[Metropolis]">{study.mainMetric}</h4>
                        </div>
                        <div className="h-24 flex items-end gap-1 px-2">
                           {[40, 30, 55, 45, 70, 60, 90].map((h, i) => (
                             <motion.div 
                               key={i}
                               initial={{ height: 0 }}
                               whileInView={{ height: `${h}%` }}
                               transition={{ duration: 1, delay: i * 0.1 }}
                               className="flex-1 bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)] transition-colors"
                             />
                           ))}
                        </div>
                      </div>

                      {/* Metric 2: Market Share / Margin */}
                      <div className="bg-[#FAFAFA] p-8 border border-black/5 rounded-none h-[240px] flex flex-col justify-between">
                         <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis] mb-1">
                             <BilingualText en="Operational Efficiency" ar="الكفاءة التشغيلية" />
                          </p>
                          <h4 className="text-2xl font-bold font-[Metropolis]">+24%</h4>
                        </div>
                        <div className="space-y-4">
                           <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40 font-[Metropolis]">
                               <span>COGS Optimization</span>
                               <span>88%</span>
                             </div>
                             <div className="h-1.5 bg-black/5 w-full">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "88%" }}
                                  transition={{ duration: 1.5, ease: "circOut" }}
                                  className="h-full bg-[var(--brand-primary)]"
                                />
                             </div>
                           </div>
                           <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-40 font-[Metropolis]">
                               <span>Labor Utility</span>
                               <span>94%</span>
                             </div>
                             <div className="h-1.5 bg-black/5 w-full">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "94%" }}
                                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                  className="h-full bg-[var(--brand-primary)]"
                                />
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black p-10 text-white rounded-none">
                      <TrendingUp className="text-[var(--brand-reward)] mb-6" size={24} />
                      <h3 className="text-2xl font-light tracking-tighter mb-4">
                        <BilingualText en="Strategic Outcome" ar="النتيجة الاستراتيجية" />
                      </h3>
                      <p className="text-lg text-white/60 leading-relaxed font-medium font-[Metropolis]">
                         <BilingualText en={study.results.en} ar={study.results.ar} />
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Case Study CTA */}
        <section className="py-48 bg-[#F5F5F5] text-black text-center px-6">
           <div className="max-w-4xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.4em] text-black/30 mb-12 font-bold font-[Metropolis]">
                <BilingualText en="Next Success Story" ar="قصة النجاح القادمة" />
              </p>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-16">
                <BilingualText en="Build your legacy with us." ar="ابنِ إرثك معنا." />
              </h2>
              <div className="flex justify-center gap-6">
                <Link to="/contact" className="btn-primary py-6 px-12 text-lg">
                   <BilingualText en="Start Discovery" ar="ابدأ الاستكشاف" />
                </Link>
              </div>
           </div>
        </section>
      </div>
    </PageWrapper>
  );
}
