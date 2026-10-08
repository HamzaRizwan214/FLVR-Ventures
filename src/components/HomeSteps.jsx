import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Filter, FlaskConical, Layers, Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import BilingualText from "./BilingualText";
import T from "./T";
import { steps, popup } from "@/data/content";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const icons = { filter: Filter, lift: Layers, validate: FlaskConical, run: Play };

// Card background per stage. It fills the whole card, including the frame around the photo.
// Validate (POP-UP) carries the brand gradient; the rest are quiet dark tones.
const tones = {
  filter: "radial-gradient(90% 55% at 100% 0%, rgba(236,232,225,0.07), transparent 70%), var(--bg-secondary)",
  lift: "radial-gradient(90% 55% at 100% 0%, rgba(214,173,132,0.12), transparent 70%), var(--bg-secondary)",
  validate: "linear-gradient(160deg, #ac1e40 0%, #c24a22 52%, #e3790f 100%)",
  run: "radial-gradient(90% 55% at 100% 0%, rgba(236,232,225,0.05), transparent 70%), var(--bg-secondary)",
};

// Round arrow button, hairline, filled on hover
function Arrow({ dir, disabled, onClick }) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon size={17} strokeWidth={1.5} className="rtl:-scale-x-100" />
    </button>
  );
}

// Home: the four-stage method.
// Desktop: heading and arrows on the start side, the card row on the end side,
// running to the panel edge. Mobile: heading, arrows, then a swipeable row.
export default function HomeSteps() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const cards = () => Array.from(scrollerRef.current?.children ?? []);

  // Index of the card whose start edge is closest to the scroller's start edge.
  const nearestIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const rtl = getComputedStyle(el).direction === "rtl";
    const r = el.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(el).paddingInlineStart) || 0;
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((c, i) => {
      const cr = c.getBoundingClientRect();
      const dist = rtl ? Math.abs(cr.right - (r.right - pad)) : Math.abs(cr.left - (r.left + pad));
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  }, []);

  const goTo = useCallback(
    (i) => {
      const list = cards();
      const target = list[Math.max(0, Math.min(list.length - 1, i))];
      target?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
    },
    [reduce],
  );

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: pos <= 2, end: pos >= max - 2 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const onKeyDown = (e) => {
    const rtl = getComputedStyle(scrollerRef.current).direction === "rtl";
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward) {
      e.preventDefault();
      goTo(nearestIndex() + 1);
    } else if (e.key === back) {
      e.preventDefault();
      goTo(nearestIndex() - 1);
    }
  };

  return (
    <section className="panel overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        {/* Heading + arrows */}
        <div className="flex flex-col">
          <SectionHeading
            className="!mb-0"
            titleClassName="text-[clamp(1.75rem,2.6vw,2.6rem)]"
            eyebrow={<BilingualText en="How we build" ar="كيف نبني" />}
            title={
              <BilingualText
                en="A four-stage method, from selection to scale."
                ar="منهجية من أربع مراحل، من الاختيار إلى التوسع."
              />
            }
          />
          <div className="mt-8 flex gap-3 lg:mt-auto lg:pt-10">
            <Arrow dir="prev" disabled={edges.start} onClick={() => goTo(nearestIndex() - 1)} />
            <Arrow dir="next" disabled={edges.end} onClick={() => goTo(nearestIndex() + 1)} />
          </div>
        </div>

        {/* Card row. Mobile bleeds to both panel edges; desktop only to the end edge. */}
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Studio method"
          tabIndex={0}
          onScroll={update}
          onKeyDown={onKeyDown}
          className={cn(
            "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "scroll-ps-6 lg:mx-0 lg:-me-12 lg:ps-0 lg:pe-12 lg:scroll-ps-0",
          )}
        >
          {steps.map((step, i) => {
            const Icon = icons[step.key];
            const hot = step.key === "validate";
            return (
              <motion.article
                key={step.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.8, ease }}
                style={{ background: tones[step.key] }}
                className={cn(
                  "group flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border sm:w-[340px] lg:w-[350px]",
                  hot ? "border-white/10" : "border-[var(--border-default)]",
                )}
              >
                {/* Top zone */}
                <div className="relative flex min-h-[260px] flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={cn("pill", hot && "!bg-white/15 !text-white")}>0{i + 1}</span>
                      <span className={cn("pill", hot && "!bg-white/15 !text-white")}>
                        <T t={step.descriptor} />
                      </span>
                      {hot && <span className="pill !bg-white !text-[#8f1735]">POP-UP</span>}
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                        hot
                          ? "border-white/40 text-white"
                          : "border-[var(--border-strong)] text-[var(--text-secondary)]",
                      )}
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-auto pt-12 text-[2.5rem] font-light leading-none tracking-[-0.025em]",
                      hot ? "text-white" : "text-[var(--text-primary)]",
                    )}
                  >
                    <T t={step.title} />
                  </h3>
                  <p
                    className={cn(
                      "mt-4 max-w-[26ch] text-[14px] leading-[1.7]",
                      hot ? "text-white/85" : "text-[var(--text-secondary)]",
                    )}
                  >
                    <T t={step.desc} />
                  </p>
                </div>

                {/* Image */}
                <div className="p-2">
                  <div className="relative aspect-[4/4.1] overflow-hidden rounded-[20px] bg-black/20">
                    <img
                      src={step.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover brightness-[0.82] saturate-[0.8] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="pill absolute bottom-3 start-3 bg-black/40 text-white/80 backdrop-blur-md">
                      0{i + 1} / 0{steps.length}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* POP-UP by FLVR: light box with the same warm gradients as the hero heading banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease }}
        className="relative mt-10 overflow-hidden rounded-[22px] bg-[var(--hero-block)] lg:mt-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right, rgba(227,121,15,0.42) 0%, rgba(227,121,15,0.16) 15%, transparent 38%)",
              "linear-gradient(to left, rgba(172,30,64,0.46) 0%, rgba(214,92,40,0.22) 17%, transparent 42%)",
              "radial-gradient(60% 100% at 100% 0%, rgba(214,173,132,0.40) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
        <div className="relative grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col justify-between gap-8">
            <h3 className="text-[clamp(1.6rem,2.5vw,2.3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--hero-ink)]">
              <T t={popup.name} />
            </h3>
            <p className="text-[15px] font-medium text-[var(--hero-accent)]">
              <T t={popup.tagline} />
            </p>
          </div>
          <div className="space-y-5 text-[15px] leading-[1.8] text-[var(--hero-ink)]/75">
            <p>
              <T t={popup.body} />
            </p>
            <p>
              <T t={popup.investors} />
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
