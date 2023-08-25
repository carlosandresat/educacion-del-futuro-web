import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

