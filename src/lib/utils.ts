import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names or class arrays into a single class name string.
 * @param {...ClassValue[]} inputs - The class names or class arrays to combine.
 * @returns A single string containing all the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an array of numbers
 * @param {number} count - The number of elements to generate in the array.
 * @returns {number[]} An array of numbers.
 */
export const arrayNumberGenerator = (count: number) =>
  Array.from(Array(count).keys());
