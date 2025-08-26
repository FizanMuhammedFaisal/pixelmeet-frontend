import { getIndex } from '../helpers'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../types/config'
/**
 * Performs a flood fill on the given 1d array and cover all the cell on 4 sides with the
 * target tile if they are not already covered other tiles
 *
 * @param {number[]} data - 1d data array
 * @param {{x:number,y:number}} clicked - coordinates of the clicked tile
 * @param {number} targetGid - this will the gid that will be used for replacing
 *
 */
const W = WORLD_WIDTH
const H = WORLD_HEIGHT
const SIZE = W * H
export function FloodFillDFS(data: Uint32Array, clicked: { x: number; y: number }, target: number) {
   const index = getIndex(clicked.x, clicked.y)
   const current = data[index]
   if (current === target) return

   const visited = new Uint8Array(SIZE)
   const stack = new Uint32Array(SIZE)
   let top = 0

   stack[top++] = index
   visited[index] = 1

   while (top > 0) {
      const id = stack[--top]

      if (data[id] !== current) continue
      data[id] = target

      const x = id % W

      const r = id + 1
      if (x < W - 1 && data[r] === current && !visited[r]) {
         visited[r] = 1
         stack[top++] = r
      }

      const l = id - 1
      if (x > 0 && data[l] === current && !visited[l]) {
         visited[l] = 1
         stack[top++] = l
      }

      const u = id - W
      if (id >= W && data[u] === current && !visited[u]) {
         visited[u] = 1
         stack[top++] = u
      }

      const d = id + W
      if (id < SIZE - W && data[d] === current && !visited[d]) {
         visited[d] = 1
         stack[top++] = d
      }
   }
}
//why world_width -1 ? cause  the id is o indexed so last postion on a row will be reminded with 499(if 500 is width)
// but we want the reminder to be less that that so less that 499 ===>  < WORLD_WODTH-1
