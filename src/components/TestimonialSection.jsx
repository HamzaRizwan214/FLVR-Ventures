import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import BilingualText from "./BilingualText";

const testimonials = [
  {
    tag: { en: "Current founder", ar: "مؤسس حالي" },
    company: "Browder Capital",
    quote: {
      en: "When we launched Fund 4 with backing from top institutions, like Sequoia + Cendana Capital, we knew we needed a partner who could support all our ILP needs — AngelList was that partner.",
      ar: "عندما أطلقنا الصندوق الرابع بدعم من مؤسسات كبرى مثل Sequoia و Cendana Capital، كنا نعلم أننا بحاجة إلى شريك يمكنه دعم جميع احتياجاتنا - وكان AngelList هو ذلك الشريك.",
    },
    author: "Joshua Browder",
    caseStudy: { en: "Read case study", ar: "اقرأ دراسة الحالة" },
    role: { en: "PARTNER", ar: "شريك" },
    latestFund: { en: "$30M Fund IV", ar: "30 مليون دولار الصندوق الرابع" },
    lps: {
      en: "Sequoia Capital, Cendana Capital",
      ar: "سيكويا كابيتال، سندانة كابيتال",
    },
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bgColor: "#0b7285", // Olive
    textColor: "white",
  },
  {
    tag: { en: "Growth Partner", ar: "شريك نمو" },
    company: "Vertex Ventures",
    quote: {
      en: "The level of transparency and structured reporting provided transformed how we manage our internal LP relations. Essential for any growth-stage fund.",
      ar: "مستوى الشفافية والتقارير المنظمة المقدمة غير كيفية إدارتنا لعلاقات الشركاء المحدودين الداخلية لدينا. ضروري لأي صندوق في مرحلة النمو.",
    },
    author: "Elena Rodriguez",
    caseStudy: { en: "Read case study", ar: "اقرأ دراسة الحالة" },
    role: { en: "MANAGING DIRECTOR", ar: "مدير عام" },
    latestFund: { en: "$150M Growth II", ar: "150 مليون دولار للنمو الثاني" },
    lps: { en: "Temasek, GIC, SoftBank", ar: "تماسيك، جي آي سي، سوفت بانك" },
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    bgColor: "#ff6b6b", // Dark Teal
    textColor: "white",
  },
  {
    tag: { en: "Strategic Investor", ar: "مستثمر استراتيجي" },
    company: "Luxe Group",
    quote: {
      en: "The platform's intuitive design and white-glove service have set a new standard for our investment cycle management.",
      ar: "إن التصميم البديهي للمنصة والخدمة المتميزة قد وضعا معياراً جديداً لإدارة دورة الاستثمار لدينا.",
    },
    author: "Marcello Vitti",
    caseStudy: { en: "Read case study", ar: "اقرأ دراسة الحالة" },
    role: { en: "CHIEF STRATEGY OFFICER", ar: "رئيس استراتيجية" },
    latestFund: {
      en: "$500M Global Fund",
      ar: "500 مليون دولار الصندوق العالمي",
    },
    lps: { en: "Private Equity Consortium", ar: "اتحاد الأسهم الخاصة" },
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    bgColor: "#ffe37dff", // Lavender/Purple
    textColor: "#1a1a1a",
  },
];

const TestimonialCard = ({ data }) => {
  return (
    <div
      className="flex-shrink-0 w-[85vw] md:w-[95vw] max-w-[1300px] min-h-[500px] lg:h-[650px] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12"
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
    >
      {/* Left Column */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-[10px] uppercase tracking-widest font-bold mb-6 lg:mb-10">
            <BilingualText en={data.tag.en} ar={data.tag.ar} />
          </span>
          <h3 className="text-3xl md:text-5xl font-light tracking-tighter mb-6 lg:mb-8 leading-none">
            {data.company}
          </h3>
          <p className="text-lg md:text-2xl font-light leading-snug opacity-90 max-w-[580px]">
            “<BilingualText en={data.quote.en} ar={data.quote.ar} />”
          </p>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="mb-6">
            <p className="text-base font-medium">{data.author}</p>
            <button className="text-sm underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity mt-2">
              <BilingualText en={data.caseStudy.en} ar={data.caseStudy.ar} />
            </button>
          </div>
          <div className="hidden lg:block text-2xl font-light tracking-tight opacity-40">
            {data.company}
          </div>
        </div>
      </div>

      {/* Right Column / Info Panel */}
      <div className="w-full lg:w-[300px] flex flex-col border-t lg:border-t-0 border-white/20 pt-8 lg:pt-4">
        <div className="flex flex-row lg:flex-col items-start gap-8 lg:gap-0">
          {/* Arch Image - Scaled down for mobile */}
          <div className="w-[100px] md:w-[150px] lg:w-[200px] aspect-[2/3] rounded-t-full rounded-b-full overflow-hidden mb-0 lg:mb-8 border border-white/10 shrink-0">
            <img
              src={data.image}
              alt={data.author}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Grid */}
          <div className="flex flex-col gap-4 lg:gap-6 flex-1">
            <div className="lg:border-t border-white/20 lg:pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">
                <span className="rtl:hidden">PARTNER</span>
                <span className="ltr:hidden">شريك</span>
              </p>
              <p className="text-xs md:text-sm font-medium">{data.author}</p>
            </div>

            <div className="lg:border-t border-white/20 lg:pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">
                <BilingualText en="LATEST FUND" ar="أحدث صندوق" />
              </p>
              <p className="text-xs md:text-sm font-medium">
                <BilingualText en={data.latestFund.en} ar={data.latestFund.ar} />
              </p>
            </div>

            <div className="hidden md:block lg:border-t border-white/20 lg:pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 mb-1">
                <BilingualText
                  en="INSTITUTIONAL LPS"
                  ar="شركاء محدودون مؤسسيون"
                />
              </p>
              <p className="text-xs md:text-sm font-medium leading-relaxed">
                <BilingualText en={data.lps.en} ar={data.lps.ar} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const slider = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("dragging");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("dragging");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="py-32 bg-[var(--bg-primary)] overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-8 px-[5vw] overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory select-none"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-center first:pl-0 last:pr-[5vw]"
          >
            <TestimonialCard data={t} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
