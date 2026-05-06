import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BilingualText from "./BilingualText";

// --- Icons ---
const IconUsers = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconTrend = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconRepeat = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
);
const IconScale = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconGlobe = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Grid config
const COLS = 10;
const ROWS = 5;
const BOX_COLS = 2; // each box occupies 2×2 cells
const BOX_ROWS = 2;

// Each box: { col, row } — top-left cell (0-indexed)
// Photo block is pinned at col=8, row=3 (2×2), i.e. bottom-right corner
const PHOTO_COL = 8;
const PHOTO_ROW = 3;

// Initial positions (col, row) — must not overlap each other or the photo block
const INITIAL_POSITIONS = [
  { col: 0, row: 0 }, // Founder-led — top-left
  { col: 4, row: 0 }, // Clear pull — top-center (ghost)
  { col: 8, row: 0 }, // Repeat demand — top-right
  { col: 0, row: 3 }, // Scalable model — bottom-left
  { col: 5, row: 3 }, // Expansion — bottom-center
];

// Check if a proposed (col,row) for a 2×2 box collides with another box or the photo
function collides(col, row, occupiedSet) {
  for (let dc = 0; dc < BOX_COLS; dc++) {
    for (let dr = 0; dr < BOX_ROWS; dr++) {
      if (occupiedSet.has(`${col + dc},${row + dr}`)) return true;
    }
  }
  return false;
}

function buildOccupied(positions, excludeIdx) {
  const set = new Set();
  // Always add photo block
  for (let dc = 0; dc < 2; dc++)
    for (let dr = 0; dr < 2; dr++)
      set.add(`${PHOTO_COL + dc},${PHOTO_ROW + dr}`);
  positions.forEach((p, i) => {
    if (i === excludeIdx) return;
    for (let dc = 0; dc < BOX_COLS; dc++)
      for (let dr = 0; dr < BOX_ROWS; dr++)
        set.add(`${p.col + dc},${p.row + dr}`);
  });
  return set;
}

function getValidMoves(col, row, occupied) {
  const moves = [];
  const deltas = [
    { dc: -1, dr: 0 },
    { dc: 1, dr: 0 },
    { dc: 0, dr: -1 },
    { dc: 0, dr: 1 },
    // two-step moves for more interesting choreography
    { dc: -2, dr: 0 },
    { dc: 2, dr: 0 },
    { dc: 0, dr: -2 },
    { dc: 0, dr: 2 },
    { dc: -1, dr: -1 },
    { dc: 1, dr: -1 },
    { dc: -1, dr: 1 },
    { dc: 1, dr: 1 },
  ];
  for (const { dc, dr } of deltas) {
    const nc = col + dc;
    const nr = row + dr;
    if (nc < 0 || nr < 0 || nc + BOX_COLS > COLS || nr + BOX_ROWS > ROWS)
      continue;
    if (!collides(nc, nr, occupied)) moves.push({ col: nc, row: nr });
  }
  return moves;
}

const focusPoints = [
  {
    title: { en: "Founder-led", ar: "بقيادة المؤسس" },
    color: "bg-[#0B7285]",
    isDark: false,
    icon: <IconUsers />,
    ghost: false,
  },
  {
    title: { en: "Clear pull", ar: "جذب واضح" },
    color: "",
    isDark: true,
    icon: <IconTrend />,
    ghost: true, // no background fill — like "Private Markets" in reference
  },
  {
    title: { en: "Repeat demand", ar: "طلب متكرر" },
    color: "bg-[#0B7285]/80",
    isDark: false,
    icon: <IconRepeat />,
    ghost: false,
  },
  {
    title: { en: "Scalable model", ar: "نموذج قابل للتوسع" },
    color: "bg-[#0B7285]/40",
    isDark: false,
    icon: <IconScale />,
    ghost: false,
  },
  {
    title: { en: "Expansion", ar: "التوسع" },
    color: "bg-[#FAFAF8]/90",
    isDark: true,
    icon: <IconGlobe />,
    ghost: false,
  },
];

