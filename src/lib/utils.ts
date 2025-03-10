import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/*
 * Utility function to merge Tailwind CSS classes with the clsx utility.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 * Utility function to wait for a given number of milliseconds.
 * Useful to test the loading state of a component.
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
