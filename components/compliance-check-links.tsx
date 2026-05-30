export const CT_DMV_COMPLIANCE_CHECK = {
  label: "CT DMV Compliance Check (Individual)",
  href: "https://dmvcivls-wselfservice.ct.gov/Compliance/Individual",
  helper: {
    before: "Business registration? Use the ",
    linkLabel: "Organization Compliance Check",
    after: " →",
    href: "https://dmvcivls-wselfservice.ct.gov/Compliance/Organization",
  },
} as const;

type ComplianceCheckLinksProps = {
  variant?: "light" | "dark";
};

export function ComplianceCheckLinks({ variant = "light" }: ComplianceCheckLinksProps) {
  const isDark = variant === "dark";
  const mainLinkClass = isDark
    ? "transition hover:underline underline-offset-2 focus-ring rounded-sm"
    : "transition hover:text-plate-blue hover:underline underline-offset-2 focus-ring rounded-sm";
  const helperTextClass = isDark
    ? "mt-1 text-xs text-bg/75 leading-relaxed"
    : "mt-1 text-xs text-muted leading-relaxed";
  const helperLinkClass = mainLinkClass;

  return (
    <div className="min-w-0">
      <a
        href={CT_DMV_COMPLIANCE_CHECK.href}
        target="_blank"
        rel="noopener noreferrer"
        className={mainLinkClass}
      >
        {CT_DMV_COMPLIANCE_CHECK.label}
      </a>
      <p className={helperTextClass}>
        {CT_DMV_COMPLIANCE_CHECK.helper.before}
        <a
          href={CT_DMV_COMPLIANCE_CHECK.helper.href}
          target="_blank"
          rel="noopener noreferrer"
          className={helperLinkClass}
        >
          {CT_DMV_COMPLIANCE_CHECK.helper.linkLabel}
        </a>
        {CT_DMV_COMPLIANCE_CHECK.helper.after}
      </p>
    </div>
  );
}
