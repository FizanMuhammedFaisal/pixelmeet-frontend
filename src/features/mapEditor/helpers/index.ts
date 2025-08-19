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
