import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import CarvedHero from "@/components/CarvedHero";
import InvestorForm from "@/components/InvestorForm";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { contact } from "@/data/content";

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  return (
    <PageWrapper>
      <CarvedHero
        as="h1"
        eyebrow={<T t={contact.eyebrow} />}
        title={<T t={contact.title} />}
        notchHeight="h-[13rem]"
        notch={
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2 !text-[10px]">
                <BilingualText en="Prefer email?" ar="تفضل البريد الإلكتروني؟" />
              </p>
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="group inline-flex items-center gap-2 text-xl font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
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
              <div>
                <p className="eyebrow mb-2 !text-[10px]">
                  <BilingualText en="Call" ar="اتصال" />
                </p>
                <a
                  href={`tel:+966${phone}`}
                  dir="ltr"
                  className="text-xl font-light text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                >
                  {`+966-${phone}`}
                </a>
              </div>
            )}
          </div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-[46rem] rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 sm:p-8 lg:p-10"
        >
          {/* The interest is chosen in the form's dropdown; ?interest= in the link pre-selects it */}
          <InvestorForm />
        </motion.div>
        <Disclaimer className="mx-auto mt-6 max-w-[46rem]" />
      </CarvedHero>
    </PageWrapper>
  );
}
