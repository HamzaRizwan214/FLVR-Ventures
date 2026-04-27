import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import BilingualText from "../components/BilingualText";

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    revenue: "",
    outlets: "",
    message: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare data for Web3Forms
    const object = {
      ...formData,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: `New Discovery Call Request: ${formData.brandName}`,
      from_name: "FLVR Portfolio",
    };
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setStep(2);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-8"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-none z-[101] overflow-hidden shadow-2xl border border-black/10 flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Sidebar / Info */}
            <div className="w-full md:w-1/3 bg-[var(--brand-primary)] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-4 font-bold font-[Metropolis]">
                  <BilingualText en="Capital & Growth" ar="رأس المال والنمو" />
                </p>
                <h3 className="text-3xl font-bold tracking-tight mb-8 font-[Metropolis]">
                  <BilingualText
                    en="Strategic Discovery"
                    ar="الاستكشاف الاستراتيجي"
                  />
                </h3>
                <p className="text-sm opacity-70 leading-relaxed font-medium font-[Metropolis]">
                  <BilingualText
                    en="Unlock institutional capital and operational scale for your F&B brand."
                    ar="افتح آفاق رأس المال المؤسسي والتوسع التشغيلي لعلامتك التجارية."
                  />
                </p>
              </div>

              <div className="relative z-10 pt-16">
                <div className="space-y-6">
                  {[
                    {
                      en: "Saudi Market Focus",
                      ar: "التركيز على السوق السعودي",
                    },
                    { en: "Equity Partnership", ar: "شراكة الملكية" },
                    { en: "Full Ops Engine", ar: "محرك تشغيلي كامل" },
                    { en: "Growth Playbook", ar: "دليل نمو استراتيجي" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-white/40" />
                      <span className="text-xs uppercase tracking-wider font-bold font-[Metropolis]">
                        <BilingualText en={item.en} ar={item.ar} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Accent */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* Form Area */}
            <div className="flex-1 p-10 md:p-12 relative bg-white">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                        <BilingualText en="Full Name" ar="الاسم الكامل" />
                      </label>
                      <input
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis]"
                        placeholder="Ahmed Mansour"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                        <BilingualText en="Brand Name" ar="اسم العلامة" />
                      </label>
                      <input
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis]"
                        placeholder="FLVR Coffee"
                        value={formData.brandName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            brandName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                        <BilingualText
                          en="Monthly Revenue"
                          ar="الإيرادات الشهرية"
                        />
                      </label>
                      <select
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis] appearance-none"
                        value={formData.revenue}
                        onChange={(e) =>
                          setFormData({ ...formData, revenue: e.target.value })
                        }
                      >
                        <option value="">Select Range</option>
                        <option value="Below SAR 100K">Below SAR 100K</option>
                        <option value="SAR 100K - 500K">SAR 100K - 500K</option>
                        <option value="SAR 500K+">SAR 500K+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                        <BilingualText en="Outlets" ar="عدد الفروع" />
                      </label>
                      <input
                        type="number"
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis]"
                        placeholder="1"
                        value={formData.outlets}
                        onChange={(e) =>
                          setFormData({ ...formData, outlets: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                      <BilingualText
                        en="Tell us about your brand or challenge"
                        ar="أخبرنا عن علامتك التجارية أو التحديات التي تواجهها"
                      />
                    </label>
                    <textarea
                      required
                      className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis] min-h-[120px] resize-none"
                      placeholder="e.g. Seeking capital for national expansion..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-[Metropolis]">
                      <BilingualText en="Contact Detail" ar="تفاصيل الاتصال" />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="tel"
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis]"
                        placeholder="+966 ..."
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <input
                        type="email"
                        required
                        className="w-full bg-black/5 border-none px-4 py-4 text-sm focus:ring-1 focus:ring-[var(--brand-primary)] outline-none font-medium font-[Metropolis]"
                        placeholder="email@brand.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-6 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BilingualText
                      en={isSubmitting ? "Sending..." : "Submit Application"}
                      ar={isSubmitting ? "جاري الإرسال..." : "تقديم الطلب"}
                    />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4 font-[Metropolis]">
                    <BilingualText en="Request Sent" ar="تم إرسال الطلب" />
                  </h3>
                  <p className="text-sm text-black/50 leading-relaxed font-medium font-[Metropolis]">
                    <BilingualText
                      en="Our investment team will review your brand details and reach out within 48 hours."
                      ar="سيقوم فريق الاستثمار لدينا بمراجعة تفاصيل علامتك التجارية والتواصل معك خلال 48 ساعة."
                    />
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 text-[10px] uppercase tracking-widest font-bold text-[var(--brand-primary)] hover:underline font-[Metropolis]"
                  >
                    <BilingualText en="Close Window" ar="إغلاق النافذة" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row w-full min-h-[105vh]">
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
                href={`mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`}
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
                href={`mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`}
                className="group inline-flex items-center text-2xl text-[var(--text-primary)] hover:text-[var(--brand-accent)] transition-colors font-medium font-[Metropolis]"
              >
                <BilingualText en="Get in touch." ar="تواصل معنا." />
                <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
            <div className="pb-6 border-b border-[var(--border-default)]">
              <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-2 font-[Metropolis]">
                <BilingualText
                  en="Directly Contact us for any opportunities or details"
                  ar="تواصل معنا مباشرة لأي فرص أو تفاصيل"
                />
              </h3>
              <a
                href={`tel:+966-${import.meta.env.VITE_CONTACT}`}
                className="group inline-flex items-center text-2xl text-[var(--text-primary)] hover:text-[var(--brand-accent)] transition-colors font-medium font-[Metropolis]"
              >
                <BilingualText
                  en={`+966-${import.meta.env.VITE_CONTACT}`}
                  ar={`+966-${import.meta.env.VITE_CONTACT}`}
                />
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
            className="w-full max-w-md bg-[rgba(var(--bg-primary),1)] p-12 rounded-none border border-[var(--border-strong)] shadow-2xl relative z-10"
          >
            <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-none flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(11,114,133,0.3)]">
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

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary w-full py-5"
            >
              <BilingualText en="Book Now" ar="احجز الآن" />
            </button>
          </motion.div>
        </section>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageWrapper>
  );
}
