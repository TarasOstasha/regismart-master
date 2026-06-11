/**
 * Fixed license-plate bezel drawn around the viewport. Pure decoration:
 * aria-hidden, pointer-events-none, no JS — renders as RSC and never hydrates.
 *
 * The huge box-shadow spread paints everything OUTSIDE the rounded frame in
 * the matte color, which is what clips the scrolling page to the plate's
 * rounded corners without touching the scroll container.
 *
 * Mounting holes are shown on lg+ only — on phones they'd collide with the
 * header content and the sticky call CTA.
 */
// Mockup-style holes: white stadium shape with a navy rim, ~27% in from each
// side like a real plate. The header reserves the band they occupy (lg:pt-12)
// so they never collide with the nav row.
// (Alternative far-side variant lives in commit 5d4853e if ever needed.)
const HOLE =
  "absolute hidden h-[26px] w-[60px] rounded-full bg-white ring-2 ring-inset ring-plate-navy/40 shadow-[inset_0_2px_4px_rgba(31,48,124,0.25)] lg:block";

export function PlateFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-1.5 z-[80] rounded-[18px] border-[3px] border-[#24368a] shadow-[0_0_0_9999px_#e9eef5,inset_0_0_0_1px_rgba(255,255,255,0.5)] sm:inset-2.5 sm:rounded-[28px] sm:border-[5px]"
    >
      <span className={`${HOLE} left-[26.5%] top-4 -translate-x-1/2`} />
      <span className={`${HOLE} right-[26.5%] top-4 translate-x-1/2`} />
      <span className={`${HOLE} bottom-4 left-[26.5%] -translate-x-1/2`} />
      <span className={`${HOLE} bottom-4 right-[26.5%] translate-x-1/2`} />
    </div>
  );
}
