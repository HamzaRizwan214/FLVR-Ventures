import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ModelDiagram from "./ModelDiagram";
import BilingualText from "./BilingualText";
import T from "./T";
import { steps, model } from "@/data/content";

// Home: the four-stage method, then how FLVR is organised.
export default function HomeSteps() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 sm:py-32">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <SectionHeading
          eyebrow={<BilingualText en="How we build" ar="كيف نبني" />}
          title={
            <BilingualText
              en="A four-stage method."
              ar="منهجية من أربع مراحل."
            />
          }
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-start"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-zinc-100 border border-black/5">
                <img
                  src={step.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <span className="absolute top-5 start-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-sm font-medium text-[var(--text-primary)] backdrop-blur-md border border-black/5 font-[Metropolis]">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-8 pe-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]">
                  <T t={step.descriptor} />
                </p>
                <h3 className="mb-3 text-2xl font-normal tracking-tight text-[var(--text-primary)]">
                  <T t={step.title} />
                </h3>
                <p className="text-base leading-relaxed text-[var(--text-secondary)] font-[Metropolis]">
                  <T t={step.desc} />
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-28 lg:mt-36">
          <SectionHeading
            eyebrow={<T t={model.eyebrow} />}
            title={<T t={model.title} />}
          />
          <ModelDiagram />
        </div>
      </div>
    </section>
  );
}
