## Making of the Bucket fill tool

This tool might be the difficult one among the tools. Other tools like eraser,fill,zoom are relatively easy as they are logic that are just obvious. The first solution for this that came to my mind is a game of life kinda thing. Where a cell when changed will affect its adjacent cells like a zombie and this continues untill the cell already have a texture or tile filled.

Now what puzzled me is that this canvas thing is not a rerendering component it just get updated once a tile is added so
thinking in terms of pixi and its containers and sprites i cant tell a sprite to observer for changes or trigger a change in one and make that propagate.
Reconstructing is necessary.

Turns out there is a famous algorithm called [flood fill](https://en.wikipedia.org/wiki/Flood_fill). This is not a new problem and has been since early paint softwares.

I do have a 1d array in the memory for this process. So the visual representation is pixi and its container concept but the data can be used to modify the layer(selected layer in which operation is performed) and then rerender the whole layer is the way to go i guess

so we have to do a dfs on the 1d array and replace all the targeted tiles with new tiles

```js
export function FlootFillDFS(data: Uint32Array, clicked: { x: number; y: number }, target: number) {
   const index = getIndex(clicked.x, clicked.y)
   if (data[index] === target) return
   const current = data[index]
   const stack = new Uint32Array(W * H)
   let top = 0
   stack[top++] = index

   while (top > 0) {
      const id = stack[--top]

      if (data[id] === current) {
         data[id] = target

         if (id % WORLD_WIDTH < W - 1 && data[id + 1] === current) {
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
```

here the target is the gid we need to get propagated and clicked is the. x and y tiles coordinates  
after the modification is done we have to reconstruct the whole layer
