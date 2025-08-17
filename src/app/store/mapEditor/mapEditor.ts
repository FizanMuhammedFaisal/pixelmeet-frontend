import type { Editor } from '@/features/mapEditor/components/Editor/Editor'
import {
   LAYERS_LIMIT,
   TILE_SIZE,
   WORLD_HEIGHT,
   WORLD_WIDTH,
} from '@/features/mapEditor/types/config'
import type {
   ControlTools,
   Layer,
   MapData,
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
   layers: Layer[]
   tilesets: TileSet[]
   selectedLayerId: number | null
   layersOrder: number[]
   actions: MapEditorAction
}
type MapEditorAction = {
   setEditor: (editor: Editor) => void
   setTool: (tool: ControlTools) => void
   setSelectedTiles: (selected: selectedTiles) => void
   setSelectedLayerId: (selected: number) => void
   addLayer: () => void
   moveLayer: (id: number, pos: number) => void
   toggleLayerLock: (id: number) => void
   toggleLayerVisibility: (id: number) => void
   deleteLayer: (id: number) => void
   addTilesets: (name: string, width: number, height: number, coloums: number) => void
   drawTileset: (xposition: number, yposition: number, gid: number) => void
}

export const useMapEditorStore = create<useMapEditorStore>()(
   subscribeWithSelector(
      immer((set, get) => ({
         editor: null,
         selectedTool: 'select',
         selectedTile: null,
         selectedLayerId: null,
         mapData: null,
         layers: [],
         tilesets: [],
         layersOrder: [],

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
            setSelectedTiles: (selected) => {
               set(() => ({
                  selectedTile: selected,
               }))
            },
            setSelectedLayerId: (selected) => {
               set(() => ({
                  selectedLayerId: selected,
               }))
            },
            addLayer: () => {
               set((state) => {
                  if (state.layers.length > LAYERS_LIMIT) {
                     toast.info(
                        `Limit of ${LAYERS_LIMIT} Layers is imposed for decreasing map loading time`,
                     )
                     return
                  }

                  const lastLayer = state.layers[state.layers.length - 1]
                  const newLayerId = lastLayer ? lastLayer.id + 1 : 0
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

                  state.layers.push({
                     ...newLayer,
                     data: new Uint32Array(WORLD_HEIGHT * WORLD_WIDTH),
                  })
                  state.layersOrder.unshift(newLayerId)
                  state.selectedLayerId = newLayerId
                  emitter.emit('addLayer', { data: newLayer })
               })
            },
            moveLayer: () => {
               console.log('move')
            },
            toggleLayerLock: () => {
               console.log('togle layer lock')
            },
            toggleLayerVisibility: (id) => {
               set((state) => ({
                  layers: state.layers.map((curr) =>
                     curr.id === id ? { ...curr, visible: !curr.visible } : curr,
                  ),
               }))
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
            addTilesets: (name, width, height, coloums) => {
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
                  })
               })
            },
            drawTileset: (tx, ty, gid) => {
               set((state) => {
                  const index = ty * WORLD_WIDTH + tx

                  if (state.selectedLayerId !== null) {
                     state.layers[state.selectedLayerId].data[index] = gid
                  }
               })
            },
         },
      })),
   ),
)

export const useEditorActions = () => useMapEditorStore((state) => state.actions)
export const useSelectedTile = () => useMapEditorStore((state) => state.selectedTile)
export const useSelectedLayerId = () => useMapEditorStore((state) => state.selectedLayerId)
export const useLayers = () => useMapEditorStore((state) => state.layers)
