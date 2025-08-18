import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Layer } from '@/features/mapEditor/types/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import {
   Eye,
   EyeOff,
   GripVertical,
   Unlock,
   Lock,
   Trash2,
   MoreHorizontal,
   Edit3,
   MousePointer,
} from 'lucide-react'
import { type FocusEvent, forwardRef, type KeyboardEvent } from 'react'

type prop = {
   layer: Layer
   selectedLayerId: number | null
   editingLayerId: number | null
   total: number
   editingName: string

   setSelectedLayerId: (id: number) => void
   handleDoubleClick: (layer: Layer) => void
   toggleLayerVisibility: (id: number) => void
   setEditingName: (name: string) => void
   handleSubmitEdit: (event: FocusEvent<HTMLInputElement>) => void
   handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
   moveLayer: (id: number, pox: number) => void
   toggleLayerLock: (id: number) => void
   deleteLayer: (id: number) => void
}

function Layer(
   {
      layer,
      selectedLayerId,
      setSelectedLayerId,
      total,
      handleDoubleClick,
      toggleLayerVisibility,
      editingLayerId,
      editingName,
      setEditingName,
      handleSubmitEdit,
      handleKeyDown,
      moveLayer,
      toggleLayerLock,
      deleteLayer,
   }: prop,
   ref: HTMLInputElement,
) {
   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: layer.id,
   })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 999 : 'auto',
   }
   return (
      <div
         ref={setNodeRef}
         style={style}
         {...attributes}
         key={layer.id}
         className={`flex items-center gap-2 p-2  hover:bg-accent/50 group cursor-pointer transition-colors ${
            selectedLayerId === layer.id ? 'bg-primary/20 hover:bg-primary/25' : ''
         } `}
         onClick={() => setSelectedLayerId(layer.id)}
         onDoubleClick={(e) => {
            e.stopPropagation()
            handleDoubleClick(layer)
         }}
      >
         <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={(e) => {
               e.stopPropagation()
               toggleLayerVisibility(layer.id)
            }}
         >
            {layer.visible ? (
               <Eye className="h-3 w-3" />
            ) : (
               <EyeOff className="h-3 w-3 text-muted-foreground" />
            )}
         </Button>

         {editingLayerId === layer.id ? (
            <Input
               ref={ref}
               value={editingName}
               onChange={(e) => setEditingName(e.target.value)}
               onBlur={handleSubmitEdit}
               onKeyDown={handleKeyDown}
               className="flex-1 h-6 text-xs font-bold px-1 py-0 bg border-input"
               onClick={(e) => e.stopPropagation()}
            />
         ) : (
            <div className="flex-1 text-xs font-medium">{layer.name}</div>
         )}

         <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
               variant="ghost"
               size="sm"
               className="h-6 w-6 p-0 "
               onClick={(e) => {
                  e.stopPropagation()
                  moveLayer(layer.id, 'down')
               }}
               disabled={total <= 1}
               {...listeners}
            >
               <GripVertical className="h-3 w-3" />
            </Button>
            {/* <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 duplicateLayer(layer.id)
                              }}
                           >
                              <Copy className="h-3 w-3" />
                           </Button> */}
            <Button
               variant="ghost"
               size="sm"
               className="h-6 w-6 p-0"
               onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerLock(layer.id)
               }}
            >
               {layer.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
            <Button
               variant="ghost"
               size="sm"
               className="h-6 w-6 p-0 text-destructive hover:text-destructive"
               onClick={(e) => {
                  e.stopPropagation()
                  deleteLayer(layer.id)
               }}
               disabled={total <= 1}
            >
               <Trash2 className="h-3 w-3" />
            </Button>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                     <MoreHorizontal className="h-3 w-3" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleDoubleClick(layer)}>
                     <Edit3 className="h-4 w-4 mr-2" />
                     Rename Layer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLayerId(layer.id)}>
                     <MousePointer className="h-4 w-4 mr-2" />
                     Select Layer
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   )
}

export default forwardRef(Layer)
