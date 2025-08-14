import type { TilesetType } from '@/features/mapEditor/types/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
type TilsesetState = {
   activeTileset: TilesetType | null
   tilesets: TilesetType[]
}
type TilesetActions = {
   setActiveTileset: (active: TilesetType | null) => void
   setTilesets: (tilesets: TilesetType[]) => void
   updateTilesets: (tilesets: TilesetType[]) => void
}
// type ObjectsState = {
//    selectedTileset: string
// }
// type ObjectsActions = {
//    actions: {
//       setObjects: (tile: TilesetType) => void
//    }
// }

type EditorPanelActions = {
   TileSetActions: TilesetActions
}

interface EditorPanelState {
   TileSetState: TilsesetState
}

type useMapEditorPanelStore = EditorPanelState & EditorPanelActions

const useMapEditorStore = create<useMapEditorPanelStore>()(
   immer((set, get) => ({
      TileSetState: {
         tilesets: [],
         activeTileset: null,
      },
      TileSetActions: {
         setTilesets: (tilesets) => {
            return set((draft) => {
               draft.TileSetState.tilesets = tilesets
            })
         },
         updateTilesets: (tilesets) => {
            return set((draft) => {
               draft.TileSetState.tilesets.push(...tilesets)
            })
         },
         setActiveTileset: (activeId) => {
            set((state) => {
               state.TileSetState.activeTileset = activeId
               console.log('changed')
            })
         },
      },
   })),
)

export const useTileSetPanelAction = () => useMapEditorStore((state) => state.TileSetActions)
export const useTilsets = () => useMapEditorStore((state) => state.TileSetState.tilesets)
export const useActiveTileset = () => useMapEditorStore((state) => state.TileSetState.activeTileset)
