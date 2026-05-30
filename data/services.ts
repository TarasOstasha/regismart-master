import {
  Car,
  Bike,
  Truck,
  RefreshCw,
  ArrowLeftRight,
  FileText,
  IdCard,
  Anchor,
  Briefcase,
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
    title: "Cars",
    blurb: "Same-day registration for cars and SUVs. Drive away registered.",
  },
  {
    icon: Bike,
    title: "Motorcycles",
    blurb: "Get your bike registered and on the road, same day.",
  },
  {
    icon: Truck,
    title: "Trucks & trailers",
    blurb: "Pickups, work trucks, and trailers — registered same day.",
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
    title: "Plate transfers",
    blurb: "Lost, damaged, or duplicate plates.",
  },
  {
    icon: Anchor,
    title: "Boat registration",
    blurb: "Boats, jet skis, and other vessels. Trailer registrations too.",
  },
  {
    icon: Briefcase,
    title: "Commercial",
    blurb: "Apportioned plates.",
  },
];
