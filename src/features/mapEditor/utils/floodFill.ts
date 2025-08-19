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
export function FlootFillDFS(data: Uint32Array, clicked: { x: number; y: number }, target: number) {
   console.log(data, clicked, target)
   const index = getIndex(clicked.x, clicked.y)
   if (data[index] === target) return
   const current = data[index]
   const stack = new Uint32Array(W * H)
   let top = 0
   console.log(index)
   stack[top++] = index

   while (top > 0) {
      const id = stack[--top]
      console.log(id)
      if (data[id] === current) {
         data[id] = target
         if (id % W < W - 1 && data[id + 1] === current) {
            stack[top++] = id + 1
         }

         if (id % W > 0 && data[id - 1] === current) {
            stack[top++] = id - 1
         }
         if (id >= W && data[id - W] === current) {
            stack[top++] = id - W
         }
         if (id < SIZE - W && data[id + W] === current) {
            stack[top++] = id + W
         }
      }
   }
}
//why world_width -1 ? cause  the id is o indexed so last postion on a row will be reminded with 499(if 500 is width)
// but we want the reminder to be less that that so less that 499 ===>  < WORLD_WODTH-1
