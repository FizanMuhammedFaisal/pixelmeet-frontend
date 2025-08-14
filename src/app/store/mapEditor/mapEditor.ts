import type { Editor } from '@/features/mapEditor/components/Editor/Editor'
import { LAYERS_LIMIT, WORLD_HEIGHT, WORLD_WIDTH } from '@/features/mapEditor/types/config'
import type { ControlTools, Layer, MapData, selectedTiles } from '@/features/mapEditor/types/types'
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
                     data: new Uint16Array(WORLD_HEIGHT * WORLD_WIDTH),
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
            deleteLayer: (id) => {},
         },
      })),
   ),
)

export const useEditorActions = () => useMapEditorStore((state) => state.actions)
export const useSelectedTile = () => useMapEditorStore((state) => state.selectedTile)
export const useSelectedLayerId = () => useMapEditorStore((state) => state.selectedLayerId)
export const useLayers = () => useMapEditorStore((state) => state.layers)
