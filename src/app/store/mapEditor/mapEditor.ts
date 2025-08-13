import type { Editor } from '@/features/mapEditor/components/Editor/Editor'
import type { ControlTools, selectedTiles } from '@/features/mapEditor/types/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface useMapEditorStore {
   editor: Editor | null
   selectedTool: ControlTools
   selectedTiles: selectedTiles | null
   setEditor: (editor: Editor) => void
   setTool: (tool: ControlTools) => void
   setSelectedTiles: (selected: selectedTiles) => void
}

export const useMapEditorStore = create<useMapEditorStore>()(
   subscribeWithSelector((set, get) => ({
      editor: null,
      selectedTool: 'select',
      selectedTiles: null,

      setEditor: (editor) => {
         set(() => ({
            editor,
         }))
      },
      setTool: (selectedTool) => {
         set((state) => ({
            ...state,
            selectedTool,
         }))
      },
      setSelectedTiles: (selected) => {
         set((state) => ({
            ...state,
            selectedTiles: selected,
         }))
      },
   })),
)
