import type React from 'react'
import { useEditorActions, useSelectedTile } from '@/app/store/mapEditor/mapEditor'
import { Files } from 'lucide-react'
import { useRef, useState } from 'react'
import type { TilesetType } from '@/features/mapEditor/types/types'
import AddTilesetModal from './AddTilesetModal'
import TilesScrollbar from './TilesScrollbar'
import {
   useActiveTileset,
   useTileSetPanelAction,
   useTilsets,
} from '@/app/store/mapEditor/mapEditorPanels'

function TilesPanel() {
   const { setTilesets, updateTilesets, setActiveTileset } = useTileSetPanelAction()
   const { addTilesets } = useEditorActions()
   const tilesets = useTilsets()
   const activeTileset = useActiveTileset()
   const [isSelecting, setIsSelecting] = useState(false)
   const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const containerRef = useRef<HTMLDivElement>(null)
   const { setSelectedTiles } = useEditorActions()
   const selectedTiles = useSelectedTile()
   const TILE_SIZE = 32

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, tileset: TilesetType) => {
      if (!containerRef.current) return

      const rect = e.currentTarget.getBoundingClientRect()
      const scrollLeft = containerRef.current.scrollLeft
      const scrollTop = containerRef.current.scrollTop
      const x = Math.floor((e.clientX - rect.left + scrollLeft) / TILE_SIZE)
      const y = Math.floor((e.clientY - rect.top + scrollTop) / TILE_SIZE)

      const tilesX = Math.floor(tileset.width / TILE_SIZE)
      const tilesY = Math.floor(tileset.height / TILE_SIZE)

      if (x >= 0 && x < tilesX && y >= 0 && y < tilesY) {
         setDragStart({ x, y })
         setSelectedTiles({
            selectedImage: tileset.image,
            startX: x,
            startY: y,
            endX: x + 1,
            endY: y + 1,
            name: tileset.name,
         })
         setIsSelecting(true)
      }
   }

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, tileset: TilesetType) => {
      if (!isSelecting || !dragStart || !containerRef.current) return

      const rect = e.currentTarget.getBoundingClientRect()
      const scrollLeft = containerRef.current.scrollLeft
      const scrollTop = containerRef.current.scrollTop
      const x = Math.floor((e.clientX - rect.left + scrollLeft) / TILE_SIZE)
      const y = Math.floor((e.clientY - rect.top + scrollTop) / TILE_SIZE)

      const tilesX = Math.floor(tileset.width / TILE_SIZE)
      const tilesY = Math.floor(tileset.height / TILE_SIZE)

      if (x >= 0 && x < tilesX && y >= 0 && y < tilesY) {
         setSelectedTiles({
            selectedImage: tileset.image,
            startX: Math.min(dragStart.x, x),
            startY: Math.min(dragStart.y, y),
            endX: Math.max(dragStart.x, x) + 1,
            endY: Math.max(dragStart.y, y) + 1,
            name: tileset.name,
         })
      }
   }

   const handleMouseUp = () => {
      setIsSelecting(false)
      setDragStart(null)
   }

   const closeTileset = (id: string) => {
      const filtered = tilesets.filter((t) => t.id !== id)
      if (activeTileset?.id === id && filtered.length > 0) {
         setActiveTileset(filtered[0])
      } else if (filtered.length === 0) {
         setActiveTileset(null)
      }
      setTilesets(filtered)
   }

   const hanldeTilsetAdded = (data: TilesetType) => {
      updateTilesets([data])
      if (!activeTileset) {
         setActiveTileset(data)
         addTilesets(data.name, data.width, data.height, Math.floor(data.width / TILE_SIZE))
      }
   }

   return (
      <div className="h-full flex flex-col">
         <TilesScrollbar
            activeTileset={activeTileset}
            closeTileset={closeTileset}
            isModalOpen={isModalOpen}
            setActiveTileset={setActiveTileset}
            setIsModalOpen={setIsModalOpen}
            tilesets={tilesets}
            key={'tiles top bar'}
         />

         {isModalOpen && (
            <div>
               <AddTilesetModal
                  onAdd={hanldeTilsetAdded}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  selectedAssets={tilesets.map((curr) => curr.image)}
               />
            </div>
         )}

         <div className="flex-1 overflow-auto" ref={containerRef}>
            {!activeTileset && (
               <div className="h-full bg-muted/20 rounded border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 m-2">
                  <Files className="h-8 w-8 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">No tileset selected</span>
                  <span className="text-muted-foreground text-xs">Use the Plus icon on Top</span>
               </div>
            )}

            {tilesets.map((tileset) => {
               const tilesX = Math.floor(tileset.width / TILE_SIZE)
               const tilesY = Math.floor(tileset.height / TILE_SIZE)

               return (
                  <div
                     key={tileset.id}
                     style={{ display: activeTileset?.id === tileset.id ? 'block' : 'none' }}
                  >
                     <div className="p-2 border-b bg-muted/10">
                        <div className="text-xs text-muted-foreground">
                           {tilesX} × {tilesY} tiles ({tileset.width} × {tileset.height}px)
                        </div>
                        {selectedTiles && selectedTiles.selectedImage === tileset.image && (
                           <div className="text-xs text-foreground mt-1">
                              Selected: {selectedTiles.endX - selectedTiles.startX} ×{' '}
                              {selectedTiles.endY - selectedTiles.startY} tiles
                           </div>
                        )}
                     </div>
                     <div
                        className="bg-muted/10 relative cursor-crosshair"
                        style={{ touchAction: 'none' }}
                        onMouseDown={(e) => handleMouseDown(e, tileset)}
                        onMouseMove={(e) => handleMouseMove(e, tileset)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                     >
                        <div
                           className="relative"
                           style={{
                              width: tileset.width,
                              height: tileset.height,
                              minWidth: tileset.width,
                              minHeight: tileset.height,
                           }}
                        >
                           <img
                              src={tileset.image || '/placeholder.svg'}
                              alt="Tileset"
                              className="absolute inset-0 pointer-events-none select-none"
                              style={{
                                 imageRendering: 'pixelated',
                                 width: tileset.width,
                                 height: tileset.height,
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

                           {selectedTiles && selectedTiles.selectedImage === tileset.image && (
                              <div
                                 className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none"
                                 style={{
                                    left: selectedTiles.startX * TILE_SIZE,
                                    top: selectedTiles.startY * TILE_SIZE,
                                    width: (selectedTiles.endX - selectedTiles.startX) * TILE_SIZE,
                                    height: (selectedTiles.endY - selectedTiles.startY) * TILE_SIZE,
                                 }}
                              />
                           )}
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default TilesPanel
