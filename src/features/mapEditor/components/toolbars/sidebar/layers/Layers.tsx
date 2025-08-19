import {
   useEditorActions,
   useLayerOrder,
   useLayers,
   useSelectedLayer,
} from '@/app/store/mapEditor/mapEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Layer } from '@/features/mapEditor/types/types'
import { Layers, MoreHorizontal, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import LayerList from './Layer'
import {
   closestCenter,
   DndContext,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   type DragEndEvent,
} from '@dnd-kit/core'
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
{
   /* read about sensors and collition detection algoritms
               https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms */
}

function SideBarLayers() {
   const {
      addLayer,
      moveLayer,
      toggleLayerLock,
      setSelectedLayer,
      toggleLayerVisibility,
      deleteLayer,
      renameLayer,
   } = useEditorActions()
   const selectedLayer = useSelectedLayer()
   const layers = useLayers()
   const layerOrder = useLayerOrder()

   const [editingLayerId, setEditingLayerId] = useState<number | null>(null)
   const [editingName, setEditingName] = useState('')
   const inputRef = useRef<HTMLInputElement>(null)
   useEffect(() => {
      if (editingLayerId && inputRef.current) {
         inputRef.current.focus()
         inputRef.current.select()
      }
   }, [editingLayerId])
   const handleDoubleClick = (layer: Layer) => {
      setEditingLayerId(layer.id)
      setEditingName(layer.name)
   }

   const handleCancelEdit = () => {
      setEditingLayerId(null)
      setEditingName('')
   }
   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         handleSubmitEdit()
      } else if (e.key === 'Escape') {
         handleCancelEdit()
      }
   }
   const handleSubmitEdit = () => {
      if (editingLayerId !== null && editingName.trim()) {
         renameLayer(editingLayerId, editingName.trim())
      }
      setEditingLayerId(null)
      setEditingName('')
   }

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   )
   const handleDragEng = (event: DragEndEvent) => {
      const { active, over } = event
      if (!over) return
      const oldIndex = layerOrder.indexOf(Number(active.id))
      const newIndex = layerOrder.indexOf(Number(over.id))

      const res = arrayMove(layerOrder, oldIndex, newIndex)
      console.log(res)
      moveLayer(res)
   }
   console.log(layers)

   const selectedLayerId = selectedLayer?.id ?? null
   return (
      <div>
         {' '}
         <Card className="h-full  border-0 border-t">
            <CardHeader className="pb-2 px-3 py-2">
               <CardTitle className="text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Layers className="h-4 w-4" />
                     Layers
                  </div>
                  <div className="flex items-center gap-1">
                     <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={addLayer}>
                        <Plus className="h-3 w-3" />
                     </Button>
                     <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                     </Button>
                  </div>
               </CardTitle>
            </CardHeader>
            <DndContext
               sensors={sensors}
               collisionDetection={closestCenter}
               modifiers={[restrictToVerticalAxis, restrictToParentElement]}
               onDragEnd={handleDragEng}
            >
               <CardContent className="pt-0 px-3 pb-2 flex-1 overflow-auto">
                  <SortableContext
                     items={layers.map((curr) => curr.id)}
                     strategy={verticalListSortingStrategy}
                  >
                     <div className="space-y-1">
                        {layers.map((layer, index) => (
                           <LayerList
                              layer={layer}
                              total={layers.length}
                              deleteLayer={deleteLayer}
                              editingLayerId={editingLayerId}
                              editingName={editingName}
                              handleDoubleClick={handleDoubleClick}
                              handleKeyDown={handleKeyDown}
                              handleSubmitEdit={handleSubmitEdit}
                              moveLayer={moveLayer}
                              selectedLayerId={selectedLayerId}
                              setEditingName={setEditingName}
                              setSelectedLayer={setSelectedLayer}
                              toggleLayerLock={toggleLayerLock}
                              toggleLayerVisibility={toggleLayerVisibility}
                              key={index}
                              ref={inputRef}
                           />
                        ))}
                        {layers.length === 0 && (
                           <div className=" flex justify-center text-foreground/60">
                              <p> Make a layer to draw</p>
                           </div>
                        )}
                     </div>
                  </SortableContext>
               </CardContent>
            </DndContext>
         </Card>
      </div>
   )
}

export default SideBarLayers
