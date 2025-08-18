import { useState } from 'react'
import {
   DndContext,
   closestCenter,
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
   useSortable,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function App() {
   const [items, setItems] = useState([1, 2, 3])

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   )

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
               <SortableItem key={id} id={id} />
            ))}
         </SortableContext>
      </DndContext>
   )

   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event

      if (active.id !== over.id) {
         setItems((items) => {
            const oldIndex = items.indexOf(active.id)
            const newIndex = items.indexOf(over.id)

            return arrayMove(items, oldIndex, newIndex)
         })
      }
   }
}
export default App

export function SortableItem(props) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: props.id,
   })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   }

   return (
      <div ref={setNodeRef} style={style} className="text-white" {...attributes} {...listeners}>
         <div className="p-4 mt-2 mx-2 bg-amber-800">
            <span>{props.id}</span>
         </div>
      </div>
   )
}
