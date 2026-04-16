import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BilingualText from "./BilingualText";

const pillars = [
  {
    id: 1,
    title: { en: "Institutional Capital", ar: "رأس المال المؤسسي" },
    description: {
      en: "SAR 20M fund backed by strategic partners",
      ar: "صندوق بقيمة 20 مليون ريال مدعوم من شركاء استراتيجيين",
    },
    gradient: "from-[#0b7285] via-[#0c8599] to-[#15aabf]",
    glowColor: "rgba(11, 114, 133, 0.4)",
  },
  {
    id: 2,
    title: { en: "Creative Edge", ar: "الميزة الإبداعية" },
    description: {
      en: "Brand mastery and market positioning",
      ar: "إتقان العلامة التجارية وتحديد المواقع في السوق",
    },
    gradient: "from-[#ff6b6b] via-[#ff8787] to-[#ffa8a8]",
    glowColor: "rgba(255, 107, 107, 0.4)",
  },
  {
    id: 3,
    title: { en: "Relentless Execution", ar: "التنفيذ المستمر" },
    description: {
      en: "Operational excellence and growth systems",
      ar: "التميز التشغيلي وأنظمة النمو",
    },
    gradient: "from-[#ffd43b] via-[#ffd93d] to-[#ffe066]",
    glowColor: "rgba(255, 212, 59, 0.4)",
  },
];

// Blob SVG paths for organic shapes
const blobPaths = [
  "M60.5,-65.5C75.3,-54.8,82.5,-32.5,83.3,-10.8C84.1,10.9,78.5,31.9,67.1,48.3C55.7,64.7,38.5,76.5,19.8,81.8C1.1,87.1,-19.1,85.9,-36.8,78.2C-54.5,70.5,-69.7,56.3,-77.3,38.8C-84.9,21.3,-84.9,0.5,-79.8,-17.8C-74.7,-36.1,-64.5,-51.9,-50.3,-62.8C-36.1,-73.7,-18.1,-79.7,1.5,-81.5C21.1,-83.3,45.7,-76.2,60.5,-65.5Z",
  "M54.8,-63.5C69.3,-52.3,78.5,-32.8,80.8,-12.5C83.1,7.8,78.5,28.9,67.9,45.3C57.3,61.7,40.7,73.4,22.3,78.8C3.9,84.2,-16.3,83.3,-34.1,76.1C-51.9,68.9,-67.3,55.4,-75.8,38.1C-84.3,20.8,-85.9,-0.3,-81.3,-19.5C-76.7,-38.7,-65.9,-56,-50.8,-67.4C-35.7,-78.8,-17.8,-84.3,1.5,-86.1C20.8,-87.9,40.3,-74.7,54.8,-63.5Z",
  "M58.3,-68.1C73.8,-58.3,83.5,-37.8,85.8,-16.5C88.1,4.8,83,26.9,72.1,44.8C61.2,62.7,44.5,76.4,25.8,82.3C7.1,88.2,-13.6,86.3,-32.1,78.8C-50.6,71.3,-66.9,58.2,-75.8,41.1C-84.7,24,-86.2,2.9,-81.8,-16.3C-77.4,-35.5,-67.1,-52.8,-52.4,-62.8C-37.7,-72.8,-18.8,-75.5,1.5,-77.3C21.8,-79.1,42.8,-77.9,58.3,-68.1Z",
];

function Blob({ pillar, index, scrollProgress }) {
  const blobRef = useRef(null);

  // Position transforms based on scroll
  const initialX = index === 0 ? -30 : index === 1 ? 0 : 30;
  const x = useTransform(scrollProgress, [0, 0.5, 1], [initialX, 0, 0]);
  const y = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [index * 15 - 15, 0, 0]
  );

  // Scale and opacity
  const scale = useTransform(scrollProgress, [0, 0.3, 0.7], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  // Blob morph animation
  const pathIndex = useTransform(scrollProgress, [0, 0.5, 1], [0, 1, 2]);

  return (
    <motion.div
      ref={blobRef}
      style={{ x, y, scale, opacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Blob Shape */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20 + index * 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 200 200"
          className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
        >
          <defs>
            <linearGradient
              id={`gradient-${pillar.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" className={`${pillar.gradient.split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
              <stop offset="50%" className={`${pillar.gradient.split(' ')[1].replace('via-', 'text-')}`} stopColor="currentColor" />
              <stop offset="100%" className={`${pillar.gradient.split(' ')[2].replace('to-', 'text-')}`} stopColor="currentColor" />
            </linearGradient>
            <filter id={`glow-${pillar.id}`}>
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={blobPaths[index]}
            transform="translate(100 100)"
            fill={`url(#gradient-${pillar.id})`}
            fillOpacity="0.7"
            filter={`url(#glow-${pillar.id})`}
            animate={{
              d: blobPaths,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: pillar.glowColor,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function PillarCard({ pillar, index, scrollProgress }) {
  const y = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [100, 0, -50]
  );
  const opacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.6, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="text-center space-y-4 z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    >
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--text-primary)]">
        <BilingualText en={pillar.title.en} ar={pillar.title.ar} />
      </h3>
      <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xs mx-auto">
        <BilingualText
          en={pillar.description.en}
          ar={pillar.description.ar}
        />
      </p>
    </motion.div>
  );
}

export default function LiquidBlobsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Title */}
        <motion.div
          className="absolute top-20 md:top-32 left-0 right-0 text-center px-6 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]),
          }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text-primary)] leading-tight">
            <BilingualText
              en="Institutional Capital. Creative Edge. Relentless Execution."
              ar="رأس المال المؤسسي. الميزة الإبداعية. التنفيذ المستمر."
            />
          </h2>
        </motion.div>

        {/* Blobs Container */}
        <div className="relative w-full h-full">
          {pillars.map((pillar, index) => (
            <Blob
              key={pillar.id}
              pillar={pillar}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Pillar Cards */}
        <motion.div
          className="absolute bottom-20 md:bottom-32 left-0 right-0 px-6 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.6, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
