import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

export default function Contact() {
  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row w-full min-h-[90vh]">
        {/* Left/Text Column */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-24 py-12 lg:py-0 border-b lg:border-b-0 lg:border-r border-[var(--border-default)]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-normal tracking-tighter mb-8 text-[var(--text-primary)]"
          >
            <BilingualText en="Get in Touch" ar="تواصل معنا" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-12 max-w-xl font-medium font-[Metropolis]"
          >
            <BilingualText
              en="Whether you are building, investing, or exploring what is next in F&B, we would love to hear from you. FLVR works with founders, investors, and strategic partners who are serious about building brands with real relevance, scalable potential, and long-term value."
              ar="سواء كنت تبني، تستثمر، أو تستكشف المستقبل في قطاع الطعام، يسعدنا أن نسمع منك."
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="pb-6 border-b border-[var(--border-default)]">
              <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-2 font-[Metropolis]">
                <BilingualText
                  en="Founder with traction?"
                  ar="مؤسس لديك زخم؟"
                />
              </h3>
              <a
                href="mailto:founders@flvrventures.com"
                className="group inline-flex items-center text-2xl text-[var(--text-primary)] hover:text-[var(--brand-accent)] transition-colors font-medium font-[Metropolis]"
              >
                <BilingualText en="Let’s talk." ar="دعنا نتحدث." />
                <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>

            <div className="pb-6 border-b border-[var(--border-default)]">
              <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-2 font-[Metropolis]">
                <BilingualText
                  en="Investor looking for the next wave?"
                  ar="مستثمر تبحث عن الموجة القادمة؟"
                />
              </h3>
              <a
                href="mailto:investors@flvrventures.com"
                className="group inline-flex items-center text-2xl text-[var(--text-primary)] hover:text-[var(--brand-accent)] transition-colors font-medium font-[Metropolis]"
              >
                <BilingualText en="Get in touch." ar="تواصل معنا." />
                <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Right/Interactive Column */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 lg:py-0 bg-[var(--bg-secondary)] relative overflow-hidden">
          {/* subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(var(--brand-primary) 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md bg-[rgba(var(--bg-primary),1)] p-12 rounded-[2rem] border border-[var(--border-strong)] shadow-2xl relative z-10"
          >
            <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(11,114,133,0.3)]">
              <ArrowRight className="text-white w-8 h-8 rtl:rotate-180" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-center text-[var(--text-primary)] mb-4 font-[Metropolis]">
              <BilingualText
                en="Book Discovery Call"
                ar="حجز مكالمة استكشافية"
              />
            </h2>
            <p className="text-center text-[var(--text-secondary)] mb-8 font-medium font-[Metropolis]">
              <BilingualText
                en="Schedule a 30-minute discovery call with one of our venture partners."
                ar="حدد موعداً لمكالمة مدتها 30 دقيقة مع أحد شركائنا."
              />
            </p>

            <button className="w-full py-4 bg-[var(--brand-primary)] hover:bg-[var(--text-link)] text-white text-lg font-bold rounded-2xl transition-all shadow-[0_10px_20px_rgba(11,114,133,0.2)] hover:shadow-[0_15px_25px_rgba(11,114,133,0.4)] hover:-translate-y-1 font-[Metropolis]">
              <BilingualText en="Book Now" ar="احجز الآن" />
            </button>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
