export const CONTACT_MESSAGE_FORM_ID = "message-form";
export const CONTACT_MESSAGE_HREF = `/contact#${CONTACT_MESSAGE_FORM_ID}`;

export const BOOKING_SECTION_ID = "booking";
export const BOOKING_HREF = `/book#${BOOKING_SECTION_ID}`;

export function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}
