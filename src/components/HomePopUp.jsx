import { motion } from "framer-motion";
import T from "./T";
import { popup } from "@/data/content";

const ease = [0.22, 1, 0.36, 1];

// Home: POP-UP by FLVR, the operating studio for concept validation.
export default function HomePopUp() {
  return (
    <section className="sc-mobile-only relative px-5 pb-8 pt-20 sm:px-8 lg:px-12 lg:pb-12 lg:pt-32">
      <div className="mx-auto max-w-[1480px]">
        {/* POP-UP by FLVR */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease }}
          style={{ background: "linear-gradient(120deg, #ac1e40 0%, #d2512a 55%, #ff9205 100%)" }}
          className="grain relative  overflow-hidden rounded-[2rem] p-8 text-white sm:p-12  lg:rounded-[2.5rem] lg:p-16"
        >
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="flex flex-col justify-between gap-10">
              <h3 className="text-[clamp(2.4rem,4.8vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em] rtl:leading-[1.2] rtl:tracking-normal">
                <T t={popup.name} />
              </h3>
              <p className="text-[17px] font-semibold text-white/95">
                <T t={popup.tagline} />
              </p>
            </div>
            <div className="space-y-5 text-[15px] leading-[1.8] text-white/90 sm:text-base">
              <p>
                <T t={popup.body} />
              </p>
              <p>
                <T t={popup.investors} />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
