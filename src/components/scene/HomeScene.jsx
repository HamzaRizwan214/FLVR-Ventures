import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import BilingualText from "../BilingualText";
import CtaLink from "../CtaLink";
import T from "../T";
import Words from "./Words";
import { useLanguage } from "@/contexts/LanguageContext";
import { Poster } from "../ConceptPosters";
import { concepts } from "@/data/concepts";
import { hero, steps, popup } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const SEEN_KEY = "flvr-intro-seen";
const CREAM = "#f2eee8";
const INK = "#131415";
const POP_BG = "#c1304a"; // the POP-UP square: the Validate card's crimson, with its deeper capsule
const POP_CAP = "#8f1d3a";
const A = 1.1; // length of the first scroll beat, in timeline units

const headline = {
  en: "Backing the next generation of Saudi F&B brands.",
  ar: "ندعم الجيل القادم من علامات الأغذية والمشروبات السعودية.",
};
const label = { en: "FLVR Ventures", ar: "فلايفر فينتشرز" };
const stageHead = {
  kicker: { en: "How we build", ar: "كيف نبني" },
  title: {
    en: "A four-stage method, from selection to scale.",
    ar: "منهجية من أربع مراحل، من الاختيار إلى التوسع.",
  },
};

const conceptHead = {
  kicker: { en: "Portfolio", ar: "المحفظة" },
  title: {
    en: "Four concepts, each built with its founder.",
    ar: "أربعة مفاهيم، يقود كلاً منها مؤسسه.",
  },
};

// The first sentence of the intro is the bold statement; the rest is the small grey line.
const split = (text) => {
  const m = text.match(/^(.*?[.。])\s+(.*)$/s);
  return m ? { lead: m[1], rest: m[2] } : { lead: text, rest: "" };
};
const desc = { en: split(hero.lead.en), ar: split(hero.lead.ar) };

const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode: the intro simply plays again next time */
  }
};

// Scroll and key input is held while the loader runs.
const stop = (e) => e.preventDefault();
const stopKeys = (e) => {
  if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)) e.preventDefault();
};
const lock = () => {
  window.addEventListener("wheel", stop, { passive: false });
  window.addEventListener("touchmove", stop, { passive: false });
  window.addEventListener("keydown", stopKeys);
};
const unlock = () => {
  window.removeEventListener("wheel", stop);
  window.removeEventListener("touchmove", stop);
  window.removeEventListener("keydown", stopKeys);
};

// Each stage is a flat two-tone poster (colours step from orange to wine across the four) with a
// photo in a circle. The circles: the supplied burger shot (Filter), the supplied burger-and-fries shot (Lift), the
// supplied pizza-and-phone shot (Validate), the supplied table-of-dishes shot (Run).
const stagePhoto = {
  filter: { src: "/filter.jpg", pos: "50% 58%" },
  lift: { src: "/lift.jpg", pos: "50% 100%" },
  validate: { src: "/validate.jpg", pos: "50% 40%" },
  run: { src: "/run.jpg", pos: "50% 80%" },
};
const posters = [
  { bg: "#f58a2e", cap: "#ec5d44" },
  { bg: "#ec5d44", cap: "#c1304a" },
  { bg: "#c1304a", cap: "#8f1d3a" },
  { bg: "#8f1d3a", cap: "#5a1226" },
];

// The POP-UP panel's outline: a rounded block with a notch in the top edge, a wedge cut into the
// left edge and the lower-right corner cut away. Units are cqw of the square (86 x 76).
const popShape =
  "M4,0 L29,0 C31.5,0 31.5,4.4 34,4.4 L40,4.4 C42.5,4.4 42.5,0 45,0 L82,0 Q86,0 86,4 L86,50 L60,76 L4,76 Q0,76 0,72 L0,52 L5.5,46 L0,40 L0,4 Q0,0 4,0 Z";

