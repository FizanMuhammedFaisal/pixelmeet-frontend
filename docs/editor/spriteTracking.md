## Efficient Tilemap Object Tracking via 1D Array Indexing

Container Memory State, This is where we have the visual things. Every tilsets places on the canvas
We need to keep track of every sprite we add.
Why >?
Because when i add a sprite its being added to the respected layers container.(container is a pixi js concept)
as childrens. So if i want add **Eraser** or just to replace a tile on a layer i need to destroy the sprite in that x and y (place)

for that i cant get a sprite given its x and y from a container. Either keep track of every sprite by adding it to a map.

or get the childrens of a container when we need to add the sprite and loop and find the sprite with a given x and y

#### solution i came upwith

We could make a array with a WORLD_WIDTH and WORLD_HEIGHT and so it can handle every sprites reference

we need to store two things key and a value. key here is the x and y.(because when i make a sprite i will get x and y from the mouse position) and values is reference to the sprite made.

eg:
when we add a sprite we make a new sprite and store the reference in array like arr[index]=sprite
later can we used to get back and destroy arr[index].destroy()

so how to convert this x and y into a index in the array where the value is going be the reference to sprite.
Hope this is not confusing
use this

```
const index= y*WORLD_WIDTH + x
```

That is it

### Efficiency

Memory: Using a 1D array of 1,75,000 entries for a 500x350 map costs some RAM, but only as much as you store per cell (often just a reference). This is highly optimized for access speed.

Performance: Direct index access is O(1) (constant time), much faster than searching.
