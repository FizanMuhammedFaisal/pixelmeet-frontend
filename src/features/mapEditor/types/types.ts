import type { FederatedPointerEvent, Point } from 'pixi.js'

export interface Layer {
   id: string
   name: string
   visible: boolean
   locked: boolean
}

export type LayerDirection = 'up' | 'down'
export type ThemeType = 'light' | 'dark'
export type ControlTools =
   | 'lock'
   | 'select'
   | 'hand'
   | 'fill'
   | 'rectanglefill'
   | 'eraser'
   | 'zoomin'
   | 'zoomout'

export type EmitterType = {
   switchTheme: { theme: ThemeType }
   changeTool: { tool: ControlTools }
}
export type selectedTiles = {
   selectedImage: string
   startX: number
   startY: number
   endX: number
   endY: number
}

export type ToolHandler = {
   onDown?: (pos: Point, e: FederatedPointerEvent) => void
   onMove?: (pos: Point, e: FederatedPointerEvent) => void
   onUp?: (pos: Point, e: FederatedPointerEvent) => void
   onLeave?: (pos: Point, e: FederatedPointerEvent) => void
}

export type TilesetType = {
   id: string
   image: string
   name: string
   width: number
   height: number
}
