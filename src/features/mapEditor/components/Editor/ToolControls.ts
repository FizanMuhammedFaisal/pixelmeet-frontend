import type { ToolHandler } from '../../types/types'
import { Editor } from './Editor'

export const makeFillTool = (editor: Editor): ToolHandler => ({})

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
