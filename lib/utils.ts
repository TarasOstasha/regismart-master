import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE_DISPLAY = "(203) 460-7061";
export const PHONE_HREF = "tel:+12034607061";
export const PHONE_DISPLAY_2 = "(203) 343-3017";
export const PHONE_HREF_2 = "tel:+12033433017";
export const EMAIL = "info@gerismart.com";
export const EMAIL_HREF = "mailto:info@gerismart.com";
export const ADDRESS_LINE_1 = "246 Federal Road, Suite D25";
export const ADDRESS_LINE_2 = "Brookfield, CT 06804";
export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=246+Federal+Road+Suite+D25+Brookfield+CT+06804";
export const HOURS = [
  { d: "Mon-Thu", h: "10 am to 6 pm" },
  { d: "Friday", h: "10 am to 5 pm" },
  { d: "Saturday", h: "10 am to 2 pm" },
  { d: "Sunday", h: "Closed" },
];
