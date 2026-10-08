import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import InvestorForm from "@/components/InvestorForm";
import Disclaimer from "@/components/Disclaimer";
import Crosshair from "@/components/Crosshair";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { contact } from "@/data/content";

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  return (
    <PageWrapper>
      <div className="grid flex-1 grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2">
        {/* Left: message and direct contact */}
        <section className="panel flex flex-col px-6 pb-12 pt-32 lg:px-12 lg:pb-16 lg:pt-44">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow mb-8"
          >
            <T t={contact.eyebrow} />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.8, ease }}
            className="text-[clamp(2.2rem,4.6vw,4rem)] font-light uppercase leading-[1.06] tracking-[-0.01em] text-[var(--text-primary)]"
          >
            <T t={contact.title} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            className="mt-10"
          >
            <div className="mb-8 flex items-center gap-5">
              <Crosshair />
              <span className="hairline flex-1" />
            </div>
            <p className="max-w-md text-[15px] leading-[1.8] text-[var(--text-secondary)]">
              <T t={contact.lead} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
            className="mt-auto space-y-8 pt-16"
          >
            <div>
              <p className="eyebrow mb-3">
                <BilingualText en="Prefer email?" ar="تفضل البريد الإلكتروني؟" />
              </p>
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="group inline-flex items-center gap-2 text-xl font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] md:text-2xl"
              >
                {email}
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.25}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            </div>
            {phone && (
              <div>
                <p className="eyebrow mb-3">
                  <BilingualText en="Call" ar="اتصال" />
                </p>
                <a
                  href={`tel:+966${phone}`}
                  dir="ltr"
                  className="text-xl font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] md:text-2xl"
                >
                  {`+966-${phone}`}
                </a>
              </div>
            )}
            <Disclaimer />
          </motion.div>
        </section>

        {/* Right: the form */}
        <section className="panel flex items-center px-6 py-14 lg:px-12 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
            className="mx-auto w-full max-w-xl"
          >
            <InvestorForm />
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
