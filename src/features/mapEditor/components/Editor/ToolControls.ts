import { Assets, Rectangle, Sprite, Texture } from 'pixi.js'
import type { ToolHandler } from '../../types/types'
import { Editor } from './Editor'

export const makeFillTool = (editor: Editor): ToolHandler => ({
   onDown: async (pos, e) => {
      const data = editor.selectedTiles
      console.log(data)
      if (data) {
         const tileset = await Assets.load(data.selectedImage)
         const tileTex = new Texture({
            source: tileset,
            frame: new Rectangle(
               data.startX * 32,
               data.startY * 32,
               (data.endX - data.startX) * 32,
               (data.endY - data.startY) * 32,
            ),
         })
         const sprite = new Sprite({ texture: tileTex })
         const worldPos = editor.viewport.toWorld(pos)
         sprite.position.copyFrom(worldPos)
         sprite.zIndex = 1000
         editor.worldContainer.addChild(sprite)
         console.log(editor.worldContainer)
      }
   },
   onMove: async (pos) => {
      const data = editor.selectedTiles
      const worldPos = editor.viewport.toWorld(pos)
      const point = editor.snapToGrid(worldPos.x, worldPos.y)
      if (data) {
         if (!editor.ghostSprite) {
            const tileset = await Assets.load(data.selectedImage)
            const tileTex = new Texture({
               source: tileset,
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
            editor.worldContainer.addChild(editor.ghostSprite)
            console.log('added')
         }
         editor.ghostSprite.position.copyFrom(point)
      }
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
   onDown: () => {
      editor.viewport.cursor = 'crosshair'
      // editor.viewport.plugins.pause('drag')
   },
   onUp: () => {
      editor.viewport.cursor = 'auto'
   },
})
export const makeEraserTool = (editor: Editor): ToolHandler => ({})
export const makeHandTool = (editor: Editor): ToolHandler => ({
   onDown: () => {
      editor.viewport.cursor = 'grab'
   },
   onUp: () => {
      editor.viewport.cursor = 'auto'
   },
})
export const makeLockTool = (editor: Editor): ToolHandler => ({})
export const makeRectangleFillTool = (editor: Editor): ToolHandler => ({})