const Fund = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const activeIdxRef = useRef(0);
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(80);

  // Responsive cell size
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setCellSize(Math.floor(w / COLS));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Staggered movement: one box moves every N ms, cycling through boxes
  useEffect(() => {
    const INTERVAL = 1800;
    const timer = setInterval(() => {
      const idx = activeIdxRef.current;
      setPositions((prev) => {
        const occupied = buildOccupied(prev, idx);
        const moves = getValidMoves(prev[idx].col, prev[idx].row, occupied);
        if (moves.length === 0) return prev;
        // Prefer moves that change position meaningfully (avoid jitter)
        const next = [...prev];
        const pick = moves[Math.floor(Math.random() * moves.length)];
        next[idx] = pick;
        return next;
      });
      activeIdxRef.current = (idx + 1) % focusPoints.length;
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const gridH = cellSize * ROWS;

  return (
    <section className="bg-[#081012] py-32 lg:py-48 px-6 lg:px-16 relative overflow-hidden text-white font-sans">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-2 h-2 bg-[var(--brand-primary)]" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/50 font-[Metropolis]">
              <BilingualText en="The Platform" ar="المنصة" />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold tracking-tighter leading-[0.95] mb-12"
          >
            <BilingualText
              en={
                <>
                  FLVR Fund is building the
                  <br />
                  <span className="text-white/40">
                    infrastructure for Saudi F&B.
                  </span>
                </>
              }
              ar={
                <>
                  صندوق فليفر يبني
                  <br />
                  <span className="text-white/40">
                    البنية التحتية للمطاعم السعودية.
                  </span>
                </>
              }
            />
          </motion.h2>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-12 mb-16">
            <div
              className="relative group cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              <div className="absolute inset-0 bg-[#0B7285] translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              <div className="relative bg-white text-black px-12 py-5 font-bold uppercase tracking-widest text-sm font-[Metropolis] border border-black/10">
                <BilingualText
                  en="Join the Waitlist"
                  ar="انضم إلى قائمة الانتظار"
                />
              </div>
            </div>
            <div className="max-w-xs">
              <p className="text-white/40 text-xs leading-relaxed font-bold uppercase tracking-wider font-[Metropolis]">
                <BilingualText
                  en="SAR 100M focused on founder-led Saudi growth."
                  ar="١٠٠ مليون ريال موجهة لنمو الشركات السعودية بقيادة مؤسسيها."
                />
              </p>
            </div>
          </div>
        </div>

        {/* SAR 100M Hero Line */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <p className="text-[clamp(3.5rem,10vw,10rem)] font-bold tracking-tighter leading-none text-[var(--brand-primary)]">
            <BilingualText en="SAR 100M" ar="١٠٠ مليون ريال" />
            <span className="text-sm text-white/20 tracking-[0.6em] uppercase font-bold ml-12 align-middle font-[Metropolis]">
              <BilingualText en="Launch 2027" ar="انطلاق ٢٠٢٧" />
            </span>
          </p>
        </div>

        {/* ── Grid Stage ── */}
        <div
          ref={containerRef}
          className="relative border border-white/[0.06] overflow-hidden select-none"
          style={{
            height: gridH,
            // Fine grid lines matching reference
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundColor: "#081012",
          }}
        >
          {/* Subtle inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,114,133,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Moving Boxes */}
          {focusPoints.map((point, i) => {
            const pos = positions[i];
            const x = pos.col * cellSize;
            const y = pos.row * cellSize;
            const w = BOX_COLS * cellSize;
            const h = BOX_ROWS * cellSize;

            return (
              <motion.div
                key={i}
                className="absolute"
                animate={{ x, y }}
                transition={{
                  duration: 1.6,
                  ease: [0.16, 1, 0.3, 1], // expo-out — snappy start, smooth settle
                }}
                style={{ width: w, height: h }}
              >
                {point.ghost ? (
                  /* Ghost box: no fill, just icon + label, like "Private Markets" in ref */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 border border-white/10">
                    <div className="text-white/50">{point.icon}</div>
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] font-[Metropolis] text-white/50 text-center leading-tight">
                      <BilingualText en={point.title.en} ar={point.title.ar} />
                    </span>
                  </div>
                ) : (
                  /* Filled box */
                  <div
                    className={`w-full h-full ${point.color} flex flex-col items-center justify-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)]`}
                  >
                    <div
                      className={
                        point.isDark ? "text-black/70" : "text-white/80"
                      }
                    >
                      {point.icon}
                    </div>
                    <span
                      className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] font-[Metropolis] text-center leading-tight px-2 ${point.isDark ? "text-black/70" : "text-white/80"}`}
                    >
                      <BilingualText en={point.title.en} ar={point.title.ar} />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Photo Block — pinned bottom-right */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: PHOTO_COL * cellSize,
              top: PHOTO_ROW * cellSize,
              width: 2 * cellSize,
              height: 2 * cellSize,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover grayscale opacity-40"
            />
            {/* subtle border overlay */}
            <div className="absolute inset-0 border border-white/10 pointer-events-none" />
          </div>

          {/* Axis labels — subtle coordinate markers at corners */}
          <span className="absolute bottom-2 left-3 text-[9px] font-mono text-white/10 tracking-widest select-none pointer-events-none">
            0,0
          </span>
          <span className="absolute bottom-2 right-3 text-[9px] font-mono text-white/10 tracking-widest select-none pointer-events-none">
            {COLS},{ROWS}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Fund;