// One stage card, used by the pinned panels (wide screens) and the plain list (everything else).
// Reads like a poster: logo mark top left, the photo in a circle laid over a wide capsule, and the
// title and text on a second capsule below. All sizes are in cqw, so the card scales with its own width.
function StageCard({ step, index, group, lazy = false }) {
  const photo = stagePhoto[step.key];
  const c = posters[index] ?? posters[0];
  return (
    <div
      className="sc-pc-inner relative flex min-h-0 flex-1 flex-col overflow-hidden"
      style={{ background: c.bg, containerType: "inline-size" }}
    >
      <img
        src="/flvr-white.svg"
        alt=""
        className="absolute start-[7cqw] top-[7cqw] h-[6.5cqw] w-auto"
      />

      {/* The photo circle, laid over the first capsule */}
      <div className="relative mt-[12cqw] h-[58cqw] shrink-0">
        <span
          aria-hidden="true"
          className="sc-pc-capa absolute bottom-0 end-0 start-[-30cqw] top-[12cqw] rounded-e-full"
          style={{ background: c.cap }}
        />
        <div className="sc-pc-media absolute end-[7cqw] top-0 aspect-square w-[56cqw] overflow-hidden rounded-full bg-black/10">
          <img
            src={photo.src}
            alt=""
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
            className="sc-pc-img h-full w-full object-cover"
            style={{ objectPosition: photo.pos }}
          />
        </div>
      </div>

      {/* Title and text on the second capsule */}
      <div
        className="sc-pc-capb relative flex flex-1 flex-col justify-center rounded-s-full pe-[16cqw] ps-[11cqw] text-white"
        style={{ background: c.cap, marginInlineEnd: "-12cqw" }}
      >
        <h3
          className="leading-[1.02] tracking-[-0.03em] rtl:leading-[1.25] rtl:tracking-normal"
          style={{ fontSize: "clamp(1.9rem, 14.5cqw, 3.2rem)", fontWeight: 700 }}
        >
          <BilingualText
            en={<Words text={step.title.en} group={group} />}
            ar={<Words text={step.title.ar} group={group} />}
          />
        </h3>
        <p className="mt-[2.5cqw] leading-[1.55] text-white/90" style={{ fontSize: "clamp(12.5px, 4.2cqw, 14.5px)", fontWeight: 500 }}>
          <BilingualText
            en={<Words text={step.desc.en} group={group} />}
            ar={<Words text={step.desc.ar} group={group} />}
          />
        </p>
      </div>
    </div>
  );
}

