import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "pass" | "warn" | "fail" | "teal" }) {
  const tones = {
    neutral: "bg-bg text-muted border-line",
    pass: "bg-pass-bg text-pass border-pass/20",
    warn: "bg-warn-bg text-warn border-warn/20",
    fail: "bg-fail-bg text-fail border-fail/20",
    teal: "bg-teal/10 text-teal-2 border-teal/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
