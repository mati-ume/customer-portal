import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 