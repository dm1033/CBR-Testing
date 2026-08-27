import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-opacity duration-150 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
  {
    variants: {
      variant: {
        primary: "bg-navy text-paper hover:opacity-90",
        teal: "bg-teal text-paper hover:bg-teal-2",
        outline: "border border-line bg-paper text-ink hover:bg-bg",
        ghost: "text-ink hover:bg-bg",
        amber: "bg-amber text-navy-2 hover:bg-amber-2 font-semibold",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-sm",
        md: "h-11 px-4 text-sm rounded-md",
        lg: "h-14 px-5 text-base rounded-md",
        xl: "h-20 w-full text-xl rounded-lg font-display tracking-wide",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
