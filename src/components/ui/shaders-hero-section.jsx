import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import BilingualText from "@/components/BilingualText";
import { cn } from "@/lib/utils";

export function ShaderBackground({ children }) {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
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

      {/* FLVR Video Background - subtle opacity on light bg */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        src="/FLVR.mp4"
      ></video>

      {/* Lightness Overlays for Legibility */}
      <div className="absolute inset-0 z-0 bg-black/0 pointer-events-none" />

      {/* Bottom fade to page background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-10 w-full h-full">{children}</div>
    </div>
  );
}

// export function PulsingCircle() {
//   const { language } = useLanguage();

//   return (
//     <div className="absolute bottom-8 right-8 z-30 hidden sm:block">
//       <div className="relative w-24 h-24 flex items-center justify-center">
//         {/* Pulsing Border Circle */}
//         <PulsingBorder
//           colors={["#0b7285", "#ff6b6b", "#ffd43b", "#0b7285"]}
//           colorBack="#00000000"
//           speed={1.5}
//           roundness={1}
//           thickness={0.1}
//           softness={0.2}
//           intensity={5}
//           spotsPerColor={5}
//           spotSize={0.1}
//           pulse={0.1}
//           smoke={0.5}
//           smokeSize={4}
//           scale={0.65}
//           rotation={0}
//           frame={9161408}
//           style={{
//             width: "70px",
//             height: "70px",
//             borderRadius: "50%",
//           }}
//         />

//         {/* Rotating Text Around the Pulsing Border */}
//         <motion.svg
//           className="absolute inset-0 w-full h-full"
//           viewBox="0 0 100 100"
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 20,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           style={{ transform: "scale(1.7)" }}
//         >
//           <defs>
//             <path
//               id="circle"
//               d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
//             />
//           </defs>
//           <text className="text-[10px] fill-black/60 uppercase tracking-widest font-mono">
//             {language === "en" ? (
//               <textPath href="#circle" startOffset="0%">
//                 FLVR VENTURES • SAUDI F&B • FLVR VENTURES • SAUDI F&B •
//               </textPath>
//             ) : (
//               <textPath href="#circle" startOffset="0%" className="font-sans">
//                 نكهات سعودية • مشاريع مبتكرة • نكهات سعودية • مشاريع مبتكرة •
//               </textPath>
//             )}
//           </text>
//         </motion.svg>
//       </div>
//     </div>
//   );
// }

export function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-end justify-start px-6 lg:px-12 pb-12 lg:pb-24">
      <div className="max-w-4xl text-left rtl:text-right">
        <div
          className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 mb-6 relative border border-black/5"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full" />
          <span className="text-[var(--text-primary)] text-sm font-normal relative z-10 uppercase tracking-wider">
            ✨{" "}
            <BilingualText
              en="Saudi F&B Platform"
              ar="منصة الأغذية والمشروبات السعودية"
            />
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-normal text-[#FFFFFF] mb-6 leading-[1.1]">
          <BilingualText
            en={
              <>
                Building the{" "}
                <span className="font-light text-[var(--brand-reward)]">
                  Next Generation
                </span>
                <br /> of Saudi F&B Brands
              </>
            }
            ar={
              <>
                نبني{" "}
                <span className="font-light text-[var(--brand-reward)]">
                  الجيل القادم
                </span>
                <br /> من العلامات التجارية السعودية
              </>
            }
          />
        </h1>

        {/* Description */}
        <div className="flex">
          <p className="text-lg md:text-xl font-[metropolis] text-[#FFFFFF] mb-10 max-w-2xl leading-relaxed">
            <BilingualText
              en="Institutional Capital. Creative Edge. Relentless Execution. We identify, create, package, operate, and scale high-potential restaurant and café concepts."
              ar="رأس مال مؤسسي. حافة إبداعية. تنفيذ لا هوادة فيه. نقوم بتحديد، إنشاء، تشغيل، وتوسيع مفاهيم المطاعم والمقاهي ذات الإمكانات العالية."
            />
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/portfolio"
            className="px-8 py-3 rounded-full bg-black/5 border border-black/10 text-[var(--text-primary)] font-normal text-xs transition-all duration-300 hover:bg-black/10 hover:scale-105 cursor-pointer"
          >
            <BilingualText en="View Portfolio" ar="عرض المحفظة" />
          </Link>
          <div
            id="gooey-btn"
            className="relative flex items-center group"
            style={{ filter: "url(#gooey-filter)" }}
          >
            <Link
              to="/contact"
              className="absolute right-0 rtl:right-auto rtl:left-0 px-2.5 py-1.5 rounded-full bg-[var(--brand-primary)] text-white font-normal text-xs transition-all duration-300 hover:bg-[var(--brand-primary)]/90 cursor-pointer h-10 flex items-center justify-center -translate-x-12 rtl:translate-x-12 group-hover:-translate-x-24 rtl:group-hover:translate-x-24 z-0"
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
              to="/contact"
              className="px-8 py-2.5 rounded-full bg-[var(--brand-primary)] text-white font-normal text-xs transition-all duration-300 hover:bg-[var(--brand-primary)]/90 cursor-pointer h-10 flex items-center z-10"
            >
              <BilingualText en="Start Building" ar="ابدأ البناء" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// export function Header() {
//   const { language, toggleLanguage } = useLanguage();
//   const { pathname } = useLocation();

//   const menuItems = [
//     { name: "Home", ar: "الرئيسية", href: "/" },
//     { name: "About", ar: "من نحن", href: "/about" },
//     { name: "Portfolio", ar: "محفظتنا", href: "/portfolio" },
//     { name: "How it Works", ar: "كيف نعمل", href: "/how-it-works" },
//     { name: "Get in touch", ar: "تواصل معنا", href: "/contact" },
//   ];

//   return (
//     <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-12">
//       {/* Logo */}
//       <Link
//         to="/"
//         className="flex items-center space-x-3 rtl:space-x-reverse z-50"
//       >
//         <img src="/flvr-logo.png" alt="FLVR Logo" className="h-8" />
//         <span className="font-normal text-xl tracking-tight text-white hidden sm:block">
//           <span className="text-[#2BC8B7]">FLVR</span> Ventures
//         </span>
//       </Link>

//       {/* Navigation */}
//       <nav className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 rtl:space-x-reverse">
//         {menuItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.href}
//             className={cn(
//               "text-white/80 hover:text-white text-sm font-normal px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200",
//               pathname === item.href && "text-white bg-white/10",
//             )}
//           >
//             <BilingualText en={item.name} ar={item.ar} />
//           </Link>
//         ))}
//       </nav>

//       {/* Language / Actions Group */}
//       <div className="flex items-center gap-4 z-50">
//         <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
//           <button
//             onClick={() => language !== "en" && toggleLanguage()}
//             className={cn(
//               "px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all duration-300",
//               language === "en"
//                 ? "bg-[#2BC8B7] text-black shadow-lg"
//                 : "text-white/70 hover:text-white",
//             )}
//           >
//             En
//           </button>
//           <button
//             onClick={() => language !== "ar" && toggleLanguage()}
//             className={cn(
//               "px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all duration-300",
//               language === "ar"
//                 ? "bg-[#2BC8B7] text-black shadow-lg"
//                 : "text-white/70 hover:text-white",
//             )}
//           >
//             عربي
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
