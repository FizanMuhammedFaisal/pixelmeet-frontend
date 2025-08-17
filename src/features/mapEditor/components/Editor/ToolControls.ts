import { Assets, Rectangle, Sprite, Texture, TextureSource } from 'pixi.js'
import type { ToolHandler } from '../../types/types'
import { Editor } from './Editor'
import { TILE_SIZE, WORLD_WIDTH } from '../../types/config'
import { useMapEditorStore } from '@/app/store/mapEditor/mapEditor'

//we need to split the selected tiles into 32 by 32 pixel tiles
let ghostPromise: TextureSource | null = null
export const makeFillTool = (
   editor: Editor,
   drawTileset: (x: number, y: number, gid: number) => void,
): ToolHandler => ({
   onDown: async (pos, e) => {
      const selectedLayerId = editor.selectedLayerId
      if (selectedLayerId === null) return
      const data = editor.selectedTiles
      if (data) {
         const width = data.endX - data.startX
         const height = data.endY - data.startY

         // world position
         const worldPos = editor.viewport.toWorld(pos)
         const point = editor.snapToGrid(worldPos.x, worldPos.y)

         const container = editor.layerContainers.get(selectedLayerId)
         const spriteLayer = editor.layerSpriteMap.get(selectedLayerId)
         if (container === undefined || spriteLayer === undefined) return
         const ImageDetails = useMapEditorStore.getState().tilesets.find((curr) => {
            return curr.name === data.name
         })
         if (!ImageDetails) return
         for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
               //iterating through each tile

               const tileTex = new Texture({
                  source: Assets.get(data.selectedImage).source,
                  frame: new Rectangle(
                     data.startX * TILE_SIZE + j * TILE_SIZE,
                     data.startY * TILE_SIZE + i * TILE_SIZE,
                     TILE_SIZE,
                     TILE_SIZE,
                  ),
               })

               const sprite = new Sprite({ texture: tileTex })

               const spritex = point.x + j * TILE_SIZE
               const spritey = point.y + i * TILE_SIZE
               //here currently spritex is on raw x and y we need ot make it to tilesize's x and y
               // for that we need to divide by tilesize so both of them cancels out
               const tilespritex = point.x + j
               const tilespritey = point.y + i
               sprite.position.x = spritex
               sprite.position.y = spritey
               sprite.zIndex = 1000

               // adding
               const index = tilespritey * WORLD_WIDTH + tilespritex
               const old = spriteLayer[index]
               if (old) {
                  container.removeChild(old)
                  old.destroy()
               }
               spriteLayer[index] = sprite
               container.addChild(sprite)
               const gid =
                  ImageDetails.columns * (i + data.startY) +
                  (j + data.startX) +
                  ImageDetails.firstgid
               drawTileset(tilespritex, tilespritey, gid)
            }
         }
         editor.isDragging = true
         editor.dragStart = { x: point.x, y: point.y }
      }
      console.log(useMapEditorStore.getState().layers)
   },
   onMove: async (pos) => {
      const data = editor.selectedTiles
      if (!data) return
      const selectedLayerId = editor.selectedLayerId
      if (selectedLayerId === null) return
      const worldPos = editor.viewport.toWorld(pos)
      const point = editor.snapToGrid(worldPos.x, worldPos.y)

      if (editor.isDragging) {
         if (editor.ghostSprite) {
            editor.worldContainer.removeChild(editor.ghostSprite)
            editor.ghostSprite.destroy()
            editor.ghostSprite = null
         }

         const width = data.endX - data.startX
         const height = data.endY - data.startY

         // world position
         const worldPos = editor.viewport.toWorld(pos)
         const point = editor.snapToGrid(worldPos.x, worldPos.y)

         const container = editor.layerContainers.get(selectedLayerId)
         console.log(selectedLayerId)
         console.log(container)
         const spriteLayer = editor.layerSpriteMap.get(selectedLayerId)
         if (container === undefined || spriteLayer === undefined) return
         const ImageDetails = useMapEditorStore.getState().tilesets.find((curr) => {
            return curr.name === data.name
         })
         if (!ImageDetails) return
         for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
               //iterating through each tile

               const tileTex = new Texture({
                  source: Assets.get(data.selectedImage).source,
                  frame: new Rectangle(
                     data.startX * TILE_SIZE + j * TILE_SIZE,
                     data.startY * TILE_SIZE + i * TILE_SIZE,
                     TILE_SIZE,
                     TILE_SIZE,
                  ),
               })

               const sprite = new Sprite({ texture: tileTex })
               const spritex = point.x + j * TILE_SIZE
               const spritey = point.y + i * TILE_SIZE
               const tilespritex = point.x + j
               const tilespritey = point.y + i
               sprite.position.x = spritex
               sprite.position.y = spritey
               sprite.zIndex = 1000

               // adding

               const index = tilespritey * WORLD_WIDTH + tilespritex
               const old = spriteLayer[index]
               if (old) {
                  container.removeChild(old)
                  old.destroy()
               }
               spriteLayer[index] = sprite
               container.addChild(sprite)
               const gid =
                  ImageDetails.columns * (i + data.startY) +
                  (j + data.startX) +
                  ImageDetails.firstgid
               drawTileset(tilespritex, tilespritey, gid)
            }
         }
      } else {
         if (!editor.ghostSprite && !ghostPromise) {
            try {
               ghostPromise = await Assets.load(data.selectedImage)
               if (!ghostPromise) {
                  throw 'failed to load texture'
               }
               const tileTex = new Texture({
                  source: ghostPromise,
                  frame: new Rectangle(
                     data.startX * 32,
                     data.startY * 32,
                     (data.endX - data.startX) * 32,
                     (data.endY - data.startY) * 32,
                  ),
               })
               editor.ghostSprite = new Sprite({ texture: tileTex })
               editor.ghostSprite.zIndex = 1000
               editor.ghostSprite.alpha = 0.8
               console.log('adding ghost to world contaer')
               editor.worldContainer.addChild(editor.ghostSprite)
            } catch (error) {
               console.log('failed to make a sprite', error)
            } finally {
               ghostPromise = null
            }
         }
         if (editor.ghostSprite) {
            editor.ghostSprite.position.copyFrom(point)
         }
      }
   },
   onUp: () => {
      editor.isDragging = false
   },
})

