import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-teal",
        className,
      )}
      {...props}
    />
  );
}
