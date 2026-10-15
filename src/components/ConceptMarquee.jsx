import { concepts } from "@/data/concepts";
import BilingualText from "./BilingualText";

// Four small marks, one per concept, set beside the names the way a logo strip is.
const glyphs = [
  <svg key="a" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="8.5" opacity=".55" /></svg>,
  <svg key="b" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M4 3h16v3.2c0 2.6-2 4.2-4.4 5.8 2.4 1.6 4.4 3.2 4.4 5.8V21H4v-3.2c0-2.6 2-4.2 4.4-5.8C6 10.4 4 8.8 4 6.2z" /></svg>,
  <svg key="c" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" /><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" /></svg>,
  <svg key="d" viewBox="0 0 28 24" className="h-[22px] w-[26px]" fill="currentColor"><circle cx="9" cy="12" r="8.5" /><circle cx="19" cy="12" r="8.5" opacity=".6" /></svg>,
];

// Under the hero: a dark rounded band. The hero's rounded corners sit on top of it, so it starts
// beneath them. A short label on the start side, then the concept names scrolling slowly.
export default function ConceptMarquee() {
  const items = (rep) => concepts.map((c, i) => (
    <span key={`${rep}-${c.slug}`} className="flex shrink-0 items-center gap-3 px-8 text-[clamp(1.05rem,1.5vw,1.3rem)] font-semibold tracking-[-0.01em] text-white md:px-12 rtl:tracking-normal">
      {glyphs[i % glyphs.length]}
      <BilingualText en={c.name} ar={c.nameAr} />
    </span>
  ));
  const run = [0, 1, 2].flatMap((rep) => items(rep));

  return (
    <section className="sc-overlap rounded-b-[2.25rem] bg-[#161617] md:rounded-b-[3.75rem]">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-5 py-9 sm:px-8 md:flex-row md:items-center md:gap-10 lg:px-12 lg:py-11">
        <p className="shrink-0 text-[13px] font-semibold leading-snug text-white md:w-[8.5rem]">
          <BilingualText en="Portfolio" ar="المحفظة" />
        </p>
        <div
          aria-hidden="true"
          className="marquee min-w-0 flex-1 select-none overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 88%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 88%, transparent 100%)",
          }}
        >
          <div className="marquee-track">
            <div className="flex shrink-0 items-center">{run}</div>
            <div className="flex shrink-0 items-center">{run}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
