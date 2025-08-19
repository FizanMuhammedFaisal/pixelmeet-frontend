import * as PIXI from 'pixi.js'
import type { TileSet } from '../types/types'
import { constructImageUrl } from '../helpers'
import { TILE_SIZE, WORLD_HEIGHT, WORLD_WIDTH } from '../types/config'
//The array contains gid. so we need to make a o(1) operational ds for getting the needed texture given a gid
//a lookup table creating function is needed for that
/**
 * This funtion is goign to take in a container and a. data array and reconstruct the container with the data of
 * array.
 *
 * @param {Container} container - the container which need to be rebuilded
 * @param {number[]} array - the 1d array that has the collection of gid
 * @param {(PIXI.Texture | undefined)[]} textureArray - an array that gives back a texture given a gid index
 *
 */
export function rebuildLayerFromData(
   container: PIXI.Container,
   array: number[],
   textures: (PIXI.Texture | undefined)[],
) {
   console.log(textures)
   container.removeChildren()
   for (let x = 0; x < WORLD_HEIGHT; x++) {
      for (let y = 0; y < WORLD_WIDTH; y++) {
         const i = WORLD_WIDTH * y + x
         const texture = textures[array[i]]
         if (!texture) continue
         const sprite = new PIXI.Sprite({ texture })
         sprite.position.x = x * TILE_SIZE
         sprite.position.y = y * TILE_SIZE
         sprite.zIndex = 1000
         container.addChild(sprite)
      }
   }
}

/**
 *This function is going to take a array of tilesets and construct a array with a gid will give back a texture

 * @param {TileSet[]} Tilesets - the container which need to be rebuilded
 *
 */
export function buildGlobalGIDLUT(tilesets: TileSet[]): (PIXI.Texture | undefined)[] {
   const gidTextureLUT: (PIXI.Texture | undefined)[] = []
   for (const tileset of tilesets) {
      const source = PIXI.Assets.get(constructImageUrl(tileset.image))
      const total =
         Math.floor(tileset.imageheight / TILE_SIZE) * Math.floor(tileset.imagewidth / TILE_SIZE)
      const cols = tileset.columns
      for (let i = 0; i < total; i++) {
         const x = i % cols
         const y = Math.floor(i / cols)

         const texture = new PIXI.Texture({
            source: source,
            frame: new PIXI.Rectangle(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE),
         })
         gidTextureLUT[tileset.firstgid + i] = texture
      }
   }
   return gidTextureLUT
}
