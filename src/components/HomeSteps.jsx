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

// Home: the four-stage method. All four cards are always visible, nothing to drag or swipe:
// one column on phones, 2 x 2 on tablets and small laptops, one row of four from 1280px.
// Only on very wide screens (1700px+) does the heading move beside the cards.
export default function HomeSteps() {
  return (
    <section className="panel overflow-hidden px-6 py-16 lg:px-12 lg:py-20 2xl:py-28">
      <div className="grid grid-cols-1 gap-10 min-[1700px]:grid-cols-[minmax(0,340px)_minmax(0,1fr)] min-[1700px]:gap-14">
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
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
                      "mt-10 text-[2.1rem] font-light leading-none tracking-[-0.025em] 2xl:text-[2.5rem]",
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
