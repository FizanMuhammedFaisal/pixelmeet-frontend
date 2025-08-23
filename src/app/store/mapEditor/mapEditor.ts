import type { Editor } from '@/features/mapEditor/components/Editor/Editor'
import { deConstructImageUrl } from '@/features/mapEditor/helpers'
import {
   LAYERS_LIMIT,
   TILE_SIZE,
   WORLD_HEIGHT,
   WORLD_WIDTH,
} from '@/features/mapEditor/types/config'
import type {
   ControlTools,
   FinalMapLayerType,
   FinalMapType,
   FinalTilesetType,
   Layer,
   MapData,
   MapDetails,
   MouseCoordinatesType,
   selectedTiles,
   TileSet,
} from '@/features/mapEditor/types/types'
import emitter from '@/features/mapEditor/utils/EventEmitter'

import { toast } from 'sonner'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
// the game would only need probaly a 500 width and height of 400 or 300
// here width is in tiled unit if the tile is 32px then widht is 500*32 =16,000 of 1d array
//this mesures would be plenty for the usecase if needed more would need to find a way for making it dynamic
//increasing the size would also meaning taking more loading time

interface useMapEditorStore {
   editor: Editor | null
   selectedTool: ControlTools
   selectedTile: selectedTiles | null
   mapData: MapData | null
   mapDetails: MapDetails | null
   layers: Layer[]
   tilesets: TileSet[]
   selectedLayer: Layer | null
   layersOrder: number[]
   mouseCoordinates: MouseCoordinatesType
   actions: MapEditorAction
}
type MapEditorAction = {
   setEditor: (editor: Editor) => void
   setTool: (tool: ControlTools) => void
   setSelectedTiles: (selected: selectedTiles) => void
   setSelectedLayer: (selected: Layer) => void
   addLayer: (layer?: Layer) => void
   renameLayer: (id: number, name: string) => void
   moveLayer: (newlayerOrder: number[]) => void
   toggleLayerLock: (id: number) => void
   toggleLayerVisibility: (id: number) => void
   deleteLayer: (id: number) => void
   addTilesets: (
      name: string,
      width: number,
      height: number,
      coloums: number,
      image: string,
   ) => void
   drawTileset: (xposition: number, yposition: number, gid: number) => void
   setCoordinates: (coord: MouseCoordinatesType) => void
   setMapDetails: (detail: Partial<MapDetails>) => void
   // main funtions

   exportMap: () => FinalMapType
}

