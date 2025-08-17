import type { FederatedPointerEvent, Point } from 'pixi.js'

export type LayerDirection = 'up' | 'down'
export type ThemeType = 'light' | 'dark'
export type ControlTools =
   | 'lock'
   | 'select'
   | 'hand'
   | 'fill'
   | 'buckerfill'
   | 'eraser'
   | 'zoomin'
   | 'zoomout'

export type addLayerType = Omit<Layer, 'data'>
export type EmitterType = {
   switchTheme: { theme: ThemeType }
   changeTool: { tool: ControlTools }
   addLayer: { data: addLayerType }
   toggleLayerVisibility: { id: number }
   deleteLayer: { id: number }
}
export type selectedTiles = {
   selectedImage: string
   startX: number
   startY: number
   endX: number
   endY: number
   name: string
}

export type ToolHandler = {
   onDown?: (pos: Point, e: FederatedPointerEvent) => void
   onMove?: (pos: Point, e: FederatedPointerEvent) => void
   onUp?: (pos: Point, e: FederatedPointerEvent) => void
}

export type TilesetType = {
   id: string
   image: string
   name: string
   width: number
   height: number
}
//data is inaccordance with tiled format so naming convention may differ
export type Layer = {
   height: number
   width: number
   id: number
   visible: boolean
   name: string
   zindex: number
   locked: boolean
   opacity: number
   data: Uint32Array
}

export type TileSet = {
   firstgid: number
   imageheight: number
   imagewidth: number
   name: string
   columns: number
}
export type MapData = {
   width: number
   height: number
   tileWidth: number
   tileHeight: number
   // nextLayerId: number
}
