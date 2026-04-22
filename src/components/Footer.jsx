import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import BilingualText from "./BilingualText";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    ecosystem: [
      {
        name: { en: "FLVR Fund I", ar: "صندوق فليفر 1" },
        href: "/how-it-works",
      },
      {
        name: { en: "Venture Studio", ar: "استوديو المشاريع" },
        href: "/how-it-works",
      },
      {
        name: { en: "Off-Shelf Concepts", ar: "مفاهيم جاهزة" },
        href: "/how-it-works",
      },
      {
        name: { en: "Operational Expansion", ar: "التوسع التشغيلي" },
        href: "/how-it-works",
      },
    ],
    company: [
      { name: { en: "About", ar: "من نحن" }, href: "/about" },
      { name: { en: "Portfolio", ar: "محفظتنا" }, href: "/portfolio" },
      { name: { en: "Our Values", ar: "قيمنا" }, href: "/about" },
      { name: { en: "Contact", ar: "تواصل معنا" }, href: "/contact" },
    ],
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-default)] pt-24 pb-12 overflow-hidden">
      {/* Massive Brand Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="text-[25vw] font-bold text-[var(--text-primary)] opacity-[0.02] tracking-tighter leading-none">
          FLVR
        </span>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <img
                src="/flvr-logo.png"
                alt="FLVR Logo"
                className="h-10 transition-opacity hover:opacity-80 scale-250"
              />
            </Link>
            <p className="text-lg text-[var(--text-secondary)] font-[Metropolis] leading-relaxed max-w-xs">
              <BilingualText
                en="Building the next generation of iconic Saudi F&B brands through strategic capital and operational discipline."
                ar="بناء الجيل القادم من العلامات التجارية السعودية الأيقونية من خلال رأس المال الاستراتيجي والانضباط التشغيلي."
              />
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full border border-black/5 hover:bg-[var(--brand-primary)] hover:text-white transition-all"
              >
                {/* <LinkedIn size={20} /> */}
              </a>
              <a
                href="mailto:hello@flvrventures.com"
                className="p-3 bg-white rounded-full border border-black/5 hover:bg-[var(--brand-primary)] hover:text-white transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-primary)] mb-8">
              <BilingualText en="Ecosystem" ar="النظام البيئي" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-base font-[Metropolis] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    <BilingualText en={link.name.en} ar={link.name.ar} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-primary)] mb-8">
              <BilingualText en="Company" ar="الشركة" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-base font-[Metropolis] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    <BilingualText en={link.name.en} ar={link.name.ar} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-primary)] mb-8">
              <BilingualText en="Subscribe" ar="اشترك" />
            </h4>
            <p className="text-sm font-[Metropolis] text-[var(--text-muted)] leading-relaxed">
              <BilingualText
                en="Join our community of visionaries and receive quarterly updates on the Saudi F&B ecosystem."
                ar="انضم إلى مجتمعنا من الرؤيويين واحصل على تحديثات ربع سنوية حول قطاع الأغذية والمشروبات السعودي."
              />
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder={
                  language === "en" ? "Email address" : "البريد الإلكتروني"
                }
                className="w-full font-[Metropolis] bg-white border border-[var(--border-default)] rounded-xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[var(--brand-primary)] text-white px-4 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity rtl:left-2 rtl:right-auto rtl:rotate-180">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--border-default)] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-[var(--text-muted)]">
            © {currentYear} FLVR Ventures.{" "}
            <BilingualText en="All rights reserved." ar="جميع الحقوق محفوظة." />
          </div>

          <div className="flex items-center gap-8 text-sm">
            <button
              onClick={toggleLanguage}
              className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors uppercase font-medium tracking-widest"
            >
              {language === "en" ? "العربية" : "ENGLISH"}
            </button>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <BilingualText en="Legal" ar="قانوني" />
              </Link>
              <Link
                to="/"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <BilingualText en="Privacy" ar="الخصوصية" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
