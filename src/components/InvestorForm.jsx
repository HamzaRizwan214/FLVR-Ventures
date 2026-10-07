import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import BilingualText from "./BilingualText";
import T from "./T";
import { useLanguage } from "@/contexts/LanguageContext";
import { contact } from "@/data/content";

const fieldClass =
  "block w-full rounded-none border border-[var(--border-default)] bg-white px-4 py-4 text-base text-[var(--text-primary)] font-[Metropolis] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)] font-[Metropolis]";

// Reads ?interest= and ?concept= so CTAs elsewhere can pre-fill the form.
export default function InvestorForm() {
  const { language } = useLanguage();
  const [params] = useSearchParams();
  const concept = params.get("concept");
  const requested = params.get("interest");
  const interest = contact.interests.some((i) => i.value === requested)
    ? requested
    : "invest";

  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    interest,
    message: concept ? `I'm interested in ${concept}.` : "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [honeypot, setHoneypot] = useState(false);

  const set = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const selected = contact.interests.find((i) => i.value === values.interest);
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: `FLVR website enquiry: ${selected?.label.en ?? values.interest}`,
      from_name: "FLVR Website",
      name: values.name,
      email: values.email,
      organisation: values.organisation,
      interest: selected?.label.en ?? values.interest,
      message: values.message,
      botcheck: honeypot,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json());
      setStatus(res.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center text-center"
        role="status"
      >
        <CheckCircle2 className="mb-6 h-14 w-14 text-emerald-500" />
        <h2 className="mb-3 text-3xl font-normal tracking-tight text-[var(--text-primary)]">
          <BilingualText en="Message sent" ar="تم إرسال رسالتك" />
        </h2>
        <p className="max-w-sm text-lg text-[var(--text-secondary)] font-[Metropolis]">
          <BilingualText
            en="Thank you. The FLVR team will be in touch."
            ar="شكراً لك. سيتواصل معك فريق فلايفر."
          />
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            <BilingualText en="Name" ar="الاسم" />
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            className={fieldClass}
            placeholder={language === "ar" ? "اسمك" : "Your name"}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            <BilingualText en="Email" ar="البريد الإلكتروني" />
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            className={fieldClass}
            placeholder="you@company.com"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="organisation" className={labelClass}>
            <BilingualText en="Organisation (optional)" ar="الجهة (اختياري)" />
          </label>
          <input
            id="organisation"
            autoComplete="organization"
            value={values.organisation}
            onChange={set("organisation")}
            className={fieldClass}
            placeholder={language === "ar" ? "الشركة أو الصندوق" : "Company or fund"}
          />
        </div>
        <div>
          <label htmlFor="interest" className={labelClass}>
            <BilingualText en="Interest" ar="الاهتمام" />
          </label>
          <div className="relative">
            <select
              id="interest"
              value={values.interest}
              onChange={set("interest")}
              className={`${fieldClass} appearance-none pe-12`}
            >
              {contact.interests.map((i) => (
                <option key={i.value} value={i.value}>
                  {language === "ar" ? i.label.ar : i.label.en}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          <BilingualText en="Message" ar="الرسالة" />
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          className={`${fieldClass} resize-none`}
          placeholder={
            language === "ar"
              ? "أخبرنا بإيجاز بما تود مناقشته."
              : "Tell us briefly what you would like to discuss."
          }
        />
      </div>

      {/* Honeypot for Web3Forms spam filtering */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        checked={honeypot}
        onChange={(e) => setHoneypot(e.target.checked)}
      />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 font-[Metropolis]">
          <BilingualText
            en="Something went wrong. Please try again, or email us directly."
            ar="حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر البريد."
          />
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-60"
      >
        <T
          t={
            status === "sending"
              ? { en: "Sending...", ar: "جارٍ الإرسال..." }
              : { en: "Send enquiry", ar: "إرسال الطلب" }
          }
        />
      </button>
    </form>
  );
}
