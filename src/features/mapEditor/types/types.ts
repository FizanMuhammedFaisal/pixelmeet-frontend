import type { FederatedPointerEvent, Point } from 'pixi.js'

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

export type addLayerType = Omit<Layer, 'data'>
export type EmitterType = {
   switchTheme: { theme: ThemeType }
   changeTool: { tool: ControlTools }
   addLayer: { data: addLayerType }
   toggleLayerVisibility: { id: number }
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

export type Layer = {
   height: number
   width: number
   id: number
   visible: boolean
   name: string
   zindex: number
   locked: boolean
   opacity: number
   data: Uint16Array
}
export type MapData = {
   width: number
   height: number
   tileWidth: number
   tileHeight: number
   // nextLayerId: number
}
