export type DmvForm = {
  id: string;
  title: string;
  description: string;
  /** Path under /public — served at this URL */
  href: string;
  /** Suggested filename when the user saves the PDF */
  downloadName: string;
};

export const dmvForms: DmvForm[] = [
  {
    id: "h13b",
    title: "Application for Registration & Certificate of Title (H-13B)",
    description: "Required when registering a vehicle or applying for a Connecticut title.",
    href: "/forms/registration-application-h13b.pdf",
    downloadName: "CT-Registration-Application-H13B.pdf",
  },
  {
    id: "h31",
    title: "Bill of Sale (H-31)",
    description: "Documents the sale between buyer and seller when transferring ownership.",
    href: "/forms/bill-of-sale-h31.pdf",
    downloadName: "CT-Bill-of-Sale-H31.pdf",
  },
  {
    id: "h6b",
    title: "Application for Replacement Certificate of Title (H-6B)",
    description: "Use when your Connecticut title is lost, stolen, or destroyed.",
    href: "/forms/replacement-certificate-of-title-h6b.pdf",
    downloadName: "CT-Replacement-Certificate-of-Title-H6B.pdf",
  },
  {
    id: "parking-placard",
    title: "Application for Renewable Parking Placard",
    description: "For qualifying individuals who need a renewable disability parking placard.",
    href: "/forms/renewable-parking-placard.pdf",
    downloadName: "CT-Renewable-Parking-Placard.pdf",
  },
];

export const dmvFormById = Object.fromEntries(
  dmvForms.map((form) => [form.id, form]),
) as Record<DmvForm["id"], DmvForm>;

/** Checklist items that link to a downloadable CT DMV form */
export type FormDocItem = {
  kind: "form";
  formId: DmvForm["id"];
  label: string;
};

export const FORM_BILL_OF_SALE: FormDocItem = {
  kind: "form",
  formId: "h31",
  label: "Bill of sale",
};

export const FORM_H13B: FormDocItem = {
  kind: "form",
  formId: "h13b",
  label: "Form H-13B (Application for Registration / Title)",
};
