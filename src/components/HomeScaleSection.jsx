import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BilingualText from "./BilingualText";
import { cn } from "@/lib/utils";

const scaleItems = [
  {
    category: { en: "Identification", ar: "تحديد الهوية" },
    title: { en: "Filter", ar: "تصفية" },
    description: {
      en: "Identify concepts with real relevance, repeat demand, and room to lead.",
      ar: "نحدد المفاهيم ذات الصلة الحقيقية، والطلب المتكرر، والقدرة على القيادة.",
    },
    image: "/concept.jpg",
    boldText: { en: "Identify concepts", ar: "تحديد المفاهيم" },
  },
  {
    category: { en: "Optimization", ar: "تحسين" },
    title: { en: "Lift", ar: "رفع" },
    description: {
      en: "Strengthen the brand, business model, and operating foundation for scale.",
      ar: "تعزيز العلامة التجارية ونموذج العمل والأساس التشغيلي للتوسع.",
    },
    image: "/busy.jpg",
    boldText: { en: "Strengthen the brand", ar: "تعزيز العلامة" },
  },
  {
    category: { en: "Performance", ar: "الأداء" },
    title: { en: "Validate", ar: "تحقق" },
    description: {
      en: "Prove the concept through traction, unit economics, and execution.",
      ar: "إثبات المفهوم من خلال الجذب، واقتصاديات الوحدة، والتنفيذ.",
    },
    image: "/prove.jpg",
    boldText: { en: "Prove the concept", ar: "إثبات المفهوم" },
  },
  {
    category: { en: "Acceleration", ar: "تسريع" },
    title: { en: "Run", ar: "تشغيل" },
    description: {
      en: "Accelerate growth through disciplined execution, expansion, and brand momentum.",
      ar: "تسريع النمو من خلال التنفيذ المنضبط والتوسع وزخم العلامة التجارية.",
    },
    image: "/grow.jpg",
    boldText: { en: "Accelerate growth", ar: "تسريع النمو" },
  },
];

export default function HomeScaleSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 sm:py-32">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl">
            <BilingualText
              en="From Early Traction to Enduring Scale"
              ar="من الجذب المبكر إلى النطاق المستدام"
            />
          </h2>
          <div className="mt-4 h-px w-24 bg-[var(--brand-primary)]" />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {scaleItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-start"
            >
              {/* Category Label */}
              <div className="mb-6">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-[var(--text-primary)]">
                  <BilingualText en={item.category.en} ar={item.category.ar} />
                </span>
              </div>

              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-zinc-100 border border-black/5">
                <motion.img
                  src={item.image}
                  alt={item.title.en}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* Circular Arrow Button */}
                <div className="absolute bottom-6 right-6 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -45 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-black/5 text-[var(--text-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:border-transparent hover:text-white cursor-pointer"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>

              {/* Description Footer */}
              <div className="mt-8 pr-4 rtl:pr-0 rtl:pl-4">
                <p className="text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                  <span className="font-medium text-[var(--text-primary)]">
                    <BilingualText
                      en={item.boldText.en}
                      ar={item.boldText.ar}
                    />
                  </span>{" "}
                  <BilingualText
                    en={item.description.en
                      .replace(item.boldText.en, "")
                      .trim()}
                    ar={item.description.ar
                      .replace(item.boldText.ar, "")
                      .trim()}
                  />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
