import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border border-line bg-paper p-5 shadow-[0_1px_0_rgba(18,24,31,0.04)]", className)}
      {...props}
    />
  );
}
