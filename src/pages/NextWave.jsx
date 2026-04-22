import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Zap,
  Target,
  TrendingUp,
  MapPin,
  Layers,
  Cpu,
  Sparkles,
  Rocket,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

const AnimatedNumber = ({ value }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString(),
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

const nextWaveData = {
  "prj-07": {
    code: "PRJ-07",
    name: { en: "The Dessert & Café Fusion", ar: "اندماج الحلويات والمقهى" },
    status: { en: "Concept Validated", ar: "المفهوم محقق" },
    quarter: "Q2 2026",
    theme: "Sunset Gold",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    thesis: {
      en: "Combining artisanal patisserie with third-wave coffee culture in a high-volume, tech-enabled social space.",
      ar: "الجمع بين صناعة الحلويات الحرفية وثقافة القهوة من الموجة الثالثة في مساحة اجتماعية عالية الحجم ومدعومة تقنيًا.",
    },
    metrics: [
      {
        label: { en: "Target Margin", ar: "الهامش المستهدف" },
        value: "32%",
        icon: TrendingUp,
      },
      {
        label: { en: "Flagship Size", ar: "حجم الموقع الرئيسي" },
        value: "450 sqm",
        icon: MapPin,
      },
      {
        label: { en: "CapEx Efficiency", ar: "كفاءة التكاليف" },
        value: "1.4x",
        icon: Zap,
      },
    ],
    details: [
      {
        title: { en: "The Opportunity", ar: "الفرصة" },
        content: {
          en: "Bridging the gap between luxury dessert boutiques and high-traffic coffee chains.",
          ar: "سد الفجوة بين محلات الحلويات الفاخرة وسلاسل القهوة ذات الإقبال العالي.",
        },
        image:
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: { en: "Technology", ar: "التكنولوجيا" },
        content: {
          en: "Proprietary inventory management system reducing waste by 25% through predictive baking.",
          ar: "نظام إدارة مخزون خاص يقلل الهدر بنسبة ٢٥٪ من خلال الخبز التنبؤي.",
        },
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: { en: "Roadmap", ar: "خارطة الطريق" },
        content: {
          en: "Riyadh flagship launch followed by Dubai and Doha within 18 months.",
          ar: "إطلاق الموقع الرئيسي في الرياض يليه دبي والدوحة خلال ١٨ شهرًا.",
        },
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "prj-08": {
    code: "PRJ-08",
    name: { en: "Confidential Tech-Dining", ar: "مشروع تقني سري" },
    status: { en: "Term Sheet Signed", ar: "توقيع الاتفاقية" },
    quarter: "Q3 2026",
    theme: "Deep Emerald",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    thesis: {
      en: "A disruptive casual dining experience leveraging automated kitchen logistics and AI-driven personalized menus.",
      ar: "تجربة طعام كاجوال مبتكرة تستفيد من اللوجستيات الآلية للمطبخ والقوائم الشخصية القائمة على الذكاء الاصطناعي.",
    },
    metrics: [
      {
        label: { en: "Labor Efficiency", ar: "كفاءة العمالة" },
        value: "+40%",
        icon: Cpu,
      },
      {
        label: { en: "Table Turnover", ar: "دوران الطاولات" },
        value: "2.5x",
        icon: Layers,
      },
      {
        label: { en: "Tech Stack", ar: "البنية التقنية" },
        value: "Proprietary",
        icon: Zap,
      },
    ],
    details: [
      {
        title: { en: "Operational Edge", ar: "الميزة التشغيلية" },
        content: {
          en: "Reducing human error in food prep while maintaining artisanal quality.",
          ar: "تقليل الأخطاء البشرية في تحضير الطعام مع الحفاظ على الجودة الحرفية.",
        },
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: { en: "Market Fit", ar: "التوافق مع السوق" },
        content: {
          en: "Designed for the fast-paced, high-tech lifestyle of Saudi Arabia's Vision 2030 hubs.",
          ar: "مصمم لأسلوب الحياة السريع والتقني في مراكز رؤية السعودية ٢٠٣٠.",
        },
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "prj-09": {
    code: "PRJ-09",
    name: { en: "Next-Gen Ghost Network", ar: "شبكة مطابخ سحابية" },
    status: { en: "Due Diligence", ar: "العناية الواجبة" },
    quarter: "Q4 2026",
    theme: "Royal Indigo",
    gradient: "from-indigo-400 via-purple-500 to-fuchsia-600",
    thesis: {
      en: "Scalable infrastructure for micro-brands with centralized distribution and shared supply chains.",
      ar: "بنية تحتية قابلة للتوسع للعلامات التجارية الصغيرة مع توزيع مركزي وسلاسل توريد مشتركة.",
    },
    metrics: [
      {
        label: { en: "Brand Capacity", ar: "سعة العلامات" },
        value: "15+",
        icon: Target,
      },
      {
        label: { en: "Launch Speed", ar: "سرعة الإطلاق" },
        value: "14 Days",
        icon: Rocket,
      },
      {
        label: { en: "Sustainability", ar: "الاستدامة" },
        value: "High",
        icon: Sparkles,
      },
    ],
    details: [
      {
        title: { en: "Micro-Fulfillment", ar: "التنفيذ المصغر" },
        content: {
          en: "Reimagining the ghost kitchen model for maximum localized delivery speed.",
          ar: "إعادة تصور نموذج المطبخ السحابي لتحقيق أقصى سرعة توصيل محلية.",
        },
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
};

export default function NextWave() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = nextWaveData[id] || nextWaveData["prj-07"];
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <PageWrapper noPadding>
      <div className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
        {/* Navigation */}
        <nav className="fixed top-24 left-0 w-full z-50 px-6 lg:px-16 pointer-events-none">
          <div className="max-w-[1600px] mx-auto">
            <Link
              to="/portfolio"
              className="pointer-events-auto inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <BilingualText en="Back to Timeline" ar="العودة للجدول الزمني" />
            </Link>
          </div>
        </nav>

        {/* Hero Section - Apple Standard Liquid Gradient */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
          {/* Animated Liquid Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
          />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-gradient-to-tr ${project.gradient} rounded-full blur-[120px] opacity-30`}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className={`absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-bl ${project.gradient} rounded-full blur-[120px] opacity-30`}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {project.code} // {project.quarter}
              </div>
              <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-12">
                <BilingualText en={project.name.en} ar={project.name.ar} />
              </h1>
              <p className="text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed text-black/80 font-[Metropolis]">
                <BilingualText en={project.thesis.en} ar={project.thesis.ar} />
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Metric Grid */}
        <section className="py-32 px-6 border-y border-black/[0.03] bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative p-12 bg-white/70 backdrop-blur-2xl border border-black/[0.03] rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.02)] hover:shadow-[0_80px_120px_-30px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden"
                >
                  {/* Balanced, Apple-style Brand Tint on Hover (25% opacity) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.25] transition-all duration-1000 ease-out`}
                  />

                  {/* Glass highlight layer */}
                  <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="relative z-10 flex flex-col h-full transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-black/[0.03] flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <metric.icon size={20} />
                    </div>

                    <h3 className="text-6xl font-bold tracking-tighter mb-4 font-[Metropolis] text-black/90 group-hover:text-black transition-colors duration-500">
                      <AnimatedNumber value={metric.value} />
                    </h3>

                    <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 font-bold font-[Metropolis] group-hover:text-black/60 transition-colors duration-500">
                      <BilingualText
                        en={metric.label.en}
                        ar={metric.label.ar}
                      />
                    </p>

                    <div className="mt-8 h-px w-12 bg-black/5 group-hover:bg-black/10 group-hover:w-full transition-all duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Timeline Section */}
        <section className="py-12 px-6 bg-[#FAFAFA] overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-20 px-6 lg:px-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-4 font-[Metropolis]">
                <BilingualText
                  en="Strategic Roadmap"
                  ar="خارطة الطريق الاستراتيجية"
                />
              </p>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter font-[Metropolis]">
                <BilingualText en="Phased Evolution" ar="التطور المرحلي" />
              </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto pb-20 pt-4 px-6 lg:px-16 gap-8 snap-x snap-mandatory no-scrollbar">
              {project.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex-shrink-0 w-[85vw] md:w-[600px] snap-center"
                >
                  <div className="group relative bg-white/70 backdrop-blur-2xl border border-black/[0.03] rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] hover:shadow-[0_80px_120px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    {/* Visual Area */}
                    <div className="h-[340px] overflow-hidden relative">
                      <img
                        src={detail.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                      />
                      {/* Subtle brand-colored light leak */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-1000`}
                      />

                      <div className="absolute top-8 left-8 px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-black shadow-sm border border-black/[0.02]">
                        Phase {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-12 flex flex-col justify-between flex-grow">
                      <div>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-8 font-[Metropolis] opacity-40`}
                        >
                          <BilingualText
                            en={detail.title.en}
                            ar={detail.title.ar}
                          />
                        </p>
                        <h3 className="text-3xl md:text-4xl font-light tracking-tighter leading-[1.1] mb-10 font-[Metropolis] text-black/90">
                          <BilingualText
                            en={detail.content.en}
                            ar={detail.content.ar}
                          />
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/30 font-[Metropolis]">
                          <BilingualText en="Status: Active" ar="الحالة: نشط" />
                          <div className="w-12 h-px bg-black/5" />
                        </div>

                        <div
                          className={`w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500`}
                        >
                          <ArrowLeft className="rotate-180" size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Shifting Accent Line (Subtle) */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${project.gradient} w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]`}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Spacer for horizontal scroll ending */}
              <div className="flex-shrink-0 w-32 hidden md:block" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-black text-white text-center px-6 overflow-hidden relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 blur-3xl`}
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">
                <BilingualText
                  en="Be part of the next wave."
                  ar="كن جزءًا من الموجة القادمة."
                />
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-lg font-medium hover:bg-zinc-200 transition-colors"
              >
                <BilingualText en="Partner with us" ar="شاركنا النجاح" />
                <ArrowLeft className="rotate-180" size={20} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
