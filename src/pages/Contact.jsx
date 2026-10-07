import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import InvestorForm from "@/components/InvestorForm";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { contact } from "@/data/content";

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

export default function Contact() {
  return (
    <PageWrapper noPadding>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left: message and direct contact */}
        <section className="flex w-full flex-col justify-center border-b border-[var(--border-default)] px-6 pt-40 pb-16 lg:w-1/2 lg:border-b-0 lg:border-e lg:px-20 lg:pt-32 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-primary)] font-[Metropolis]"
          >
            <T t={contact.eyebrow} />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className="mb-8 text-5xl md:text-7xl font-normal tracking-tighter leading-[1.02] text-[var(--text-primary)]"
          >
            <T t={contact.title} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-14 max-w-xl text-xl leading-relaxed text-[var(--text-secondary)] font-[Metropolis]"
          >
            <T t={contact.lead} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="space-y-6"
          >
            <div className="border-t border-[var(--border-default)] pt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
                <BilingualText en="Prefer email?" ar="تفضل البريد الإلكتروني؟" />
              </p>
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-normal tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--brand-primary)]"
              >
                {email}
                <ArrowUpRight
                  size={22}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </a>
            </div>
            {phone && (
              <div className="border-t border-[var(--border-default)] pt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)] font-[Metropolis]">
                  <BilingualText en="Call" ar="اتصال" />
                </p>
                <a
                  href={`tel:+966${phone}`}
                  dir="ltr"
                  className="text-2xl md:text-3xl font-normal tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--brand-primary)]"
                >
                  {`+966-${phone}`}
                </a>
              </div>
            )}
          </motion.div>

          <Disclaimer className="mt-16" />
        </section>

        {/* Right: the form */}
        <section className="flex w-full items-center bg-[var(--bg-secondary)] px-6 py-16 lg:w-1/2 lg:px-20 lg:py-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto w-full max-w-xl"
          >
            <InvestorForm />
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}
