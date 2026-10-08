import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import CarvedHero from "@/components/CarvedHero";
import InvestorForm from "@/components/InvestorForm";
import Disclaimer from "@/components/Disclaimer";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { contact } from "@/data/content";
import { cn } from "@/lib/utils";

const email = import.meta.env.VITE_EMAIL_ADDRESS || "hello@flvrventures.com";
const phone = import.meta.env.VITE_CONTACT;

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [params] = useSearchParams();
  const requested = params.get("interest");
  const [interest, setInterest] = useState(
    contact.interests.some((i) => i.value === requested) ? requested : "invest",
  );

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
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:gap-5">
          {/* What to discuss: choosing one sets the form's interest */}
          <div className="flex flex-col rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-secondary)]/60 p-7 lg:p-9">
            <p className="max-w-sm text-[15px] leading-[1.8] text-[var(--text-secondary)]">
              <T t={contact.lead} />
            </p>
            <ul role="radiogroup" aria-label="Interest" className="mt-8 border-t border-[var(--border-default)]">
              {contact.interests.map((item, i) => {
                const active = interest === item.value;
                return (
                  <li key={item.value} className="border-b border-[var(--border-default)]">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setInterest(item.value)}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-start"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="eyebrow !text-[10px]">0{i + 1}</span>
                        <span
                          className={cn(
                            "text-[1.2rem] font-light tracking-[-0.01em] transition-colors duration-300",
                            active
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]",
                          )}
                        >
                          <T t={item.label} />
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                          active ? "border-[var(--accent)]" : "border-[var(--border-strong)]",
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full bg-[var(--accent)] transition-transform duration-300",
                            active ? "scale-100" : "scale-0",
                          )}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Disclaimer className="mt-auto pt-10" />
          </div>

          {/* The form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease }}
            className="rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-primary)] p-7 lg:p-10"
          >
            <InvestorForm interest={interest} onInterestChange={setInterest} />
          </motion.div>
        </div>
      </CarvedHero>
    </PageWrapper>
  );
}
