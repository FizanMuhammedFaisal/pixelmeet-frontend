import { useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function TilesPanel() {
   const [imageUrl, setImageUrl] = useState<string>('/m.png')
   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
   const [isSelecting, setIsSelecting] = useState(false)
   const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
   const containerRef = useRef<HTMLDivElement>(null)
   const imageRef = useRef<HTMLImageElement>(null)
   const { setSelectedTiles, selectedTiles } = useMapEditorStore()
   const TILE_SIZE = 32

   useEffect(() => {
      if (imageUrl) {
         const img = new Image()
         img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height })
         }
         img.src = imageUrl
      }
   }, [imageUrl])

   const tilesX = Math.floor(imageDimensions.width / TILE_SIZE)
   const tilesY = Math.floor(imageDimensions.height / TILE_SIZE)

   const handleMouseDown = (e: React.MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollLeft = containerRef.current.scrollLeft
      const scrollTop = containerRef.current.scrollTop

      const x = Math.floor((e.clientX - rect.left + scrollLeft) / TILE_SIZE)
      const y = Math.floor((e.clientY - rect.top + scrollTop) / TILE_SIZE)

      if (x >= 0 && x < tilesX && y >= 0 && y < tilesY) {
         setDragStart({ x, y })
         setSelectedTiles({ selectedImage: imageUrl, startX: x, startY: y, endX: x, endY: y })
         setIsSelecting(true)
      }
   }

   const handleMouseMove = (e: React.MouseEvent) => {
      if (!isSelecting || !dragStart || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollLeft = containerRef.current.scrollLeft
      const scrollTop = containerRef.current.scrollTop

      const x = Math.floor((e.clientX - rect.left + scrollLeft) / TILE_SIZE)
      const y = Math.floor((e.clientY - rect.top + scrollTop) / TILE_SIZE)

      if (x >= 0 && x < tilesX && y >= 0 && y < tilesY) {
         setSelectedTiles({
            selectedImage: imageUrl,
            startX: Math.min(dragStart.x, x),
            startY: Math.min(dragStart.y, y),
            endX: Math.max(dragStart.x, x),
            endY: Math.max(dragStart.y, y),
         })
      }
   }

   const handleMouseUp = () => {
      setIsSelecting(false)
      setDragStart(null)
   }

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         const url = URL.createObjectURL(file)
         setImageUrl(url)
         setSelectedTiles(null)
      }
   }

   if (!imageUrl || imageDimensions.width === 0) {
      return (
         <div className="h-full bg-muted/20 rounded border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">Drop tileset here</span>
            <input
               type="file"
               accept="image/*"
               onChange={handleFileUpload}
               className="hidden"
               id="tileset-upload"
            />
            <Button variant="outline" size="sm" className="text-xs bg-transparent" asChild>
               <label htmlFor="tileset-upload" className="cursor-pointer">
                  <Upload className="h-3 w-3 mr-1" />
                  Import Tileset
               </label>
            </Button>
         </div>
      )
   }

   return (
      <div className="h-full flex flex-col">
         <div className="p-2 border-b bg-muted/10">
            <div className="text-xs text-muted-foreground">
               {tilesX} × {tilesY} tiles ({imageDimensions.width} × {imageDimensions.height}px)
            </div>
            {selectedTiles && (
               <div className="text-xs text-foreground mt-1">
                  Selected: {selectedTiles.endX - selectedTiles.startX + 1} ×{' '}
                  {selectedTiles.endY - selectedTiles.startY + 1} tiles
               </div>
            )}
         </div>

         <div
            ref={containerRef}
            className="flex-1 overflow-auto bg-muted/10 relative cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={(e) => e.stopPropagation()}
            style={{ touchAction: 'none' }}
         >
            <div
               className="relative"
               style={{
                  width: imageDimensions.width,
                  height: imageDimensions.height,
                  minWidth: imageDimensions.width,
                  minHeight: imageDimensions.height,
               }}
            >
               <img
                  ref={imageRef}
                  src={imageUrl || '/placeholder.svg'}
                  alt="Tileset"
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                     imageRendering: 'pixelated',
                     width: imageDimensions.width,
                     height: imageDimensions.height,
                  }}
               />

               <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                     backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)
              `,
                     backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
                  }}
               />

               {selectedTiles && (
                  <div
                     className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none"
                     style={{
                        left: selectedTiles.startX * TILE_SIZE,
                        top: selectedTiles.startY * TILE_SIZE,
                        width: (selectedTiles.endX - selectedTiles.startX + 1) * TILE_SIZE,
                        height: (selectedTiles.endY - selectedTiles.startY + 1) * TILE_SIZE,
                     }}
                  />
               )}

               {/* <div
                  className="absolute inset-0 grid pointer-events-none"
                  style={{
                     gridTemplateColumns: `repeat(${tilesX}, ${TILE_SIZE}px)`,
                     gridTemplateRows: `repeat(${tilesY}, ${TILE_SIZE}px)`,
                  }}
               >
                  {Array.from({ length: tilesX * tilesY }).map((_, index) => {
                     const x = index % tilesX
                     const y = Math.floor(index / tilesX)
                     return (
                        <div
                           key={index}
                           className="border border-transparent hover:border-white/50 hover:bg-white/10 transition-colors"
                           style={{ width: TILE_SIZE, height: TILE_SIZE }}
                        />
                     )
                  })}
               </div> */}
            </div>
         </div>

         {/* <div className="p-2 border-t">
            <input
               type="file"
               accept="image/*"
               onChange={handleFileUpload}
               className="hidden"
               id="tileset-upload-bottom"
            />
            <Button variant="outline" size="sm" className="w-full text-xs bg-transparent" asChild>
               <label htmlFor="tileset-upload-bottom" className="cursor-pointer">
                  <Upload className="h-3 w-3 mr-1" />
                  Change Tileset
               </label>
            </Button>
         </div> */}
      </div>
   )
}

export default TilesPanel
