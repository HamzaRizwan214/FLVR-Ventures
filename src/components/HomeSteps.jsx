import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Crosshair from "./Crosshair";
import BilingualText from "./BilingualText";
import T from "./T";
import { steps } from "@/data/content";

// Home: the four-stage method.
export default function HomeSteps() {
  return (
    <section className="panel px-6 py-20 lg:px-12 lg:py-28">
      <Crosshair className="absolute start-6 top-6 hidden lg:block" />
      <Crosshair className="absolute end-6 top-6 hidden lg:block" />

      <SectionHeading
        eyebrow={<BilingualText en="How we build" ar="كيف نبني" />}
        title={
          <BilingualText
            en="A four-stage method, from selection to scale."
            ar="منهجية من أربع مراحل، من الاختيار إلى التوسع."
          />
        }
      />

      <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.article
            key={step.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[var(--bg-secondary)]">
              <img
                src={step.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover brightness-[0.78] saturate-[0.75] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <span className="pill absolute start-4 top-4 bg-black/35 backdrop-blur-md">
                0{index + 1}
              </span>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-normal uppercase tracking-[0.14em] text-[var(--text-primary)]">
                  <T t={step.title} />
                </h3>
                <span className="eyebrow">
                  <T t={step.descriptor} />
                </span>
              </div>
              <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
                <T t={step.desc} />
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