export const makeZoomInTool = (editor: Editor): ToolHandler => ({
   onDown: (pos) => {
      editor.viewport.zoom(-70, true)
   },
})
export const makeZoomOutTool = (editor: Editor): ToolHandler => ({
   onDown: (pos) => {
      editor.viewport.zoom(70, true)
   },
})
export const makeSelectTool = (editor: Editor): ToolHandler => ({
   onDown: (pos) => {
      editor.viewport.cursor = 'crosshair'

      // make a reactagle with theme colors as boarder nad fill it, store the x,y of top left point on editor.dragstart
      //make is draggind true

      // const obj = new Graphics().rect(pos.x, pos.y, 2, 2).fill('red')
      // editor.ghostSprite = obj
   },
   onMove: () => {
      //upda teh x,y and updaate teh rectagles
      //
   },
   onUp: () => {
      editor.viewport.cursor = 'auto'
      //make is draggind false and update the editor.dragstart to null
      // editor.ghostSprite?.destroy()
   },
})
export const makeEraserTool = (
   editor: Editor,
   drawTileset: (x: number, y: number, gid: number) => void,
): ToolHandler => ({
   onDown: (pos) => {
      editor.isDragging = true
      const worldpos = editor.viewport.toWorld(pos)

      if (editor.selectedLayerId === null) return
      const spritelayer = editor.layerSpriteMap.get(editor.selectedLayerId)

      if (spritelayer === undefined) return
      const snappedCor = editor.snapToGrid(worldpos.x, worldpos.y)

      const index = snappedCor.y * WORLD_WIDTH + snappedCor.x
      const sprite = spritelayer[index]

      if (sprite) {
         const container = editor.layerContainers.get(editor.selectedLayerId)
         if (container) {
            container.removeChild(sprite)
            sprite.destroy()

            const tilespritex = snappedCor.x / TILE_SIZE
            const tilespritey = snappedCor.y / TILE_SIZE

            drawTileset(tilespritex, tilespritey, 0)
         }
      }
   },
   onMove: (pos) => {
      if (!editor.isDragging) return
      const worldpos = editor.viewport.toWorld(pos)

      if (editor.selectedLayerId === null) return
      const spritelayer = editor.layerSpriteMap.get(editor.selectedLayerId)

      if (spritelayer === undefined) return
      const snappedCor = editor.snapToGrid(worldpos.x, worldpos.y)

      const index = snappedCor.y * WORLD_WIDTH + snappedCor.x
      const sprite = spritelayer[index]

      if (sprite) {
         const container = editor.layerContainers.get(editor.selectedLayerId)
         if (container) {
            container.removeChild(sprite)
            sprite.destroy()
         }
      }
   },
   onUp: () => {
      editor.isDragging = false
   },
})

export const makeHandTool = (editor: Editor): ToolHandler => ({
   onDown: () => {
      editor.viewport.cursor = 'grab'
   },
   onUp: () => {
      editor.viewport.cursor = 'auto'
   },
})

export const makeLockTool = (editor: Editor): ToolHandler => ({})
export const makeBucketFillTool = (editor: Editor): ToolHandler => ({})
