import { useState, useEffect } from 'react'

function CoordinatesDisplay() {
   const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

   useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
         setCoordinates({ x: event.clientX, y: event.clientY })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
   }, [])
   //need to updat to world coordinates
   return (
      <div className="fixed bottom-4 left-4 bg-card/20 backdrop-blur-md border rounded px-2 py-1 z-10 text-xs font-mono shadow-sm">
         <div className="flex gap-3">
            <span>X: {coordinates.x}</span>
            <span>Y: {coordinates.y}</span>
         </div>
      </div>
   )
}

export default CoordinatesDisplay