export const useMapEditorStore = create<useMapEditorStore>()(
   subscribeWithSelector(
      immer((set, get) => ({
         editor: null,
         selectedTool: 'select',
         selectedTile: null,
         selectedLayer: null,
         mapData: null,
         mapDetails: null,
         layers: [],
         tilesets: [],
         layersOrder: [],
         mouseCoordinates: { x: 0, y: 0 },

         actions: {
            setEditor: (editor) => {
               set(() => ({
                  editor,
               }))
            },
            setTool: (selectedTool) => {
               set(() => ({
                  selectedTool,
               }))
            },
            setCoordinates: (coor) => {
               set((state) => {
                  state.mouseCoordinates = coor
               })
            },
            setMapDetails: (details) => {
               set((state) => ({
                  ...state.mapDetails,
                  ...details,
               }))
            },
            renameLayer: (id, name) => {
               console.log(id, name)
               set((state) => {
                  const index = state.layers.findIndex((curr) => curr.id === id)
                  console.log(index)
                  if (index !== null) {
                     state.layers[index].name = name
                  }
               })
            },
            setSelectedTiles: (selected) => {
               set(() => ({
                  selectedTile: selected,
               }))
            },
            setSelectedLayer: (selected) => {
               set((state) => {
                  state.selectedLayer = selected
               })
            },
            addLayer: (layer) => {
               console.log(layer)
               set((state) => {
                  if (state.layers.length >= LAYERS_LIMIT) {
                     toast.info(
                        `Limit of ${LAYERS_LIMIT} Layers is imposed for decreasing map loading time`,
                     )
                     return
                  }
                  if (layer) {
                     state.layers.unshift(layer)
                     state.selectedLayer = layer
                     emitter.emit('addLayer', { data: layer })
                  } else {
                     const newLayerId = state.layers.length + 1
                     const newLayerName = `Layer ${newLayerId}`
                     const newLayer = {
                        id: newLayerId,
                        name: newLayerName,
                        locked: false,
                        opacity: 1,
                        zindex: newLayerId,
                        visible: true,
                        width: WORLD_WIDTH,
                        height: WORLD_HEIGHT,
                     }
                     const layerWithData = {
                        ...newLayer,
                        data: new Uint32Array(WORLD_HEIGHT * WORLD_WIDTH),
                     }
                     state.layers.unshift(layerWithData)
                     state.selectedLayer = layerWithData
                     state.layersOrder.unshift(newLayerId)
                     emitter.emit('addLayer', { data: newLayer })
                  }
               })
            },
            moveLayer: (neworder) => {
               set((state) => {
                  state.layersOrder = neworder
               })

               set((state) => {
                  const newLayers = []

                  for (let i = 0; i < neworder.length; i++) {
                     const layer = state.layers.find((curr) => curr.id === neworder[i])

                     if (!layer) continue
                     layer.zindex = neworder.length - 1

                     newLayers.push(layer)
                  }

                  state.layers = newLayers
               })
               emitter.emit('moveLayer', { neworder })
            },
            toggleLayerLock: (id) => {
               set((state) => {
                  const index = state.layers.findIndex((curr) => curr.id === id)
                  if (index !== null) {
                     const layer = state.layers[index]
                     layer.locked = !layer.locked
                     if (state.selectedLayer && state.selectedLayer.id === id) {
                        state.selectedLayer = layer
                     }
                  }
               })
            },
            toggleLayerVisibility: (id) => {
               set((state) => {
                  const index = state.layers.findIndex((curr) => curr.id === id)
                  if (index !== null) {
                     const layer = state.layers[index]
                     layer.visible = !layer.visible
                     if (state.selectedLayer && state.selectedLayer.id === id) {
                        state.selectedLayer = layer
                     }
                  }
               })
               emitter.emit('toggleLayerVisibility', { id })
            },
            deleteLayer: (id) => {
               set((state) => {
                  const layerIndex = state.layers.findIndex((layer) => layer.id === id)
                  if (layerIndex !== -1) {
                     state.layers.splice(layerIndex, 1)
                  }
               })
               emitter.emit('deleteLayer', { id })
            },
            addTilesets: (name, width, height, coloums, image) => {
               console.log(name, width, height, coloums)
               set((state) => {
                  const lastMap = state.tilesets[state.tilesets.length - 1]
                  const tilecount = lastMap
                     ? Math.floor(lastMap.imagewidth / TILE_SIZE) *
                       Math.floor(lastMap.imageheight / TILE_SIZE)
                     : 1
                  const lastGid = lastMap ? lastMap.firstgid : 0
                  state.tilesets.push({
                     firstgid: lastGid + tilecount,
                     imageheight: height,
                     imagewidth: width,
                     name: name,
                     columns: coloums,
                     image: image,
                  })
               })
            },
            drawTileset: (tx, ty, gid) => {
               set((state) => {
                  const index = ty * WORLD_WIDTH + tx

                  if (state.selectedLayer) {
                     state.selectedLayer.data[index] = gid
                  }
               })
            },

            //
            exportMap: () => {
               //regards with tiled map editor format ther might be many additional preconfigured propertied ading here
               const mappedLayers: FinalMapLayerType[] = get().layers.map((curr) => {
                  const newLayer = {
                     height: curr.height,
                     width: curr.width,
                     data: Array.from(curr.data),
                     id: curr.id,
                     visible: curr.visible,
                     name: curr.name,
                     opacity: curr.opacity,
                     x: 0,
                     y: 0,
                  }
                  return newLayer
               })
               const mappedTilesets: FinalTilesetType[] = get().tilesets.map((curr) => {
                  const newLayer = {
                     ...curr,
                     spacing: 0,
                     tileheight: TILE_SIZE,
                     tilewidth: TILE_SIZE,
                     image: deConstructImageUrl(curr.image),
                  }
                  return newLayer
               })
               const FinalMap: FinalMapType = {
                  compressionlevel: -1,
                  height: WORLD_HEIGHT,
                  width: WORLD_WIDTH,
                  infinite: false,
                  layers: mappedLayers,
                  orientation: 'orthogonal',
                  renderorder: 'right-down',
                  tileheight: TILE_SIZE,
                  tilewidth: TILE_SIZE,
                  tilesets: mappedTilesets,
                  type: 'map',
                  version: '1',
               }
               return FinalMap
            },
         },
      })),
   ),
)

export const useEditorActions = () => useMapEditorStore((state) => state.actions)
export const useSelectedTile = () => useMapEditorStore((state) => state.selectedTile)
export const useSelectedLayer = () => useMapEditorStore((state) => state.selectedLayer)
export const useLayers = () => useMapEditorStore((state) => state.layers)
export const useLayerOrder = () => useMapEditorStore((state) => state.layersOrder)
export const useMouseCoordinates = () => useMapEditorStore((state) => state.mouseCoordinates)
