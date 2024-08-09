import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Renders conditional classes and merge tailwind classes in js without style conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