// Home opening scene. A loader square fills, then holds the headline. A little scroll slides the
// square to the start side and brings in the description and the nav; more scroll glides on to
// the four stages, where the square widens and splits into one panel per stage. Everything is
// driven by one pinned GSAP timeline, with snap points so the page glides between the beats.
export default function HomeScene() {
  const { language } = useLanguage();
  const ar = language === "ar";
  const rootRef = useRef(null);
  const arrival = useRef(readSeen() ? "return" : "first");

  useLayoutEffect(() => {
    const root = rootRef.current;
    const q = gsap.utils.selector(root);
    const pin = q(".sc-pin")[0];
    const wrap = q(".sc-wrap")[0];
    const box = q(".sc-box")[0];
    const stageHeadEl = q(".sc-shead")[0];
    const pop = q(".sc-pop")[0];
    const popWords = q(".sc-in--pop");
    const popDot = q(".sc-pop-dot")[0];
    const frame2 = q(".sc-frame2")[0];
    const shead2El = q(".sc-shead2")[0];
    const shead2Words = q(".sc-in--shead2");
    const cta2El = q(".sc-cta2")[0];
    const cta2In = q(".sc-cta2-in");
    const ccWords = q(".sc-in--cc");
    const ccards = q(".sc-ccard");
    const ccImgs = q(".sc-cc-img");
    const popOutline = q(".sc-pop-outline")[0];
    const popPanel = q(".sc-pop-panel")[0];
    const popStrip = q(".sc-pop-strip")[0];
    const descEl = q(".sc-desc")[0];
    const frame = q(".sc-frame")[0];
    const nav = document.getElementById("site-nav");
    const headWords = q(".sc-in--head");
    const labelWords = q(".sc-in--label");
    const descWords = q(".sc-in--desc");
    const ctaIn = q(".sc-cta-in");
    const sheadWords = q(".sc-in--shead");
    const panelWords = q(".sc-in--panel");
    const panels = q(".sc-panel");
    let alive = true;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
        compact:
          "(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 679px) and (prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduce } = ctx.conditions;
        const desktop = ctx.conditions.desktop || (reduce && window.innerWidth >= 1024 && window.innerHeight >= 680);
        const rtl = () => document.documentElement.dir === "rtl";

        // All the geometry, in pixels, from the pinned stage's own size. On wide screens the square
        // and the description form one group, centred as a whole, so there is no empty gap between them.
        const M = () => {
          const W = pin.clientWidth;
          const H = pin.clientHeight;
          const pad = desktop ? Math.max(28, Math.min(80, W * 0.05)) : 20;
          const S = desktop ? Math.min(H * 0.64, W * 0.4, 640) : Math.min(W - 40, H * 0.46, 520);
          const gap = desktop ? Math.max(40, Math.min(72, W * 0.04)) : 20;
          const dW = desktop ? Math.min(440, W - 2 * pad - S - gap) : W - 40;
          const gl = (W - (S + gap + dW)) / 2;
          const cLeft = (W - S) / 2;
          const cTop = (H - S) / 2;
          const sLeft = desktop ? (rtl() ? gl + dW + gap : gl) : cLeft;
          const sTop = desktop ? cTop : 88;
          const dLeft = desktop ? (rtl() ? gl : gl + S + gap) : 20;
          // stage heading and the panels under it, centred together
          const fH = Math.max(410, Math.min(480, H * 0.56));
          const headH = stageHeadEl?.offsetHeight || 140;
          const headTop = Math.max(104, (H - (headH + 40 + fH)) / 2 + 20);
          const frameRect = { left: pad, top: headTop + headH + 40, width: W - 2 * pad, height: fH };
          // the POP-UP square (the Validate panel, grown), and where that panel sits in the row
          const S2 = Math.min(H * 0.78, W * 0.5, 740, H - 200);
          const popRect = { left: (W - S2) / 2, top: (H - S2) / 2, width: S2, height: S2 };
          const pw = (frameRect.width - 3 * 12) / 4;
          const p3 = { left: frameRect.left + 2 * (pw + 12), top: frameRect.top, width: pw, height: fH };
          return { W, H, pad, S, S2, cLeft, cTop, sLeft, sTop, frameRect, dW, dLeft, headTop, popRect, p3 };
        };

        const setVars = () => {
          const m = M();
          pin.style.setProperty("--S", `${m.S}px`);
          pin.style.setProperty("--hf", rtl() ? "0.1" : "0.12");
          pin.style.setProperty("--pad", `${m.pad}px`);
          pin.style.setProperty("--S2", `${m.S2}px`);
          gsap.set(descEl, {
            left: m.dLeft,
            width: m.dW,
            ...(desktop ? { top: "auto", bottom: m.H - (m.sTop + m.S) } : { top: m.sTop + m.S + 20, bottom: "auto" }),
          });
          if (desktop) {
            gsap.set(frame, m.frameRect);
            gsap.set(frame2, m.frameRect);
            // headings and the portfolio button are placed in pixels (start side / end side by direction)
            const onStart = rtl() ? { left: "auto", right: m.pad } : { left: m.pad, right: "auto" };
            const onEnd = rtl() ? { left: m.pad, right: "auto" } : { left: "auto", right: m.pad };
            const headW = Math.min(704, m.W - 2 * m.pad - 260);
            gsap.set([stageHeadEl, shead2El], { ...onStart, width: headW, top: m.headTop });
            gsap.set(cta2El, { ...onEnd, top: m.headTop + 6 });
          }
        };
        setVars();
        ScrollTrigger.addEventListener("refreshInit", setVars);

        const T0 = A + 2.9; // where the stages are complete and the POP-UP beat begins
        const T1 = T0 + 2.7; // where the POP-UP is fully in and the concept beat begins
        const T2 = T1 + 2.7; // where the concepts are fully in
        const D = desktop ? T2 : A + 0.4;

        // The nav is visible at the very start of the scene and again once the scene is finished;
        // while the scene is being scrolled through it is tucked away.
        let navShown = true;
        let navHeld = false; // true while the loader / opening reveal owns the nav
        const setNav = (show, duration = 0.45) => {
          if (!nav || show === navShown) return;
          navShown = show;
          gsap.to(nav, {
            yPercent: show ? 0 : -130,
            autoAlpha: show ? 1 : 0,
            duration,
            ease: show ? "power3.out" : "power3.in",
            overwrite: true,
          });
        };
        const navWanted = (p) => p < 0.003 || p > 0.997;
        const holdNav = () => {
          if (!nav) return;
          navHeld = true;
          navShown = false;
          gsap.set(nav, { yPercent: -130, autoAlpha: 0 });
        };
        const releaseNav = (duration) => {
          navHeld = false;
          setNav(navWanted(tl.scrollTrigger ? tl.scrollTrigger.progress : 0), duration);
        };

        const tl = gsap.timeline({
          paused: reduce,
          defaults: { ease: "none" },
          scrollTrigger: reduce
            ? undefined
            : {
                trigger: pin,
                start: "top top",
                end: desktop ? `+=${Math.round(D * 72)}%` : "+=95%",
                pin: true,
                scrub: 0.7,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (!navHeld) setNav(navWanted(self.progress));
                },
                snap: {
                  snapTo: desktop ? [0, A / D, T0 / D, T1 / D, 1] : [0, 1],
                  duration: { min: 0.45, max: 1.1 },
                  ease: "power3.inOut",
                  delay: 0.04,
                  directional: true,
                },
              },
        });

        // Beat 1: the square slides to the start side, the description and the nav come in.
        tl.fromTo(
          wrap,
          { left: () => M().cLeft, top: () => M().cTop, width: () => M().S, height: () => M().S },
          {
            left: () => M().sLeft,
            top: () => M().sTop,
            width: () => M().S,
            height: () => M().S,
            duration: A * 0.9,
            ease: "power3.inOut",
          },
          0,
        );
        tl.fromTo(
          descWords,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.45, ease: "power3.out", stagger: { amount: 0.4 } },
          0.25,
        );
        tl.fromTo(ctaIn, { yPercent: 130 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, 0.55);

        // Beat 2 (wide screens): the text leaves, the square widens, then splits into four panels.
        if (desktop) {
          tl.fromTo([...headWords, ...labelWords], { yPercent: 0 }, { yPercent: -115, duration: 0.4, ease: "power3.in", stagger: { amount: 0.25 }, immediateRender: false }, A);
          tl.fromTo(descWords, { yPercent: 0 }, { yPercent: -115, duration: 0.35, ease: "power3.in", stagger: { amount: 0.25 }, immediateRender: false }, A);
          tl.fromTo(ctaIn, { yPercent: 0 }, { yPercent: -130, duration: 0.35, ease: "power3.in", immediateRender: false }, A);
          tl.fromTo(
            wrap,
            { left: () => M().sLeft, top: () => M().sTop, width: () => M().S, height: () => M().S },
            {
              left: () => M().frameRect.left,
              top: () => M().frameRect.top,
              width: () => M().frameRect.width,
              height: () => M().frameRect.height,
              duration: 1.1,
              ease: "power3.inOut",
              immediateRender: false,
            },
            A + 0.5,
          );
          // swap the single sheet for the four panels (same colour, so nothing shows)
          tl.fromTo(wrap, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01 }, A + 1.6);
          tl.fromTo(frame, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, A + 1.6);
          tl.fromTo(
            frame,
            { "--g": "0px", "--pr": "0px" },
            { "--g": "12px", "--pr": "14px", duration: 0.7, ease: "power3.inOut" },
            A + 1.65,
          );
          tl.fromTo(
            sheadWords,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: { amount: 0.35 } },
            A + 1.45,
          );
          // The poster entrance (used for the stages and again for the concepts): each coloured
          // poster wipes up over the cream sheet, the capsules slide in from their sides, the
          // photo circle opens like an iris, and the words rise.
          const revealPosters = (frameEl, words, at) => {
            const posterEls = frameEl.querySelectorAll(".sc-pc-inner");
            const circles = frameEl.querySelectorAll(".sc-pc-media");
            const photos = frameEl.querySelectorAll(".sc-pc-img");
            const capA = frameEl.querySelectorAll(".sc-pc-capa");
            const capB = frameEl.querySelectorAll(".sc-pc-capb");
            tl.fromTo(
              posterEls,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out", stagger: 0.08 },
              at,
            );
            tl.fromTo(
              capA,
              { xPercent: () => (rtl() ? 105 : -105) },
              { xPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, immediateRender: true },
              at + 0.2,
            );
            tl.fromTo(
              capB,
              { xPercent: () => (rtl() ? -105 : 105) },
              { xPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, immediateRender: true },
              at + 0.25,
            );
            tl.fromTo(
              circles,
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(75% at 50% 50%)", duration: 0.8, ease: "power3.out", stagger: 0.08 },
              at + 0.3,
            );
            tl.fromTo(photos, { scale: 1.25 }, { scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 }, at + 0.3);
            tl.fromTo(
              words,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.55, ease: "power3.out", stagger: { amount: 0.5 } },
              at + 0.15,
            );
          };
          revealPosters(frame, panelWords, A + 1.8);

          // Beat 3: the Validate panel pops out of the row and becomes the square again, holding
          // POP-UP by FLVR. The other panels drop away, the heading leaves.
          const p3Inner = panels[2].querySelector(".sc-pc-inner");
          tl.fromTo(sheadWords, { yPercent: 0 }, { yPercent: -115, duration: 0.35, ease: "power3.in", stagger: { amount: 0.2 }, immediateRender: false }, T0);
          tl.fromTo([panels[0], panels[1], panels[3]], { yPercent: 0 }, { yPercent: 112, duration: 0.6, ease: "power3.in", stagger: 0.07, immediateRender: false }, T0);
          tl.fromTo(p3Inner, { yPercent: 0 }, { yPercent: -105, duration: 0.5, ease: "power3.in", immediateRender: false }, T0);
          tl.fromTo(panels[2], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01 }, T0 + 0.55);
          tl.fromTo(pop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, T0 + 0.55);
          tl.fromTo(
            pop,
            {
              left: () => M().p3.left,
              top: () => M().p3.top,
              width: () => M().p3.width,
              height: () => M().p3.height,
              backgroundColor: CREAM,
              color: INK,
            },
            {
              left: () => M().popRect.left,
              top: () => M().popRect.top,
              width: () => M().popRect.width,
              height: () => M().popRect.height,
              backgroundColor: POP_BG,
              color: "#fff",
              duration: 1,
              ease: "power3.inOut",
            },
            T0 + 0.55,
          );
          tl.fromTo(popOutline, { scale: 0.9 }, { scale: 1, duration: 0.8, ease: "power3.out" }, T0 + 1.15);
          tl.fromTo(
            popPanel,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power3.out" },
            T0 + 1.3,
          );
          tl.fromTo(popDot, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, T0 + 1.6);
          tl.fromTo(
            popWords,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: { amount: 0.6 } },
            T0 + 1.6,
          );
          tl.fromTo(
            popStrip,
            { clipPath: () => (rtl() ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)") },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.out" },
            T0 + 2.05,
          );

          // Beat 4: the POP-UP square empties and drops out of the bottom of the screen, and the four
          // concept cards pop up from below one after another, each with a small bounce.
          const popInner = pop.firstElementChild;
          tl.fromTo(popInner, { yPercent: 0 }, { yPercent: -105, duration: 0.5, ease: "power3.in", immediateRender: false }, T1);
          tl.fromTo(frame, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, immediateRender: false }, T1);
          tl.fromTo(
            pop,
            { top: () => M().popRect.top, backgroundColor: POP_BG },
            { top: () => M().H + 20, backgroundColor: POP_BG, duration: 0.8, ease: "power3.in", immediateRender: false },
            T1 + 0.45,
          );
          tl.fromTo(pop, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, immediateRender: false }, T1 + 1.3);
          tl.fromTo(frame2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, T1 + 0.8);
          tl.fromTo(
            ccards,
            { yPercent: 135 },
            { yPercent: 0, duration: 0.95, ease: "back.out(1.25)", stagger: 0.13, immediateRender: true },
            T1 + 0.9,
          );
          tl.fromTo(ccImgs, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: "power3.out", stagger: 0.13 }, T1 + 0.95);
          tl.fromTo(
            shead2Words,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: { amount: 0.35 } },
            T1 + 1.05,
          );
          tl.fromTo(cta2In, { yPercent: 140 }, { yPercent: 0, duration: 0.55, ease: "power3.out" }, T1 + 1.3);
          tl.fromTo(
            ccWords,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.55, ease: "power3.out", stagger: { amount: 0.5 } },
            T1 + 1.6,
          );
          tl.set({}, {}, D);
        } else {
          tl.set({}, {}, D);
        }

        if (reduce) tl.time(A).pause();

        // First visit: the loader (the nav waits for it). Otherwise a short headline reveal and the nav drops in.
        const headDeck = [...headWords, ...labelWords];
        const startQuietly = () => {
          if (reduce || window.scrollY > 10) return;
          gsap.fromTo(headDeck, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.06, delay: 0.15 });
          holdNav();
          gsap.delayedCall(0.5, () => alive && releaseNav(0.8));
        };

        const SMALL = "inset(46% 46% 46% 46% round 16px)";
        const FULL = "inset(0% 0% 0% 0% round 16px)";
        const playIntro = async () => {
          lock();
          window.scrollTo(0, 0);
          gsap.set(headDeck, { yPercent: 110 });
          const fonts = document.fonts?.ready ?? Promise.resolve();
          // The loader is one square: a small cream square in the middle grows to its full size.
          const grow = gsap.fromTo(box, { clipPath: SMALL }, { clipPath: FULL, duration: 1.0, ease: "power3.inOut", delay: 0.1 });
          await Promise.all([grow, fonts]);
          if (!alive) return;
          const reveal = gsap.timeline();
          reveal
            .to(labelWords, { yPercent: 0, duration: 0.7, ease: "power3.out" })
            .to(headWords, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 }, "<0.05");
          await reveal;
          box.style.clipPath = "";
          unlock();
          markSeen();
          arrival.current = "return";
          releaseNav(0.8);
          ScrollTrigger.refresh();
        };

        if (reduce) {
          box.style.clipPath = "";
        } else if (arrival.current === "first") {
          box.style.clipPath = SMALL; // no flash before the loader starts
          holdNav();
          playIntro();
        } else {
          startQuietly();
        }

        document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

        return () => {
          alive = false;
          unlock();
          if (nav) gsap.set(nav, { clearProps: "transform,opacity,visibility" });
          ScrollTrigger.removeEventListener("refreshInit", setVars);
        };
      },
    );

    return () => {
      alive = false;
      mm.revert();
    };
    // the scene rebuilds when the language (and so the text and direction) changes
  }, [language]);

  const gradient = [
    "linear-gradient(to top, rgba(14,4,6,0.6) 0%, rgba(14,4,6,0.2) 22%, rgba(14,4,6,0) 48%)",
    "radial-gradient(110% 95% at 14% 8%, #ff9205 0%, #f06a1c 26%, #cf3b2b 56%, #ac1e40 80%, #5d1226 100%)",
  ].join(", ");

  return (
    <section ref={rootRef} className="relative z-10">
      <div
        className="sc-pin grain relative h-[100svh] overflow-hidden rounded-b-[2.25rem] md:rounded-b-[3.75rem]"
        style={{ background: gradient }}
      >
        {/* Stage heading, wide screens: revealed once the square has widened */}
        <div
          className="sc-shead sc-desktop-only absolute z-10 max-w-[44rem]"
          style={{ top: 104, left: 40 }}
        >
          <p className="text-[15px] font-semibold text-white/90">
            <BilingualText
              en={<Words text={stageHead.kicker.en} group="shead" />}
              ar={<Words text={stageHead.kicker.ar} group="shead" />}
            />
          </p>
          <h2 className="mt-2 text-[clamp(1.9rem,3.2vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white rtl:leading-[1.25] rtl:tracking-normal">
            <BilingualText
              en={<Words text={stageHead.title.en} group="shead" />}
              ar={<Words text={stageHead.title.ar} group="shead" />}
            />
          </h2>
        </div>

        {/* The four panels, wide screens. They start as one sheet (the square, widened) and split. */}
        <div
          className="sc-frame sc-desktop-only invisible absolute z-20 overflow-hidden rounded-[16px]"
          style={{ "--sc-d": "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "var(--g, 0px)" }}
        >
          {steps.map((step, i) => (
            <article
              key={step.key}
              className="sc-panel flex flex-col overflow-hidden"
              style={{ background: CREAM, color: INK, borderRadius: "var(--pr, 0px)" }}
            >
              <StageCard step={step} index={i} group="panel" />
            </article>
          ))}
        </div>

        {/* POP-UP by FLVR: the Validate card, grown into a square. A flat crimson ground with a thin
            inset outline, one asymmetric wine panel (notch on top, wedge on the left, cut lower-right
            corner) holding the title and text, and a cream sticker strip for the investor line. */}
        <div
          className="sc-pop sc-desktop-only invisible absolute z-40 overflow-hidden rounded-[16px]"
          style={{ left: 0, top: 0, width: 0, height: 0, background: CREAM, color: "#fff" }}
        >
          <div className="relative h-full w-full" style={{ containerType: "inline-size" }}>
            <span
              aria-hidden="true"
              className="sc-pop-outline pointer-events-none absolute inset-[3.2cqw] rounded-[3.6cqw] border border-white/45"
            />

            {/* tagline */}
            <p
              className="absolute start-[7cqw] top-[6.5cqw] flex h-[6cqw] items-center gap-[1.8cqw] font-semibold"
              style={{ fontSize: "clamp(11.5px, 2.5cqw, 15px)" }}
            >
              <span aria-hidden="true" className="sc-pop-dot relative flex h-[1.9cqw] w-[1.9cqw] shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#ff9205] opacity-70" />
                <span className="relative h-full w-full rounded-full bg-[#ff9205]" />
              </span>
              <BilingualText
                en={<Words text={popup.tagline.en} group="pop" />}
                ar={<Words text={popup.tagline.ar} group="pop" />}
              />
            </p>

            {/* the asymmetric panel, with its content */}
            <div className="sc-pop-panel absolute start-[7cqw] top-[15cqw] h-[76cqw] w-[86cqw]">
              <svg
                aria-hidden="true"
                viewBox="0 0 86 76"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full rtl:-scale-x-100"
              >
                <path d={popShape} fill={POP_CAP} />
              </svg>
              <div className="absolute inset-0 flex flex-col pb-[7cqw] pe-[8cqw] ps-[9cqw] pt-[9cqw]">
                <h2
                  className="tracking-[-0.03em] rtl:tracking-normal"
                  style={{ fontSize: "clamp(1.6rem, 8.6cqw, 3.4rem)", lineHeight: ar ? 1.28 : 1.03, fontWeight: 700 }}
                >
                  <BilingualText
                    en={<Words text={popup.name.en} group="pop" />}
                    ar={<Words text={popup.name.ar} group="pop" />}
                  />
                </h2>
                <p
                  className="mt-[2.8cqw] leading-[1.6] text-white/90"
                  style={{ fontSize: "clamp(12px, 2.55cqw, 15px)", fontWeight: 500 }}
                >
                  <BilingualText
                    en={<Words text={popup.body.en} group="pop" />}
                    ar={<Words text={popup.body.ar} group="pop" />}
                  />
                </p>
                <p
                  className="sc-pop-strip mt-auto w-fit max-w-[54cqw] rounded-[1.2cqw] px-[2.6cqw] py-[1.7cqw] leading-[1.5]"
                  style={{
                    background: CREAM,
                    color: INK,
                    fontSize: "clamp(11px, 2.25cqw, 14px)",
                    fontWeight: 500,
                    outline: "0.45cqw dotted rgba(19,20,21,0.4)",
                    outlineOffset: "-1.1cqw",
                  }}
                >
                  <BilingualText
                    en={<Words text={popup.investors.en} group="pop" />}
                    ar={<Words text={popup.investors.ar} group="pop" />}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Concept heading and the way on to the portfolio (revealed once the square has opened) */}
        <div
          className="sc-shead2 sc-desktop-only absolute z-10 max-w-[44rem]"
          style={{ top: 104, left: 40 }}
        >
          <p className="text-[15px] font-semibold text-white/90">
            <BilingualText
              en={<Words text={conceptHead.kicker.en} group="shead2" />}
              ar={<Words text={conceptHead.kicker.ar} group="shead2" />}
            />
          </p>
          <h2 className="mt-2 text-[clamp(1.9rem,3.2vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white rtl:leading-[1.25] rtl:tracking-normal">
            <BilingualText
              en={<Words text={conceptHead.title.en} group="shead2" />}
              ar={<Words text={conceptHead.title.ar} group="shead2" />}
            />
          </h2>
        </div>
        <div
          className="sc-cta2 sc-desktop-only absolute z-10 overflow-hidden py-1"
          style={{ top: 110, right: 40 }}
        >
          <div className="sc-cta2-in">
            <CtaLink to="/portfolio" variant="light">
              <BilingualText en="View the portfolio" ar="استعرض المحفظة" />
            </CtaLink>
          </div>
        </div>

        {/* The four concept cards, popping up after the POP-UP square has dropped away */}
        <div
          className="sc-frame2 cp-row sc-desktop-only invisible absolute z-20"
          style={{ "--sc-d": "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "12px" }}
        >
          {concepts.map((concept, i) => (
            <Poster key={concept.slug} concept={concept} index={i} scene />
          ))}
        </div>

        {/* The square: label and headline */}
        <div className="sc-wrap absolute z-30" style={{ left: 0, top: 0, width: 0, height: 0 }}>
          <div
            className="sc-box absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[16px]"
            style={{ background: CREAM, color: INK, padding: "calc(var(--S, 560px) * 0.07)" }}
          >
            <p className="text-[clamp(13px,1.15vw,17px)] font-semibold">
              <BilingualText
                en={<Words text={label.en} group="label" />}
                ar={<Words text={label.ar} group="label" />}
              />
            </p>
            <h1
              className="tracking-[-0.035em] rtl:tracking-normal"
              style={{ fontSize: "calc(var(--S, 560px) * var(--hf, 0.12))", lineHeight: ar ? 1.3 : 1.04, fontWeight: 500 }}
            >
              <BilingualText
                en={<Words text={headline.en} group="head" />}
                ar={<Words text={headline.ar} group="head" />}
              />
            </h1>
          </div>
        </div>

        {/* Description, revealed with the first scroll */}
        <div className="sc-desc absolute z-30" style={{ left: 0, width: 0 }}>
          <p className="text-[clamp(1.1rem,1.6vw,1.5rem)] font-semibold leading-[1.3] text-white">
            <BilingualText
              en={<Words text={desc.en.lead} group="desc" />}
              ar={<Words text={desc.ar.lead} group="desc" />}
            />
          </p>
          <p className="mt-4 text-[13px] leading-[1.7] text-white/75 sm:text-sm">
            <BilingualText
              en={<Words text={desc.en.rest} group="desc" />}
              ar={<Words text={desc.ar.rest} group="desc" />}
            />
          </p>
          <div className="mt-7 overflow-hidden py-1">
            <div className="sc-cta-in w-fit">
              <CtaLink to="/contact?interest=invest" variant="light">
                <T t={hero.ctaPrimary} />
              </CtaLink>
            </div>
          </div>
        </div>
      </div>

      {/* Everything that is not a wide screen (and reduced motion): the stages as a plain list */}
      <div className="sc-mobile-only px-5 pb-20 pt-16 sm:px-8">
        <p className="kicker">
          <T t={stageHead.kicker} />
        </p>
        <h2 className="mt-3 max-w-[22ch] text-[clamp(2rem,6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)] rtl:leading-[1.25] rtl:tracking-normal">
          <T t={stageHead.title} />
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {steps.map((step, i) => (
            <motion.article
              key={step.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[27rem] flex-col overflow-hidden rounded-[1rem]"
              style={{ background: CREAM, color: INK }}
            >
              <StageCard step={step} index={i} group="static" lazy />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
