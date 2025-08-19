## Making of the Bucket fill tool

This tool might be the difficult one among the tools. Other tools like eraser,fill,zoom are relatively easy as they are logic that are just obvious. The first solution for this that came to my mind is a game of life kinda thing. Where a cell when changed will affect its adjacent cells like a zombie and this continues untill the cell already have a texture or tile filled.

Now what puzzled me is that this canvas thing is not a rerendering component it just get updated once a tile is added so
thinking in terms of pixi and its containers and sprites i cant tell a sprite to observer for changes or trigger a change in one and make that propagate.
Reconstructing is necessary.

Turns out there is a famous algorithm called [flood fill](https://en.wikipedia.org/wiki/Flood_fill). This is not a new problem and has been since early paint softwares.

I do have a 1d array in the memory for this process. So the visual representation is pixi and its container concept but the data can be used to modify the layer(selected layer in which operation is performed) and then rerender the whole layer is the way to go i guess
