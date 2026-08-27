import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid() {
  return crypto.randomUUID();
}

export function formatKpa(n: number) {
  return `${n.toFixed(0)} kPa`;
}

export function formatCbr(n: number) {
  return n >= 10 ? n.toFixed(1) : n.toFixed(2);
}
