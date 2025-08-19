import { WORLD_WIDTH } from '../types/config'

export function getIndex(x: number, y: number): number {
   return y * WORLD_WIDTH + x
}
