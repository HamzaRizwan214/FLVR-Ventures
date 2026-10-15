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

const ease = [0.22, 1, 0.36, 1];

// Contact: one screen, nothing to scroll on a laptop. From 1024px the heading and contact details sit
// on the left and the form on the right, so the whole page fits in view; below that they stack.
export default function Contact() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden rounded-[28px] bg-[var(--block-dark)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right, rgba(214,173,132,0.14) 0%, rgba(214,173,132,0.04) 16%, transparent 34%)",
              "linear-gradient(to left, rgba(172,30,64,0.30) 0%, rgba(214,92,40,0.10) 18%, transparent 40%)",
            ].join(", "),
          }}
        />

        <div className="relative grid grid-cols-1 gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,clamp(34rem,54%,54rem))] lg:gap-14 lg:px-12 lg:py-12 xl:gap-24 xl:px-16">
          {/* Left: heading, contact details, disclaimer */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="max-w-[12ch] text-balance text-[clamp(2.3rem,4.4vw,4.2rem)] font-light leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)]"
              >
                <T t={contact.title} />
              </motion.h1>
              <p className="mt-5 max-w-[26rem] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                <T t={contact.lead} />
              </p>
            </div>

            <div>
              <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
                <div className="py-4">
                  <p className="eyebrow mb-1.5 !text-[10px]">
                    <BilingualText en="Email" ar="البريد الإلكتروني" />
                  </p>
                  <a
                    href={`mailto:${email}`}
                    dir="ltr"
                    className="group inline-flex items-center gap-2 text-lg font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] sm:text-xl"
                  >
                    {email}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.25}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </div>
                {phone && (
                  <div className="py-4">
                    <p className="eyebrow mb-1.5 !text-[10px]">
                      <BilingualText en="Phone" ar="الهاتف" />
                    </p>
                    <a
                      href={`tel:+966${phone}`}
                      dir="ltr"
                      className="text-lg font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] sm:text-xl"
                    >
                      {`+966-${phone}`}
                    </a>
                  </div>
                )}
              </div>
              <Disclaimer className="mt-5" />
            </div>
          </div>

          {/* Right: the form. The interest is chosen in the dropdown; ?interest= pre-selects it. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="w-full rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-primary)] p-5 sm:p-7"
          >
            <InvestorForm />
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
