import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";
import { 
  ArrowUpRight, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Users,
  ChefHat,
  Truck,
  Layers,
  MapPin,
  Plus,
  Minus,
  CheckCircle2,
  XCircle,
  Activity
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const fundMetrics = [
  {
    label: { en: "Fund Size", ar: "حجم الصندوق" },
    value: "SAR 100M",
    icon: <BarChart3 className="w-5 h-5" />,
    desc: { en: "Committed growth capital for F&B icons.", ar: "رأس مال نمو ملتزم لأيقونات الأغذية والمشروبات." }
  },
  {
    label: { en: "Cohort Focus", ar: "تركيز الفوج" },
    value: "06 Brands",
    icon: <Target className="w-5 h-5" />,
    desc: { en: "Diversified across 6 high-growth verticals.", ar: "متنوع عبر ٦ قطاعات عالية النمو." }
  },
  {
    label: { en: "Launch Window", ar: "نافذة الانطلاق" },
    value: "Q1 2027",
    icon: <Zap className="w-5 h-5" />,
    desc: { en: "Full market deployment and scaling.", ar: "النشر الكامل في السوق والتوسع." }
  },
  {
    label: { en: "Model", ar: "النموذج" },
    value: "Studio-Backed",
    icon: <ShieldCheck className="w-5 h-5" />,
    desc: { en: "Capital de-risked by operational SOPs.", ar: "رأس مال محمي بإجراءات تشغيلية معيارية." }
  }
];

const operatingOS = [
  {
    title: { en: "Supply Chain Shield", ar: "درع سلسلة التوريد" },
    desc: { en: "Leverage our collective buying power to secure raw materials at 15-22% lower costs than market average.", ar: "استفد من قوتنا الشرائية الجماعية لتأمين المواد الخام بتكاليف أقل بنسبة ١٥-٢٢٪ من متوسط السوق." },
    icon: <Truck className="w-6 h-6" />
  },
  {
    title: { en: "The Tech Stack", ar: "الحزمة التقنية" },
    desc: { en: "Proprietary KDS, AI-driven inventory management, and integrated loyalty systems deployed on day one.", ar: "نظام عرض المطبخ الملكية، وإدارة المخزون المدعومة بالذكاء الاصطناعي، وأنظمة الولاء المتكاملة التي يتم نشرها من اليوم الأول." },
    icon: <Layers className="w-6 h-6" />
  },
  {
    title: { en: "Talent Academy", ar: "أكاديمية المواهب" },
    desc: { en: "Access to our centralized recruitment and training hub that certifies 'Master Operators' in under 30 days.", ar: "الوصول إلى مركز التوظيف والتدريب المركزي لدينا الذي يعتمد 'المشغلين المهرة' في أقل من ٣٠ يوماً." },
    icon: <ChefHat className="w-6 h-6" />
  },
  {
    title: { en: "Prime Real Estate", ar: "العقارات المميزة" },
    desc: { en: "Direct access to Tier-1 developers and exclusive site selections across Riyadh, Jeddah, and Khobar.", ar: "وصول مباشر إلى كبار المطورين واختيارات حصرية للمواقع في الرياض وجدة والخبر." },
    icon: <MapPin className="w-6 h-6" />
  }
];

const cohortBrands = [
  {
    name: "AMM ABDO",
    role: { en: "Heritage Anchor", ar: "مرتكز التراث" },
    concept: { en: "Street Roots & Modern Attitude", ar: "جذور الشارع وأسلوب حديث" },
    color: "bg-[#ffd43b]"
  },
  {
    name: "BURGER ABO ASHRA",
    role: { en: "Value Disruptor", ar: "معطل القيمة" },
    concept: { en: "Sharp Pricing & Mass Appeal", ar: "أسعار تنافسية وجاذبية جماهيرية" },
    color: "bg-[#ff6b6b]"
  },
  {
    name: "JOHNNY & JAMAL",
    role: { en: "Cultural Storyteller", ar: "راوي الثقافة" },
    concept: { en: "Character-Led Contrast", ar: "تباين قائم على الشخصية" },
    color: "bg-[#4dabf7]"
  },
  {
    name: "BUTCHER COUNTER",
    role: { en: "Premium Specialist", ar: "متخصص فاخر" },
    concept: { en: "Cleaner, Sharper Fast-Casual", ar: "كاجوال سريع أنظف وأكثر حدة" },
    color: "bg-[#343a40]"
  },
  {
    name: "HAPPINESS LAB",
    role: { en: "Experience Leader", ar: "قائد التجربة" },
    concept: { en: "Mood & Emotional Pull", ar: "المزاج والجاذبية العاطفية" },
    color: "bg-[#f06595]"
  },
  {
    name: "DILLI BIRYANI",
    role: { en: "Comfort Giant", ar: "عملاق الراحة" },
    concept: { en: "Flavor Depth & Repeat Demand", ar: "عمق النكهة والطلب المتكرر" },
    color: "bg-[#20c997]"
  }
];

const scalingBlueprint = [
  {
    phase: "01",
    title: { en: "Concept Hardening", ar: "تصلب المفهوم" },
    desc: { en: "We refine your menu and kitchen workflow for extreme efficiency and flavor consistency at scale.", ar: "نقوم بتحسين قائمتك وسير عمل المطبخ لتحقيق كفاءة قصوى واتساق في النكهة عند التوسع." }
  },
  {
    phase: "02",
    title: { en: "Pilot Pressure", ar: "ضغط التجريب" },
    desc: { en: "Testing the brand in high-volume environments to stress-test SOPs and financial unit economics.", ar: "اختبار العلامة التجارية في بيئات عالية الحجم لاختبار تحمل الإجراءات واقتصاديات الوحدة المالية." }
  },
  {
    phase: "03",
    title: { en: "Systematization", ar: "التحويل إلى نظام" },
    desc: { en: "Turning every task into a repeatable digital SOP, ensuring the 50th branch tastes like the 1st.", ar: "تحويل كل مهمة إلى إجراء تشغيلي رقمي متكرر، مما يضمن أن يكون أن الفرع الخمسين له نفس مذاق الفرع الأول." }
  },
  {
    phase: "04",
    title: { en: "Aggressive Scale", ar: "التوسع الهجومي" },
    desc: { en: "Deploying fund capital to rapidly open locations across the GCC with military-grade precision.", ar: "توظيف رأس مال الصندوق لفتح مواقع بسرعة في دول مجلس التعاون الخليجي بدقة عسكرية." }
  }
];

const strategyPillars = [
  {
    title: { en: "Capital Discipline", ar: "انضباط رأس المال" },
    desc: { en: "We deploy capital where unit economics are proven and scalable.", ar: "نوظف رأس المال حيث تكون اقتصاديات الوحدة مثبتة وقابلة للتوسع." }
  },
  {
    title: { en: "Operational De-Risking", ar: "تقليل المخاطر التشغيلية" },
    desc: { en: "Our studio model handles the SOPs, logistics, and supply chain.", ar: "يتولى نموذج الاستوديو لدينا الإجراءات والخدمات اللوجستية وسلسلة التوريد." }
  },
  {
    title: { en: "Founder-Centric", ar: "محورية المؤسس" },
    desc: { en: "We back visionary founders with the tools to become category leaders.", ar: "ندعم المؤسسين الطموحين بالأدوات اللازمة ليصبحوا قادة في فئتهم." }
  }
];

const faqData = [
  {
    q: { en: "Will I lose creative control over my brand?", ar: "هل سأفقد السيطرة الإبداعية على علامتي التجارية؟" },
    a: { en: "No. You are the soul of the brand. We handle the pipes (operations, supply chain, scale) so you can focus on the flavor and the story.", ar: "لا. أنت روح العلامة التجارية. نحن نتولى 'الأنابيب' (العمليات، سلسلة التوريد، التوسع) حتى تتمكن من التركيز على النكهة والقصة." }
  },
  {
    q: { en: "What is the typical timeframe for scaling?", ar: "ما هو الإطار الزمني النموذجي للتوسع؟" },
    a: { en: "Our goal is to move from concept hardening to national deployment within 12 to 18 months, depending on the vertical.", ar: "هدفنا هو الانتقال من تصلب المفهوم إلى النشر الوطني في غضون ١٢ إلى ١٨ شهراً، اعتماداً على القطاع." }
  },
  {
    q: { en: "How do you help with the labor shortage?", ar: "كيف تساعدون في حل مشكلة نقص العمالة؟" },
    a: { en: "Our Talent Academy provides a steady stream of trained operators, reducing your recruitment stress and turnover rates.", ar: "توفر أكاديمية المواهب لدينا تدفقاً مستمراً من المشغلين المدربين، مما يقلل من ضغوط التوظيف ومعدلات الدوران لديك." }
  }
];

// ─── Components ───────────────────────────────────────────────────────────────

const SectionLabel = ({ en, ar }) => (
  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--brand-primary)] mb-8 font-[Metropolis]">
    <BilingualText en={en} ar={ar} />
  </p>
);

