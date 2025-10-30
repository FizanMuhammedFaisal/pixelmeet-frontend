import { WORLD_WIDTH } from '../types/config'

export function getIndex(x: number, y: number): number {
   return y * WORLD_WIDTH + x
}

export function constructImageUrl(urlKey: string): string
export function constructImageUrl(urlKey: null | undefined): null
export function constructImageUrl(urlKey: string | null | undefined): string | null {
   if (!urlKey) return null
   return `${import.meta.env.VITE_S3_BASE_URL}/${urlKey}`
}
export function deConstructImageUrl(image: string): string
export function deConstructImageUrl(image: null | undefined): null
export function deConstructImageUrl(image: string | null | undefined): string | null {
   if (!image) return null
   try {
      const url = new URL(image)
      const path = url.pathname.substring(1)
      return path
   } catch (error) {
      return null
   }
}
