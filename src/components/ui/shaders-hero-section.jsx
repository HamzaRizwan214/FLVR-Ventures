import { Link } from "react-router-dom";
import BilingualText from "@/components/BilingualText";
import T from "@/components/T";
import { hero } from "@/data/content";

export function ShaderBackground({ children }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[var(--bg-primary)]">
      {/* SVG filters used by the hero badge and the gooey CTA */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.97
                      0 1 0 0 0.97
                      0 0 1 0 0.98
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* FLVR video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.webp"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/FLVR.mp4"
      ></video>

      {/* Bottom fade to page background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-10 w-full h-full">{children}</div>
    </div>
  );
}

export function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-end justify-start px-6 lg:px-12 pb-12 lg:pb-24">
      <div className="max-w-4xl text-left rtl:text-right">
        <div
          className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 mb-6 relative border border-black/5"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full" />
          <span className="text-[var(--text-primary)] text-sm font-normal relative z-10 uppercase tracking-wider">
            <T t={hero.badge} />
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-normal text-[#FFFFFF] mb-6 leading-[1.1]">
          <BilingualText
            en={
              <>
                A venture studio for{" "}
                <span className="font-light text-[var(--brand-reward)]">
                  Saudi food and beverage
                </span>
              </>
            }
            ar={
              <>
                استوديو مشاريع لقطاع{" "}
                <span className="font-light text-[var(--brand-reward)]">
                  الأغذية والمشروبات السعودي
                </span>
              </>
            }
          />
        </h1>

        <p className="text-lg md:text-xl font-[metropolis] text-[#FFFFFF] mb-10 max-w-2xl leading-relaxed">
          <T t={hero.lead} />
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          <Link to="/portfolio" className="btn-ghost">
            <T t={hero.ctaSecondary} />
          </Link>
          <div
            className="relative flex items-center group"
            style={{ filter: "url(#gooey-filter)" }}
          >
            <Link
              to="/contact?interest=invest"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute right-0 rtl:right-auto rtl:left-0 px-2.5 py-1.5 rounded-none bg-[var(--brand-primary)] text-white font-normal text-xs transition-all duration-300 hover:bg-[var(--brand-primary)]/90 cursor-pointer h-12 flex items-center justify-center -translate-x-12 rtl:translate-x-12 group-hover:-translate-x-24 rtl:group-hover:translate-x-24 z-0"
            >
              <svg
                className="w-4 h-4 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              to="/contact?interest=invest"
              className="btn-primary h-12 flex items-center z-10"
            >
              <T t={hero.ctaPrimary} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
