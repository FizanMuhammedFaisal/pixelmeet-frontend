import { useMouseCoordinates } from '@/app/store/mapEditor/mapEditor'

function CoordinatesDisplay() {
   const coordinates = useMouseCoordinates()

   return (
      <div className="fixed bottom-4 left-4 bg-card/20 backdrop-blur-md border rounded px-2 py-1 z-10 text-xs font-mono shadow-sm">
         <div className="flex gap-3">
            <span>X: {coordinates.x.toFixed(0)}</span>
            <span>Y: {coordinates.y.toFixed(0)}</span>
         </div>
      </div>
   )
}

export default CoordinatesDisplay
