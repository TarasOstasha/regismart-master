import { Download } from "lucide-react";
import type { DmvForm } from "@/data/forms";

type FormDownloadLinkProps = {
  form: DmvForm;
  label?: string;
  variant?: "inline" | "card";
};

export function FormDownloadLink({
  form,
  label,
  variant = "inline",
}: FormDownloadLinkProps) {
  if (variant === "card") {
    return (
      <a
        href={form.href}
        download={form.downloadName}
        className="group flex h-full flex-col rounded-xl bg-white p-5 ring-1 ring-inset ring-plate-sky/40 shadow-soft transition hover:ring-plate-blue/50 hover:shadow-[0_16px_32px_-14px_rgba(31,48,124,0.18)] focus-ring"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-plate-gradient text-bg">
          <Download className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="mt-4 font-display text-base font-semibold text-ink group-hover:text-plate-blue">
          {form.title}
        </span>
        <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {form.description}
        </span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plate-blue">
          Download PDF
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </a>
    );
  }

  return (
    <a
      href={form.href}
      download={form.downloadName}
      className="inline-flex items-center gap-1.5 transition hover:text-plate-blue hover:underline underline-offset-2 focus-ring rounded-sm"
    >
      {label ?? form.title}
      <Download className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
    </a>
  );
}
