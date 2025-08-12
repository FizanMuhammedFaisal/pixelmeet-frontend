import type { Editor } from '@/features/mapEditor/components/Editor/Editor'
import type { ControlTools } from '@/features/mapEditor/types/types'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
interface useMapEditorStore {
   editor: Editor | null
   tool: ControlTools
   setEditor: (editor: Editor) => void
   setTool: (tool: ControlTools) => void
}

export const useMapEditorStore = create<useMapEditorStore>()(
   subscribeWithSelector((set, get) => ({
      editor: null,
      tool: 'select',
      setEditor: (editor) => {
         set(() => ({
            editor,
         }))
      },
      setTool: (tool) => {
         set((state) => ({
            ...state,
            tool,
         }))
      },
   })),
)