const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className="border-b border-black/5 last:border-0 overflow-hidden">
    <button 
      onClick={onClick}
      className="w-full py-8 flex items-center justify-between text-left group"
    >
      <span className="text-xl md:text-2xl font-light tracking-tight group-hover:text-[var(--brand-primary)] transition-colors">
        <BilingualText en={item.q.en} ar={item.q.ar} />
      </span>
      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="pb-8 text-lg text-black/50 leading-relaxed max-w-3xl">
            <BilingualText en={item.a.en} ar={item.a.ar} />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/**
 * Enhanced Hero Background with Animated Grid and Ambient Glows
 */
const HeroVisuals = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)", 
          backgroundSize: "60px 60px" 
        }} 
      />
      
      {/* Ambient Glows */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[var(--brand-primary)]/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 100, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#ffd43b]/10 blur-[100px] rounded-full"
      />

      {/* Floating Geometric Elements (Abstract Capital Icons) */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -40, 0],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              delay: i * 1,
              ease: "easeInOut" 
            }}
            className="absolute text-black/5"
            style={{ 
              top: `${20 + i * 12}%`, 
              left: `${10 + i * 15}%`,
            }}
          >
            {i % 2 === 0 ? <Activity size={80 + i * 20} /> : <BarChart3 size={60 + i * 25} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Funds = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Parallax Transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <PageWrapper noPadding>
      <div ref={containerRef} className="bg-[#f8f9fa] min-h-screen font-sans text-black overflow-hidden">
        
        {/* ── Section 1: Enhanced Hero ── */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-24 px-6 lg:px-16 border-b border-black/5 bg-white">
          <HeroVisuals />
          
          <div className="max-w-[1600px] mx-auto w-full relative z-10">
            <motion.div
              style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
              className="relative"
            >
              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel en="FLVR Fund I" ar="صندوق فليفر الأول" />
                </motion.div>
              </div>

              <h1 className="text-[clamp(3.5rem,12vw,13rem)] font-bold tracking-tighter leading-[0.8] mb-12 lg:mb-16">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block overflow-hidden"
                >
                  <BilingualText 
                    en={<>SAR 100M</>}
                    ar={<>١٠٠ مليون ريال</>}
                  />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                  className="block text-black/10 mt-2"
                >
                  <BilingualText 
                    en="Growth Mandate."
                    ar="تكليف النمو."
                  />
                </motion.span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-t border-black/5 pt-16">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="lg:col-span-7"
                >
                  <p className="max-w-2xl text-2xl lg:text-3xl font-light leading-[1.2] text-black/80 tracking-tight">
                    <BilingualText 
                      en="A precision capital vehicle transforming breakout concepts into national icons. We invest in relevance, repeat demand, and disciplined scale."
                      ar="وعاء استثماري دقيق يحول المفاهيم الواعدة إلى أيقونات وطنية. نستثمر في الملاءمة، والطلب المتكرر، والتوسع المنضبط."
                    />
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-10"
                >
                   <div className="text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 mb-2 font-[Metropolis]">Deployment Status</p>
                      <div className="flex items-center gap-3 justify-start sm:justify-end">
                        <p className="text-lg font-bold uppercase tracking-widest text-[var(--brand-primary)] font-[Metropolis]">Active Stage</p>
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] animate-ping" />
                      </div>
                   </div>
                   
                   <button className="group relative px-8 py-5 bg-black text-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl">
                     <motion.div 
                       className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] to-[#ffd43b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     />
                     <span className="relative z-10 flex items-center gap-3 font-bold text-xs uppercase tracking-widest font-[Metropolis]">
                       <BilingualText en="Investor Portal" ar="بوابة المستثمر" />
                       <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </span>
                   </button>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Scroll Indicator Icon */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-black/20 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 vertical-text">Scroll</span>
            </motion.div>
          </div>
        </section>

        {/* ── Section 2: Founder Manifesto ── */}
        <section className="py-32 px-6 lg:px-16 bg-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "40px 40px" }} />
           <div className="max-w-[1600px] mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                 >
                    <SectionLabel en="The Manifesto" ar="البيان" />
                    <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-tight mb-12">
                       <BilingualText en="Built by operators, for founders." ar="بني من قبل مشغلين، للمؤسسين." />
                    </h2>
                    <div className="space-y-8">
                       <p className="text-2xl font-light leading-relaxed text-black/60">
                          <BilingualText 
                            en="We know the kitchen is hard. We know the 4:00 AM supply runs. We are not just finance people; we are builders who speak your language."
                            ar="نحن نعلم أن المطبخ صعب. نحن نعلم عن جولات التوريد في الساعة ٤ فجراً. نحن لسنا مجرد ماليين؛ نحن بناة نتحدث لغتك."
                          />
                       </p>
                       <p className="text-xl font-light leading-relaxed text-black/40">
                          <BilingualText 
                            en="Our goal is to remove the operational friction so you can focus on the soul of your brand—the flavor and the community."
                            ar="هدفنا هو إزالة الاحتكاك التشغيلي حتى تتمكن من التركيز على روح علامتك التجارية - النكهة والمجتمع."
                          />
                       </p>
                    </div>
                 </motion.div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: <TrendingUp className="text-emerald-500" />, title: { en: "Scale without Stress", ar: "التوسع دون ضغوط" } },
                      { icon: <ShieldCheck className="text-blue-500" />, title: { en: "Operational Safety", ar: "الأمان التشغيلي" } },
                      { icon: <Zap className="text-amber-500" />, title: { en: "Rapid Deployment", ar: "النشر السريع" } },
                      { icon: <Target className="text-rose-500" />, title: { en: "Niche Dominance", ar: "الهيمنة على المجال" } }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-[#f8f9fa] rounded-3xl border border-black/5"
                      >
                         <div className="mb-6">{item.icon}</div>
                         <h4 className="text-xl font-bold tracking-tight">
                            <BilingualText en={item.title.en} ar={item.title.ar} />
                         </h4>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* ── Section 3: Core Metrics ── */}
        <section className="py-24 px-6 lg:px-16 bg-white">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fundMetrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 border border-black/5 rounded-3xl group hover:bg-black hover:text-white transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/[0.03] group-hover:bg-white/10 flex items-center justify-center mb-8 transition-colors">
                    {m.icon}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-2 font-[Metropolis]">{m.value}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 mb-6 font-[Metropolis]">
                    <BilingualText en={m.label.en} ar={m.label.ar} />
                  </p>
                  <p className="text-sm leading-relaxed opacity-60">
                    <BilingualText en={m.desc.en} ar={m.desc.ar} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Operating OS ── */}
        <section className="py-40 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center mb-24">
             <SectionLabel en="The Operating OS" ar="نظام التشغيل" />
             <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8">What we actually do.</h2>
             <p className="text-xl text-black/40 max-w-2xl mx-auto">
                <BilingualText 
                  en="Capital is the fuel, but our Operating OS is the engine. We de-risk your growth by providing institutional-grade infrastructure."
                  ar="رأس المال هو الوقود، لكن نظام التشغيل لدينا هو المحرك. نحن نقلل من مخاطر نموك من خلال توفير بنية تحتية ذات معايير مؤسسية."
                />
             </p>
          </div>

          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             {operatingOS.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="p-12 bg-white rounded-[3rem] border border-black/5 hover:border-[var(--brand-primary)]/20 transition-all duration-700 group relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700">
                     {React.cloneElement(item.icon, { size: 120 })}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] flex items-center justify-center mb-10 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all duration-500">
                     {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-6 font-[Metropolis]">
                     <BilingualText en={item.title.en} ar={item.title.ar} />
                  </h3>
                  <p className="text-xl text-black/50 leading-relaxed font-light">
                     <BilingualText en={item.desc.en} ar={item.desc.ar} />
                  </p>
               </motion.div>
             ))}
          </div>
        </section>

        {/* ── Section 5: The Cohort Grid ── */}
        <section className="py-32 lg:py-48 px-6 lg:px-16 bg-[#0b7285] text-white rounded-[4rem] mx-4 my-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-[1600px] mx-auto relative z-10">
            <div className="max-w-3xl mb-24">
              <SectionLabel en="The Cohort" ar="الفوج" />
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-12">
                <BilingualText 
                  en="Diversified across six high-velocity verticals."
                  ar="متنوع عبر ستة قطاعات عالية السرعة."
                />
              </h2>
              <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                <BilingualText 
                  en="The Fund's capital is strategically allocated to ensure market dominance across the entire F&B spectrum, from value mass-market to premium specialized dining."
                  ar="يتم توزيع رأس مال الصندوق بشكل استراتيجي لضمان الهيمنة على السوق عبر كامل نطاق قطاع الأغذية والمشروبات، من القيمة السوقية الشاملة إلى المطاعم المتخصصة الفاخرة."
                />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cohortBrands.map((brand, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className={`w-3 h-3 rounded-full ${brand.color} shadow-[0_0_20px_rgba(255,255,255,0.2)]`} />
                    <span className="text-[10px] font-mono opacity-20">0{i+1}</span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tighter mb-2 group-hover:text-[#ffd43b] transition-colors">{brand.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6 font-[Metropolis]">
                    <BilingualText en={brand.role.en} ar={brand.role.ar} />
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    <BilingualText en={brand.concept.en} ar={brand.concept.ar} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: The Scaling Blueprint ── */}
        <section className="py-40 px-6 lg:px-16 bg-black text-white rounded-[4rem] mx-4 my-12 relative overflow-hidden">
           <div className="max-w-[1600px] mx-auto">
              <div className="mb-32">
                 <SectionLabel en="Methodology" ar="المنهجية" />
                 <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter">The Path to Scale.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
                 {/* Connecting Line */}
                 <div className="absolute top-24 left-0 w-full h-px bg-white/10 hidden md:block" />
                 
                 {scalingBlueprint.map((step, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="relative z-10"
                   >
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold font-[Metropolis] mb-12 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                         {step.phase}
                      </div>
                      <h4 className="text-2xl font-bold mb-6 tracking-tight font-[Metropolis]">
                         <BilingualText en={step.title.en} ar={step.title.ar} />
                      </h4>
                      <p className="text-lg text-white/50 leading-relaxed font-light">
                         <BilingualText en={step.desc.en} ar={step.desc.ar} />
                      </p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* ── Section 7: Strategic Strategy Pillars ── */}
        <section className="py-32 lg:py-48 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5">
                <SectionLabel en="Investment Strategy" ar="استراتيجية الاستثمار" />
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-12">
                  <BilingualText en="Disciplined deployment." ar="التوظيف المنضبط." />
                </h2>
                <p className="text-xl text-black/50 leading-relaxed font-light mb-12">
                  <BilingualText 
                    en="We don't just write checks. We install institutional rigor into every brand we back, ensuring that growth is sustainable and returns are predictable."
                    ar="نحن لا نكتفي بكتابة الشيكات فحسب، بل نغرس الصرامة المؤسسية في كل علامة تجارية ندعمها، مما يضمن أن يكون النمو مستداماً والعوائد متوقعة."
                  />
                </p>
                <div className="p-8 bg-black text-white rounded-3xl inline-flex items-center gap-6 group cursor-pointer hover:scale-105 transition-transform duration-500 shadow-xl">
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 font-[Metropolis]">Inquiry Status</p>
                      <p className="text-lg font-bold">Open for Partnership</p>
                   </div>
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#ffd43b] group-hover:text-black transition-colors">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {strategyPillars.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-12 bg-white border border-black/5 rounded-[2.5rem] group hover:border-[var(--brand-primary)]/30 transition-all duration-500"
                  >
                    <div className="flex gap-8 items-start">
                       <span className="text-4xl font-light text-black/10 font-[Metropolis] group-hover:text-[var(--brand-primary)] transition-colors">0{i+1}</span>
                       <div>
                          <h3 className="text-2xl font-bold mb-4 tracking-tight font-[Metropolis]">
                             <BilingualText en={p.title.en} ar={p.title.ar} />
                          </h3>
                          <p className="text-lg text-black/50 leading-relaxed font-light group-hover:text-black transition-colors">
                             <BilingualText en={p.desc.en} ar={p.desc.ar} />
                          </p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 8: Why Us? ── */}
        <section className="py-40 px-6 lg:px-16 bg-white">
           <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div>
                    <SectionLabel en="Comparative Advantage" ar="الميزة النسبية" />
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-12">Not just another VC.</h2>
                    <p className="text-xl text-black/50 leading-relaxed font-light mb-12">
                       Traditional venture capital gives you a check and a quarterly meeting. We give you a system and a daily partnership.
                    </p>
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                       <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                       <p className="text-sm font-medium text-emerald-800">
                          <BilingualText 
                            en="92% of FLVR brands achieve profitability within the first 6 months."
                            ar="٩٢٪ من علامات فليفر تحقق الربحية في أول ٦ أشهر."
                          />
                       </p>
                    </div>
                 </div>

                 <div className="bg-[#f8f9fa] rounded-[3rem] p-12 border border-black/5">
                    <div className="grid grid-cols-2 gap-8 mb-12 border-b border-black/5 pb-8">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">Traditional VC</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--brand-primary)]">FLVR Fund</p>
                    </div>
                    <div className="space-y-10">
                       {[
                         { en: "Monthly Advice vs. Daily Ops", ar: "نصيحة شهرية مقابل عمليات يومية" },
                         { en: "Exit Pressure vs. Brand Legacy", ar: "ضغط الخروج مقابل إرث العلامة" },
                         { en: "High Burn vs. Lean Efficiency", ar: "احتراق عالٍ مقابل كفاءة رشيقة" },
                         { en: "Sole Struggle vs. Shared Services", ar: "نضال منفرد مقابل خدمات مشتركة" }
                       ].map((item, i) => (
                         <div key={i} className="grid grid-cols-2 gap-8">
                            <div className="flex items-center gap-3 opacity-30 line-through">
                               <XCircle size={16} />
                               <span className="text-sm font-medium"><BilingualText en={item.en.split(" vs. ")[0]} ar={item.ar.split(" مقابل ")[0]} /></span>
                            </div>
                            <div className="flex items-center gap-3 text-black">
                               <CheckCircle2 size={16} className="text-[var(--brand-primary)]" />
                               <span className="text-sm font-bold"><BilingualText en={item.en.split(" vs. ")[1]} ar={item.ar.split(" مقابل ")[1]} /></span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ── Section 9: FAQ ── */}
        <section className="py-40 px-6 lg:px-16 bg-[#f8f9fa]">
           <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                 <div className="lg:col-span-5">
                    <SectionLabel en="Support Hub" ar="مركز الدعم" />
                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-8">Tough questions,<br/>transparent answers.</h2>
                    <p className="text-xl text-black/40 font-light">
                       Scaling is a commitment. We believe in absolute transparency from day one.
                    </p>
                 </div>
                 <div className="lg:col-span-7">
                    {faqData.map((item, i) => (
                      <AccordionItem 
                        key={i} 
                        item={item} 
                        isOpen={openFaq === i} 
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)} 
                      />
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* ── Section 10: The Launch Timeline ── */}
        <section className="py-32 bg-black text-white rounded-[4rem] mx-4 mb-12 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,114,133,0.15)_0%,transparent_70%)]" />
           <div className="max-w-4xl mx-auto relative z-10 px-6">
              <SectionLabel en="Roadmap to 2027" ar="خارطة الطريق لعام ٢٠٢٧" />
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-12">
                 <BilingualText en="Building the icons." ar="بناء الأيقونات." />
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                 <div className="space-y-2">
                    <p className="text-4xl font-bold text-[#ffd43b] font-[Metropolis]">2024</p>
                    <p className="text-xs uppercase tracking-widest opacity-40 font-bold font-[Metropolis]">Concept Validation</p>
                 </div>
                 <div className="hidden md:block w-12 h-px bg-white/20" />
                 <div className="space-y-2">
                    <p className="text-4xl font-bold text-white font-[Metropolis]">2025</p>
                    <p className="text-xs uppercase tracking-widest opacity-40 font-bold font-[Metropolis]">Beta Launch</p>
                 </div>
                 <div className="hidden md:block w-12 h-px bg-white/20" />
                 <div className="space-y-2">
                    <p className="text-4xl font-bold text-white font-[Metropolis]">2026</p>
                    <p className="text-xs uppercase tracking-widest opacity-40 font-bold font-[Metropolis]">System Scaling</p>
                 </div>
                 <div className="hidden md:block w-12 h-px bg-white/20" />
                 <div className="space-y-2">
                    <p className="text-4xl font-bold text-[var(--brand-primary)] font-[Metropolis]">2027</p>
                    <p className="text-xs uppercase tracking-widest opacity-40 font-bold font-[Metropolis]">Full Deployment</p>
                 </div>
              </div>
           </div>
        </section>

        {/* ── Section 11: Final CTA ── */}
        <section className="py-60 bg-black text-white text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,114,133,0.15)_0%,transparent_70%)]" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-5xl mx-auto relative z-10 px-6"
           >
              <SectionLabel en="The Future of F&B" ar="مستقبل الأغذية والمشروبات" />
              <h2 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-none mb-20">
                 Ready to<br/>scale high?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                 <button className="px-16 py-8 bg-white text-black rounded-full text-xl font-bold hover:bg-[#ffd43b] transition-all duration-500 shadow-2xl flex items-center gap-4 group">
                    <BilingualText en="Founders: Inquire Now" ar="للمؤسسين: استفسر الآن" />
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
              </div>
           </motion.div>
        </section>

      </div>
    </PageWrapper>
  );
};

export default Funds;
