export type FeePreview = {
  label: string;
  service: string;
  example: string;
};

export const feePreview: FeePreview[] = [
  {
    label: "Registration renewal",
    service: "$25 service fee",
    example: "+ state fee from $80",
  },
  {
    label: "Title transfer",
    service: "$45 service fee",
    example: "+ state fee from $25",
  },
  {
    label: "Out-of-state new reg",
    service: "$65 service fee",
    example: "+ state fee from $120",
  },
];
