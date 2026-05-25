import {
  Car,
  RefreshCw,
  ArrowLeftRight,
  FileText,
  IdCard,
  Anchor,
  Truck,
  Accessibility,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    icon: Car,
    title: "Vehicle registration (all types)",
    blurb: "Cars, motorcycles, RVs. Drive away registered the same day.",
  },
  {
    icon: RefreshCw,
    title: "Registration renewals",
    blurb: "Renew your CT registration in minutes, no appointment needed.",
  },
  {
    icon: ArrowLeftRight,
    title: "Out-of-state transfers",
    blurb: "Bring your title, insurance, and ID. We file CT plates and paperwork.",
  },
  {
    icon: FileText,
    title: "Title & ownership processing",
    blurb: "Buying, selling, or transferring? We handle the chain of ownership.",
  },
  {
    icon: IdCard,
    title: "Plate transfers & stickers",
    blurb: "Lost, damaged, or duplicate plates and emission stickers.",
  },
  {
    icon: Anchor,
    title: "Boat registration",
    blurb: "Boats, jet skis, and other vessels. Trailer registrations too.",
  },
  {
    icon: Truck,
    title: "Commercial & IRP",
    blurb: "Apportioned plates, USDOT, and dealer support for fleets.",
  },
  {
    icon: Accessibility,
    title: "Handicap permits",
    blurb: "We'll help with the paperwork, temporary or permanent.",
  },
];
