import type { AxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GlobalMutationError(error: AxiosError) {
  if (!navigator.onLine) {
    toast('No internet connection')
  } else if (error?.response?.status >= 500) {
    alert('Server error. Please try again later.')
  }
}
