import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, FlaskConical, Layers, Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import BilingualText from "./BilingualText";
import T from "./T";
import { steps, popup } from "@/data/content";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const icons = { filter: Filter, lift: Layers, validate: FlaskConical, run: Play };

// Card background per stage. Validate (POP-UP) carries the brand gradient; the rest are quiet dark tones.
const tones = {
  filter: "radial-gradient(90% 55% at 100% 0%, rgba(236,232,225,0.07), transparent 70%), var(--bg-secondary)",
  lift: "radial-gradient(90% 55% at 100% 0%, rgba(214,173,132,0.12), transparent 70%), var(--bg-secondary)",
  validate: "linear-gradient(160deg, #ac1e40 0%, #c24a22 52%, #e3790f 100%)",
  run: "radial-gradient(90% 55% at 100% 0%, rgba(236,232,225,0.05), transparent 70%), var(--bg-secondary)",
};

// One stage in the expanding row. Hover or focus opens it. The open face has a fixed minimum
// width so its text never reflows while the card animates.
function ExpandingStage({ step, active, onActivate }) {
  const Icon = icons[step.key];
  const hot = step.key === "validate";
  const tone = hot ? "text-white" : "text-[var(--text-primary)]";

  return (
    <article
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-expanded={active}
      style={{ background: tones[step.key], flexGrow: active ? 1.8 : 1, flexBasis: 0 }}
      className={cn(
        "relative min-w-0 cursor-default overflow-hidden rounded-[26px] border outline-none transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
        hot ? "border-white/10" : "border-[var(--border-default)]",
      )}
    >
      {/* Closed face: icon and title */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-500",
          active ? "pointer-events-none opacity-0" : "opacity-100 delay-300",
        )}
      >
        <div className="flex items-start justify-between gap-2">
          {hot ? <span className="pill !bg-white !px-2.5 !py-0.5 !text-[10px] !text-[#8f1735]">POP-UP</span> : <span />}
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
              hot ? "border-white/40 text-white" : "border-[var(--border-strong)] text-[var(--text-secondary)]",
            )}
          >
            <Icon size={14} strokeWidth={1.5} />
          </span>
        </div>
        <h3 className={cn("text-[1.35rem] font-light leading-none tracking-[-0.02em]", tone)}>
          <T t={step.title} />
        </h3>
      </div>

      {/* Open face: title and description */}
      <div
        className={cn(
          "absolute inset-y-0 start-0 flex w-full min-w-[15rem] flex-col p-5 transition-opacity duration-500",
          active ? "opacity-100 delay-300" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          {hot ? <span className="pill !bg-white !text-[#8f1735]">POP-UP</span> : <span />}
          <span
            aria-hidden="true"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
              hot ? "border-white/40 text-white" : "border-[var(--border-strong)] text-[var(--text-secondary)]",
            )}
          >
            <Icon size={15} strokeWidth={1.5} />
          </span>
        </div>
        <h3 className={cn("mt-auto text-[1.9rem] font-light leading-none tracking-[-0.025em]", tone)}>
          <T t={step.title} />
        </h3>
        <p className={cn("mt-3 text-[13.5px] leading-[1.6]", hot ? "text-white/85" : "text-[var(--text-secondary)]")}>
          <T t={step.desc} />
        </p>
      </div>
    </article>
  );
}

// Home: the four-stage method. All four cards are always visible, nothing to drag or swipe:
// one column on phones, 2 x 2 on tablets and small laptops, one row of four from 1280px.
// Only on very wide screens (1700px+) does the heading move beside the cards.
export default function HomeSteps() {
  const [open, setOpen] = useState(steps[0].key);

  return (
    <section className="panel overflow-hidden px-6 py-16 lg:px-12 lg:py-20 2xl:py-28">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,clamp(380px,30vw,520px))_minmax(0,1fr)] xl:gap-10">
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

        {/* xl and up: heading left, expanding row right */}
        <div className="hidden h-[15rem] gap-3 xl:flex">
          {steps.map((step) => (
            <ExpandingStage
              key={step.key}
              step={step}
              active={open === step.key}
              onActivate={() => setOpen(step.key)}
            />
          ))}
        </div>

        {/* Below xl: all four cards always visible, nothing to hover */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
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
                  "flex flex-col overflow-hidden rounded-[26px] border",
                  hot ? "border-white/10" : "border-[var(--border-default)]",
                )}
              >
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
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
                      "mt-6 text-[2.1rem] font-light leading-none tracking-[-0.025em] 2xl:text-[2.5rem]",
                      hot ? "text-white" : "text-[var(--text-primary)]",
                    )}
                  >
                    <T t={step.title} />
                  </h3>
                  <p
                    className={cn(
                      "mt-4 text-[14px] leading-[1.7]",
                      hot ? "text-white/85" : "text-[var(--text-secondary)]",
                    )}
                  >
                    <T t={step.desc} />
                  </p>
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
        className="relative mt-10 overflow-hidden rounded-[22px] bg-[var(--hero-block)] lg:mt-10 2xl:mt-14"
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
        <div className="relative grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12 lg:p-10 2xl:gap-16 2xl:p-12">
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
