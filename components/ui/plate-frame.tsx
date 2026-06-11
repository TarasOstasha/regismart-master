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
const HOLE =
  "absolute hidden h-[18px] w-14 rounded-full bg-[#dbe3ee] ring-1 ring-inset ring-plate-navy/20 shadow-[inset_0_2px_5px_rgba(31,48,124,0.38),inset_0_-1px_2px_rgba(255,255,255,0.85)]";

export function PlateFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-1.5 z-[80] rounded-[18px] border-[3px] border-[#24368a] shadow-[0_0_0_9999px_#e9eef5,inset_0_0_0_1px_rgba(255,255,255,0.5)] sm:inset-2.5 sm:rounded-[28px] sm:border-[5px]"
    >
      {/* Top holes sit beside the header content (left of the logo / right of
          the phone button). Below 1440px that slot would collide with the
          logo, so they only show on wide screens. */}
      <span className={`${HOLE} left-[4.5%] top-4 -translate-x-1/2 min-[1440px]:block`} />
      <span className={`${HOLE} right-[4.5%] top-4 translate-x-1/2 min-[1440px]:block`} />
      <span className={`${HOLE} bottom-4 left-[4.5%] -translate-x-1/2 lg:block`} />
      <span className={`${HOLE} bottom-4 right-[4.5%] translate-x-1/2 lg:block`} />
    </div>
  );
}
